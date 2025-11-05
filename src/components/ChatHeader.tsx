import React from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomIcon from "./Icon";
import BackArrow from '../assets/icons/arrow-left.svg';
import Video from '../assets/icons/video.svg';
import Phone from '../assets/icons/phone.svg';
import Options from '../assets/icons/options.svg';
import Bar from '../assets/icons/bar.svg';
import { COLORS, SCREENS } from "../utils/constants";
import { navigationRef } from "../screens/rootstack";

const ChatHeader = ({ name, imageUrl, time, isGroup = false }: any) => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            marginTop: insets.top,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: 12,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            backgroundColor: "#fff"
        }}>
            <TouchableOpacity onPress={navigation.goBack} style={{ marginRight: 16 }}>
                <BackArrow style={{ color: COLORS.black, }} />
            </TouchableOpacity>
            <Image
                source={
                    // typeof imageUrl === "string"
                    // ? { uri: imageUrl }
                    { uri: 'https://randomuser.me/api/portraits/women/2.jpg' }
                    // : require("../assets/images/Chatit.png")
                }
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
            />
            <TouchableOpacity onPress={() => navigationRef.navigate(SCREENS.ContactInfo)}
                style={{ flex: 1, }} >
                <Text style={{ color: "#222", fontWeight: "600", fontSize: 18, maxWidth: width - 180 }} numberOfLines={1}>{name}</Text>
                <Text style={{ color: "#555", fontSize: 13 }}>{time}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 6 }}>
                <Video style={{ color: COLORS.black }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 6 }}>
                <Phone style={{ color: COLORS.black }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 4 }}>
                <Options style={{ color: COLORS.black }} />
            </TouchableOpacity>
        </View>
    );
};

export { ChatHeader };
