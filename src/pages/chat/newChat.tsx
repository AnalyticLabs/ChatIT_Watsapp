import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt15, mt3, mt5, mv10, p10, pb5 } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { commonView, } from '../../components/commonView';
import { isDark, useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { newChatData } from '../../utils/data/chatsData';
import { SearchHeader } from '../media/mediaCommonHeader';

export type NewChatProps = {

}

const NewChat = (props: NewChatProps) => {
    const navigation = useNavigation();

    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText='New Chat' searchIcon={true} /> */}
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[flex1, mh20, mt15]}>
                    {
                        newChatData.map((item) => {
                            return (
                                <View key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
                                    <View style={[flexRow]}>
                                        <View style={[alignItemsCenter, justyfyCenter]}>
                                            <Image source={item.img} style={styles.profileImg} />
                                            <View style={[{ backgroundColor: item.status === 'active' ? (isDarkTheme ? colors.greenVar2 : colors.green) : '', borderColor: isDarkTheme ? colors.darkModeVar4 : colors.white }, item.status === 'active' ? styles.status : null]} />
                                        </View>
                                        <View style={[flex1]}>
                                            <View style={[commonView.rowSpaceBetween, pb5]}>
                                                <View style={[]} >
                                                    <Text style={[mt3, commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                    <Text style={[mt5, commonText.h14GreyVar4Bold400]}>{item.note}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    status: {
        borderWidth: 3,
        position: 'absolute',
        bottom: 0,
        right: 10,
        height: 15,
        width: 15,
        borderRadius: 10,
    },
    whiteCard: {
        backgroundColor: colors.white,
        height: 70,
        borderRadius: 5,
    },
    multiSelectBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NewChat