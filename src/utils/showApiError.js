import { Alert } from "react-native";

export default function showApiError(error, title = "Erro") {
  const data = error?.response?.data;

  if (Array.isArray(data) && data.length > 0) {
    Alert.alert(title, data[0].message);
    return;
  }

  if (data?.message) {
    Alert.alert(title, data.message);
    return;
  }

  if (typeof data === "string") {
    Alert.alert(title, data);
    return;
  }

  if (!error.response) {
    Alert.alert(title, "Não foi possível conectar ao servidor.");
    return;
  }

  Alert.alert(title, "Ocorreu um erro inesperado.");
}
