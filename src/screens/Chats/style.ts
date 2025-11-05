import { StyleSheet } from "react-native";
import { fontValue } from "../../utils/responsiveFonts";
import { COLORS } from "../../utils/constants";

export const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.4,
    borderColor: "#ddd",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: fontValue(50),
    width: fontValue(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: fontValue(20)
  },
  logoText: {
    fontSize: fontValue(16),
    fontWeight: "600",
    color: COLORS.primary,
  },
  chatName: {
    fontSize: fontValue(16),
    fontWeight: "600",
    color: "#000",
  },
  chatTime: {
    fontSize: fontValue(12),
    color: "#777",
  },
  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  lastMessage: {
    fontSize: fontValue(14),
    color: "#666",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#25D366",
    borderRadius: 12,
    minWidth: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  archiveContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  archiveText: {
    fontSize: 15,
    fontWeight: "600",
  },
  unreadBadgeArchive: {
    marginLeft: 10,
    backgroundColor: "#25D366",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginVertical: 12,
    marginHorizontal: 15,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },



  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: fontValue(100),
    paddingHorizontal: fontValue(10)
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  fabText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },

});
