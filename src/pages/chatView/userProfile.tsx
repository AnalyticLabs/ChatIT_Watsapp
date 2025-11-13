import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { MultiSelectOption, ProfileCard } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, alignSelfCenter, flexRow, justyfyCenter, mr15, mr5, mt15, pl13, spaceBetween } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { Groups, Header, InfoCard, MediaCard } from '../../components/profile/profilecomponents';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { colorIconsData } from '../../utils/data/profileData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';


const UserProfile = () => {
    const [blockmodal, setBlockModal] = useState(false);
    const [reportmodal, setReportModal] = useState(false);
    const navigation = useNavigation();

    const openModal = (id: number) => {
        if (id === 4) {
            handleBlockModal()
        } else if (id === 5) {
            handleReportModal()
        } else if (id === 1) {
            navigation.navigate(screenName.StarredMsg as never);
        } else if (id === 3) {
            navigation.navigate(screenName.VerifyCode as never);
        }
    };

    const handleBlockModal = () => {
        setBlockModal(!blockmodal)
    }

    const handleReportModal = () => {
        setReportModal(!reportmodal)
    }

    const BlockUserModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setBlockModal(false)
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(false);
        };

        return (
            <View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={[{ textAlign: 'center', bottom: 5 },commonText.h16font600Black]}>Block Horace Keene?</Text>
                    <Text style={{
                        textAlign: 'center', fontSize: 14, fontWeight: '400', lineHeight: 20, color: colors.greyVar4, marginTop: 5
                    }}>Blocked contacts will no longer be able to call you or send you messages.</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 15, marginTop: 18 }}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButtonClick}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.Block}
                        onChange={handleSaveChangesClick}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? (isDark() ? colors.redVar3 : colors.primaryVar3) : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                    />
                </View>
            </View>
        )
    }


    const ReportUserModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const [checkBox, setCheckBox] = useState(false);

        const handleCheckBox = () => {
            setCheckBox(!checkBox);
        }
        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setReportModal(false)
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

    return (
        <Fragment>
            <SafeAreaView style={[{ backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0, flex: 1 },commonView.mainContainer]}>
                <Header />
                <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                    <ProfileCard />
                    <InfoCard />
                    <MediaCard />
                    <Groups />
                    <View>
                        {
                            colorIconsData.map((item) => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => openModal(item.id)}
                                    >
                                        <View style={[flexRow, spaceBetween, { paddingBottom: 12 }]}>
                                            <View style={[flexRow]}>
                                                <View style={{ height: 26, width: 26, borderRadius: 6, backgroundColor: item.bgcolor, alignItems: 'center', justifyContent: 'center' }}>
                                                    <CustomIcon name={item.iconName} size={item.iconSize} type={item.iconType} color={item.iconColor} />
                                                </View>
                                                <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                                    <Text style={[commonText.h14Blackvar2Bold500]}>{item.name}</Text>
                                                </View>
                                            </View>
                                            {
                                                item.id === 1 ? (
                                                    <View style={[flexRow, alignItemsCenter, justyfyCenter]}>
                                                        <View style={[styles.roundNumber, { backgroundColor: isDark() ? colors.darkModeVar6 : 'rgba(97, 97, 97, 0.15) ' }, mr5]}>
                                                            <Text style={[commonText.h14GreyVar4Bold400]}>10</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <CustomIcon name='chevron-right' color={isDark() ? colors.greyVar0 : colors.greyVar4} size={24} type="MaterialIcons"
                                                            />
                                                        </View>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <CustomIcon name='chevron-right' color={isDark() ? colors.greyVar0 : colors.greyVar4} size={24} type="MaterialIcons"
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <IconModal
                    isVisible={blockmodal}
                    onClose={() => handleBlockModal()}
                    contentComponent={<BlockUserModal />}
                    iconName='block-flipped'
                    iconType='MaterialIcons'
                    iconSize={22}
                />
                <IconModal
                    isVisible={reportmodal}
                    onClose={() => handleBlockModal()}
                    contentComponent={<ReportUserModal />}
                    iconName='block-flipped'
                    iconType='MaterialIcons'
                    iconSize={22}
                />
            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    roundNumber: {
        height: 24,
        width: 24,
        borderRadius: 15,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default UserProfile