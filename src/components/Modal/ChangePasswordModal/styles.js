import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  container: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 28,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    color: "#94a3b8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 22,
  },

  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  button: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  cancel: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    marginTop: 22,
  },
});
