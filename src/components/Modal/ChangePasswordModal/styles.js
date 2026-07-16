import { StyleSheet } from "react-native";

import { authModalBaseStyles } from "../sharedStyles";

export default StyleSheet.create({
  ...authModalBaseStyles,
  overlay: {
    ...authModalBaseStyles.overlay,
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 24,
  },
  container: {
    ...authModalBaseStyles.container,
    borderRadius: 20,
    padding: 28,
  },
  title: {
    ...authModalBaseStyles.title,
    fontSize: 24,
  },
  description: {
    ...authModalBaseStyles.description,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 28,
  },
  input: {
    ...authModalBaseStyles.input,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    ...authModalBaseStyles.button,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    ...authModalBaseStyles.buttonText,
    fontSize: 17,
  },
  cancel: {
    ...authModalBaseStyles.cancel,
    fontSize: 16,
    marginTop: 22,
  },
});
