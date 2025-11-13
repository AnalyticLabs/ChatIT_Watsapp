import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { BottomTabBar, CustomModal } from '../../components/commonComponents';
import { flex1, mt20 } from '../../components/commonStyles';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { recentstatusData } from '../../utils/data/statusData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { StatusView1 } from '../../utils/svg';
import { StatusItem, statusText } from './allStatus';
import { AfterNavigation, BeforeNavigation, StatusOptionModalComponent } from './statusContainer';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export type MutedStatusProps = {
    selectedCards: number[];
    onCardSelection: (cardId: number) => void;
}

const MutedStatusScreen = (props: MutedStatusProps) => {
    const navigation = useNavigation();
    const [callOptionModal, setCallOptionModal] = useState(false);
    const route = useRoute();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const showSecondScreen = route.params?.showSecondScreen === true;

    const closeCallOptionModal = () => {
        setCallOptionModal(false);
    }

    const handleStatusItemClick = (id: number) => {
        navigation.navigate(screenName.FriendStatus as never)
    };


    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, flex1, mt20,styledComponentsSheet.whiteBgContact]}>
            <View style={flex1}>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:80}}>
                    {showSecondScreen ? <AfterNavigation /> : <BeforeNavigation />}
                    {statusText(labels.viewedStatus)}
                    <View style={{ opacity: 0.5 }}>
                        {recentstatusData.map((data, index) => (
                            <StatusItem key={data.id} data={data} onPress={() => handleStatusItemClick(data.id)} statusView={<StatusView1 />} isMuted={true} />
                        ))}
                    </View>
                </ScrollView>
            </View>
            <CustomModal
                isVisible={callOptionModal}
                width={DevWidth * 0.55}
                height={DevHeight * 0.4}
                modalData={<StatusOptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 160}
                onClose={closeCallOptionModal}
            />
            <BottomTabBar />
        </View >
    )
};

export default MutedStatusScreen;