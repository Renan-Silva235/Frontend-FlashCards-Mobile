import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Mail } from "lucide-react-native";

import api from "../../../config/api";
import showApiError from "../../../utils/showApiError";

import styles from "./styles";

export function ForgotPasswordModal({ visible, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    if (!email.trim()) {
      Alert.alert("Erro", "Digite seu e-mail.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/password/send-code", {
        email,
      });

      onSuccess(email);

      setEmail("");
    } catch (error) {
      showApiError(error, "Erro ao enviar código.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Mail size={42} color="#3b82f6" />
          </View>

          <Text style={styles.title}>Esqueceu a senha?</Text>

          <Text style={styles.description}>
            Informe seu e-mail cadastrado para receber um código de recuperação.
          </Text>

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleSendCode}
          >
            <Text style={styles.buttonText}>
              {loading ? "Enviando..." : "Enviar código"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
