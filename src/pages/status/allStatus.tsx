import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBar, CustomModal } from '../../components/commonComponents';
import { alignItemsCenter, flex1, justyfyCenter, mh10, mh20, mt20, mt5 } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { mutedStatusData, statusData, viewedStatusData } from '../../utils/data/statusData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { StatusView, StatusView1 } from '../../utils/svg';
import { AfterNavigation, BeforeNavigation, StatusOptionModalComponent } from './statusContainer';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export interface StatusData {
  id: number;
  image: any;
  name: string;
  time: string;
}

export interface RecentStatusItemProps {
  data: StatusData;
  onPress: () => void;
  statusView?: React.ReactNode;
  isMuted?: boolean;
}

export const StatusItem: React.FC<RecentStatusItemProps> = ({ data, onPress, statusView, isMuted }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View>
      <View style={isMuted ? [styles.card2, { backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.white, }]
        :
        [styles.card1, { backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.white, }]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[alignItemsCenter, justyfyCenter]}>
            {statusView}
            <Image source={data.image} style={styles.img} />
          </View>
        </TouchableOpacity>
        <View style={[mh10, mt5]}>
          <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h15font500Black]}>{data.name}</Text>
          <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Gray4]}>{data.time}</Text>
        </View>
      </View>
    </View>
  )
};

export const statusText = (value: string,) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View style={[mh20]}>
      <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black },commonText.h14font400Black]}>{value}</Text>
    </View>
  )
};

export type AllStatusProps = {
  selectedCards: number[];
  onCardSelection: (cardId: number) => void;
}

const AllStatus = (props: AllStatusProps) => {
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
    navigation.navigate(screenName.FriendStatus as never);
  }

  return (
    <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }, flex1, mt20,styledComponentsSheet.whiteBgContact]}>
      <View style={flex1}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 80 }}>
          {showSecondScreen ? <AfterNavigation /> : <BeforeNavigation />}
          {statusText(labels.recentStatus)}
          <View>
            {statusData.map((data, index) => (
              <StatusItem key={data.id} data={data} onPress={() => handleStatusItemClick(data.id)} statusView={<StatusView />} />
            ))}
          </View>
          <View style={[mt20]}>
            {statusText(labels.viewedStatus)}
          </View>
          <View>
            {viewedStatusData.map((data) => (
              <StatusItem key={data.id} data={data} onPress={() => handleStatusItemClick(data.id)} statusView={<StatusView1 />} />
            ))}
          </View>
          <View style={[mt20]}>
            {statusText(labels.mutedStatus)}
          </View>
          <View style={{ opacity: 0.5 }}>
            {mutedStatusData.map((data) => (
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryVar4,
    margin: 20,
    padding: 10,
  },
  card1: {
    padding: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 18,
    flexDirection: 'row',
    borderRadius: 6
  },
  card2: {
    padding: 10,
    marginHorizontal: 20,
    marginTop: 18,
    flexDirection: 'row',
    borderRadius: 6,
  },
  img: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 100
  }

});

export default AllStatus