import React from 'react';
import { Text, View } from 'react-native';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { flexRow, justyfyCenter, m5, mt3, p5, pl10, pl13, spaceBetween } from '../commonStyles';
import { commonText, } from '../commonText';
import { commonView,  } from '../commonView';
import { AudioImgIcon, SendImg2Icon } from '../../utils/svg';

interface CardProps {
    backgroundColor?: string
}

export const Card1 = (props: CardProps) => {
    return (
        <View style={{ alignItems: 'flex-start' }}>
           <View
                style={[
                    commonView.messageCardBase,
                    { backgroundColor: isDark() ? colors.darkModeVar4 : colors.whiteVar1 },
                ]}
                {...props}
            >
                <Text style={[{ lineHeight: 20, letterSpacing: 0.3 }, commonText.h14font400grey3black2]}>Hello @Alex Thank you for the </Text>
                <Text style={[{ lineHeight: 20, letterSpacing: 0.3 }, commonText.h14font400grey3black2]}>beautiful web deisgn ahead schedule</Text>
            </View>
        </View>
    )
}

export const Card2 = (props: CardProps) => {
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <View style={[commonView.messageCardBase, flexRow]} backgroundColor={isDark() ? colors.darkModeVar4 : colors.whiteVar1} {...props} >
                <CustomIcon name="play-circle-o" size={20} color={colors.primaryVar3} type="font-awesome" />
                <View style={pl10}>
                    <AudioImgIcon />
                </View>
                <Text style={[mt3, pl10, commonText.h12DefaultGreyVar3]}>00:30</Text>
            </View>
        </View>
    )
}

export const Card3 = (props: CardProps) => {
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <View
                style={[
                    commonView.messageCardBase,
                    { backgroundColor: isDark() ? colors.darkModeVar4 : colors.whiteVar1 },
                ]}
                {...props}
            >
            <View style={[{ backgroundColor: isDark() ? colors.darkModeVar6 : colors.greyVar7, alignItems: 'center', padding: 10, width: DevWidth / 1.6, borderRadius: 8, margin: 5 }, flexRow, spaceBetween]}>
                <View style={[flexRow]}>
                    <View style={justyfyCenter}>
                        <CustomIcon name='document-text-outline' type="Ionicons" color={isDark() ? colors.greyVar3 : colors.greyVar4} size={20} />
                    </View>
                    <View style={pl13}>
                        <Text style={[commonText.h14blackVar1bold400Text]}>Design_Brief.pdf</Text>
                        <Text style={[commonText.h12GreyVar8]}>243 KB</Text>
                    </View>
                </View>
                <CustomIcon name='download' type="Feather" color={isDark() ? colors.greyVar3 : colors.greyVar4} size={20} />
            </View>
            <View style={[{ margin: 5 }]}>
                <Text style={[commonText.h14font400grey3black2]}>{labels.checkThisFile}</Text>
            </View>
        </View>
        </View >
    )
}

export const Card4 = (props: CardProps) => {
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <View
                style={[
                    commonView.messageCardBase,
                    { backgroundColor: isDark() ? colors.darkModeVar4 : colors.whiteVar1 },
                ]}
                {...props}
            >
            <View style={m5}>
                <SendImg2Icon />
                <Text style={[p5, commonText.h14blueVar1Text]}>{labels.chatLink}</Text>
            </View>
        </View>
        </View >
    )
}
