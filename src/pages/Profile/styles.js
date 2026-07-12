import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
    },

    content: {
        alignItems: "center",
        paddingTop: 80,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    title: {
        marginTop: 20,
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },

    email: {
        marginTop: 6,
        color: "#94a3b8",
        fontSize: 16,
    },

    sectionTitle: {
        width: "100%",
        color: "#94a3b8",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 40,
        marginBottom: 14,
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    infoContainer: {
        width: "100%",
        backgroundColor: "#1e293b",
        borderRadius: 12,
        overflow: "hidden",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 20,
    },

    infoLabel: {
        color: "#ffffff",
        fontSize: 16,
    },

    infoValue: {
        color: "#3b82f6",
        fontSize: 18,
        fontWeight: "bold",
    },

    divider: {
        height: 1,
        backgroundColor: "#334155",
        marginHorizontal: 20,
    },

    menuContainer: {
        width: "100%",
        marginTop: 12,
        backgroundColor: "#1e293b",
        borderRadius: 12,
        overflow: "hidden",
    },

    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
    },

    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuText: {
        color: "#ffffff",
        fontSize: 16,
        marginLeft: 14,
    },

    logoutText: {
        color: "#ef4444",
        fontSize: 16,
        marginLeft: 14,
        fontWeight: "600",
    },
});
