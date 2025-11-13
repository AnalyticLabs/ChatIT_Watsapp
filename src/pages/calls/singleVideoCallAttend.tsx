import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { CallBottomTab } from '../../components/commonComponents';
import { CallCommonHeader } from '../../components/commonHeaders';
import { alignItemsCenter, alignSelfCenter, borderRadius10, borderRadius25, borderRadius6, flex1, justyfyCenter, mb20, mh20, mt10, mt5, mv20 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { VideoCallLowerImg, VideoCallUpperImg } from '../../utils/png';
import { commonView } from '../../components/commonView';


export type SingleVideoCallAttendProps = {

}


const SingleVideoCallAttend = (props: SingleVideoCallAttendProps) => {
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]}>
            <CallCommonHeader />
            <View style={[alignItemsCenter, mt10]}>
               <Text style={[commonText.h18Blackvar2Bold600]}>{labels.horaceKeene}</Text>
                 <View  style={[{ height: 30, width: 100, backgroundColor: isDark() ? colors.darkModeVar4 : colors.primaryVar1 }, mt5, alignItemsCenter, borderRadius6,commonView.rowSpaceEvenly]}>
                    <View style={[{ height: 8, width: 8, backgroundColor: isDark() ? colors.greyVar3 : colors.primaryVar3 }, borderRadius25]} />
                    <Text style={[commonText.h14purpleVar3Text]}>23:45</Text>
                </View>
            </View>
            <View style={[alignItemsCenter, justyfyCenter, flex1, mh20, mv20]}>
                <ImageBackground source={VideoCallUpperImg} style={[{ height: '100%', width: '100%'}]} 
                imageStyle={[{flex:1,overflow:'hidden'}, borderRadius10, alignSelfCenter]}
                >
                    <Image source={VideoCallLowerImg} style={[mb20, { height: 120, width: 90, right: 20, position: 'absolute', bottom: 0 }]} />
                </ImageBackground>
            </View>
            <CallBottomTab />
        </View>
    )
}

export default SingleVideoCallAttend