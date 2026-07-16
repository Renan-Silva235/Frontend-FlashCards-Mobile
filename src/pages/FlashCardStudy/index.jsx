import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  Alert,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const { height } = useWindowDimensions();

  const [studySessionId, setStudySessionId] = useState(null);

  const { cards, loading } = useSelector((state) => state.study);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function startStudy() {
      try {
        const response = await api.post("/study-sessions/start", {
          deckId,
        });

        setStudySessionId(response.data.id);
        dispatch(loadStudyCardsRequest(deckId));
      } catch {}
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
      } catch {}
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

  async function handleMarkCard(status) {
    const currentCard = cards[currentIndex];
    dispatch(reviewCardRequest(studySessionId, currentCard.id, status));

    if (flipped) handleFlip();
  }

  function handleSpeak(text) {
    speak(text, getLanguageCode(deckLanguage));
  }

  if (loading && cards.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]} edges={["bottom"]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  if (cards.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
        edges={["bottom"]}
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
      </SafeAreaView>
    );
  }

  const activeCard = cards[currentIndex];

  if (!activeCard) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
        edges={["bottom"]}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    );
  }

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };
  const cardHeight = Math.max(240, Math.min(320, Math.round(height * 0.38)));

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.counterText}>
          Card {currentIndex + 1} de {cards.length}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Container do Card Flip */}
      <View style={[styles.cardContainer, { height: cardHeight }]}>
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
              <Text style={[styles.mainWord, height < 700 && { fontSize: 30 }]}>
                {activeCard.word}
              </Text>
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
              <Text style={[styles.mainWord, height < 700 && { fontSize: 30 }]}>
                {activeCard.translation}
              </Text>

              <View style={styles.tensesContainer}>{/* tempos verbais */}</View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.audioWrapper,
            { bottom: Math.max(16, Math.round(height * 0.05)) },
          ]}
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
    </ScrollView>
    </SafeAreaView>
  );
}
