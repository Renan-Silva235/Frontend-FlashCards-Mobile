import { TouchableOpacity } from "react-native";
import { Trash } from "lucide-react-native";
import styles from "./styles";

export default function DeleteButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Trash size={20} color="#ef4444" />
    </TouchableOpacity>
  );
}
