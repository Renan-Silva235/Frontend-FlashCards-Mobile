import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "../../../config/api";
import styles from "./styles";
import showApiError from "../../../utils/showApiError";

export function VerifyCodeModal({
  visible,
  email,
  endpoint,
  onClose,
  onSuccess,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!code.trim()) {
      Alert.alert("Erro", "Digite o código recebido.");
      return;
    }

    try {
      setLoading(true);

      await api.post(endpoint, {
        email,
        code,
      });

      onSuccess(code);
      setCode("");
    } catch (error) {
      showApiError(error, "Código inválido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Verificar código</Text>

          <Text style={styles.description}>
            Digite o código enviado para seu e-mail.
          </Text>

          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Código"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verificando..." : "Verificar"}
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
