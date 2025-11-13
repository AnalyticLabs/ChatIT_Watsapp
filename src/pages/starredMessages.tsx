import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { flex1, flexRow, mt15, mt3, pl10, pl13, pl7, pt10, spaceBetween } from '../components/commonStyles';
import { commonText } from '../components/commonText';
import { commonView, } from '../components/commonView';
import { Card1, Card2, Card3, Card4 } from '../components/starredMessages/starredMessages';
import { isDark, useTheme } from '../theme/themeContext';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { labels } from '../utils/labels';
import { Chatimg1Img } from '../utils/png';
import { StarredAndVerifycodeHeader, TextInputHeader } from './media/mediaCommonHeader';
import { AlexProfileIcon } from '../utils/svg';

interface HeaderProps {
    height?: number;
}
interface CardProps {
    backgroundColor?: string
}

export const StarredMsg = [
    {
        id: 1,
        renderItem: <Card1 />
    },
    {
        id: 2,
        renderItem: <Card2 />
    },
    {
        id: 3,
        renderItem: <Card3 />
    },
    {
        id: 4,
        renderItem: <Card4 />
    }
]

const StarredMessages = () => {
    const [isTextInputHeader, setIsTextInputHeader] = useState(false);
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const handleonPress = () => {
        setIsTextInputHeader(true);
    }

    const handleBackToInitialHeader = () => {
        setIsTextInputHeader(false);
    }
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {isTextInputHeader ? <TextInputHeader onBack={handleBackToInitialHeader} /> :
                <StarredAndVerifycodeHeader headerText='Starred Messages' isSearchDot={true} onPress={handleonPress} openModal={true} />
            }
            <ScrollView style={{ marginBottom: 20 }}>
                {StarredMsg.map((item, index) => (
                    <View key={index} style={{ marginHorizontal: 20 }}>
                        <View >
                            <View style={[flexRow, spaceBetween, { marginTop: 25 }]}>
                                <View style={[flexRow]}>
                                    <Image source={Chatimg1Img} style={{ borderRadius: 25 }} />
                                    <Text style={[pl13, commonText.h14BlackVar2Bold400Text,{ lineHeight: 20 }]}>{labels.MarkVilliams}</Text>
                                    <Text style={[pl10, mt3,commonText.h12fontBold400GreyVar4]}>8:16 PM</Text>
                                </View>
                                <View style={flexRow}>
                                    <Text style={[commonText.h12fontBold400GreyVar4]}>24 Aug 2023</Text>
                                    <View style={[pl7, { bottom: 2 }]}>
                                        <CustomIcon name='chevron-right' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={20} type="Feather"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 52 }}>
                                {item.renderItem}
                                <View style={[flexRow, pt10]}>
                                    <AlexProfileIcon />
                                    <Text style={[pl13, mt3,commonText.h14BlackVar2Bold400Text]}>Alex Smith</Text>
                                    <View style={[{ alignItems: 'center', justifyContent: 'center' }, pl10]}>
                                        <CustomIcon name='star' color={colors.yellow} size={18} type="font-awesome" />
                                    </View>
                                </View>
                            </View>
                            {index !== StarredMsg.length - 1 &&
                                <View style={[mt15]}>
                                    <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.fullCommonLineDividerGrey]} />
                                </View>
                            }
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default StarredMessages