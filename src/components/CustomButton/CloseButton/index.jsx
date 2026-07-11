import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function CloseButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Fechar</Text>
    </TouchableOpacity>
  );
}
