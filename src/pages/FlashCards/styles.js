import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  newCardButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },

  newCardButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 50,
  },

  card: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  cardWord: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardTranslation: {
    color: "#94a3b8",
    marginTop: 4,
  },

  modalContainer: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  modalWord: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  translation: {
    color: "#94a3b8",
    marginBottom: 20,
  },

  rowSpeech: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  rowSpeechTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  phraseText: {
    color: "#cbd5e1",
    flex: 1,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  loading: {
    marginTop: 40,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  navigationText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },

  navigationPlaceholder: {
    width: 100, // Approximate width of the button to keep layout balanced
  },
});

export default styles;
