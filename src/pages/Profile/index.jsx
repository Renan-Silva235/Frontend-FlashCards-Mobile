import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  CircleUserRound,
  UserPen,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import api from "../../config/api";
import { signOut, loadProfileRequest } from "../../store/modules/auth/actions";
import { VerifyCodeModal } from "../../components/Modal/VerifyCodeModal";
import styles from "./styles";
import { ChangePasswordModal } from "../../components/Modal/ChangePasswordModal";
import showApiError from "../../utils/showApiError";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState("");
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  useEffect(() => {
    dispatch(loadProfileRequest());
  }, []);

  const handleChangePassword = async () => {
    try {
      await api.post("/auth/password/send-code", {
        email: user.email,
      });

      setVerifyModalVisible(true);
    } catch (error) {
      showApiError(error, "erro ao enviar código");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <CircleUserRound size={110} color="#3b82f6" strokeWidth={1.5} />

      <Text style={styles.title}>{profile?.name || user?.name}</Text>

      <Text style={styles.email}>{profile?.email || user?.email}</Text>

      <Text style={styles.sectionTitle}>Sua conta</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Decks</Text>
          <Text style={styles.infoValue}>{profile?.totalDecks ?? 0}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Flashcards</Text>
          <Text style={styles.infoValue}>{profile?.totalFlashcards ?? 0}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Favoritos</Text>
          <Text style={styles.infoValue}>{profile?.favoriteDecks ?? 0}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Configurações</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleChangePassword}
        >
          <View style={styles.menuLeft}>
            <Lock size={22} color="#3b82f6" />
            <Text style={styles.menuText}>Alterar senha</Text>
          </View>

          <ChevronRight size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => dispatch(signOut())}
        >
          <View style={styles.menuLeft}>
            <LogOut size={22} color="#ef4444" />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </View>

          <ChevronRight size={20} color="#94a3b8" />
        </TouchableOpacity>
        <VerifyCodeModal
          visible={verifyModalVisible}
          email={user.email}
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
          email={user.email}
          code={verifiedCode}
          onClose={() => {
            setChangePasswordVisible(false);
            setVerifiedCode("");
          }}
        />
      </View>
    </ScrollView>
  );
}
