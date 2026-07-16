import { Text, TouchableOpacity } from "react-native";

export default function ActionButton({
  onPress,
  label,
  buttonStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
