import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../CloseButton/styles";

export default function CloseButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.text}>Voltar</Text>
    </TouchableOpacity>
  );
}
