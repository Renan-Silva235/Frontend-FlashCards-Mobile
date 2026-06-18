import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert
} from 'react-native';
import { X, Volume2, Check, Minus } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import { loadStudyCardsRequest, reviewCardRequest } from '../../store/modules/study/actions';
import styles from './styles'

export default function FlashCardStudy({ navigation }) {
  const dispatch = useDispatch();

  // Pega a lista de cards e o loading direto do Redux
  const { cards, loading } = useSelector(state => state.study);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Controle de Animação do Flip
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Dispara a action do Redux Saga para buscar os cards no backend Java
  useEffect(() => {
    dispatch(loadStudyCardsRequest());
  }, [dispatch]);

  // Configuração das interpolações para o efeito de rotação 3D
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  function handleFlip() {
    if (flipped) {
      Animated.spring(flipAnimation, { toValue: 0, friction: 8, tension: 10, useNativeDriver: true }).start();
    } else {
      Animated.spring(flipAnimation, { toValue: 180, friction: 8, tension: 10, useNativeDriver: true }).start();
    }
    setFlipped(!flipped);
  }

  function handleMarkCard(status) {
    const currentCard = cards[currentIndex];

    // Dispara a action do Redux para salvar a revisão (Errei, Difícil, Acertei) via Saga
    dispatch(reviewCardRequest(currentCard.id, status));

    if (flipped) handleFlip();

    // Avança para o próximo ou finaliza a sessão
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Parabéns!', 'Você concluiu todos os cards desta sessão.', [
        { text: 'Voltar ao Dashboard', onPress: () => navigation.navigate('Dashboard') }
      ]);
    }
  }

  function handleSpeak(text) {
    const activeCard = cards[currentIndex];
    const langCode = activeCard?.language === 'English' ? 'en-US' : 'ru-RU';

    Speech.speak(text, {
      language: langCode,
      pitch: 1.0,
      rate: 0.85,
    });
  }

  if (loading && cards.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.emptyText}>Nenhum card para estudar no momento!</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Voltar ao Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activeCard = cards[currentIndex];

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.counterText}>Card {currentIndex + 1} de {cards.length}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <X size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Container do Card Flip */}
      <TouchableOpacity activeOpacity={1} onPress={handleFlip} style={styles.cardContainer}>
        {/* Lado da Frente */}
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle, flipped && { zIndex: 0 }]}>
          <Text style={styles.cardTitle}>Palavra</Text>
          <Text style={styles.mainWord}>{activeCard.word}</Text>

          <View style={styles.audioRow}>
            <TouchableOpacity style={styles.audioButton} onPress={() => handleSpeak(activeCard.word)}>
              <Volume2 size={16} color="#fff" />
              <Text style={styles.audioText}>Ouvir Pronúncia</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.hintText}>Toque para virar</Text>
        </Animated.View>

        {/* Lado de Trás */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle, !flipped && { zIndex: 0 }]}>
          <Text style={styles.cardTitle}>Tradução</Text>
          <Text style={styles.mainWord}>{activeCard.translation}</Text>

          <View style={styles.tensesContainer}>
            {activeCard.past && <Text style={styles.tenseText}>Past: {activeCard.past}</Text>}
            {activeCard.present && <Text style={styles.tenseText}>Present: {activeCard.present}</Text>}
            {activeCard.future && <Text style={styles.tenseText}>Future: {activeCard.future}</Text>}
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* Bloco de Exemplos */}
      {activeCard.examples && (
        <View style={styles.examplesBox}>
          <Text style={styles.examplesTitle}>Exemplos:</Text>
          {activeCard.examples.split(';').map((example, i) => (
            <Text key={i} style={styles.exampleText}>• {example.trim()}</Text>
          ))}
        </View>
      )}

      {/* Botões de Feedback */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionBtn, styles.btnIncorrect]} onPress={() => handleMarkCard('incorrect')}>
          <X size={20} color="#fff" />
          <Text style={styles.btnText}>Errei</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.btnMedium]} onPress={() => handleMarkCard('medium')}>
          <Minus size={20} color="#fff" />
          <Text style={styles.btnText}>Difícil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.btnCorrect]} onPress={() => handleMarkCard('correct')}>
          <Check size={20} color="#fff" />
          <Text style={styles.btnText}>Acertei</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

