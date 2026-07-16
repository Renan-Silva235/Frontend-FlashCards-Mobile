import ActionButton from "../ActionButton";
import styles from "./styles";

export default function DeleteConfirmButton({ onPress }) {
  return (
    <ActionButton
      buttonStyle={styles.button}
      label="Deletar"
      onPress={onPress}
      textStyle={styles.text}
    />
  );
}
