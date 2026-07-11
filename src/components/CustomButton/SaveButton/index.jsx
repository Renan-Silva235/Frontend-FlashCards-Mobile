import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function SaveButton({ onPress, title = "Salvar" }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
