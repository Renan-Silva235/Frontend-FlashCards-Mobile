import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import api from "../../config/api";
import Modal from "react-native-modal";
import { speak } from "../../services/speech/speechService";
import styles from "./styles";

export default function FlashCards({ route, navigation }) {
  const { deckId, deckName } = route.params;
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCards() {
    try {
      setLoading(true);

      const response = await api.get(
        `/flashcards/deck/${deckId}`
      );

      setCards(response.data);
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCards();
    });

    return unsubscribe;
  }, [navigation]);

  function renderCard({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCard(item);
          setModalVisible(true);
        }}
        style={styles.card}
      >
        <Text
          style={styles.cardWord}
        >
          {item.word}
        </Text>

        <Text
          style={styles.cardTranslation}
        >
          {item.translation}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        {deckName}
      </Text>

      <TouchableOpacity
        style={styles.newCardButton}
        onPress={() =>
          navigation.navigate("CreateCard", {
            deckId,
            deckName,
          })
        }
      >
        <Text
          style={styles.newCardButtonText}
        >
          Novo Card
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCard}
          ListEmptyComponent={
            <Text
              style={styles.emptyText}
            >
              Nenhum card criado
            </Text>
          }
        />
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={styles.modalContainer}
        >
          <View
            style={styles.modalHeader}
          >
            <Text
              style={styles.modalWord}
            >
              {selectedCard?.word}
            </Text>

            <TouchableOpacity
              onPress={() => speak(selectedCard?.word)}
            >
              <Text
                style={styles.speakerIconMain}
              >
                🔊
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.translation}
          >
            {selectedCard?.translation}
          </Text>

          {selectedCard?.past ? (
            <View
              style={styles.rowSpeech}
            >
              <Text style={{ color: "#fff" }}>
                Past: {selectedCard.past}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.past)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedCard?.present ? (
            <View
              style={styles.rowSpeech}
            >
              <Text style={{ color: "#fff" }}>
                Present: {selectedCard.present}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.present)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedCard?.future ? (
            <View
              style={styles.rowSpeech}
            >
              <Text style={{ color: "#fff" }}>
                Future: {selectedCard.future}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.future)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedCard?.examplePhrase1 ? (
            <View
              style={styles.rowSpeechTop}
            >
              <Text
                style={styles.phraseText}
              >
                • {selectedCard.examplePhrase1}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.examplePhrase1)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedCard?.examplePhrase2 ? (
            <View
              style={styles.rowSpeech}
            >
              <Text
                style={styles.phraseText}
              >
                • {selectedCard.examplePhrase2}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.examplePhrase2)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {selectedCard?.examplePhrase3 ? (
            <View
              style={styles.rowSpeech}
            >
              <Text
                style={styles.phraseText}
              >
                • {selectedCard.examplePhrase3}
              </Text>

              <TouchableOpacity
                onPress={() => speak(selectedCard.examplePhrase3)}
              >
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setModalVisible(false);

              navigation.navigate("EditCard", {
                card: selectedCard,
              });
            }}
          >
            <Text
              style={styles.buttonText}
            >
              Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text
              style={styles.buttonText}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}