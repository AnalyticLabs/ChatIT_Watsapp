import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const IncomingCallModal = ({ visible, onAccept, onReject, callType, callerName }: any) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white p-6 rounded-xl items-center">
          <Text className="text-xl font-bold mb-2">Incoming {callType} call</Text>
          <Text className="mb-4">from {callerName}</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded" onPress={onAccept}>
              <Text className="text-white">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 px-4 py-2 rounded" onPress={onReject}>
              <Text className="text-white">Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default IncomingCallModal;
