import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";
import styles from "./styles";
import showApiError from "../../utils/showApiError";
import { VerifyCodeModal } from "../../components/Modal/VerifyCodeModal";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const navigation = useNavigation();

  async function handleSignUp() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(false);
      await api.post("/auth/register/send-code", {
        email,
      });

      setPendingUser({
        name,
        email,
        password,
      });

      setVerifyModalVisible(true);

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (error) {
      showApiError(error, "Erro no cadastro");
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Comece seu aprendizado agora</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#64748b"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="A senha deve conter no mínimo 6 caracteres"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          maxLength={50}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme a sua senha."
          placeholderTextColor="#64748b"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          maxLength={50}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.linkText}>Voltar ao login</Text>
      </TouchableOpacity>
      <VerifyCodeModal
        visible={verifyModalVisible}
        email={pendingUser?.email}
        endpoint="/auth/register/verify-code"
        onClose={() => setVerifyModalVisible(false)}
        onSuccess={async (code) => {
          try {
            await api.post("/auth/register", {
              ...pendingUser,
              code,
            });

            Alert.alert("Sucesso", "Conta criada com sucesso!");

            setVerifyModalVisible(false);
            navigation.goBack();
          } catch (error) {
            showApiError(error, "Erro no cadastro");
          }
        }}
      />
    </ScrollView>
  );
}
