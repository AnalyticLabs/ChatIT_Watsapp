import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform, Modal as RNmodal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import { styledComponentsSheet } from '../styledComponent/styledComponent';
import { isDark, useTheme } from '../theme/themeContext';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { chooseTheme } from '../utils/data/modalData';
import { DevHeight, DevWidth } from '../utils/device';
import { labels } from '../utils/labels';
import { screenName } from '../utils/screenName';
import { CreatePasswordLogo2 } from '../utils/svg';
import { All, ReactMsgTabControl, Tick } from './chatViewComponents';
import { LongPurpleButton, SmallButton } from './commonButtons';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh10, mt15, pr10, spaceBetween } from './commonStyles';
import { commonText } from './commonText';
import { commonView, } from './commonView';


export const ThemeModal: React.FC<CommonModalProps & { onThemeSelect: (themeName: string) => void, selectedTheme: string }> = ({
  isVisible,
  onClose,
  onThemeSelect,
  selectedTheme,

}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);

  };
  const { toggleTheme } = useTheme();
  useEffect(() => {
    async function loadSelectedTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem('selectedTheme');
        if (storedTheme !== null) {
          setSelectedStatus(storedTheme);
        }
      } catch (error) {
        console.error('Error loading selected theme from AsyncStorage:', error);
      }
    }
    loadSelectedTheme();
  }, []);

  const renderRadio = (status: string) => {
    return (
      <TouchableOpacity style={[commonView.radioButton]}
        onPress={() => handleStatusSelect(status)}>

        <View style={[commonView.radioButtonRound,{
          backgroundColor: selectedStatus === status ? colors.primaryVar3 : isDark() ? colors.darkModeVar6 : colors.white,
          borderColor: isDark() ? colors.darkModeVar5 : colors.greyVar2
        }]}>
          {selectedStatus === status && (
            <View style={[commonView.selectedRadioBtn]} />
          )}
        </View>
        <Text style={[mh10,commonText.h16fontNormalGray4]}>{status}</Text>
      </TouchableOpacity>
    );
  };

  const resetRadioSelection = () => {
    setSelectedStatus(selectedTheme);
    setIsCancelButtonActive(false);
  };

  const buttonPress = async () => {
    setIsCancelButtonActive(true);
    if (selectedStatus !== selectedTheme) {
      onThemeSelect(selectedStatus);
      console.log(`Selected status: ${selectedStatus}`);
      try {
        await AsyncStorage.setItem('selectedTheme', selectedStatus);
      } catch (error) {
        console.error('Error saving selected theme to AsyncStorage:', error);
      }
      toggleTheme();
      onClose();
    }
  };

  return (
    <View style={[flex1]}>
      <RNmodal transparent={true} animationType="slide" visible={isVisible} onRequestClose={onClose}>
        <View style={[styledComponentsSheet.modalContainer]}>
          <View style={[styledComponentsSheet.halfCircle2]} />
           <View style={[styledComponentsSheet.modalContent]}>
            <View >
              <View style={{ backgroundColor: colors.primaryVar3, height: 47, width: 47, borderRadius: 25, bottom: 43, alignSelf: 'center', justifyContent: 'center' }}>
                <View style={[alignItemsCenter, justyfyCenter]}>
                  <CustomIcon name="device-mobile" size={16} color={colors.white} type={'octicons'} />
                </View>
              </View>
              <Text style={[{ bottom: 15 },commonText.h18fontBoldBlack]}>{labels.chooseTheme}</Text>
              <View >
                {chooseTheme.map((data, index) => {
                  return (
                    <View key={data.id} style={[flexRow, spaceBetween]}>
                      <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity>
                          <View key={data.id}>
                            {renderRadio(data.status)}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
              <View style={[mt15, commonView.rowSpaceBetween]}>
                <SmallButton
                  width={DevWidth / 3.15}
                  title={labels.cancel}
                  backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                  textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                  onChange={() => {
                    resetRadioSelection();
                    onClose();
                  }}
                  borderWidth={isCancelButtonActive ? 0 : 1} />
                <SmallButton
                  width={DevWidth / 3.15}
                  title={labels.ok}
                  backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                  textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                  onChange={buttonPress}
                  borderWidth={isCancelButtonActive ? 1 : 0} />
              </View>
          </View>
        </View>
      </RNmodal>
    </View>
  );
};


export type CommonModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export const CommonModal: React.FC<CommonModalProps> = ({
  isVisible,
  onClose,
}) => {
  const navigation = useNavigation();

  const myAppBtnPress = () => {
    navigation.navigate(screenName.Chats as never);
    onClose();
  }

  return (
    <View style={{ flex: 1 }}>
      <RNmodal transparent={true} animationType="none" visible={isVisible}
        onRequestClose={onClose}>
        <View style={[styledComponentsSheet.modalContainer]}>
          <View style={[styledComponentsSheet.halfCircle]} />
           <View style={[styledComponentsSheet.modalContent]}>
            <View style={[styledComponentsSheet.modalBg]}>
              <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 50 }}>
                <CreatePasswordLogo2 />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 25 }}>
                <Text style={[commonText.h18fontBoldBlack]}>{labels.pwdChanged}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={[commonText.h14font400Gray4]}>{labels.pwdChangedContent}</Text>
                <Text style={[commonText.h14font400Gray4]}>{labels.suceessfully}</Text>
              </View>
              <View style={{ margin: 20 }}>
                <LongPurpleButton
                  title={labels.backToMyapp}
                  onChange={myAppBtnPress}
                />
              </View>
            </View>
          </View>
        </View>
      </RNmodal>
    </View>
  );
};

// =========================================================  ICON MODAL  =======================================
interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  contentComponent: React.ReactNode;
  iconName: string;
  iconType: string;
  iconSize: number;
}

export const IconModal: React.FC<CustomModalProps> = ({ isVisible, onClose, contentComponent, iconName, iconType, iconSize }) => {
  return (
    <RNmodal transparent={true} animationType="none" visible={isVisible} onRequestClose={onClose} >
      <View style={{ flex: 1 }}>
        <View style={[styledComponentsSheet.modalContainer]}>
          <View style={[styledComponentsSheet.halfCircle2]} />
           <View style={[styledComponentsSheet.modalContent1]}> 
            <View style={{ backgroundColor: colors.primaryVar3, height: 47, width: 47, borderRadius: 25, bottom: 25, alignSelf: 'center', justifyContent: 'center' }}>
              <View style={[alignItemsCenter, justyfyCenter]}>
                <CustomIcon name={iconName} size={iconSize} color={colors.white} type={iconType} />
              </View>
            </View>
            {contentComponent}
          </View>
        </View>
      </View>
    </RNmodal>
  );
};
// =========================================================  Emoji MODAL  =======================================

export const ReactModal = ({ isVisible, closeModal, selectedTab, handleTabPress, tabs }) => {
  return (
    <Modal
      style={{ margin: 0, position: 'absolute', bottom: 0, width: '100%' }}
      isVisible={isVisible}
      onBackdropPress={closeModal}>

      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: DevHeight / 3.3,
              backgroundColor: isDark() ? colors.darkModeVar4 : colors.white,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}
          >
            <TouchableOpacity style={[commonView.greyTabView]} />
            <View style={{ paddingTop: 20 }}>
              <ReactMsgTabControl tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
              {selectedTab === "All" && (
                <All />
              )}
              {selectedTab === "👍" && <All />}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// =========================================================  EDIT MODAL  =======================================
export const EditModal = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0.5} style={{ alignItems: 'flex-end', marginTop: DevHeight / 1.5 }}>
      <View style={[flexRow]}>
        <Text style={[pr10,commonText.h12font400Grey]}>8:17 PM</Text>
        <Tick />

      </View>

      <View style={{ backgroundColor: isDark() ? colors.darkModeVar4 : colors.primaryVar1, borderTopLeftRadius: 8, borderBottomRightRadius: 8, borderBottomLeftRadius: 8, padding: 10, marginTop: 5 }}>
        <Text style={[commonText.h14font400grey3black2]}>
          Thank You Mam
        </Text>
      </View>
    </Modal >
  );
};

export const EditModal2 = ({ isVisible, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [editText, setEditText] = useState('Thank You Mam')

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0.5} style={{ margin: 0, position: 'absolute', bottom: 0, width: '100%' }}>
      <View style={{ alignItems: 'flex-end', marginTop: DevHeight / 1.5, bottom: 50, marginHorizontal: 20 }}>
        <View style={[flexRow]}>
          <Text style={[pr10,commonText.h12font400Grey]}>8:17 PM</Text>
          <Tick />
        </View>
        <View style={{ backgroundColor: isDark() ? colors.darkModeVar4 : colors.primaryVar1, borderTopLeftRadius: 8, borderBottomRightRadius: 8, borderBottomLeftRadius: 8, padding: 10, marginTop: 5 }}>
          <Text style={[commonText.h14font400grey3black2]}>
            Thank You Mam
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: isDark() ? colors.darkModeVar1 : colors.white, alignItems: 'center', height: DevHeight / 9.5, paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ width: DevWidth / 1.3, height: 40, backgroundColor: isDark() ? colors.darkModeVar6 : colors.white, borderColor: isDark() ? 'rgba(78,80,114,0.5)' : colors.greyVar2, borderWidth: 2, borderRadius: 6, marginTop: 30, bottom: 8 }}>
          <View style={{ flexDirection: 'row', width: '80%', height: 40, paddingHorizontal: 2, alignItems: 'center' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
              <CustomIcon name='smiley' type="octicons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
              <TextInput
                value={editText}
                style={{ flex: 1, marginLeft: 5, color: isDark() ? colors.greyVar3 : colors.greyVar4, fontSize: 14, fontWeight: '400' }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ backgroundColor: colors.primaryVar3, height: 40, width: 40, borderRadius: 12, marginLeft: 15, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', bottom: Platform.OS === 'ios' ? 20 : 16 }}
        >
          <CustomIcon name='done' type="MaterialIcons" color={colors.white} size={18} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};