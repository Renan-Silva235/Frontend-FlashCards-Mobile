import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { createDeckRequest } from "../../store/modules/deck/actions";
import { languageOptions } from "../../utils/languages";
import styles from "./styles";
import LanguageSelectionModal from "../../components/Modal/LanguageSelectionModal";

export default function DeckList() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deck.loading);

  function handleCreateDeck() {
    if (!name.trim() || !category.trim() || !language) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e selecione um idioma.",
      );
      return;
    }

    dispatch(createDeckRequest(name, category, language));

    setName("");
    setCategory("");
    setLanguage("");
  }

  function handleSelectLanguage(value) {
    setLanguage(value);
    setModalVisible(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Novo Baralho</Text>
          <Text style={styles.subtitle}>Crie a estrutura do seu deck aqui</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome do Baralho</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Vocabulário de Viagem"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Verbos, Expressões"
            placeholderTextColor="#64748b"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Idioma do Baralho</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.selectButtonText,
                !language && { color: "#64748b" },
              ]}
            >
              {language
                ? languageOptions.find((lang) => lang.value === language)?.label
                : "Selecione um idioma..."}
            </Text>
            <Text style={styles.arrowIcon}>▼</Text>
          </TouchableOpacity>

          <LanguageSelectionModal
            visible={modalVisible}
            title="Escolha o Idioma"
            options={languageOptions}
            onCancel={() => setModalVisible(false)}
            onSelect={handleSelectLanguage}
            styles={styles}
          />

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleCreateDeck}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Baralho</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
