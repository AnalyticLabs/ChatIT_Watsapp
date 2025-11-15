import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SmallButton } from '../../components/commonButtons';
import { RadioBtn } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justifyEnd, justyfyCenter, mb15, mh20, mh25, mh30, ml10, ml15, ml30, mr30, mt20, mv10, mv20, ph10, ph15 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';
import { isDark, useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { LanguagesData } from '../../utils/data/modalData';
import { settingsData } from '../../utils/data/settingsData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { SettingAvatar } from '../../utils/svg';
import { logout } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAll } from '../../utils/storage';

export type settingsScreenProps = {
}

const SettingsScreen = (props: settingsScreenProps) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    console.log(isAuthenticated, '======isAuthenticated');

    const navigation = useNavigation()
    const [selectScreen, setSelectScreen] = useState(1);
    const [logoutOptionModal, setLogoutOptionModal] = useState(false);
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const dispatch = useAppDispatch()

    const handleCancelButton = () => {
        setIsCancelButtonActive(true);
        setLanguageModalVisible(false);
    };

    const handleDeleteChatButton = () => {
        setIsCancelButtonActive(false);
        navigation.navigate(screenName.Privacy as never);
    };

    const HandleLanguageModal = () => {
        setLanguageModalVisible(!isLanguageModalVisible);
    };

    const closeLanguageModal = () => {
        setLanguageModalVisible(false);
    };

    const handleLogoutOptionModal = () => {
        setLogoutOptionModal(!logoutOptionModal)
    }

    const handleTabPress = (screenId: number, screenNameNavigate: string) => {
        setSelectScreen(screenId);
        if (screenId === 11) {
            handleLogoutOptionModal();
        } else if (screenId === 6) {
            HandleLanguageModal();
        } else {
            navigation.navigate(screenNameNavigate as never)
        }
    };

    const handleLanguageSelect = (status: string) => {
        setSelectedStatus(status);
    };

    const LogoutOption = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleCancelButton = () => {
            setIsCancelButtonActive(true);
            setLogoutOptionModal(false);
        };

        const handleDeleteChatButton = async () => {
            setIsCancelButtonActive(false);
            await clearAll()
            dispatch(logout());
            // navigation.navigate(screenName.LoginEmail as never);
        };

        return (
            <View style={[mh20]} >
                <Text style={[commonText.h16font600Black]}>Logout?</Text>
                <Text style={[commonText.h14blackVar1bold400Text, mt20]} >Are you sure you want to logout?</Text>
                <View style={[commonView.rowSpaceBetween, mv20]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.Logout}
                        onChange={handleDeleteChatButton}
                        backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                        textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                    />
                </View>
            </View>
        )
    }

    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar1 : colors.white }, commonView.topContainerWhiteCardBase]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 22, justifyContent: 'space-between' }}>
                        <Text style={[commonText.h18BlackText, { color: isDarkTheme ? colors.white : colors.black }]}>Settings</Text>
                        <CustomIcon name='search-outline' size={20} color={isDarkTheme ? colors.white : colors.black} type='Ionicons' />
                    </View>
                </View>
                <ScrollView>
                    <View style={[mh25]}>
                        <TouchableOpacity onPress={() => { navigation.navigate(screenName.AccountSettings as never) }} >
                            <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar4 : colors.primaryVar4 }, flex1, styles.cardSurface, commonView.rowSpaceBetween]}>
                                <View style={flexRow}>
                                    <SettingAvatar />
                                    <View style={[ph15]}>
                                        <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.black }, commonText.h15font500Black]}>Mark Villiams</Text>
                                        <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>Hello, I am using ChatIt</Text>
                                    </View>
                                </View>
                                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.primaryVar4 }, commonView.iconBackground]}>
                                    <CustomIcon name='qr-code' size={20} color={colors.black} type='MaterialIcons' />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View>
                            {settingsData.map((settingsDatas) => {
                                const isSelected = settingsDatas.id === selectScreen
                                return (
                                    <View key={settingsDatas.id} style={[flexRow, mt20]}>
                                        <TouchableOpacity style={[styledComponentsSheet.inputContainerCard]} key={settingsDatas.id} onPress={() => handleTabPress(settingsDatas.id, settingsDatas.screenName)}>
                                            <View style={[flexRow, alignItemsCenter]}>
                                                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.primaryVar4 }, commonView.iconBackground]}>
                                                    <CustomIcon name={settingsDatas.iconName} type={settingsDatas.iconType} size={settingsDatas.iconSize} color={isDarkTheme ? colors.greyVar3 : colors.primaryVar3} />
                                                </View>
                                                <TouchableOpacity key={settingsDatas.id} onPress={() => handleTabPress(settingsDatas.id, settingsDatas.screenName)} >
                                                    <Text style={[ph10, commonText.h15font500Black, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>{settingsDatas.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[justyfyCenter]}>
                                                <TouchableOpacity>
                                                    <CustomIcon name={settingsDatas.iconName1} type={settingsDatas.iconType1} size={settingsDatas.iconSize} color={isDarkTheme ? colors.greyVar3 : colors.black} />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <IconModal
                isVisible={logoutOptionModal}
                onClose={() => handleLogoutOptionModal()}
                contentComponent={<LogoutOption />}
                iconName='logout'
                iconType='AntDesign'
                iconSize={26}
            />
            <View>
                <Modal
                    style={{ margin: 0, position: 'absolute', bottom: 0, width: '100%' }}
                    isVisible={isLanguageModalVisible}
                    onBackdropPress={closeLanguageModal}
                >
                    <View>
                        <View
                            style={{
                                height: DevHeight / 3,
                                backgroundColor: isDark() ? colors.darkModeVar4 : colors.white,
                                paddingTop: 25,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10
                            }}
                        >
                            <View style={[ml30]}>
                                <Text style={[ph10, commonText.h15font500Black, { color: isDarkTheme ? colors.greyVar0 : colors.black }]}>Select App Language</Text>
                            </View>
                            <View style={[commonView.commonLineDividerGrey, { backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, mv20]} />
                            <View style={[mh30]}>
                                {
                                    LanguagesData.map((item) => {
                                        return (
                                            <View style={[flexRow, mv10]} key={item.id}>
                                                <View>
                                                    <RadioBtn
                                                        key={item.id}
                                                        selected={selectedStatus === item.name}
                                                        onPress={() => handleLanguageSelect(item.name)}
                                                    />
                                                </View>
                                                <Text style={[ml10, commonText.h14BlackVar2Bold400Text]}>{item.name}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={[flex1, justifyEnd, mb15]}>
                                <View style={[commonView.rowSpaceBetween]}>
                                    <View style={{ flex: 0.85 }} />
                                    <View style={[flexRow, flex1]}>
                                        <View style={[]}>
                                            <SmallButton
                                                title={labels.cancel}
                                                onChange={handleCancelButton}
                                                backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                                                textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                                                borderWidth={isCancelButtonActive ? 0 : 1}
                                                width={DevWidth / 4.5}
                                            />
                                        </View>
                                        <View style={[mr30, ml15]}>
                                            <SmallButton
                                                title={labels.Save}
                                                onChange={handleDeleteChatButton}
                                                backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                                                textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                                                borderWidth={isCancelButtonActive ? 1 : 0}
                                                width={DevWidth / 4.5}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Fragment>
    )
};

export default SettingsScreen;

const styles = StyleSheet.create({
    cardSurface: {
        padding: 10,
        marginTop: 20,
        flexDirection: 'row',
        borderRadius: 8,
    },
    topContainerWhiteCard: {
        backgroundColor: 'white',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        elevation: 4,
        height: DevHeight / 10,
        justifyContent: 'center'
    }
});