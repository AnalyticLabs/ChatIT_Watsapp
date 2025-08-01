// components/IncomingCallModal.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  callerName: string;
  callType?: string;
}

export default function IncomingCallModal({
  visible,
  onAccept,
  onReject,
  callerName,
  callType,
}: Props) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Incoming {callType} Call</Text>
          <Text style={styles.caller}>From: {callerName}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.accept} onPress={onAccept}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reject} onPress={onReject}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modal: {
    backgroundColor: "white",
    margin: 30,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caller: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  accept: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  reject: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
