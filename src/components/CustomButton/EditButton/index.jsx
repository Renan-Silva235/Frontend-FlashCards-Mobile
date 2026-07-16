import ActionButton from "../ActionButton";
import styles from "./styles";

export default function EditButton({ onPress }) {
  return (
    <ActionButton
      buttonStyle={styles.button}
      label="Editar"
      onPress={onPress}
      textStyle={styles.text}
    />
  );
}
