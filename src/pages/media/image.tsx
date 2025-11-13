
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { H15Blackvar2Bold500 } from "../../components/commonText";
import { recentImages } from "../../utils/data/mediaData";
import { screenName } from "../../utils/screenName";


const ImageScreen = () => {

    const navigation = useNavigation()


    const renderImages = (images: any) => {
        return images.map((item: any) => (
            <TouchableOpacity key={item.id} onPress={handleImagePress} style={styles.touchable}>
                <Image source={item.img} style={styles.image} />
            </TouchableOpacity>
        ));
    };

    const handleImagePress = () => {
        navigation.navigate(screenName.ImageView as never)
    };

    return (
        <View style={styles.container}>
             <Text style={[{ lineHeight: 20, marginTop: 20, margin: 5 },commonText.h15Blackvar2Bold500]}>Recent</Text>
            <View style={styles.gridContainer}>
                {renderImages(recentImages)}
            </View>
             <Text style={[{ lineHeight: 20, marginTop: 20, margin: 5 },commonText.h15Blackvar2Bold500]}>Last week</Text>
            <View style={styles.gridContainer}>
                {renderImages(recentImages)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 24
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    touchable: {
        aspectRatio: 1,
        width: (Dimensions.get('window').width - 72) / 3,
        margin: 4,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
});

export default ImageScreen;