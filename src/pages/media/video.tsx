import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonText } from "../../components/commonText";
import CustomIcon from "../../utils/Icons";
import { colors } from "../../utils/colors";
import { lastMonth, lastWeek, recentVideos } from "../../utils/data/mediaData";
import { screenName } from "../../utils/screenName";

const ImageScreen = () => {

    const navigation = useNavigation()

    const renderImages = (images: any) => {
        return images.map((item: any) => (
            <TouchableOpacity key={item.id} onPress={handleVideoPress} style={styles.touchable}>
                <ImageBackground key={item.id} source={item.img} style={styles.image}>
                    <View></View>
                    <CustomIcon name="play-circle-o" size={32} color={colors.white} type="font-awesome" />
                </ImageBackground>
            </TouchableOpacity>
        ));
    };
    const handleVideoPress = () => {
        navigation.navigate(screenName.VideoView as never)
    };
    return (
        <View style={styles.container}>
            
            <Text style={[{ lineHeight: 20, marginTop: 20, margin: 5 },commonText.h15Blackvar2Bold500]}>Recent</Text>
            <View style={styles.gridContainer}>
                {renderImages(recentVideos)}
            </View>
             <Text style={[{ lineHeight: 20, marginTop: 20, margin: 5 },commonText.h15Blackvar2Bold500]}>Last Week</Text>
            <View style={styles.gridContainer}>
                {renderImages(lastWeek)}
            </View>
             <Text style={[{ lineHeight: 20, marginTop: 20, margin: 5 },commonText.h15Blackvar2Bold500]}>Last Month</Text>
            <View style={styles.gridContainer}>
                {renderImages(lastMonth)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    image: {
        margin: 3,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    touchable: {
        aspectRatio: 1,
        width: (Dimensions.get('window').width - 56) / 3,
        margin: 3,
    },
});

export default ImageScreen;