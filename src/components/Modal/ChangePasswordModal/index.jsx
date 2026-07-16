import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import api from "../../../config/api";
import styles from "./styles";
import { Lock } from "lucide-react-native";
import showApiError from "../../../utils/showApiError";

export function ChangePasswordModal({ visible, email, code, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword() {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/password/change", {
        email,
        code,
        newPassword,
      });

      Alert.alert("Sucesso", "Sua senha foi alterada com sucesso.");

      setNewPassword("");
      setConfirmPassword("");

      onClose();
    } catch (error) {
      showApiError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.overlay}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Lock size={42} color="#3b82f6" />
            </View>

            <Text style={styles.title}>Alterar senha</Text>

            <Text style={styles.description}>
              Digite sua nova senha para concluir a alteração.
            </Text>
            <Text style={styles.title}>Nova senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              placeholderTextColor="#64748b"
              secureTextEntry
              maxLength={50}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#64748b"
              secureTextEntry
              maxLength={50}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>
                {loading ? "Alterando..." : "Alterar senha"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

