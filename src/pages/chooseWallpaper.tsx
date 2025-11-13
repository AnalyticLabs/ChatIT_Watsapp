import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LongPurpleButton } from '../components/commonButtons';
import { isDark } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { ChooseWallperData } from '../utils/data/wallpaperData';
import { screenName } from '../utils/screenName';
import { SearchHeader } from './media/mediaCommonHeader';

export type ChooseWallperProps = {

}

const ChooseWallper = (props: ChooseWallperProps) => {
    const navigation = useNavigation()

    const renderImages = (images: any) => {
        return images.map((item: any) => (
            <TouchableOpacity key={item.id} onPress={handleImagePress} style={styles.touchable}>
                <Image source={item.img} style={styles.image} />
            </TouchableOpacity>
        ));
    };

    const handleImagePress = () => {
        navigation.navigate(screenName.Chats as never)
    };

    return (
        <View style={{ flex: 1, backgroundColor: isDark() ? colors.darkModeVar1 : colors.whiteVar0 }}>
            <ScrollView style={{ flex: 1 }}>
                {/* <SearchHeader headerText='Choose Wallpaper' /> */}
                <View style={styles.container}>
                    <View style={styles.gridContainer}>
                        {renderImages(ChooseWallperData)}
                    </View>
                </View>
                <View style={{ marginTop: '35%', bottom: '4%', marginHorizontal: 25 }}>
                    <LongPurpleButton title='Done' />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 24
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
    },
    touchable: {
        width: (Dimensions.get('window').width - 80) / 3,
        margin: 5,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 12,
        width: '100%',
        minHeight: 138
    },
});
export default ChooseWallper