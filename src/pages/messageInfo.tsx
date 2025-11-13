import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bluetick } from '../components/chatViewComponents';
import { alignItemsCenter, flexRow, justyfyCenter, mh20, mr5, mt15 } from '../components/commonStyles';
import { commonText } from '../components/commonText';
import { useTheme } from '../theme/themeContext';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { MessageStatusData } from '../utils/data/chatViewData';
import { ChatSendImg1 } from '../utils/svg';
import { SearchHeader } from './media/mediaCommonHeader';
import { commonView } from '../components/commonView';

const MessageInfo = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View>
            {/* <SearchHeader headerText='Message Info' /> */}
            <View style={{ alignItems: 'flex-end' }}>
                <View style={[mh20, flexRow, mt15]}>
                    <Text style={[mr5, commonText.h12fontBold400GreyVar4]}>8:17 PM</Text>
                    <Bluetick />
                </View>
                <View>
                    <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar1 }]}>
                        <Text style={[commonText.h14font400grey3black2]}>
                            This is my new website design 😍
                        </Text>
                    </View>
                    <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar1 }]}>
                        <ChatSendImg1 />
                    </View>
                </View >
            </View>
            <View style={{ marginVertical: 20 }}>
                {MessageStatusData.map((item, index) => (
                    <View key={index}>
                        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />
                        <View style={{ marginHorizontal: 25, margin: 12 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[alignItemsCenter, justyfyCenter, mr5]}>
                                    <CustomIcon color={item.iconColor} type={item.iconType} name={item.iconName}
                                        size={20}
                                    />
                                </View>
                                <Text style={[{ lineHeight: 23 }, commonText.h15Blackvar2Bold500]}>{item.status}</Text>
                            </View>
                            <Text style={[commonText.h12fontBold400GreyVar4]}>{item.time}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sndMsgCard: {
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 10,
        marginTop: 5
    },
})
export default MessageInfo