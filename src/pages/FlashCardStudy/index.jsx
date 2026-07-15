import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import { X, Volume2, Check, Minus } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { speak } from "../../services/speech/speechService";
import { getLanguageCode } from "../../services/speech/getLanguageCode";
import {
  loadStudyCardsRequest,
  reviewCardRequest,
} from "../../store/modules/study/actions";
import styles from "./styles";
import api from "../../config/api";

export default function FlashCardStudy({ navigation, route }) {
  const { deckId, deckLanguage } = route.params;
  const dispatch = useDispatch();

  const [studySessionId, setStudySessionId] = useState(null);

  // Pega a lista de cards e o loading direto do Redux
  const { cards, loading } = useSelector((state) => state.study);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [studyFinished, setStudyFinished] = useState(false);
  // Controle de Animação do Flip
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Dispara a action do Redux Saga para buscar os cards no backend Java
  useEffect(() => {
    async function startStudy() {
      try {
        const response = await api.post("/study-sessions/start", {
          deckId,
        });

        setStudySessionId(response.data.id);
        dispatch(loadStudyCardsRequest(deckId));
      } catch (error) {
        console.log(error?.response?.data);
      }
    }

    startStudy();
  }, [dispatch]);

  useEffect(() => {
    async function finishStudy() {
      if (!studySessionId) return;

      try {
        await api.put(`/study-sessions/${studySessionId}/end`);

        Alert.alert("Parabéns!", "Você concluiu todos os cards desta sessão.", [
          {
            text: "Voltar ao Dashboard",
            onPress: () =>
              navigation.navigate("MainTab", {
                screen: "Dashboard",
              }),
          },
        ]);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }

    if (!loading && cards.length === 0 && studySessionId) {
      finishStudy();
    }
  }, [cards, loading, studySessionId]);

  // Configuração das interpolações para o efeito de rotação 3D
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  function handleFlip() {
    if (flipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  }

  async function finishStudySession() {
    try {
      await api.put(`/study-sessions/${studySessionId}/end`);
    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  async function handleMarkCard(status) {
    const currentCard = cards[currentIndex];
    // Dispara a action do Redux para salvar a revisão (Errei, Difícil, Acertei) via Saga
    dispatch(reviewCardRequest(studySessionId, currentCard.id, status));

    if (flipped) handleFlip();
  }

  function handleSpeak(text) {
    speak(text, getLanguageCode(deckLanguage));
  }

  if (loading && cards.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (cards.length === 0 && !studyFinished) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={styles.emptyText}>
          Nenhum card para estudar no momento!
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("MainTab", {
              screen: "Dashboard",
            })
          }
        >
          <Text style={styles.buttonText}>Voltar ao Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activeCard = cards[currentIndex];

  if (!activeCard) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.counterText}>
          Card {currentIndex + 1} de {cards.length}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <X size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Container do Card Flip */}
      <View style={styles.cardContainer}>
        <TouchableWithoutFeedback onPress={handleFlip}>
          <View style={{ flex: 1 }}>
            {/* Frente */}
            <Animated.View
              style={[
                styles.card,
                styles.cardFront,
                frontAnimatedStyle,
                flipped && { zIndex: 0 },
              ]}
            >
              <Text style={styles.cardTitle}>Palavra</Text>
              <Text style={styles.mainWord}>{activeCard.word}</Text>
              <Text style={styles.hintText}>Toque no card para virar</Text>
            </Animated.View>

            {/* Trás */}
            <Animated.View
              style={[
                styles.card,
                styles.cardBack,
                backAnimatedStyle,
                !flipped && { zIndex: 0 },
              ]}
            >
              <Text style={styles.cardTitle}>Tradução</Text>
              <Text style={styles.mainWord}>{activeCard.translation}</Text>

              <View style={styles.tensesContainer}>{/* tempos verbais */}</View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            position: "absolute",
            bottom: 40,
            alignSelf: "center",
            zIndex: 999,
          }}
        >
          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => handleSpeak(activeCard.word)}
          >
            <Volume2 size={16} color="#fff" />
            <Text style={styles.audioText}>Ouvir Pronúncia</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bloco de Exemplos */}
      {activeCard.examples && (
        <View style={styles.examplesBox}>
          <Text style={styles.examplesTitle}>Exemplos:</Text>
          {activeCard.examples.split(";").map((example, i) => (
            <Text key={i} style={styles.exampleText}>
              • {example.trim()}
            </Text>
          ))}
        </View>
      )}

      {/* Botões de Feedback */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnIncorrect]}
          onPress={() => handleMarkCard("MISTAKE")}
        >
          <X size={20} color="#fff" />
          <Text style={styles.btnText}>Difícil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.btnMedium]}
          onPress={() => handleMarkCard("DIFFICULT")}
        >
          <Minus size={20} color="#fff" />
          <Text style={styles.btnText}>Médio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.btnCorrect]}
          onPress={() => handleMarkCard("HIT")}
        >
          <Check size={20} color="#fff" />
          <Text style={styles.btnText}>Fácil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
