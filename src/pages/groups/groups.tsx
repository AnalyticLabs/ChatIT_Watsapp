import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import { ChatHeader, TabControl } from '../../components/commonComponents';
import { flex1 } from '../../components/commonStyles';
import AllGroups from '../../components/groups/allGroups';
import ArchiveGroups from '../../components/groups/archiveGroups';
import PinnedGroups from '../../components/groups/pinnedGroups';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';

export type GroupsProps = {
    
    }


const Groups = (props: GroupsProps) => {
    const [selectedTab, setSelectedTab] = useState(labels.AllGroups);
    const tabs = [
        { label: labels.AllGroups },
        { label: labels.PinnedGroups},
        { label: labels.ArchiveGroup},
    ];
    const {theme} = useTheme();
    const isDarkTheme = theme === 'dark';

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };
    const navigation = useNavigation();

    return (
        <Fragment>
            <View style = {{flex:1,backgroundColor: isDarkTheme ? colors.darkModeVar1 : colors.primaryVar3}}> 
                <ChatHeader title={labels.Groups} icon3Navigate={() => { navigation.navigate(screenName.CreateGroup as never)}} />
                <View style={flex1}>
                    <TabControl tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
                    {selectedTab === labels.AllGroups && (
                        <AllGroups />
                    )}
                    {selectedTab === labels.PinnedGroups && (
                        <PinnedGroups />
                    )}
                    {selectedTab === labels.ArchiveGroup && (
                        <ArchiveGroups />
                    )}
                </View>
            </View>
        </Fragment>
    )
}

export default Groups