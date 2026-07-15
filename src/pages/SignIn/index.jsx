import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { signInRequest } from "../../store/modules/auth/actions";
import styles from "./styles";
import { ForgotPasswordModal } from "../../components/Modal/ForgotPasswordModal";
import { VerifyCodeModal } from "../../components/Modal/VerifyCodeModal";
import { ChangePasswordModal } from "../../components/Modal/ChangePasswordModal";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.auth.loading);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");

  function handleSubmit() {
    if (email && password) {
      dispatch(signInRequest(email, password));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flash Cards</Text>
        <Text style={styles.subtitle}>
          Aprenda idiomas de forma inteligente
        </Text>
      </View>

      <View style={styles.form}>
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
          placeholder="••••••••"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setForgotPasswordVisible(true)}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem conta?</Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <ForgotPasswordModal
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
        onSuccess={(email) => {
          setForgotPasswordVisible(false);
          setRecoveryEmail(email);
          setVerifyModalVisible(true);
        }}
      />

      <VerifyCodeModal
        visible={verifyModalVisible}
        email={recoveryEmail}
        endpoint="/auth/password/verify-code"
        onClose={() => setVerifyModalVisible(false)}
        onSuccess={(code) => {
          setVerifyModalVisible(false);
          setVerifiedCode(code);
          setChangePasswordVisible(true);
        }}
      />
      <ChangePasswordModal
        visible={changePasswordVisible}
        email={recoveryEmail}
        code={verifiedCode}
        onClose={() => {
          setChangePasswordVisible(false);
          setVerifiedCode("");
          setRecoveryEmail("");
        }}
      />
    </View>
  );
}
