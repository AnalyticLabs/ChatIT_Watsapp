import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 8,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
  },
  footerText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
  footerLink: {
    fontWeight: "600",
  },
});
