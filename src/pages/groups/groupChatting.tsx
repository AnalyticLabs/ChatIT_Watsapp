import React, { Fragment } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Bluetick, DayDetails } from '../../components/chatViewComponents';
import { alignItemsCenter, justyfyCenter, ml10, mr10, mv5, pt10 } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark, useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { ChatBackgroundImg, Chatimg1Img, Chatimg2Img, Chatimg4Img, Chatimg6Img, Chatimg7Img } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { FooterChatView, HeaderChatView, SentMessage2, receiveMessage1, receiveMessage2, receiveMessage3, receiveMessage4, sentMessage1, sentMessage3 } from '../chatView/messageComponents/messages';
import { SafeAreaView } from 'react-native';

export type GroupChattingProps = {

}


const GroupChatting = (props: GroupChattingProps) => {


  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
    const chatMessages = [
        { id: 1, message: receiveMessage1(isDarkTheme), type: "receivemsg", time: "8:16 PM", name: 'Elizabeth sosa', profileImg: Chatimg2Img },
        { id: 2, message: sentMessage1("Good Morning Mam",isDarkTheme), type: "sentmsg", time: "8:17 PM", profileImg: Chatimg1Img, name : 'You' },
        // { id: 3, message: receiveMessage2(isDarkTheme), type: "receivemsg", time: "8:16 PM", name: 'james Albert', profileImg: Chatimg6Img },
        { id: 4, message: SentMessage2(isDarkTheme), type: "sentmsg", time: "8:17 PM", profileImg: Chatimg1Img, name : 'You' },
        { id: 5, message: receiveMessage3(isDarkTheme), type: "receivemsg", time: "8:16 PM", name: 'Dina Brown', profileImg: Chatimg7Img },
        // { id: 6, message: sentMessage3(isDarkTheme), type: "sentmsg", time: "8:17 PM", profileImg: Chatimg1Img, name : 'You' },
        { id: 7, message: receiveMessage4(isDarkTheme), type: "receivemsg", time: "8:16 PM", name: 'Horacce Keene', profileImg: Chatimg4Img },
        { id: 8, message: sentMessage1("Thank You Mam",isDarkTheme), type: "sentmsg", time: "8:17 PM", profileImg: Chatimg1Img },
    ];
    return (
        <Fragment>
            <SafeAreaView style={[commonView.mainContainer]}>
            <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:isDark()?colors.darkModeVar2:colors.whiteVar0}}>
        <View style={{ flex: 1 }}>
                <HeaderChatView backgroundColor={colors.primaryVar3} groups={true} profileNavigate={screenName.GroupInfo} videoNavigate={screenName.GroupVideoCallAttend} audioNavigate={screenName.GroupAudioCallAttend} title={labels.UIUXDesigner} subTitle={labels.DebraJamesHollis} />
                <ImageBackground
            source={ChatBackgroundImg}
            style={styles.backgroundImage}
            imageStyle={{ opacity:0.06 }} >
                    <View style={[{ alignItems: 'center' }, pt10]}>
                        <DayDetails/>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        {chatMessages.map((message, index) => (
                            <View style={[message.type === 'sentmsg' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }, { paddingTop: 10, marginHorizontal: 20 }]}
                                key={message.id}>
                                <View style={[{ flexDirection : message.type === 'sentmsg' ? 'row-reverse' : 'row' }, alignItemsCenter, justyfyCenter, mv5]}>
                                    <Image source={message.profileImg} style={[{ height: 30, width: 30, borderRadius: 100 },message.type === 'sentmsg' ? ml10 : mr10]} />
                                    <Text style={[commonText.h14Blackvar2Bold500, message.type === 'sentmsg' ? ml10 : mr10]}>{message.name}</Text>
                                    <Text style={[message.type === 'sentmsg' ? ml10 : mr10,commonText.h12font400Grey]}>{message.time}</Text>
                                    <Text style={[]}> {message.type === 'sentmsg' ? Bluetick() : null}</Text>
                                </View>
                                <Text>{message.message}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <FooterChatView />
                </ImageBackground>
                </View>
                </GestureHandlerRootView>
            </SafeAreaView>
        </Fragment >
    )
}

export default GroupChatting

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
})