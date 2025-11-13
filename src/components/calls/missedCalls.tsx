import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { AllCallsdata } from '../../utils/data/callsData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { BottomTabBar } from '../commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mb60, mt20, mv10, pb5, ph20, pv15 } from '../commonStyles';
import { commonText,  } from '../commonText';
import { commonView, } from '../commonView';
import { Text } from 'react-native';

export type MissedCallsProps = {
    selectedCards: number[];
    onCardSelection: (cardId: number) => void;
}

const MissedCalls = ({ selectedCards, onCardSelection }: MissedCallsProps) => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View style={[flex1, mt20, styles.whiteBg, { backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={mb60}>
                <View style={flex1}>
                    {AllCallsdata.map((call) => (
                        <View key={call.id}>
                            {call.id === 1 ? <View style={mv10} /> : <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.commonLineDividerGrey]} />}
                            <TouchableOpacity onPress={() => {
                                if (selectedCards.length === 0) {
                                    navigation.navigate(screenName.CallHistory as never);
                                    console.log('selected cards log in missed calls')
                                } else {
                                    onCardSelection(call.id);
                                }
                            }}
                                onLongPress={() => {
                                    if (!selectedCards.includes(call.id)) {
                                        onCardSelection(call.id);
                                    }
                                }} style={[ph20, pv15, { backgroundColor: selectedCards.includes(call.id) ? (isDarkTheme ? colors.darkModeVar4 : colors.primaryVar1) : (isDarkTheme ? colors.darkModeVar2 : 'transparent') }]}
                            >
                                <View style={[flexRow]}>
                                    <View>
                                        <Image source={call.img} style={styles.profileImg} />
                                        {
                                            selectedCards.includes(call.id) ? (
                                                <View style={[{ backgroundColor: colors.green, borderColor: isDarkTheme ? colors.darkModeVar2 : colors.white, }, styles.statusTick, alignItemsCenter, justyfyCenter]} >
                                                    <CustomIcon name='check' size={10} color={colors.white} type='entypo' />
                                                </View>
                                            ) : (
                                                <View style={[{ backgroundColor: call.status === 'active' ? '#20c997' : '', borderColor: isDarkTheme ? colors.darkModeVar2 : colors.white, }, call.status === 'active' ? styles.status : null]} />
                                            )
                                        }
                                    </View>
                                    <View style={[flex1]}>
                                       <View style={[commonView.rowSpaceBetween,pb5]}>
                                            <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.blackVar2 },commonText.h15Blackvar2Bold500]}>{call.name}</Text>
                                            <CustomIcon name="video-outline" size={call.iconSize} color={colors.red} type='MaterialCommunityIcons' />
                                        </View>
                                       <View style={[commonView.rowSpaceBetween,pb5]}>
                                            <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400]}>{call.text}</Text>
                                            <Text style={[{ color: colors.red },commonText.h14GreyVar4Bold400]}>{labels.Missed}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <BottomTabBar />
        </View >
    )
}

const styles = StyleSheet.create({
    whiteBg: {
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        overflow: 'hidden'
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    status: {
        borderWidth: 3,
        position: 'absolute',
        bottom: 2,
        right: 10,
        height: 15,
        width: 15,
        borderRadius: 10,
    },
    statusTick: {
        borderWidth: 1.5,
        position: 'absolute',
        bottom: 4,
        right: 10,
        height: 16,
        width: 16,
        borderRadius: 100,
    },
});

export default MissedCalls