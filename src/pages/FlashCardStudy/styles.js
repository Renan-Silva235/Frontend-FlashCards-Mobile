import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  counterText: { color: '#94a3b8', fontSize: 14 },
  cardContainer: { height: 280, marginBottom: 20 },
  card: { position: 'absolute', width: '100%', height: '100%', borderRadius: 12, padding: 24, justifyContent: 'center', alignItems: 'center', backfaceVisibility: 'hidden' },
  cardFront: { backgroundColor: '#2563eb' },
  cardBack: { backgroundColor: '#7e22ce' },
  cardTitle: { color: '#e2e8f0', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  mainWord: { color: '#fff', fontSize: 36, fontWeight: 'bold', textAlign: 'center' },
  audioRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  audioButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, gap: 8 },
  audioText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  hintText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, position: 'absolute', bottom: 16 },
  tensesContainer: { marginTop: 16, alignItems: 'center', gap: 4 },
  tenseText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  examplesBox: { backgroundColor: '#1e293b', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#334155', marginBottom: 24 },
  examplesTitle: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  exampleText: { color: '#e2e8f0', fontSize: 14, lineHeight: 20, marginBottom: 4 },
  actionButtons: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 8, gap: 6 },
  btnIncorrect: { backgroundColor: '#dc2626' },
  btnMedium: { backgroundColor: '#d97706' },
  btnCorrect: { backgroundColor: '#16a34a' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  emptyText: { color: '#94a3b8', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  backButton: { backgroundColor: '#3b82f6', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' }
});

export default styles;