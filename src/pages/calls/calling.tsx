import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CallCommonHeader } from '../../components/commonHeaders';
import { alignItemsCenter, alignSelfCenter, borderRadius10, flex1, justyfyCenter, mb15, mh20, mt20, mt30, mt5 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { callBottomData } from '../../utils/data/callsData';
import { labels } from '../../utils/labels';
import { CallAvatarMediumIcon } from '../../utils/svg';

export type CallingProps = {

}

const Calling = (props: CallingProps) => {
    const navigation = useNavigation();
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]}>
            <CallCommonHeader />
            <View style={[flex1, alignItemsCenter, mt30]}>
                <CallAvatarMediumIcon />
                <Text style={[mt20,commonText.h18Blackvar2Bold600]}>{labels.horaceKeene}</Text>
                <Text style={[mt5,commonText.h14GreyVar4Bold400,]}>{labels.ChatItVoiceCall}</Text>
            </View>
            <View style = {[mh20, mb15,commonView.rowSpaceAround]}>
                {
                    callBottomData.map((item) => {
                        return (
                            <View style = {[mb15]} key={item.id}>
                                <TouchableOpacity onPress={() => navigation.navigate(item.screenName as never)} style = {[borderRadius10, alignItemsCenter, justyfyCenter, {height : 40, width : 70, backgroundColor : item.bgColor}]}>
                                    <CustomIcon color={item.iconColor} size={item.iconSize} type={item.iconType} name={item.iconName} />
                                </TouchableOpacity>
                                <Text style = {[alignSelfCenter, mt5,commonText.h14GreyVar4Bold400Text]}>{item.text}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Calling