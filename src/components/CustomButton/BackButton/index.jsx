import { useNavigation } from "@react-navigation/native";
import ActionButton from "../ActionButton";
import styles from "../CloseButton/styles";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <ActionButton
      buttonStyle={styles.button}
      label="Voltar"
      onPress={() => navigation.goBack()}
      textStyle={styles.text}
    />
  );
}
