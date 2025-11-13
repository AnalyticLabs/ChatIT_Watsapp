import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { flexRow, pb10, pl15, spaceBetween } from '../components/commonStyles';
import { isDark } from '../theme/themeContext';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { labels } from '../utils/labels';
import { ProfileImg } from '../utils/png';
import { commonText } from './commonText';

export const DayDetails = () => {
  return (
    <>
      <View style={{ height: 28, backgroundColor: isDark() ? colors.darkModeVar6 : colors.white, width: 115, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginHorizontal: 100 }}>
        <Text style={[commonText.h14BlackVar2Bold400Text]}>{labels.chatViewToday}</Text>
      </View>
    </>
  );
};

export const Bluetick = () => {
  return (
    <View>
      <CustomIcon name='check-all' type="MaterialCommunityIcons" color={colors.blueVar1} size={16} />
    </View>
  )
}

export const Tick = () => {
  return (
    <View>
      <CustomIcon name='check-all' type="MaterialCommunityIcons" color={colors.greyVar4} size={16} />
    </View>
  )
}

export const Reactmsg = () => {
  return (
    <View style={{ paddingTop: 5 }} >
      <View style={{ backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, height: 22, width: 40, borderRadius: 10, flexDirection: 'row', marginRight: 230 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
          <Text style={[commonText.h12font400Grey]} >1</Text>
          <Text style={[commonText.h12font400Black]}>👍</Text>
        </View>
      </View>
    </View>
  )
}

export const All = () => {
  return (
    <View style={{ marginHorizontal: 25, marginTop: 20 }}>
      <View style={[flexRow, spaceBetween]}>
        <View style={flexRow}>
          <Image source={ProfileImg} />
          <View style={[pl15, spaceBetween]}>
            <Text style={[commonText.h15Blackvar2Bold500]}>Horace Keene</Text>
            <Text style={[commonText.h14GreyVar4Bold400]}>Active 4Min Ago</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[commonText.h16BlackText]}>👍</Text>
        </View>
      </View>
    </View>
  )
}

export const ForwardView = () => {
  return (
    <View style={{ height: 26, width: 26, backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, borderRadius: 13 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <CustomIcon name='share-outline' type="MaterialCommunityIcons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
      </View>
    </View>
  )
}

export const AddView = () => {
  return (
    <View style={{ height: 26, width: 26, backgroundColor: isDark() ? 'rgba(78,80,114,0.3)' : colors.white, borderRadius: 13 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <CustomIcon name='plus' type="octicons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
      </View>
    </View>
  )
}

interface TabControlProps {
  tabs: { label: string; count?: number }[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const ReactMsgTabControl: React.FC<TabControlProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tabInfo) => (
        <View style={{ marginLeft: 15 }} key={tabInfo.label}>
          <TouchableOpacity
            style={[
              { borderBottomWidth: activeTab === tabInfo.label ? 3 : 0 },
              { borderBottomColor: activeTab === tabInfo.label ? (isDark() ? colors.white : colors.primaryVar3) : "" },
            ]}
            onPress={() => onTabPress(tabInfo.label)}
          >
            <View style={[flexRow, pb10]}>
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tabInfo.label ? (isDark() ? colors.white : colors.primaryVar3) : colors.primaryVar1 },
                ]}
              >
                {tabInfo.label}
              </Text>
              {tabInfo.count !== undefined && tabInfo.count > 0 && (
                <View
                  style={[
                    styles.roundNumber, { backgroundColor: isDark() ? colors.darkModeVar6 : 'rgba(128, 0, 128, 0.2)' },
                  ]}
                >
                  <Text style={styles.roundNumberText}>{tabInfo.count}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    flexDirection: 'row',
  },
  roundNumber: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundNumberText: {
    color: colors.greyVar4,
    fontSize: 12,
  },
});