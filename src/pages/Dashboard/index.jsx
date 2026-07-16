import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ChevronDown, Search } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadDecksRequest } from "../../store/modules/deck/actions";
import styles from "./styles";
import api from "../../config/api";
import DeleteConfirmationModal from "../../components/CustomButton/DeleteConfirmationModal";
import LanguageSelectionModal from "../../components/Modal/LanguageSelectionModal";
import DeckCardItem from "../../components/CustomButton/DeckCardItem";
import * as DashboardActions from "../../store/modules/dashboard/actions";
import { toggleFavoriteRequest } from "../../store/modules/deck/actions";
import { loadProfileRequest } from "../../store/modules/auth/actions";
import {
  getLanguageFlag,
  getLanguageLabel,
  languageOptions,
} from "../../utils/languages";

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
    } catch {}
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
    const languageLabel = getLanguageLabel(item.language);

    return (
      <DeckCardItem
        item={item}
        languageLabel={languageLabel}
        onDelete={(deck) => {
          setDeckToDelete(deck);
          setDeleteModalVisible(true);
        }}
        onOpen={(deck) =>
          navigation.navigate("FlashCards", {
            deckId: deck.id,
            deckName: deck.name,
            deckLanguage: deck.language,
          })
        }
        onToggleFavorite={(deck) => dispatch(toggleFavoriteRequest(deck.id))}
        styles={styles}
      />
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
              {getLanguageFlag(selectedLanguage)}
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

        <LanguageSelectionModal
          visible={languageModalVisible}
          title="Selecione um idioma"
          options={languageOptions}
          onCancel={() => setLanguageModalVisible(false)}
          onSelect={(value) => {
            setSelectedLanguage(value);
            setLanguageModalVisible(false);
          }}
          styles={styles}
        />

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
