import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function DeleteButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>🗑️</Text>
    </TouchableOpacity>
  );
}
