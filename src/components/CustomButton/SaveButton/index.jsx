import ActionButton from "../ActionButton";
import styles from "./styles";

export default function SaveButton({ onPress, title = "Salvar" }) {
  return (
    <ActionButton
      buttonStyle={styles.button}
      label={title}
      onPress={onPress}
      textStyle={styles.text}
    />
  );
}
