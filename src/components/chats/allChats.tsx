import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { allChatsData } from '../../utils/data/chatsData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { ArchiveIconBlackIcon, ArchiveIconDarkShade1Icon, BlackDoubleTickIcon, BlackSingleTickIcon, BlueDoubleTickIcon, DoubleTickDarkIcon, FileBlackIcon, FileDarkIcon, ImageDarkIcon, MicrophoneDarkIcon, MikeBlackIcon, PhoneIncomingDarkIcon, PhoneIncomingRedIcon, PictureBlackIcon, PinBlackIcon, PinDarkIcon, SingleTickDarkIcon, VideoBlackIcon, VideoDarkIcon } from '../../utils/svg';
import { BottomTabBar } from '../commonComponents';
import { alignItemsCenter, alignSelfCenter, borderRadius10, flex1, flexRow, justyfyCenter, mb15, mb60, ml15, mr5, mt20, p10, pb5, ph20, pv15, spaceBetween, spaceEvenly } from '../commonStyles';
import { commonText } from '../commonText';
import { commonView } from '../commonView';


export type AllChatsProps = {
    selectedCards: number[];
    onCardSelection: (cardId: number) => void;
    chats: any;
    currentUserId: string;
}


const AllChats = ({ selectedCards, onCardSelection, chats, currentUserId }: AllChatsProps) => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, flex1, mt20, styles.whiteBg]}>
            <ScrollView showsVerticalScrollIndicator={false} style={mb60}>
                <View style={[flexRow, spaceBetween, mt20, alignSelfCenter, p10, borderRadius10, styles.archiveCard, mb15, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4, }]}>
                    <View style={[flexRow, spaceEvenly]}>
                        {isDarkTheme ? <ArchiveIconDarkShade1Icon /> : <ArchiveIconBlackIcon />}
                        <Text style={[ml15, { letterSpacing: 0.5, color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 }, commonText.h16GreyVar4Bold600Text]}>{labels.Archived}</Text>
                    </View>
                    <View style={[styles.roundNumberRed, alignItemsCenter, justyfyCenter, { backgroundColor: isDarkTheme ? colors.redVar2 : colors.red }]}>
                        <Text style={[styles.roundNumberTextRed]}>10</Text>
                    </View>
                </View>
                <View style={flex1}>
                    {/* {chats.map((chat) => ( */}
                    {/* {allChatsData.map((chat) => (
                        <View key={chat.id}>
                            <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.commonLineDividerGrey]} />
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
                                                <View style={[{ backgroundColor: chat.status === 'active' ? '#20c997' : '', borderColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, chat.status === 'active' ? styles.status : null]} />
                                            )
                                        }
                                    </View>
                                    <View style={[flex1]}>
                                       <View style={[commonView.rowSpaceBetween,pb5]}>
                                            <Text style={[{ color : isDarkTheme ? colors.greyVar0 : colors.blackVar2 },commonText.h15Blackvar2Bold500]}>{chat.name}</Text>
                                            {
                                                chat.id === 4 ? (
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.blackVar2 },commonText.h12fontBold400blackVar2]}>{labels.Time1020}</Text>
                                                ) : (
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h12fontBold400GreyVar4]}>{labels.Time1020}</Text>
                                                )
                                            }
                                        </View>
                                        {chat.id === 1 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[{ color: isDarkTheme ? colors.greenVar2 : colors.green },commonText.h14GreenBold400]}>{labels.Typing}</Text>
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
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h14GreyVar4Bold400]}>{labels.Video}</Text>
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
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h14GreyVar4Bold400]}>{labels.Audio}</Text>
                                                </View>
                                                {isDarkTheme ? <SingleTickDarkIcon /> : <BlackSingleTickIcon />}
                                            </View>
                                        ) : chat.id === 4 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h14GreyVar4Bold400]}>{labels.Chaturl}</Text>
                                                <View style={[styles.roundNumber, alignItemsCenter, justyfyCenter, { backgroundColor: colors.primaryVar3 }]}>
                                                    <Text style={styles.roundNumberText}>3</Text>
                                                </View>
                                            </View>
                                        ) : chat.id === 5 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                 <View style={[commonView.rowSpaceEvenly]}>
                                                    <View style={mr5}>
                                                        {isDarkTheme ? <ImageDarkIcon /> : <PictureBlackIcon />}
                                                    </View>
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h14GreyVar4Bold400]}>{labels.Image}</Text>
                                                </View>
                                                {isDarkTheme ? <DoubleTickDarkIcon /> : <BlackDoubleTickIcon />}
                                            </View>
                                        ) : chat.id === 6 ? (
                                            <View style={[flexRow]}>
                                                <View style={mr5} >
                                                    {isDarkTheme ? <FileDarkIcon /> : <FileBlackIcon />}
                                                </View>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h14GreyVar4Bold400]}>{labels.guidelinespdf}</Text>
                                            </View>
                                        ) : (
                                            <View style={[flexRow]}>
                                                <View style={mr5} >
                                                    {isDarkTheme ? <PhoneIncomingDarkIcon /> : <PhoneIncomingRedIcon />}
                                                </View>
                                                <Text style={[{ color: isDarkTheme ? colors.redVar2 : colors.red },commonText.h14RedBold400]}>{labels.MissedVoiceCall}</Text>
                                            </View>
                                        )
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))} */}
                    {chats.map((chat: any) => (
                        <View key={chat?._id}>
                            <TouchableOpacity
                                onPress={() => {
                                    // if (selectedCards.length === 0) {
                                    //     navigation.navigate(screenName.ChatView as never, {
                                    //         chatId: chat?._id,
                                    //         receiverPhone: chat?.name,
                                    //     } as never);
                                    // } else {
                                    //     onCardSelection(chat?._id);
                                    // }
                                    console.log(chat,'----chat');
                                    
                                    navigation.navigate(screenName.ChatView, {
                                        chatId: chat.id,
                                        currentUserId: currentUserId,
                                        // chatDetails: chat.participants?.find(
                                        //     (p) => p._id !== currentUserId
                                        // ),
                                        chatDetails: chat
                                    });
                                }}
                                onLongPress={() => onCardSelection(chat?._id)}
                                style={{
                                    flexDirection: 'row',
                                    padding: 15,
                                    backgroundColor: selectedCards.includes(chat?._id)
                                        ? colors.primaryVar1
                                        : colors.white,
                                    borderBottomColor: colors.greyVar1,
                                    borderBottomWidth: 0.5,
                                }}
                            >
                                <View style={{ marginRight: 15 }}>
                                    <Image
                                        source={require('../../../assets/images/png/person.png')}
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                    />
                                    {chat?.isOnline && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                bottom: 3,
                                                right: 3,
                                                width: 12,
                                                height: 12,
                                                borderRadius: 6,
                                                backgroundColor: '#20c997',
                                                borderWidth: 2,
                                                borderColor: colors.white,
                                            }}
                                        />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[commonText.h15Blackvar2Bold500]}>{chat?.name}</Text>
                                        <Text style={[commonText.h12fontBold400GreyVar4]}>
                                            {chat?.lastMessageTime}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                color: colors.greyVar4,
                                                flex: 1,
                                                marginRight: 10,
                                                ...commonText.h14GreyVar4Bold400,
                                            }}
                                        >
                                            {chat?.lastMessage}
                                        </Text>

                                        {chat?.unreadCount > 0 && (
                                            <View
                                                style={{
                                                    backgroundColor: colors.primaryVar3,
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: 11,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: colors.white,
                                                        fontSize: 12,
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {chat?.unreadCount}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView >
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
        height: 20,
        width: 20,
        borderRadius: 20,
    },
    roundNumberRed: {
        height: 24,
        width: 24,
        borderRadius: 20,
    },
    chatHeaderText: {
        fontSize: 19,
        color: colors.greyVar4,
        fontWeight: '700',
        top: 2
    },
    roundNumberText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 12,
        fontWeight: '400',
    },
    roundNumberTextRed: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 12,
        fontWeight: '400',
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
    archiveCard: {
        height: 45,
        width: 0.90 * DevWidth,
        borderRadius: 10
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    }
});

export default AllChats