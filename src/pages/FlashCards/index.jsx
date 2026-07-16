import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { X } from "lucide-react-native";
import { loadDecksRequest } from "../../store/modules/deck/actions";
import DeleteConfirmationModal from "../../components/CustomButton/DeleteConfirmationModal";
import api from "../../config/api";
import { loadProfileRequest } from "../../store/modules/auth/actions";
import FlashCardDetailsModal from "../../components/Modal/FlashCardDetailsModal";
import FlashCardListItem from "../../components/CustomButton/FlashCardListItem";
import styles from "./styles";

export default function FlashCards({ route, navigation }) {
  const dispatch = useDispatch();
  const { deckId, deckName, deckLanguage } = route.params;
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  async function loadCards() {
    try {
      setLoading(true);

      const response = await api.get(`/flashcards/deck/${deckId}`);

      setCards(response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCards();
    dispatch(loadProfileRequest());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCards();
    });

    return unsubscribe;
  }, [navigation]);

  function renderCard({ item }) {
    return (
      <FlashCardListItem
        item={item}
        onDelete={(card) => {
          setCardToDelete(card);
          setDeleteModalVisible(true);
        }}
        onPress={(card) => {
          setSelectedCard(card);
          setModalVisible(true);
        }}
        styles={styles}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{deckName}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.newCardButton}
        onPress={() =>
          navigation.navigate("CreateCard", {
            deckId,
            deckName,
          })
        }
      >
        <Text style={styles.newCardButtonText}>Novo Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.newCardButton}
        onPress={() =>
          navigation.navigate("FlashCardStudy", {
            deckId,
            deckName,
            deckLanguage,
          })
        }
      >
        <Text style={styles.newCardButtonText}>Estudar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCard}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum card criado</Text>
          }
        />
      )}

      <FlashCardDetailsModal
        visible={modalVisible}
        card={selectedCard}
        deckLanguage={deckLanguage}
        onClose={() => setModalVisible(false)}
        onEdit={() => {
          setModalVisible(false);

          navigation.navigate("EditCard", {
            card: selectedCard,
          });
        }}
        styles={styles}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        message="Deseja realmente excluir este card?"
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/flashcards/${cardToDelete.id}`);

            setDeleteModalVisible(false);
            setModalVisible(false);

            loadCards();
            dispatch(loadProfileRequest());
            dispatch(loadDecksRequest());
          } catch (error) {
            console.log(error?.response?.data);
          }
        }}
      />
    </SafeAreaView>
  );
}
