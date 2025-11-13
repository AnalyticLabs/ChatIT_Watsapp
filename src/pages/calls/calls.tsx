import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import AllCalls from '../../components/calls/allCalls';
import IncomingCalls from '../../components/calls/incomingCalls';
import MissedCalls from '../../components/calls/missedCalls';
import OutgoingCalls from '../../components/calls/outgoingCalls';
import { ChatHeader, CustomcallActionBar, TabControl } from '../../components/commonComponents';
import { flex1 } from '../../components/commonStyles';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';

export type CallsProps = {

}

const Calls = (props: CallsProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.AllCalls);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    const tabs = [
        { label: labels.AllCalls },
        { label: labels.Incoming },
        { label: labels.Outgoing },
        { label: labels.Missed },
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

    const Header = ({ selectedTab, selectedCards, handleTabPress } : HeaderProps ) => {
        const isCustomActionBar = selectedCards.length > 0;

        return (
            <>
                { isCustomActionBar ? (
                    <CustomcallActionBar text={selectedCards.length} selectedCardsCount={selectedCards.length} />
                ) : (
                    <ChatHeader title={labels.Calls} isCall = {true} />
                )}
            </>
        );
    };

    return (
        <Fragment>
            <View style = {{backgroundColor: isDarkTheme ? colors.darkModeVar1 : colors.primaryVar3,flex:1}}>
                <Header selectedTab={selectedTab} selectedCards={selectedCards} handleTabPress={handleTabPress} />
                <View style={flex1}>
                    <TabControl tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                    {selectedTab === labels.AllCalls && (
                        <AllCalls selectedCards = {selectedCards} onCardSelection={handleCardSelection} />
                    )}
                    {selectedTab === labels.Incoming && (
                        <IncomingCalls selectedCards = {selectedCards} onCardSelection={handleCardSelection} />
                    )}
                    {selectedTab === labels.Outgoing && (
                        <OutgoingCalls selectedCards = {selectedCards} onCardSelection={handleCardSelection} />
                    )}
                    {selectedTab === labels.Missed && (
                        <MissedCalls selectedCards = {selectedCards} onCardSelection={handleCardSelection} />
                    )}
                </View>
            </View>
        </Fragment>
    )
}

export default Calls