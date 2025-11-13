import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { allGroupsData } from '../../utils/data/groupsData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { FileBlackIcon, FileDarkIcon, ImageDarkIcon, MicrophoneDarkIcon, MikeBlackIcon, PictureBlackIcon, PinBlackIcon, PinDarkIcon, StickerDarkIcon, StickerGreyIcon, VideoBlackIcon, VideoDarkIcon } from '../../utils/svg';
import { BottomTabBar } from '../commonComponents';
import { flex1, flexRow, mb60, mr5, mt20, mt3, mv10, pb5, ph20, pv15 } from '../commonStyles';
import { commonText } from '../commonText';
import { commonView } from '../commonView';

export type AllGroupsProps = {

}

const AllGroups = (props: AllGroupsProps) => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, flex1, mt20, styles.whiteBg]}>
            <ScrollView showsVerticalScrollIndicator={false} style={mb60}>
                <View style={flex1}>
                    {allGroupsData.map((group) => (
                        <View key={group.id}>
                            {group.id === 1 ? <View style={mv10} /> : <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.commonLineDividerGrey]} />}
                            <TouchableOpacity onPress={() => {
                                group.isAdmin === 'true' ? navigation.navigate(screenName.GroupChattingAdmin as never) : navigation.navigate(screenName.GroupChatting as never);
                            }}
                                onLongPress={() => {
                                }} style={[ph20, pv15]}>
                                <View style={[flexRow]}>
                                    <View>
                                        <Image source={group.profileImg} style={styles.profileImg} />
                                    </View>
                                    <View style={[flex1]}>
                                       <View style={[commonView.rowSpaceBetween,pb5]}>
                                            <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.blackVar2 },commonText.h15Blackvar2Bold500]}>{group.name}</Text>
                                            {
                                                group.id === 4 ? (
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.blackVar2 },commonText.h12fontBold400blackVar2]}>{group.time}</Text>
                                                ) : (
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h12fontBold400GreyVar4]}>{group.time}</Text>
                                                )
                                            }
                                        </View>
                                        {group.id === 1 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[{ color: isDarkTheme ? colors.greenVar2 : colors.green },commonText.h14GreenBold400]}>{labels.DebraisTyping}</Text>
                                                <View style={mt3}>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : group.id === 2 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                 <View style={[commonView.rowSpaceEvenly]}>
                                                    <Text style={[mr5,commonText.h14GreyVar4Bold400, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>{labels.James}</Text>
                                                    <View style={[mr5]}>
                                                        {isDarkTheme ? <VideoDarkIcon /> : <VideoBlackIcon />}
                                                    </View>
                                                    <Text style={[commonText.h14GreyVar4Bold400,]}  >{labels.Video}</Text>
                                                </View>
                                                <View style={mt3}>
                                                    {isDarkTheme ? <PinDarkIcon /> : <PinBlackIcon />}
                                                </View>
                                            </View>
                                        ) : group.id === 3 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                 <View style={[commonView.rowSpaceEvenly]}>
                                                    <Text style={[mr5,commonText.h14GreyVar4Bold400,, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>{labels.Hollis}</Text>
                                                    <View style={[mr5]}>
                                                        {isDarkTheme ? <MicrophoneDarkIcon /> : <MikeBlackIcon />}
                                                    </View>
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.Audio}</Text>
                                                </View>
                                            </View>
                                        ) : group.id === 4 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.JonesHttps}</Text>
                                                <View style={[styles.roundNumber, { backgroundColor: colors.primaryVar3 }]}>
                                                    <Text style={styles.roundNumberText}>3</Text>
                                                </View>
                                            </View>
                                        ) : group.id === 5 ? (
                                            <View style={[commonView.rowSpaceBetween]}>
                                                 <View style={[commonView.rowSpaceEvenly]}>
                                                    <Text style={[mr5,commonText.h14GreyVar4Bold400]}>{labels.Horace}</Text>
                                                    <View style={[mr5]}>
                                                        {isDarkTheme ? <ImageDarkIcon /> : <PictureBlackIcon />}
                                                    </View>
                                                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.Image}</Text>
                                                </View>
                                            </View>
                                        ) : group.id === 6 ? (
                                            <View style={[flexRow]}>
                                                <Text style={[mr5,commonText.h14GreyVar4Bold400, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>{labels.Smith}</Text>
                                                <View style={[mr5]} >
                                                    {isDarkTheme ? <FileDarkIcon /> : <FileBlackIcon />}
                                                </View>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.guidelinespdf}</Text>
                                            </View>
                                        ) : group.id === 7 ? (
                                            <View style={[flexRow]}>
                                                <Text style={[mr5,commonText.h14GreyVar4Bold400, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>{labels.Alex}</Text>
                                                <View style={[mr5]} >
                                                    {isDarkTheme ? <StickerDarkIcon /> : <StickerGreyIcon />}
                                                </View>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.Sticker}</Text>
                                            </View>
                                        ) : (
                                            <View style={[flexRow]}>
                                                <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14GreyVar4Bold400,]}>{labels.JoinedUsing}</Text>
                                            </View>
                                        )
                                        }
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
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    }
});

export default AllGroups