import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  container: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 24,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
    lineHeight: 22,
  },

  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  cancel: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
  },
});
