import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt15, mv10, mv5, p10, pb5 } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { callHistoryThirddata, callHistoryTodaydata, callHistoryYesterdaydata } from '../../utils/data/callsData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { HeaderChatView } from '../chatView/messageComponents/messages';

export type CallHistoryProps = {

}


const CallHistory = (props: CallHistoryProps) => {
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]}>
            <HeaderChatView backgroundColor={colors.primaryVar3} profileNavigate={screenName.UserProfile} videoNavigate={screenName.SingleVideoCall} call={true} audioNavigate={screenName.Calling} title={labels.horaceKeene} subTitle={labels.online} />
            <ScrollView>
                <View style={[mh20, mt15]}>
                    <Text style={[mv5,commonText.h14Blackvar2Bold500]}>{labels.Today}</Text>
                    <View>
                        {
                            callHistoryTodaydata.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, }]}>
                                        <View style={[flexRow]}>
                                            <View style={[alignItemsCenter, justyfyCenter]}>
                                                <Image source={item.img} style={styles.profileImg} />
                                            </View>
                                            <View style={[flex1]}>
                                               <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                    <CustomIcon name={item.iconName} size={item.iconSize} color={item.iconColor} type={item.iconType} />
                                                    {/* <Text style={{ fontWeight: call.id === 4 ? '700' : 'normal' }}>{call.duration}</Text> */}
                                                </View>
                                                <View style={[commonView.rowSpaceBetween,pb5]}>

                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{item.text}</Text>
                                                    {/* <CustomIcon name={call.iconName} size={call.iconSize} color={call.iconColor} type={call.iconType} /> */}
                                                    <Text style={[{ color: item.DurationColor },commonText.h14GreyVar4Bold400,]}>{item.duration}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[mh20, mt15]}>
                    <Text style={[mv5,commonText.h14Blackvar2Bold500 ,{}]}>{labels.Yesterday}</Text>
                    <View>
                        {
                            callHistoryYesterdaydata.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white }]}>
                                        <View style={[flexRow]}>
                                            <View style={[alignItemsCenter, justyfyCenter]}>
                                                <Image source={item.img} style={styles.profileImg} />
                                            </View>
                                            <View style={[flex1]}>
                                               <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                    <CustomIcon name={item.iconName} size={item.iconSize} color={item.iconColor} type={item.iconType} />
                                                </View>
                                               <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{item.text}</Text>
                                                    <Text style={[{ color: item.DurationColor },commonText.h14GreyVar4Bold400,]}>{item.duration}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[mh20, mt15]}>
                    <Text style={[mv5,commonText.h14Blackvar2Bold500, {}]}>{labels.Aug232023}</Text>
                    <View>
                        {
                            callHistoryThirddata.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white }]}>
                                        <View style={[flexRow]}>
                                            <View style={[alignItemsCenter, justyfyCenter]}>
                                                <Image source={item.img} style={styles.profileImg} />
                                            </View>
                                            <View style={[flex1]}>
                                               <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                    <CustomIcon name={item.iconName} size={item.iconSize} color={item.iconColor} type={item.iconType} />
                                                </View>
                                               <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{item.text}</Text>
                                                    <Text style={[{ color: item.DurationColor },commonText.h14GreyVar4Bold400,]}>{item.duration}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
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
        borderColor: colors.white,
        position: 'absolute',
        bottom: 5,
        right: 10,
        height: 15,
        width: 15,
        borderRadius: 10,
    },
    whiteCard: {
        height: 70,
        borderRadius: 5,
    }
});

export default CallHistory