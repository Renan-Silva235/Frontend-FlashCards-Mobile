import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Search, Plus, Star } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadDecksRequest } from "../../store/modules/deck/actions";
import styles from "./styles";
import DeleteButton from "../../components/CustomButton/DeleteButton";
import api from "../../config/api";
import DeleteConfirmationModal from "../../components/CustomButton/DeleteConfirmationModal";
import * as DashboardActions from "../../store/modules/dashboard/actions";
import { toggleFavoriteRequest } from "../../store/modules/deck/actions";
import { loadProfileRequest } from "../../store/modules/auth/actions";
import { Modal } from "react-native";
import { ChevronDown } from "lucide-react-native";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.deck.decks);

  const loading = useSelector((state) => state.deck.loading);

  const dashboard = useSelector((state) => state.dashboard);

  const statistics = dashboard?.statistics ?? {
    totalCards: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  };

  const [search, setSearch] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    dispatch(
      DashboardActions.loadStatisticsRequest(
        selectedLanguage === "all" ? null : selectedLanguage,
      ),
    );
  }, [dispatch, selectedLanguage]);

  useEffect(() => {
    dispatch(loadDecksRequest());
  }, [dispatch]);

  async function handleDeleteDeck() {
    try {
      await api.delete(`/decks/${deckToDelete.id}`);

      setDeleteModalVisible(false);
      setDeckToDelete(null);

      dispatch(loadDecksRequest());
      dispatch(loadProfileRequest());
    } catch (error) {
      console.log(error?.response?.data);
    }
  }
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.name.toLowerCase().includes(search.toLowerCase()) ||
      deck.category.toLowerCase().includes(search.toLowerCase());

    const matchesLang =
      selectedLanguage === "all" || deck.language === selectedLanguage;

    return matchesSearch && matchesLang;
  });

  function renderDeckCard({ item }) {
    return (
      <TouchableOpacity
        style={styles.deckCard}
        onPress={() =>
          navigation.navigate("FlashCards", {
            deckId: item.id,
            deckName: item.name,
            deckLanguage: item.language,
          })
        }
      >
        <DeleteButton
          onPress={() => {
            setDeckToDelete(item);
            setDeleteModalVisible(true);
          }}
        />
        <View style={styles.deckHeader}>
          <View>
            <Text style={styles.deckName}>{item.name}</Text>
            <Text style={styles.deckCategory}>{item.category}</Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(toggleFavoriteRequest(item.id))}
          >
            <Star
              size={20}
              color={item.favorite ? "#eab308" : "#64748b"}
              fill={item.favorite ? "#eab308" : "none"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.deckFooter}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.language === "English"
                ? "🇺🇸 Inglês"
                : item.language === "Spanish"
                  ? "🇪🇸 Espanhol"
                  : item.language === "Turkish"
                    ? "🇹🇷 Turco"
                    : null}
            </Text>
          </View>

          <Text style={styles.cardCount}>{item.cardsCount || 0} Cards</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Seus flash cards e progresso</Text>
          </View>

          <TouchableOpacity
            style={styles.languageSelector}
            onPress={() => setLanguageModalVisible(true)}
          >
            <Text style={styles.languageSelectorText}>
              {selectedLanguage === "English"
                ? "🇺🇸"
                : selectedLanguage === "Spanish"
                  ? "🇪🇸"
                  : "🇹🇷"}
            </Text>

            <ChevronDown size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" style={styles.searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Procurar baralhos ou categorias..."
            placeholderTextColor="#64748b"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: "#60a5fa" }]}>
              {statistics.totalCards}
            </Text>
            <Text style={styles.statLabel}>Total Cards</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: "#4ade80" }]}>
              {statistics.easy}
            </Text>
            <Text style={styles.statLabel}>Cards Fáceis</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: "#f87171" }]}>
              {statistics.medium}
            </Text>
            <Text style={styles.statLabel}>Cards Médios</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: "#c084fc" }]}>
              {statistics.hard}
            </Text>
            <Text style={styles.statLabel}>Cards Difíceis</Text>
          </View>
        </View>

        <Modal visible={languageModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.languageModal}>
              <Text style={styles.languageModalTitle}>Selecione um idioma</Text>

              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage("English");
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.languageOptionText}>🇺🇸 Inglês</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage("Spanish");
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.languageOptionText}>🇪🇸 Espanhol</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage("Turkish");
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.languageOptionText}>🇹🇷 Turco</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLanguageModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3b82f6"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={filteredDecks}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderDeckCard}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum baralho encontrado.</Text>
            }
          />
        )}

        <DeleteConfirmationModal
          visible={deleteModalVisible}
          message="Deseja realmente excluir o deck?"
          onConfirm={handleDeleteDeck}
          onClose={() => setDeleteModalVisible(false)}
        />
      </View>
    </>
  );
}
