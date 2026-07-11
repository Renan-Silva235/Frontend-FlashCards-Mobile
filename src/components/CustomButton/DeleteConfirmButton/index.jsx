import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function DeleteConfirmButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Deletar</Text>
    </TouchableOpacity>
  );
}
