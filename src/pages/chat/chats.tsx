import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import AllChats from '../../components/chats/allChats';
import ArchiveChats from '../../components/chats/archiveChats';
import PinnedChats from '../../components/chats/pinnedChats';
import { ChatHeader, CustomActionBar, CustomActionBarSecond, TabControl } from '../../components/commonComponents';
import { flex1 } from '../../components/commonStyles';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { useGetConversationsMutation } from '../../api/chatApi';
import { getProfileService, getUsersService } from '../../services/Auth';
import { getConversationsService } from '../../services/Chat';
import { showErrorToast } from '../../utils/functions';

export type chatProps = {

}

const Chats = (props: chatProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.AllChats);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const [getConversations, { isLoading: isConversationsLoading }] = useGetConversationsMutation();

    const [chats, setChats] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [allChatsData, setAllChatsData] = useState<any[]>([]);

    const getUser = async () => {
        try {
            setLoading(true);
            const res = await getProfileService();
            setUser(res?.data?.data || []);
            fetchChats(res?.data?.data);
            console.log(res?.data?.data, 'user-=-=-=-=-=-=-=-=-=-');

        } catch (err) {
            console.log("❌ Fetch chats error:", err);
        } finally {
            setLoading(false);
        }
    };
console.log(user,'---user');

    const fetchChats = async (user: any) => {
        try {
            setLoading(true);
            const res = await getConversationsService();
            const data = res?.data?.data || [];
            // transform response for UI
            const formatted = data.map((chat: any) => {
                const otherUser = chat.participants.find((p: any) => p._id !== user?._id);
                const lastMsg = chat.lastMessage;
                console.log(otherUser, 'otherUser----+++++++++', user?._id);
                return {
                    id: chat._id,
                    otherUserId: otherUser?._id,
                    name: otherUser?.phoneNumber || 'Unknown',
                    isOnline: otherUser?.isOnline || false,
                    unreadCount: chat.unreadCount || 0,
                    lastMessage: lastMsg?.content || '',
                    lastMessageType: lastMsg?.contentType || 'text',
                    lastMessageTime: new Date(lastMsg?.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                };
            });

            setAllChatsData(formatted);
            console.log('✅ Chats fetched:', formatted.length);
        } catch (err) {
            console.log('❌ Error fetching chats:', err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUser()
            // fetchChats();
        }, [])
    );


    const tabs = [
        { label: labels.AllChats },
        { label: labels.PinnedChat, count: 5 },
        { label: labels.ArchiveChat, count: 3 },
    ];

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
        setSelectedCards([]);
    };

    const handleCardSelection = (cardId: number) => {
        const updatedSelectedCards = [...selectedCards];

        if (updatedSelectedCards.includes(cardId)) {
            updatedSelectedCards.splice(updatedSelectedCards.indexOf(cardId), 1);
        } else {
            updatedSelectedCards.push(cardId);
        }

        setSelectedCards(updatedSelectedCards);
    };

    interface HeaderProps {
        selectedTab: string;
        selectedCards: number[];
        handleTabPress: (tab: string) => void;
    }

    const Header = ({ selectedTab, selectedCards, handleTabPress }: HeaderProps) => {
        const isCustomActionBar = selectedCards.length > 0;
        const showCustomActionBarSecond = selectedTab === labels.ArchiveChat && isCustomActionBar;
        const navigation = useNavigation();

        return (
            <>
                {showCustomActionBarSecond ? (
                    <CustomActionBarSecond itemNumber={selectedCards.length} />
                ) : isCustomActionBar ? (
                    <CustomActionBar text={selectedCards.length} selectedCardsCount={selectedCards.length} />
                ) : (
                    <ChatHeader title={labels.Chats} icon1Navigate={() => { }} icon3Navigate={() => { navigation.navigate(screenName.NewChat as never) }} icon2Navigate={() => { navigation.navigate(screenName.ForwardTo as never) }} />
                )}
            </>
        );
    };

    return (
        <Fragment>
            <View style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar1 : colors.primaryVar3 }}>
                <Header
                    selectedTab={selectedTab}
                    selectedCards={selectedCards}
                    handleTabPress={handleTabPress}
                />
                <View style={flex1}>
                    <TabControl tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                    {selectedTab === labels.AllChats && (
                        <AllChats
                            currentUserId={user?._id}
                            chats={allChatsData}
                            selectedCards={selectedCards}
                            onCardSelection={handleCardSelection}
                        />
                    )}
                    {selectedTab === labels.PinnedChat && (
                        <PinnedChats selectedCards={selectedCards}
                            onCardSelection={handleCardSelection} />
                    )}
                    {selectedTab === labels.ArchiveChat && (
                        <ArchiveChats
                            selectedCards={selectedCards}
                            onCardSelection={handleCardSelection} />
                    )}
                </View>
            </View>
        </Fragment>
    )
}

export default Chats