import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatusListScreen from "../Status/StatusListScreen";
import AddStatusScreen from "../Status/AddStatusScreen";

const StatusStack = createNativeStackNavigator();

export default function StatusStackNavigator() {
  return (
    <StatusStack.Navigator>
      <StatusStack.Screen
        name="StatusList"
        component={StatusListScreen}
        options={{ title: "Status" }}
      />
      <StatusStack.Screen
        name="AddStatus"
        component={AddStatusScreen}
        options={{ title: "Add Status" }}
      />
    </StatusStack.Navigator>
  );
}
