import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
// import { PinnedChatsdata } from '../../utils/data/chatsData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { BlackDoubleTickIcon, BlackSingleTickIcon, BlueDoubleTickIcon, DoubleTickDarkIcon, FileBlackIcon, FileDarkIcon, ImageDarkIcon, MicrophoneDarkIcon, MikeBlackIcon, PhoneIncomingDarkIcon, PhoneIncomingRedIcon, PictureBlackIcon, PinBlackIcon, PinDarkIcon, SingleTickDarkIcon, VideoBlackIcon, VideoDarkIcon, VideoRedDarkIcon, VideoRedIcon } from '../../utils/svg';
import { BottomTabBar } from '../commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mb60, mr5, mt0, mt20, mt3, mt5, mv10, pb5, ph20, pv15 } from '../commonStyles';
import { commonText } from '../commonText';
import { commonView } from '../commonView';
import { fontValue } from '../../utils/responsiveFont';

export type PinnedChatsProps = {
    selectedCards: number[];
    onCardSelection: (cardId: number) => void;
}


const PinnedChats = ({ selectedCards, onCardSelection }: PinnedChatsProps) => {
    const PinnedChatsdata = []
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, flex1, mt20, styles.whiteBg]}>
            <View style={flex1}>
                <ScrollView showsVerticalScrollIndicator={false} style={mb60}>
                    {PinnedChatsdata?.length > 0 ? PinnedChatsdata?.map((chat) => (
                        <View key={chat.id}>
                            {chat.id === 1 ? <View style={mv10} /> : <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />}
                            <TouchableOpacity onPress={() => {
                                if (selectedCards.length === 0) {
                                    navigation.navigate(screenName.ChatView as never);
                                } else {
                                    onCardSelection(chat.id);
                                }
                            }}
                                onLongPress={() => {
                                    if (!selectedCards.includes(chat.id)) {
                                        onCardSelection(chat.id);
                                    }
                                }} style={[ph20, pv15, { backgroundColor: selectedCards.includes(chat.id) ? (isDarkTheme ? colors.darkModeVar4 : colors.primaryVar1) : (isDarkTheme ? colors.darkModeVar2 : 'transparent') }]}>
                                <View style={[flexRow]}>
                                    <View>
                                        <Image source={chat.profileImg} style={styles.profileImg} />
                                        {
                                            selectedCards.includes(chat.id) ? (
                                                <View style={[{ backgroundColor: colors.green, borderColor: isDarkTheme ? colors.darkModeVar2 : colors.white, }, styles.statusTick, alignItemsCenter, justyfyCenter]} >
                                                    <CustomIcon name='check' size={10} color={colors.white} type='entypo' />
                                                </View>
                                            ) : (
                                                <View style={[{ backgroundColor: chat.status === 'active' ? '#20c997' : '', borderColor: isDarkTheme ? colors.darkModeVar2 : colors.white, }, chat.status === 'active' ? styles.status : null]} />
                                            )
                                        }
                                    </View>
                                    <View style={[flex1]}>
                                        <View style={[commonView.rowSpaceBetween, pb5]}>
                                            <Text style={[commonText.h15Blackvar2Bold500]}>{chat.name}</Text>
                                            {
                                                chat.id === 4 ? (
                                                    <Text style={[commonText.h12fontBold400blackVar2]}>{labels.Time1020}</Text>
                                                ) : (
                                                    <Text style={[commonText.h12fontBold400GreyVar4]}>{labels.Time1020}</Text>
                                                )
                                            }
                                        </View>
                                        {chat.id === 1 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[commonText.h14GreenBold400]}>{labels.Typing}</Text>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        <BlueDoubleTickIcon />
                                                    </View>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : chat.id === 2 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <VideoDarkIcon /> : <VideoBlackIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{labels.Video}</Text>
                                                </View>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        <BlueDoubleTickIcon />
                                                    </View>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : chat.id === 3 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <MicrophoneDarkIcon /> : <MikeBlackIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{labels.Audio}</Text>
                                                </View>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <SingleTickDarkIcon /> : <BlackSingleTickIcon />}
                                                    </View>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : chat.id === 4 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[commonText.h14GreyVar4Bold400]}>{labels.Chaturl}</Text>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={[styles.roundNumber, mr5, { backgroundColor: colors.primaryVar3 }]}>
                                                        <Text style={styles.roundNumberText}>3</Text>
                                                    </View>
                                                    <View style={mt5}>
                                                        {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                    </View>
                                                </View>
                                            </View>
                                        ) : chat.id === 5 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <ImageDarkIcon /> : <PictureBlackIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{labels.Image}</Text>
                                                </View>
                                                <View style={[commonView.rowSpaceBetween]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <DoubleTickDarkIcon /> : <BlackDoubleTickIcon />}
                                                    </View>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : chat.id === 6 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceBetween]}>
                                                    <View style={mr5} >
                                                        {isDarkTheme ? <FileDarkIcon /> : <FileBlackIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14GreyVar4Bold400]}>{labels.guidelinespdf}</Text>
                                                </View>
                                                {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                            </View>
                                        ) : chat.id === 7 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceBetween]}>
                                                    <View style={mr5} >
                                                        {isDarkTheme ? <PhoneIncomingDarkIcon /> : <PhoneIncomingRedIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14redText]}>{labels.MissedVoiceCall}</Text>
                                                </View>
                                                {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                            </View>
                                        ) : (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <View style={[commonView.rowSpaceBetween]}>
                                                    <View style={[mr5, isDarkTheme ? mt0 : mt3]} >
                                                        {isDarkTheme ? <VideoRedDarkIcon /> : <VideoRedIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14redText]}>{labels.MissedVideoCall}</Text>
                                                </View>
                                                {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                            </View>
                                        )
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                        :
                        <View style={{
                            flex: 1, justifyContent: 'center', alignItems: 'center',
                        }} >
                            <Text style={{ fontSize: 16, color: colors.greyVar4, marginTop: fontValue(20) }}>No Pinned Chat</Text>
                        </View>
                    }
                </ScrollView>
            </View>
            <BottomTabBar />
        </View >
    )
}

const styles = StyleSheet.create({
    whiteBg: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        overflow: 'hidden'
    },
    roundNumber: {
        height: 25,
        width: 25,
        borderRadius: 20,
    },
    roundNumberText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 12,
        fontWeight: '400',
        marginTop: 3,
    },
    status: {
        borderWidth: 3,
        position: 'absolute',
        bottom: 5,
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
    archiveCard: {
        height: 45,
        width: 0.90 * DevWidth,
        backgroundColor: colors.primaryVar1
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    }
});

export default PinnedChats
