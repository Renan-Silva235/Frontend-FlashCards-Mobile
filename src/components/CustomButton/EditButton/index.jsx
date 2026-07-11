import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function EditButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Editar</Text>
    </TouchableOpacity>
  );
}
