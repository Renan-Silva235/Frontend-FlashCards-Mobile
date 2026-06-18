import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import api from "../../config/api";
import styles from "./styles";

export default function CreateCard({ route, navigation }) {
  const { deckId } = route.params;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  const [present, setPresent] = useState("");
  const [past, setPast] = useState("");
  const [future, setFuture] = useState("");

  const [examplePhrase1, setExamplePhrase1] = useState("");
  const [examplePhrase2, setExamplePhrase2] = useState("");
  const [examplePhrase3, setExamplePhrase3] = useState("");

  async function handleCreateCard() {
    if (!word || !translation) {
      Alert.alert(
        "Erro",
        "Palavra e tradução são obrigatórias."
      );
      return;
    }

    try {
      await api.post("/flashcards", {
        word,
        translation,
        present,
        past,
        future,
        examplePhrase1,
        examplePhrase2,
        examplePhrase3,
        difficulty: "MEDIUM",
        favorite: false,
        deckId,
      });

      Alert.alert("Sucesso", "Card criado com sucesso!");

      navigation.goBack();
    } catch (error) {
      console.log(error?.response?.data);

      Alert.alert(
        "Erro",
        "Não foi possível criar o card."
      );
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Novo Card
      </Text>

      <TextInput
        placeholder="Palavra"
        placeholderTextColor="#94a3b8"
        value={word}
        onChangeText={setWord}
        style={styles.input}
      />

      <TextInput
        placeholder="Tradução"
        placeholderTextColor="#94a3b8"
        value={translation}
        onChangeText={setTranslation}
        style={styles.input}
      />

      <TextInput
        placeholder="Presente"
        placeholderTextColor="#94a3b8"
        value={present}
        onChangeText={setPresent}
        style={styles.input}
      />

      <TextInput
        placeholder="Passado"
        placeholderTextColor="#94a3b8"
        value={past}
        onChangeText={setPast}
        style={styles.input}
      />

      <TextInput
        placeholder="Futuro"
        placeholderTextColor="#94a3b8"
        value={future}
        onChangeText={setFuture}
        style={styles.input}
      />

      <TextInput
        placeholder="Exemplo 1"
        placeholderTextColor="#94a3b8"
        value={examplePhrase1}
        onChangeText={setExamplePhrase1}
        style={styles.input}
      />

      <TextInput
        placeholder="Exemplo 2"
        placeholderTextColor="#94a3b8"
        value={examplePhrase2}
        onChangeText={setExamplePhrase2}
        style={styles.input}
      />

      <TextInput
        placeholder="Exemplo 3"
        placeholderTextColor="#94a3b8"
        value={examplePhrase3}
        onChangeText={setExamplePhrase3}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleCreateCard}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>
          Salvar Card
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}