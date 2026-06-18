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

export default function EditCard({
  route,
  navigation,
}) {
  const { card } = route.params;

  const [word, setWord] = useState(card.word || "");
  const [translation, setTranslation] = useState(
    card.translation || ""
  );

  const [present, setPresent] = useState(
    card.present || ""
  );

  const [past, setPast] = useState(card.past || "");

  const [future, setFuture] = useState(
    card.future || ""
  );

  const [examplePhrase1, setExamplePhrase1] =
    useState(card.examplePhrase1 || "");

  const [examplePhrase2, setExamplePhrase2] =
    useState(card.examplePhrase2 || "");

  const [examplePhrase3, setExamplePhrase3] =
    useState(card.examplePhrase3 || "");

  async function handleUpdate() {
    try {
      await api.put(`/flashcards/${card.id}`, {
        word,
        translation,
        present,
        past,
        future,
        examplePhrase1,
        examplePhrase2,
        examplePhrase3,
        difficulty: card.difficulty,
        favorite: card.favorite,
        deckId: card.deckId,
      });

      Alert.alert(
        "Sucesso",
        "Card atualizado com sucesso!"
      );

      navigation.goBack();
    } catch (error) {
      console.log(error?.response?.data);

      Alert.alert(
        "Erro",
        "Não foi possível atualizar o card."
      );
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Editar Card
      </Text>

      <TextInput
        style={styles.input}
        value={word}
        onChangeText={setWord}
        placeholder="Palavra"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={translation}
        onChangeText={setTranslation}
        placeholder="Tradução"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={present}
        onChangeText={setPresent}
        placeholder="Presente"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={past}
        onChangeText={setPast}
        placeholder="Passado"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={future}
        onChangeText={setFuture}
        placeholder="Futuro"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={examplePhrase1}
        onChangeText={setExamplePhrase1}
        placeholder="Exemplo 1"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={examplePhrase2}
        onChangeText={setExamplePhrase2}
        placeholder="Exemplo 2"
        placeholderTextColor="#94a3b8"
      />

      <TextInput
        style={styles.input}
        value={examplePhrase3}
        onChangeText={setExamplePhrase3}
        placeholder="Exemplo 3"
        placeholderTextColor="#94a3b8"
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}