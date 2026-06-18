import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
  createButton: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  searchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 44,
    paddingRight: 16,
    color: "#fff",
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: "#334155",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: "#2563eb",
  },
  tabText: {
    color: "#94a3b8",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
  },
  deckCard: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  deckHeader: {
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "start",
    marginBottom: 16,
  },
  deckName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  deckCategory: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  deckFooter: {
    flexDirection: "row",
    justifyContent: "between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#0f172a",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: "#e2e8f0",
    fontSize: 12,
  },
  cardCount: {
    color: "#94a3b8",
    fontSize: 13,
  },
  emptyText: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 40,
  },
});

export default styles;