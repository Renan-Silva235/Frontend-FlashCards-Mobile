import ActionButton from "../ActionButton";
import styles from "./styles";

export default function CloseButton({ onPress }) {
  return (
    <ActionButton
      buttonStyle={styles.button}
      label="Fechar"
      onPress={onPress}
      textStyle={styles.text}
    />
  );
}
