import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { GestureHandlerRootView, State as GestureState, PanGestureHandler } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Bluetick, DayDetails, Reactmsg, Tick } from '../../components/chatViewComponents';
import { IconModal, ReactModal } from '../../components/commonModal';
import { flex1, flexRow, pl6, pt10 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { ClearChatModal } from '../../modalContents/iconModelContents';
import { isDark, useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { Emojidata, tabs } from '../../utils/data/chatViewData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { ChatBackgroundImg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { colors } from '../../utils/colors';
import { FooterChatView, HeaderChatView, LongPressedHaeder, ReplyFooterView, SentMessage2, SentMessage6, receiveMessage1, receiveMessage2, receiveMessage3, receiveMessage4, sentMessage1, sentMessage3, sentMessage4, sentMessage5 } from './messageComponents/messages';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';
import { getGroupMessagesService, getMessagesService } from '../../services/Chat';
import { socket } from '../../utils/socket';
import { formatMessage } from '../../utils/functions';
import { useAppSelector } from '../../redux/hooks';


export type chatViewProps = {

}

const ChatView = ({ route }: any) => {
  const { user } = useAppSelector((state) => state.auth);
  const { chatId, chatDetails } = route.params || {};
  const otherUserId = chatDetails?.otherUserId;
  const isGroup = chatDetails?.isGroup;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedModalId, setSelectedModalId] = useState(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isSwiped, setIsSwiped] = useState(false);
  const [emojiModal, setEmojiModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const currentUserId = user?._id;
  const scrollViewRef = useRef(null);


useEffect(() => {
  scrollViewRef.current?.scrollToEnd({ animated: true });
}, [messages]);


  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("user_connected", currentUserId);
      console.log("Socket connected with user:", currentUserId);

      if (isGroup && chatId) {
        socket.emit("join_group", chatId);
        console.log("Joined group:", chatId);
      }
    });
    socket.on("receive_message", (newMsg) => {
      console.log("📩 Private message received:", newMsg);

      if (
        !isGroup &&
        (
          (newMsg.sender?._id === otherUserId && newMsg.receiver?._id === currentUserId) ||
          (newMsg.sender?._id === currentUserId && newMsg.receiver?._id === otherUserId)
        )
      ) {
        const formattedMsg = formatMessage(newMsg, currentUserId);

        setMessages((prev) => {
          // ✅ check by _id (not id)
          const alreadyExists = prev.some((msg) => msg._id === formattedMsg._id);
          if (alreadyExists) {
            console.log("⚠️ Duplicate skipped:", formattedMsg._id);
            return prev;
          }

          console.log("✅ New message added:", formattedMsg.text);
          return [...prev, formattedMsg];
        });
      }
    });


    socket.on("new_group_message", (newMsg) => {
      console.log("💬 Group message received:", newMsg);

      if (isGroup && newMsg.group === chatId) {
        const formattedMsg = formatMessage(newMsg, currentUserId);
        setMessages((prev) => [...prev, formattedMsg]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("new_group_message");
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [isGroup, chatId, otherUserId, currentUserId, messages]);

  useEffect(() => {
    getMessages();
  }, []);

  // useEffect(() => {
  //   console.log("🔁 Messages updated:", messages.length);
  // }, [messages]);

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const query = `/${chatId}/messages`;

      const response = isGroup
        ? await getGroupMessagesService(chatId)
        : await getMessagesService(query);

      const messagesData = response?.data?.data || [];
      const formatted = messagesData.map((msg: any) =>
        formatMessage(msg, currentUserId)
      );

      setMessages(formatted);
    } catch (error) {
      console.log("❌ getMessages error:", error?.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const toggleCardSelection = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };
  const IconcloseModal = () => {
    setSelectedModalId(null);
  };
  const openModal = (id: number) => {
    setSelectedModalId(id);
  }
  const handleSwipeAction = () => {
    setIsSwiped(true);
  };

  const handleReplyFooterIconClick = () => {
    setIsSwiped(false);
  };
  const handleReactMsg = () => {
    setModalVisible(true)
  }
  const handleCardSelectionChange = (event, cardId) => {
    if (event && event.nativeEvent) {
      const isSentMsg = messages.find((message) => message.id === cardId)?.isOwn;
      const modalTop = event.nativeEvent.pageY;
      const modalLeft = isSentMsg ? DevWidth / 3 : 20;
      setModalPosition({ x: modalLeft, y: modalTop });
      setEmojiModal(true);
    }
  };


  const renderHeader = () => {
    if (selectedCards.length > 0) {
      return (
        <LongPressedHaeder
          messageType={messages.find((message) => selectedCards.includes(message.id))?.type}
        />
      );
    } else {
      return (
        <HeaderChatView
          backgroundColor={colors.primaryVar3}
          profileNavigate={screenName.UserProfile}
          videoNavigate={screenName.SingleVideoCall}
          audioNavigate={screenName.SingleAudioCallRing}
          title={labels.horaceKeene}
          subTitle={labels.online}
          clearChatopenModal={openModal}
        />
      );
    }
  };

  const translateXValues = useRef([]);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    translateXValues.current = messages.map(
      (_, i) => translateXValues.current[i] || new Animated.Value(0)
    );
  }, [messages]);

  // ✅ Define event + state handlers correctly
  const onSwipeGestureEventForItem = (index: number) =>
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: translateXValues.current[index] || new Animated.Value(0),
          },
        },
      ],
      { useNativeDriver: false }
    );

  const onSwipeGestureStateChangeForItem = (event: any, index: number) => {
    const animValue = translateXValues.current[index];
    if (!animValue) return;

    if (event.nativeEvent.oldState === GestureState.ACTIVE) {
      const swipeDistance = event.nativeEvent.translationX;
      if (swipeDistance > 50) handleSwipeAction();

      Animated.spring(animValue, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={colors.primaryVar3} />
      <GestureHandlerRootView style={flex1}>
        <View>
        </View>
        <View style={flex1}>
          <ImageBackground
            source={ChatBackgroundImg}
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.18, backgroundColor: isDark() ? 'rgba(194, 194, 194,0.1)' : 'rgba(220, 198, 224, 0.1)' }} >
            {renderHeader()}
            <ScrollView style={flex1}
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }}
            >
              <View style={[{ alignItems: 'center' }, pt10]}>
                <DayDetails />
              </View>
              {/* {messages.map((item, index) => ( */}
              {messages.map((item, index) => {
                // const animValue = translateXValues.current[index] || new Animated.Value(0);

                return (
                  <PanGestureHandler
                    key={item?.id}
                    onGestureEvent={onSwipeGestureEventForItem(index)}
                    onHandlerStateChange={(event) =>
                      onSwipeGestureStateChangeForItem(event, index)
                    }
                    activeOffsetX={[-200, 50]}
                  >
                    <Animated.View
                    // style={[
                    //   {
                    //     transform: [{ translateX: animValue }],
                    //   },
                    // ]}
                    >
                      <TouchableOpacity
                        style={[
                          item?.isOwn ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },
                          {
                            backgroundColor: selectedCards.includes(item?.id)
                              ? isDark()
                                ? colors.darkModeVar6
                                : colors.primaryVar4
                              : 'transparent',
                            paddingHorizontal: 20,
                            marginBottom: 4,
                          },
                        ]}
                        onPress={() => {
                          if (selectedCards.length === 0) {
                            console.log('--');
                          } else {
                            toggleCardSelection(item?.id);
                          }
                        }}
                        onLongPress={(event) => {
                          handleCardSelectionChange(event, item?.id);
                          if (!selectedCards.includes(item?.id)) {
                            toggleCardSelection(item?.id);
                          }
                        }}
                      >
                        <View >
                          <Text style={[commonText.h12font400Grey]}>{item?.time}</Text>
                          <View style={flexRow}>
                            <View
                              style={{
                                justifyContent: 'center',
                                marginRight: 8,
                                marginLeft: 8,
                                bottom: 1,
                              }}
                            >
                              <CustomIcon
                                name="circle"
                                type="font-awesome"
                                size={6}
                                color={isDark() ? colors.greyVar4 : colors.greyVar3}
                              />
                            </View>

                            {!item?.isOwn ? (
                              <View>
                                <View
                                  style={[
                                    styles.receiveMsgCard,
                                    {
                                      backgroundColor: isDarkTheme
                                        ? colors.darkModeVar4
                                        : colors.white,
                                    },
                                  ]}
                                >
                                  <Text style={[commonText.h14font400grey3black2]}>
                                    {item?.text}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View>
                                <View
                                  style={[
                                    styles.sndMsgCard,
                                    {
                                      backgroundColor: isDarkTheme
                                        ? colors.darkModeVar4
                                        : colors.primaryVar4,
                                    },
                                  ]}
                                >
                                  <Text style={[commonText.h14font400grey3black2]}>
                                    {item?.text}
                                  </Text>
                                </View>
                              </View>
                            )}

                            <View style={pl6}>{item?.icon}</View>
                          </View>
                        </View>

                        {item?.message}

                        {item?.id === 7 && (
                          <TouchableOpacity onPress={handleReactMsg}>
                            {item?.msg}
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  </PanGestureHandler>
                );
              })}
            </ScrollView>
            {isSwiped ? (
              <ReplyFooterView onIconClick={handleReplyFooterIconClick} />
            ) : (
              <FooterChatView setMessages={setMessages} messages={messages} currentUserId={currentUserId}
                receiverId={otherUserId}
                isGroup={isGroup}
                otherUserId={otherUserId}
                chatId={chatId} />
            )}
          </ImageBackground>
        </View>
        {isModalVisible && (
          <ReactModal
            isVisible={isModalVisible}
            closeModal={closeModal}
            selectedTab={selectedTab}
            handleTabPress={handleTabPress}
            tabs={tabs}
          />
        )}
        {selectedModalId === 8 && (
          <IconModal
            isVisible={true}
            onClose={IconcloseModal}
            contentComponent={<ClearChatModal />}
            iconName='trash-o'
            iconType='FontAwesome'
            iconSize={25}
          />
        )}
        {emojiModal && (
          <Modal isVisible={emojiModal} onBackdropPress={() => setEmojiModal(false)} backdropOpacity={0} animationIn={messages.find((message) => message.id === selectedCards[0])?.isOwn ? 'fadeInRight' : 'fadeInLeft'}
            style={{
              position: 'absolute',
              left: modalPosition.x,
              top: modalPosition.y - 100,
              alignItems: messages.find((message) => message.id === selectedCards[0])?.isOwn ? 'flex-start' : 'flex-end',
            }}
          >
            <View style={[styles.modalContent, { backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.white }]}>
              {Emojidata.map((item) => (
                <TouchableOpacity key={item.id}  >
                  <Text style={[styledComponentsSheet.emojiText]}>{item.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        )}
      </GestureHandlerRootView>

    </Fragment>

  )
}

export default ChatView

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  modalContent: {
    height: 42,
    width: 221,
    borderRadius: 20,
    padding: 4,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 2
  },
  sndMsgCard: {
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 10,
    marginTop: 5
  },
  receiveMsgCard: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 10,
    marginTop: 5
  },
});