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
import styles from "./styles"

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.deck.decks);

  const loading = useSelector((state) => state.deck.loading);

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const stats = {
    totalCards: decks.reduce((acc, deck) => acc + (deck.cardsCount || 0), 0),
    correct: 12,
    incorrect: 3,
    favorites: decks.filter((d) => d.isFavorite).length,
  };

  useEffect(() => {
    dispatch(loadDecksRequest());
  }, [dispatch]);

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.name.toLowerCase().includes(search.toLowerCase()) ||
      deck.category.toLowerCase().includes(search.toLowerCase());

    const matchesLang =
      selectedLanguage === "all" ||
      deck.language === selectedLanguage;

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
          })
        }
      >
        <View style={styles.deckHeader}>
          <View>
            <Text style={styles.deckName}>{item.name}</Text>
            <Text style={styles.deckCategory}>{item.category}</Text>
          </View>

          <TouchableOpacity>
            <Star
              size={20}
              color={item.isFavorite ? "#eab308" : "#64748b"}
              fill={item.isFavorite ? "#eab308" : "none"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.deckFooter}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.language === "English"
                ? "🇺🇸 Inglês"
                : "🇷🇺 Espanhol"}
            </Text>
          </View>

          <Text style={styles.cardCount}>
            {item.cardsCount || 0} Cards
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            Seus flash cards e progresso
          </Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("Novo")}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.createButtonText}>
            Novo Deck
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search
          size={20}
          color="#64748b"
          style={styles.searchIcon}
        />

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
            {stats.totalCards}
          </Text>
          <Text style={styles.statLabel}>Cards</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: "#4ade80" }]}>
            {stats.correct}
          </Text>
          <Text style={styles.statLabel}>Acertos</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: "#f87171" }]}>
            {stats.incorrect}
          </Text>
          <Text style={styles.statLabel}>Erros</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: "#c084fc" }]}>
            {stats.favorites}
          </Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedLanguage === "all" &&
              styles.tabButtonActive,
          ]}
          onPress={() => setSelectedLanguage("all")}
        >
          <Text
            style={[
              styles.tabText,
              selectedLanguage === "all" &&
                styles.tabTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedLanguage === "English" &&
              styles.tabButtonActive,
          ]}
          onPress={() => setSelectedLanguage("English")}
        >
          <Text
            style={[
              styles.tabText,
              selectedLanguage === "English" &&
                styles.tabTextActive,
            ]}
          >
            🇺🇸 Inglês
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedLanguage === "Spanish" &&
              styles.tabButtonActive,
          ]}
          onPress={() => setSelectedLanguage("Spanish")}
        >
          <Text
            style={[
              styles.tabText,
              selectedLanguage === "Spanish" &&
                styles.tabTextActive,
            ]}
          >
            🇪🇸 Espanhol
          </Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.emptyText}>
              Nenhum baralho encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

