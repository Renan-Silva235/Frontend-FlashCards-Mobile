import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

export default function LanguageSelectionModal({
  visible,
  title,
  options,
  onSelect,
  onCancel,
  styles: externalStyles,
}) {
  const { height } = useWindowDimensions();
  const overlayStyle = externalStyles?.modalOverlay;
  const contentStyle = externalStyles?.modalContent ?? externalStyles?.languageModal;
  const titleStyle = externalStyles?.modalTitle ?? externalStyles?.languageModalTitle;
  const itemStyle = externalStyles?.modalItem ?? externalStyles?.languageOption;
  const itemTextStyle = externalStyles?.modalItemText ?? externalStyles?.languageOptionText;

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={itemStyle}
      activeOpacity={0.7}
      onPress={() => onSelect(item.value)}
    >
      <Text style={itemTextStyle}>{item.label}</Text>
    </TouchableOpacity>
  );

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
            renderItem={renderOption}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity
            style={localStyles.cancelButton}
            activeOpacity={0.7}
            onPress={onCancel}
          >
            <Text style={localStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "#ef4444",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
