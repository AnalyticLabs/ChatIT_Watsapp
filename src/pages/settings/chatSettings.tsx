import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { ToggleSwitch } from '../../components/commonComponents';
import { IconModal, ThemeModal, } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh10, mh20, mh30, mt20, mt30, mt8, mv20, ph15, spaceBetween } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { commonView, } from '../../components/commonView';
import {styledComponentsSheet } from '../../styledComponent/styledComponent';
import { isDark, useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { chatSettings } from '../../utils/data/chatsData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';


export type ChatSettingsProps = {
}

const ChatSettings = (props: ChatSettingsProps) => {
    const navigation = useNavigation();
    const [toggleVisible, setToggleVisible] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('');
    const [archieveModal, setArchieveModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [clearAllModal, setClearAllModal] = useState(false);
    const [themeModal, setThemeModal] = useState(false);
    const { theme } = useTheme();

    const isDarkTheme = theme === 'dark';

    const handleThemeSelect = async (themeName: string) => {
        setSelectedTheme(themeName);
        await AsyncStorage.setItem('selectedTheme', themeName);
    }

    const handleArchievModal = () => {
        setArchieveModal(!archieveModal)
    }

    const handleDeleteAllModal = () => {
        setDeleteModal(!deleteModal)
    }

    const handleClearAllModal = () => {
        setClearAllModal(!clearAllModal)
    }

    const handleThemeModal = () => {
        setThemeModal(!themeModal)
    }

    const handleToggle = () => {
        setToggleVisible(!toggleVisible);
    }

    const openModal = (id: number) => {
        if (id === 4) {
            handleArchievModal();
        } else if (id === 6) {
            handleDeleteAllModal()
        } else if (id === 5) {
            handleClearAllModal()
        } else if (id === 1) {
            handleThemeModal()
        }
    }

    useEffect(() => {
        retrieveSelectedTheme();
    }, []);

    const retrieveSelectedTheme = async () => {
        const theme = await AsyncStorage.getItem('selectedTheme');
        if (theme) {
            setSelectedTheme(theme);
        } else {
            setSelectedTheme(labels.light)
        }
    };

    const ArchieveModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setArchieveModal(false);
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };

        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.archieveAllChats}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.archiveChatMessage}</Text>
                </View>
                <View style={[mv20, mh20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.cancel}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        onChange={handleCancelButtonClick}
                        borderWidth={isCancelButtonActive ? 0 : 1} />
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.ok}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    };

    const DeleteAllModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const [isChecked, setIsChecked] = useState(false);

        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setDeleteModal(false)
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };
        const toggleCheckbox = () => {
            setIsChecked(!isChecked);
        };

        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.deleteAllChats1}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.deleteMsg}</Text>
                    <View style={[flexRow, mv20, alignItemsCenter]}>
                        <TouchableOpacity
                            onPress={toggleCheckbox}>
                            <View style={[{ backgroundColor: isChecked ? colors.primaryVar3 : 'transparent' },styledComponentsSheet.checkBox]}>
                                {isChecked && (
                                    <CustomIcon name="check" size={16} color={colors.white} type={'MaterialCommunityIcons'} />)}
                            </View>
                        </TouchableOpacity>
                        <Text style={[ph15,commonText.h14font400Gray4]}>{labels.deleteMsg1}</Text>
                    </View>
                </View>
                <View style={[mv20, mh20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.cancel}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        onChange={handleCancelButtonClick}
                        borderWidth={isCancelButtonActive ? 0 : 1} />
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.ok}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    };

    const ClearAllModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const [isChecked2, setIsChecked2] = useState(false);
        const [isChecked1, setIsChecked1] = useState(false);

        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setClearAllModal(false)
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };
        const toggleCheckbox2 = () => {
            setIsChecked2(!isChecked2);
        };

        const toggleCheckbox1 = () => {
            setIsChecked1(!isChecked1);
        };

        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.clearAllChats1}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.deleteMsg}</Text>
                    <View style={[flexRow, mv20, alignItemsCenter]}>
                        <TouchableOpacity
                            onPress={toggleCheckbox2}>
                            <View style={[{ backgroundColor: isChecked2 ? colors.primaryVar3 : 'transparent' },styledComponentsSheet.checkBox]}>
                                {isChecked2 && (
                                    <CustomIcon name="check" size={16} color={colors.white} type={'MaterialCommunityIcons'} />)}
                            </View>
                        </TouchableOpacity>
                        <Text style={[ph15,commonText.h14font400Gray4]}>{labels.deleteMsg1}</Text>
                    </View>
                    <View style={[flexRow, alignItemsCenter]}>
                        <TouchableOpacity
                            onPress={toggleCheckbox1}>
                            <View style={[{ backgroundColor: isChecked1 ? colors.primaryVar3 : 'transparent' },styledComponentsSheet.checkBox]}>
                                {isChecked1 && (
                                    <CustomIcon name="check" size={16} color={colors.white} type={'MaterialCommunityIcons'} />)}
                            </View>
                        </TouchableOpacity>
                        <Text style={[ph15,commonText.h14font400Gray4]}>{labels.deleteMsg2}</Text>
                    </View>
                </View>
                <View style={[mv20, mt30, mh20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.cancel}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        onChange={handleCancelButtonClick}
                        borderWidth={isCancelButtonActive ? 0 : 1} />
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.ok}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    };

    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar1 : colors.white },commonView.topContainerWhiteCardBase]}>
                    <View style={[flexRow]}>
                        <TouchableOpacity style={[mh10, justyfyCenter, alignItemsCenter]} onPress={navigation.goBack}>
                            <CustomIcon name='chevron-left' size={20} color={isDarkTheme ? colors.white : colors.black} type='entypo' />
                        </TouchableOpacity>
                        <Text style={[{ color: isDarkTheme ? colors.white : colors.black },commonText.h18BlackText,]} >{labels.chat}</Text>
                    </View>
                </View>
                <View style={[mh20, mt20]}>
                    <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h16fontNormalGray4]}>{labels.theme} </Text>
                    <Text style={[commonText.h12fontNormalGray]}>{selectedTheme}</Text>
                    {chatSettings.map((data, index) => {
                        return (
                            <View key={data.id} style={[flexRow, spaceBetween]}>
                                <View style={{ paddingVertical: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => openModal(data.id)}>
                                        <Text style={[{ color: isDarkTheme ? colors.greyVar0 : colors.greyVar4 },commonText.h16fontNormalGray4]}>
                                            {data.chatSettings}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {index === 2 ? (
                                    <ToggleSwitch value={toggleVisible} onToggle={handleToggle} />
                                ) : (
                                    <CustomIcon name='chevron-right' size={15} color={isDarkTheme ? colors.primaryVar2 : colors.black} type='octicons' />
                                )}
                            </View>
                        );
                    })}
                </View>
                <ThemeModal
                    isVisible={themeModal}
                    onClose={() => handleThemeModal()}
                    onThemeSelect={handleThemeSelect}
                    selectedTheme={selectedTheme}
                />
                <IconModal
                    isVisible={archieveModal}
                    onClose={() => handleArchievModal()}
                    contentComponent={<ArchieveModal />}
                    iconName={'archive'}
                    iconType='Foundation'
                    iconSize={27} />
                <IconModal isVisible={clearAllModal}
                    onClose={() => handleClearAllModal()}
                    contentComponent={<ClearAllModal />}
                    iconName={'trash-outline'}
                    iconType='Ionicons'
                    iconSize={27} />
                <IconModal isVisible={deleteModal}
                    onClose={() => handleDeleteAllModal()}
                    contentComponent={<DeleteAllModal />}
                    iconName={'trash-outline'}
                    iconType='Ionicons'
                    iconSize={27} />
            </View>
        </Fragment>
    )
};

export default ChatSettings;