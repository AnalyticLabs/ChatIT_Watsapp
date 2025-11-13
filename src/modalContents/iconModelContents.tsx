import React, { useState } from 'react';
import { Text, View } from "react-native";
import { SmallButton } from '../components/commonButtons';
import { MultiSelectOption } from '../components/commonComponents';
import { alignSelfCenter, flexRow, mr15, mt15 } from '../components/commonStyles';
import { commonText,  } from '../components/commonText';
import { isDark } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { DevWidth } from '../utils/device';
import { labels } from '../utils/labels';

export const ReportUserModal = () => {
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const handleCheckBox = () => {
    setCheckBox(!checkBox);
  }
  const handleCancelButtonClick = () => {
    setIsCancelButtonActive(true);
  };

  const handleSaveChangesClick = () => {
    setIsCancelButtonActive(false);
  };

  return (
    <View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={[{ textAlign: 'center', bottom: 5 },commonText.h16font600Black]}>Report Horace Keene?</Text>
        <Text style={{
          textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 20, color: colors.greyVar4, marginTop: 5
        }}>If you block this contact and clear the chat, messages will only be removed from this device and your devices</Text>
        <View style={[flexRow, mt15, alignSelfCenter]}>
          <View style={mr15}>
            <MultiSelectOption selectedColor={colors.primaryVar3} unselectedColor={colors.greyVar6} isSelected={checkBox} onSelect={handleCheckBox} />
          </View>
          <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400', lineHeight: 16, color: colors.greyVar4 }}>Block contact and delete chat</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 15, marginTop: 18 }}>
        <SmallButton
          title={labels.cancel}
          backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
          textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
          onChange={handleCancelButtonClick}
          borderWidth={isCancelButtonActive ? 0 : 2}
          width={DevWidth / 3.15}
        />
        <SmallButton
          title={labels.Report}
          backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
          textColor={isCancelButtonActive ? (isDark() ? colors.redVar3 : colors.primaryVar3) : colors.white}
          onChange={handleSaveChangesClick}
          borderWidth={isCancelButtonActive ? 2 : 0}
          width={DevWidth / 3.15}
        />
      </View>
    </View>
  )
}

export const ClearChatModal = () => {
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
  const handleCancelButtonClick = () => {
    setIsCancelButtonActive(true);
  };
  const [checkBox, setCheckBox] = useState(false);
  const handleSaveChangesClick = () => {
    setIsCancelButtonActive(false);
  };

  const handleCheckBox = () => {
    setCheckBox(!checkBox);
  }
  return (
    <View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={[{ bottom: 5 },commonText.h16font600Black]}>Clear This Chat?</Text>
        <Text style={{
          fontSize: 14, fontWeight: '400', lineHeight: 20, color: colors.greyVar4, marginTop: 5
        }}>Messages will only be removed from this device and your devices.</Text>
        <View style={[flexRow, mt15]}>
          <View style={mr15}>
            <MultiSelectOption selectedColor={colors.primaryVar3} unselectedColor={colors.greyVar6} isSelected={checkBox} onSelect={handleCheckBox} />
          </View>
          <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 16, color: colors.greyVar4 }}>Also delete media received in this chat from the device gallery.</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 15, marginTop: 18 }}>
        <SmallButton
          title={labels.cancel}
          backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
          textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
          onChange={handleCancelButtonClick}
          borderWidth={isCancelButtonActive ? 0 : 2}
          width={DevWidth / 3.15}
        />
        <SmallButton
          title={labels.ClearChat}
          backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
          textColor={isCancelButtonActive ? (isDark() ? colors.redVar3 : colors.primaryVar3) : colors.white}
          onChange={handleSaveChangesClick}
          borderWidth={isCancelButtonActive ? 2 : 0}
          width={DevWidth / 3.15}
        />
      </View>
    </View>
  )
}
