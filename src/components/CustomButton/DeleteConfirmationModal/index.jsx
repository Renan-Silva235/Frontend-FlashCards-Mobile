import { View, Text } from "react-native";
import Modal from "react-native-modal";

import CloseButton from "../CloseButton";
import DeleteConfirmButton from "../DeleteConfirmButton";

import styles from "./styles";

export default function DeleteConfirmationModal({
  visible,
  message,
  onConfirm,
  onClose,
}) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>

        <DeleteConfirmButton onPress={onConfirm} />

        <CloseButton onPress={onClose} />
      </View>
    </Modal>
  );
}
