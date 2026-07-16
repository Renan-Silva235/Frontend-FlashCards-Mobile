import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";

export default function LanguageSelectionModal({
  visible,
  title,
  options,
  onSelect,
  onCancel,
  styles,
}) {
  const { height } = useWindowDimensions();
  const overlayStyle = styles.modalOverlay;
  const contentStyle = styles.modalContent ?? styles.languageModal;
  const titleStyle = styles.modalTitle ?? styles.languageModalTitle;
  const itemStyle = styles.modalItem ?? styles.languageOption;
  const itemTextStyle = styles.modalItemText ?? styles.languageOptionText;
  const cancelButtonStyle = styles.cancelButton ?? styles.languageModalCancel;
  const cancelButtonTextStyle =
    styles.cancelButtonText ?? styles.languageModalCancelText;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={overlayStyle}
        activeOpacity={1}
        onPress={onCancel}
      >
        <View style={[contentStyle, { maxHeight: Math.max(height * 0.7, 300) }]}>
          <Text style={titleStyle}>{title}</Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={itemStyle}
                onPress={() => onSelect(item.value)}
              >
                <Text style={itemTextStyle}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={cancelButtonStyle} onPress={onCancel}>
            <Text style={cancelButtonTextStyle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
