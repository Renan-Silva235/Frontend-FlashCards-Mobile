import React, { useState } from "react";
import { Text, ScrollView, Alert } from "react-native";
import api from "../../config/api";
import styles from "./styles";
import CustomInput from "../../components/CustomInput";
import SaveButton from "../../components/CustomButton/SaveButton";
import showApiError from "../../utils/showApiError";

export default function EditCard({ route, navigation }) {
  const { card } = route.params;

  const [word, setWord] = useState(card.word || "");
  const [translation, setTranslation] = useState(card.translation || "");

  const [present, setPresent] = useState(card.present || "");

  const [past, setPast] = useState(card.past || "");

  const [future, setFuture] = useState(card.future || "");

  const [examplePhrase1, setExamplePhrase1] = useState(
    card.examplePhrase1 || "",
  );

  const [examplePhrase2, setExamplePhrase2] = useState(
    card.examplePhrase2 || "",
  );

  const [examplePhrase3, setExamplePhrase3] = useState(
    card.examplePhrase3 || "",
  );

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

      Alert.alert("Sucesso", "Card atualizado com sucesso!");

      navigation.goBack();
    } catch (error) {
      showApiError(error, "Não foi possível atualizar o card.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Editar Card</Text>

      <CustomInput value={word} onChangeText={setWord} placeholder="Palavra" />

      <CustomInput
        value={translation}
        onChangeText={setTranslation}
        placeholder="Tradução"
      />

      <CustomInput
        value={present}
        onChangeText={setPresent}
        placeholder="Presente"
      />

      <CustomInput value={past} onChangeText={setPast} placeholder="Passado" />

      <CustomInput
        value={future}
        onChangeText={setFuture}
        placeholder="Futuro"
      />

      <CustomInput
        value={examplePhrase1}
        onChangeText={setExamplePhrase1}
        placeholder="Exemplo 1"
      />

      <CustomInput
        value={examplePhrase2}
        onChangeText={setExamplePhrase2}
        placeholder="Exemplo 2"
      />

      <CustomInput
        value={examplePhrase3}
        onChangeText={setExamplePhrase3}
        placeholder="Exemplo 3"
      />

      <SaveButton title="Salvar Alterações" onPress={handleUpdate} />
    </ScrollView>
  );
}
