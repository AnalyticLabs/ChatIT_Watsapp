import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, Platform, Modal as RNModal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { ForwardView } from '../../../components/chatViewComponents';
import { CustomModal } from '../../../components/commonComponents';
import { EditModal2 } from '../../../components/commonModal';
import { alignItemsCenter, borderRadius10, flex1, flexRow, justyfyCenter, ml5, mt3, mt5, p5, pl10, pl13, pt5, spaceBetween } from '../../../components/commonStyles';
import { commonText } from '../../../components/commonText';
import { styledComponentsSheet } from '../../../styledComponent/styledComponent';
import { isDark, useTheme } from '../../../theme/themeContext';
import CustomIcon from '../../../utils/Icons';
import { colors } from '../../../utils/colors';
import { attachmentData } from '../../../utils/data/chatsData';
import { GroupChatViewModalData } from '../../../utils/data/groupsData';
import { CallThreeDotsOption, HaederChangechatViewModalData, SendMsgModalData, chatViewModalData } from '../../../utils/data/modalData';
import { DevHeight, DevWidth } from '../../../utils/device';
import { labels } from '../../../utils/labels';
import { GroupImg1Img, ProfileImg } from '../../../utils/png';
import { screenName } from '../../../utils/screenName';
import { AudioImgIcon, SendImg1Icon, SendImg2Icon } from '../../../utils/svg';
import { commonView } from '../../../components/commonView';
import { sendGroupMessageService, sendMessageService } from '../../../services/Chat';
import { socket } from '../../../utils/socket';



interface HeaderChatViewProps {
    title: string;
    subTitle: string;
    backgroundColor: string,
    onPress?: () => void;
    profileNavigate: string;
    videoNavigate: string;
    audioNavigate: string;
    threeDotOptionNavigate?: () => void;
    groups?: boolean;
    call?: boolean;
    clearChatopenModal?: any;

}

export const HeaderChatView = (props: HeaderChatViewProps) => {
    const [optionModal, setOptionModal] = useState(false);
    const [groupOptionModal, setGroupOptionModal] = useState(false);
    const [callOptionModal, setCallOptionModal] = useState(false);

    const navigation = useNavigation();

    const handleOptionModal = () => {
        setOptionModal(!optionModal)
    }

    const handleGroupOptionModal = () => {
        setGroupOptionModal(!groupOptionModal);
    }

    const handleCallOptionModal = () => {
        setCallOptionModal(!callOptionModal);
    }

    const OptionModalComponent = () => {
        return (
            <View>
                {
                    chatViewModalData.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}
                                onPress={() => {
                                    if (item.id === 8) {
                                        setOptionModal(false)
                                        props.clearChatopenModal(8);
                                    } else {
                                        setOptionModal(false)
                                        navigation.navigate(item.screenName as never);
                                    }
                                }}
                            >
                                <View style={flexRow}>
                                    <View style={[alignItemsCenter, justyfyCenter]}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} type={item.iconType} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14blackVar1bold400Text]}>{item.text}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const GroupOptionModalComponent = () => {
        return (
            <View>
                {
                    GroupChatViewModalData.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                                <View style={flexRow}>
                                    <View style={[alignItemsCenter, justyfyCenter]}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} color={item.iconColor} type={item.iconType} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14blackVar1bold400Text]}>{item.text}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const CallOptionModalComponent = () => {
        const navigation = useNavigation();
        return (
            <View>
                {
                    CallThreeDotsOption.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => { }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                                <View style={[flexRow]}>
                                    <View style={[alignItemsCenter, justyfyCenter]}>
                                        <CustomIcon name={item.iconName} type={item.iconType} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14blackVar1bold400Text]}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View style={[{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white }, styledComponentsSheet.chatViewCommonHeader]}>
            <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                <View style={[flexRow]}>
                    <TouchableOpacity style={{ paddingTop: 12 }} onPress={() => { navigation.goBack() }} >
                        <CustomIcon name='chevron-left' color={isDark() ? colors.white : colors.black} size={15} type="entypo" />
                    </TouchableOpacity>
                    <View style={[flexRow, spaceBetween, flex1]}>
                        <TouchableOpacity style={[pl10, flexRow]} onPress={() => { navigation.navigate(props.profileNavigate as never) }}>
                            {props.groups ? <Image source={GroupImg1Img} /> :
                                <Image source={ProfileImg} />
                            }
                            <View style={pl13}>
                                <Text style={[{ lineHeight: 23 }, commonText.h15Blackvar2Bold500]}>{props.title}</Text>
                                <Text style={[{ lineHeight: 20 }, commonText.h14GreyVar4Bold400Text]}>{props.subTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[flexRow, alignItemsCenter]}>
                            <TouchableOpacity style={pl10} onPress={() => { navigation.navigate(props.videoNavigate as never) }}>
                                <CustomIcon name='video-outline' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate(props.audioNavigate as never)} style={pl10}>
                                <CustomIcon name='phone' type="Feather" size={16} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.groups ? handleGroupOptionModal : (props.call ? handleCallOptionModal : handleOptionModal)} style={pl10}>
                                <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.47}
                modalData={<OptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={() => setOptionModal(false)}
            />
            <CustomModal
                isVisible={groupOptionModal}
                width={DevWidth * 0.47}
                height={DevHeight * 0.4}
                modalData={<GroupOptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={() => setGroupOptionModal(false)}
            />
            <CustomModal
                isVisible={callOptionModal}
                width={DevWidth * 0.55}
                height={DevHeight * 0.4}
                modalData={<CallOptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={() => setCallOptionModal(false)}
            />
        </View>
    )

}


export const LongPressedHaeder = ({ messageType }) => {


    const [optionModal, setOptionModal] = useState(false);

    const [sendMsgMdl, setSendMsgMdl] = useState(false);
    const handleOptionModal = () => {
        if (messageType === 'sentmsg') {
            setSendMsgMdl(!sendMsgMdl);

        }
        else {
            setOptionModal(!optionModal);
        }
    };
    const OptionModalComponent = () => {
        return (
            <View>
                {
                    HaederChangechatViewModalData.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                                <View style={flexRow}>
                                    <View style={[alignItemsCenter, justyfyCenter]}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} type={item.iconType} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14blackVar1bold400Text]}>{item.text}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }


    const SendMsgModal = () => {
        const [isdoubleModal, setDoubleModal] = useState(false);

        const navigation = useNavigation()
        const openBothModal = () => {
            setSendMsgMdl(false)


        }

        return (
            <View>
                {
                    SendMsgModalData.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}
                                onPress={() => {
                                    if (item.id === 3) {
                                        console.log('opensentmsg modal')

                                        openBothModal()
                                        setSendMsgMdl(false)

                                    } else {
                                        // Navigate to the desired screen for other items
                                        navigation.navigate(screenName.MessageInfo as never);
                                    }
                                }}
                            >
                                <View style={flexRow}>
                                    <View style={[alignItemsCenter, justyfyCenter]}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} type={item.iconType} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14blackVar1bold400Text]}>{item.text}</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                {isdoubleModal && (
                    <EditModal2 isVisible={true} onClose={() => setDoubleModal(false)} />
                )}

            </View>
        )
    }
    const navigation = useNavigation()

    return (

        <View style={[{ height: DevWidth / 4.2, backgroundColor: isDark() ? colors.darkModeVar1 : colors.white }, styledComponentsSheet.chatViewCommonHeader]}>
            <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                <View style={[flexRow]}>

                    <View style={[flexRow, spaceBetween, flex1]}>
                        <View style={[flexRow]} >
                            <View style={pt5}>
                                <CustomIcon name='chevron-left' color={isDark() ? colors.white : colors.greyVar4} size={20} type="entypo" />
                            </View>
                            <View style={[pl13, justyfyCenter]}>
                                <Text style={[commonText.h20font600BlackVar2]}>1</Text>
                            </View>
                        </View>
                        <View style={[flexRow, alignItemsCenter]}>
                            <TouchableOpacity style={pl10} >
                                <CustomIcon name='reply-outline' type="MaterialCommunityIcons" size={24} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                            <TouchableOpacity style={pl10}>
                                <CustomIcon name='star' color={isDark() ? colors.white : colors.greyVar4} size={18} type="Feather" />
                            </TouchableOpacity>
                            <TouchableOpacity style={pl10}>
                                <CustomIcon name='trash-2' type="Feather" size={18} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                            <TouchableOpacity style={pl10} onPress={() => navigation.navigate(screenName.ForwardTo as never)} >
                                <CustomIcon name='share-outline' type="MaterialCommunityIcons" size={24} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                            <TouchableOpacity style={pl10} onPress={handleOptionModal}>
                                <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <CustomModal
                isVisible={sendMsgMdl}
                width={DevWidth * 0.47}
                modalData={<SendMsgModal />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={handleOptionModal}
            />
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.47}
                modalData={<OptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={handleOptionModal}
            />


        </View>

    )
}
export const FooterChatView = ({ setMessages, messages, currentUserId, receiverId, isGroup, chatId, otherUserId }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }


    const onSend = async () => {
        if (!message.trim()) return;

        const tempMsg = {
            id: Date.now().toString(),
            text: message,
            isOwn: true,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, tempMsg]);
        setMessage("");
        try {

            const payload = {
                senderId: currentUserId,
                receiverId: otherUserId,
                content: message,
                messageStatus: "sent",
            };

            if (isGroup) {
                const payloadGroupChat = {
                    senderId: currentUserId,
                    receiverId: isGroup ? null : receiverId,
                    groupId: isGroup ? chatId : null,
                    content: message,
                    messageStatus: "sent",
                };
                const responseGroup = await sendGroupMessageService(payloadGroupChat);
                if (responseGroup?.data?.data) {
                    console.log("Group message sent:", responseGroup.data.data);
                    socket.emit("send_group_message", responseGroup.data.data);
                }
            } else {
                const response = await sendMessageService(payload);
                if (response?.data?.data) {
                    socket.emit("send_message", response.data.data);
                    console.log("Message sent:", response.data.data);
                }
            }
        } catch (error) {
            console.log("sendMessage error:", error?.response?.data || error);
        }
    };

    return (
        <View style={[{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white }, styledComponentsSheet.footerFirstView]}>
            <View style={{ width: DevWidth / 1.3, height: 40, backgroundColor: isDark() ? colors.darkModeVar6 : colors.white, borderColor: isDark() ? 'rgba(78,80,114,0.5)' : colors.greyVar2, borderWidth: 2, borderRadius: 6, marginTop: 30, bottom: 8 }}>
                <View style={{ flexDirection: 'row', width: '80%', height: 40, paddingHorizontal: 2, alignItems: 'center' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                        <CustomIcon name='smiley' type="octicons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 5, fontSize: 14, fontWeight: '400', color: isDark() ? colors.greyVar3 : colors.greyVar4 }}
                            placeholder="Type here..."
                            value={message}
                            onChangeText={setMessage}
                            placeholderTextColor={isDark() ? colors.greyVar3 : colors.greyVar4}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={openModal} style={{ marginRight: 10, transform: [{ rotate: '45deg' }] }}>
                            <CustomIcon name='paperclip' type="Feather" size={18} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                        </TouchableOpacity>
                        <CustomIcon name='camera-outline' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => { onSend() }} style={{
                backgroundColor: colors.primaryVar3, height: 40,
                width: 40, borderRadius: 12, marginLeft: 15, alignItems: 'center',
                justifyContent: 'center', alignSelf: 'flex-end', bottom: Platform.OS === 'ios' ? 20 : 16
            }}>
                {/* <CustomIcon name='microphone-outline' type="MaterialCommunityIcons" color={colors.white} size={18} /> */}
                <CustomIcon name='send' type="Ionicons" color={colors.white} size={15} />
            </TouchableOpacity>
            <RNModal transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
                <View style={[flex1]}>
                    <Modal
                        animationInTiming={10}
                        animationOutTiming={10}
                        animationIn="slideInRight"
                        isVisible={isModalVisible}
                        onBackdropPress={closeModal}
                        backdropOpacity={0}
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            bottom: 50
                        }}
                    >
                        <View style={[{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white, elevation: 4, borderRadius: 8, width: DevWidth * 0.47, padding: 10 }]}>
                            {
                                attachmentData.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id} onPress={() => { }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                                            <View style={[flexRow]}>
                                                <CustomIcon name={item.iconName} type={item.iconType} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                                                <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                                    <Text style={[commonText.h14blackVar1bold400Text]}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </Modal>
                </View>
            </RNModal>
        </View>
    )
}



export const ReplyFooterView = ({ onIconClick }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    return (
        <View style={{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white, alignItems: 'center', height: DevHeight / 5, paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row' }}>
            <View style={{ width: '86%', height: 117, backgroundColor: isDark() ? colors.darkModeVar6 : colors.white, borderColor: isDark() ? 'rgba(78,80,114,0.5)' : colors.greyVar2, borderWidth: 2, borderRadius: 10, marginTop: 30, bottom: 8 }}>
                <View style={{
                    width: '98%', height: 67, backgroundColor: isDark() ? colors.darkModeVar4 : colors.primaryVar1, marginTop: 5, borderRadius: 5, marginHorizontal: 3,
                    borderLeftWidth: 1.5, borderLeftColor: colors.primaryVar3
                }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ color: colors.primaryVar3, fontWeight: '500', fontSize: 15, lineHeight: 23 }}>Horace Keene</Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => onIconClick()}  >
                                <CustomIcon name='x' type="Feather" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[commonText.h14GreyVar4Bold400]}>Hello <Text style={{ color: colors.blueVar1 }}>@Alex</Text> Good Morning</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '80%', height: 40, paddingHorizontal: 2, alignItems: 'center' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                        <CustomIcon name='smiley' type="octicons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 5, color: colors.greyVar4, fontSize: 14, fontWeight: '400' }}
                            placeholder="Type here..."
                            placeholderTextColor={isDark() ? colors.greyVar3 : colors.greyVar4}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={openModal} style={{ marginRight: 10, transform: [{ rotate: '45deg' }] }}>
                            <CustomIcon name='paperclip' type="Feather" size={18} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                        </TouchableOpacity>
                        <CustomIcon name='camera-outline' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: colors.primaryVar3, height: 40, width: 40, borderRadius: 12, marginLeft: 15, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', bottom: Platform.OS === 'ios' ? 25 : 16 }}>
                <CustomIcon name='paper-plane' type="font-awesome" color={colors.white} size={14} />
            </View>
            <RNModal transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
                <View style={[flex1]}>
                    <Modal
                        animationInTiming={10}
                        animationOutTiming={10}
                        animationIn="slideInRight"
                        isVisible={isModalVisible}
                        onBackdropPress={closeModal}
                        backdropOpacity={0}
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            bottom: 50
                        }}
                    >
                        <View style={[{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white, elevation: 4, borderRadius: 8, width: DevWidth * 0.47, padding: 10 }]}>
                            {
                                attachmentData.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id} onPress={() => { }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                                            <View style={[flexRow]}>
                                                <CustomIcon name={item.iconName} type={item.iconType} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                                                <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                                    <Text style={[commonText.h14blackVar1bold400Text]}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </Modal>
                </View>
            </RNModal>
        </View>
    );
}

export const FooterAdminChatView = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.blackVar2 : colors.white, height: DevHeight / 8, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 20 }, alignItemsCenter]}>
            <View style={[{ height: DevHeight * 0.06, width: DevWidth * 0.88, backgroundColor: isDarkTheme ? colors.blackVar1 : colors.whiteVar1, borderWidth: 1, borderColor: colors.greyVar2 }, mt5, borderRadius10, alignItemsCenter, justyfyCenter]}>
                <Text style={[commonText.h16fontSemiBoldGreyvar4]}>Only <Text style={[commonText.h16fontSemiBoldBluevar4]}>Admins</Text> can send messages</Text>
            </View>
        </View>
    )
}


export const receiveMessage1 = (isDarkTheme: any) => {
    return (
        <>
            <View>
                <View style={[styles.receiveMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
                    <Text style={[commonText.h14font400grey3black2]}>
                        {labels.helloAlex}
                    </Text>
                </View>
            </View>
        </>
    );
};

export const receiveMessage2 = (isDarkTheme: any) => {
    return (
        <>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={[styles.receiveMsgCard, flexRow, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
                    <CustomIcon name="play-circle-o" size={20} color={colors.primaryVar3} type="font-awesome" />
                    <View style={pl10}>
                        <AudioImgIcon />
                    </View>
                    <Text style={[mt3, pl10, commonText.h12DefaultGreyVar3]}>00:30</Text>
                </View>
            </View >
        </>
    );
};

export const receiveMessage3 = (isDarkTheme: any) => {
    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.receiveMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
                    <View style={[{ backgroundColor: isDark() ? colors.darkModeVar6 : colors.whiteVar1, alignItems: 'center', padding: 10, width: DevWidth / 1.4, borderRadius: 8 }, flexRow, spaceBetween]}>
                        <View style={[flexRow]}>
                            <View style={justyfyCenter}>
                                <CustomIcon name='document-text-outline' type="Ionicons" color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} />
                            </View>
                            <View style={pl13}>
                                <Text style={[commonText.h14blackVar1bold400Text]}>Design_Brief.pdf</Text>
                                <Text style={[commonText.h12GreyVar8]}>243 KB</Text>
                            </View>
                        </View>
                        <CustomIcon name='download' type="Feather" color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} />
                    </View>
                    <View style={pt5}>
                        <Text style={[commonText.h14font400grey3black2]}>{labels.checkThisFile}</Text>
                    </View>
                </View>
                <View style={[{ marginTop: 40 }, pl13]}>
                    <ForwardView />
                </View>
            </View >
        </>

    );
};
export const receiveMessage4 = (isDarkTheme: any) => {
    return (
        <View >
            <View style={[styles.receiveMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
                <ImageBackground
                    source={require('../../../../assets/images/png/receiveMsg.png')}
                    style={{ height: 180, width: DevWidth / 1.4 }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <View style={{ backgroundColor: isDark() ? 'rgba(180, 180, 180,0.5)' : 'rgba(255, 255, 255, 0.5)', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <CustomIcon name='play' type="Feather" size={20} color={isDark() ? colors.black : colors.white} />
                        </View>
                    </View>
                    <View style={{ backgroundColor: isDark() ? 'rgba(180, 180, 180,0.5)' : 'rgba(255, 255, 255, 0.5)', height: 24, width: 75, borderRadius: 10, alignItems: 'center', justifyContent: "space-evenly", bottom: 10, flexDirection: 'row', marginLeft: 15 }}>
                        <View style={{ marginTop: 3 }}>
                            <CustomIcon name='file-download' type="MaterialIcons" size={14} color={isDark() ? colors.black : colors.white} />
                        </View>
                        <Text style={[commonText.h12BlackText]}>2.8 MB</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

export const sentMessage1 = (text: string, isDarkTheme: any) => {
    return (
        <View>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <Text style={[commonText.h14font400grey3black2]}>
                    {text}
                </Text>
            </View>
        </View >
    );
};
export const SentMessage2 = (isDarkTheme: any) => {
    return (
        <View>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <Text style={[commonText.h14font400grey3black2]}>
                    This is my new website design 😍
                </Text>
            </View>
        </View >
    );
};

export const SentMessage6 = (isDarkTheme: any) => {
    return (
        <>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <SendImg1Icon />
            </View>

        </>

    );
};
export const sentMessage3 = (isDarkTheme: any) => {
    return (
        <View>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <SendImg2Icon />
                <Text style={[p5, commonText.h14blueVar1Text]}>{labels.chatLink}</Text>
            </View>
        </View >

    );
};

export const sentMessage4 = (isDarkTheme: any) => {
    return (
        <View>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <Text style={[commonText.h14font400grey3black2]}>
                    Thank You Mam
                </Text>
            </View>
        </View>
    );
};
export const sentMessage5 = (isDarkTheme: any) => {
    return (
        <>
            <View style={[styles.sndMsgCard, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }]}>
                <View style={{
                    width: DevWidth * 0.65, height: 67, backgroundColor: isDark() ? colors.darkModeVar6 : colors.primaryVar4, marginTop: 5, borderRadius: 5, marginHorizontal: 3,
                    borderLeftWidth: 1.5, borderLeftColor: colors.primaryVar3
                }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={[{ lineHeight: 23 }, commonText.h15PurpletoGrey]}>Horace Keene</Text>
                        </View>
                        <Text style={[commonText.h14font400grey3black2]}>You can check on this file</Text>
                    </View>
                </View>
                <Text style={[mt5, ml5, commonText.h14font400grey3black2]}>Ok Mam</Text>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    receiveMsgCard: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 10,
        marginTop: 5
    },
    sndMsgCard: {
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 10,
        marginTop: 5
    },
    footerView: {
        backgroundColor: colors.white,
        height: 100,
        padding: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        borderTopStartRadius: 10,
    },

});