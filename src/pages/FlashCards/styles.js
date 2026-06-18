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

  speakerIconMain: {
    fontSize: 24,
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

  editButton: {
    backgroundColor: "#f59e0b",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  loading: {
    marginTop: 40,
  },
});

export default styles;