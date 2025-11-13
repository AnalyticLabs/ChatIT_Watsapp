import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { RadioBtn, ToggleSwitch } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import {
    flex1,
    flexRow,
    mh20,
    mh30,
    mh5,
    ml10,
    mt15,
    mt20,
    mt8,
    mv10,
    mv20,
    mv30,
    pv10,
} from '../../components/commonStyles';
import {

    commonText,
} from '../../components/commonText';
import { commonView, } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { groupsData, lastSee, profilePic, statusPrivacydata } from '../../utils/data/modalData';
import { privacyData } from '../../utils/data/privacyData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { SearchHeader } from '../media/mediaCommonHeader';

export type PrivacyProps = {};

const Privacy = (props: PrivacyProps) => {
    const navigation = useNavigation();
    const [toggleVisible, setToggleVisible] = useState(false);
    const [statusPrivacyOptionModal, setStatusPrivacyOptionModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [lastSeenOptionModal, setLastSeenOPtionModal] = useState(false);
    const [profileOptionModal, setProfileOptionModal] = useState(false);
    const [groupModal, setGroupModal] = useState(false);

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status);
    }

    const handleLastSeenModal = () => {
        setLastSeenOPtionModal(!lastSeenOptionModal)
    }

    const handleProfilePicModal = () => {
        setProfileOptionModal(!profileOptionModal)
    }

    const handleGroupModal = () => {
        setGroupModal(!groupModal)
    }

    const handleStatusPrivacyOptionModal = () => {
        setStatusPrivacyOptionModal(!statusPrivacyOptionModal)
    }

    const handleToggle = () => {
        setToggleVisible(!toggleVisible)
    }

    const openModal = (id: number, screenName: string | undefined) => {
        if (id === 4) {
            handleStatusPrivacyOptionModal();
        } else if (id === 1) {
            handleProfilePicModal();
        } else if (id === 2) {
            handleLastSeenModal()
        } else if (id === 3) {
            handleGroupModal();
        } else {
            navigation.navigate(screenName as never);
        }
    };

    const StatusPrivacyOption = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

        const handleCancelButton = () => {
            setIsCancelButtonActive(true);
            setStatusPrivacyOptionModal(false);
        };

        const handleDeleteChatButton = () => {
            setIsCancelButtonActive(false);
        };

        const handleStatusSelect = (status: string, id: number) => {
            setSelectedStatus(status);
            if (id === 2) {
                navigation.navigate(screenName.StatusMyContactExcept as never);
                setStatusPrivacyOptionModal(false)
            }
            else if (id === 3) {
                navigation.navigate(screenName.StatusOnlyShareWith as never);
                setStatusPrivacyOptionModal(false)
            }
        };

        return (
            <View style={[mh20]} >
                <Text style={[commonText.h16font600Black]}>Status Privacy</Text>
                <Text style={[mt20,commonText.h14GreyVar4Bold400]}>Who can see my status updates</Text>
                <View style={[mt15]}>
                    {
                        statusPrivacydata.map((item) => {
                            return (
                                <View style={[flexRow, mv10]} key={item.id}>
                                    <View>
                                        <RadioBtn
                                            key={item.id}
                                            selected={selectedStatus === item.name}
                                            onPress={() => handleStatusSelect(item.name, item.id)}
                                        />
                                    </View>
                                    <Text style={[ml10,commonText.h14BlackVar2Bold400Text]}>{item.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={[commonView.rowSpaceBetween,mv20]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.SaveChanges}
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




    const GroupsModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleStatusSelect = (status: string) => {
            setSelectedStatus(status);
        };
        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setGroupModal(false)
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };

        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.Groups}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.groupsCont}</Text>
                    <View style={[mt15]}>
                        {groupsData.map((data, index) => {
                            return (
                                <View key={data.id}  >
                                    <TouchableOpacity>
                                        <View style={[mv10, flexRow]}  >
                                            <RadioBtn
                                                key={data.id}
                                                selected={selectedStatus === data.status}
                                                onPress={() => handleStatusSelect(data.status)}
                                            />
                                            <Text style={[mh5,commonText.h14font400Gray4]}>{data.status}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={[mv30, mh20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.cancel}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        onChange={handleCancelButtonClick}
                        borderWidth={isCancelButtonActive ? 0 : 1} />
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.saveChange}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    }

    const SettingsModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleStatusSelect = (status: string) => {
            setSelectedStatus(status);
        };
        const handleCancelButtonClick = () => {
            setIsCancelButtonActive(true);
            setProfileOptionModal(false)
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };

        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.profilePhoto}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.profilePicContent}</Text>
                    <View style={[mt15]}>
                        {profilePic.map((data, index) => {
                            return (
                                <View key={data.id}  >
                                    <TouchableOpacity onPress={() => handleStatusSelect(data.status)}>
                                        <View style={[mv10, flexRow]}  >
                                            <RadioBtn
                                                key={data.id}
                                                selected={selectedStatus === data.status}
                                                onPress={() => { }}
                                            />
                                            <Text style={[mh5,commonText.h14font500Gray4]}>{data.status}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
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
                        title={labels.saveChange}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    }

    const LastSeenModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleCancelButton = () => {
            setIsCancelButtonActive(true);
            setLastSeenOPtionModal(false);
        };

        const handleSaveChangesClick = () => {
            setIsCancelButtonActive(true);
        };
        return (
            <View>
                <View style={[mh30]}>
                    <Text style={[commonText.h16font600Black]}>{labels.lastSeenandOnline}</Text>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.lastseenCon}</Text>
                    <View style={[mt15]}>
                        {profilePic.map((data, index) => {
                            return (
                                <View key={data.id}  >
                                    <TouchableOpacity onPress={() => { handleStatusSelect(data.status) }}>
                                        <View style={[mv10, flexRow]}  >
                                            <RadioBtn
                                                key={data.id}
                                                selected={selectedStatus === data.status}
                                                onPress={() => { }}
                                            />
                                            <Text style={[mh5,commonText.h14font500Gray4]}>{data.status}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                    <Text style={[mt8,commonText.h14font400Gray4]}>{labels.onlineCon}</Text>
                    <View style={[mt15]}>
                        {lastSee.map((data, index) => {
                            return (
                                <View key={data.id}  >
                                    <TouchableOpacity onPress={() => { handleStatusSelect(data.status) }}>
                                        <View style={[mv10, flexRow]}  >
                                            <RadioBtn
                                                key={data.id}
                                                selected={selectedStatus === data.status}
                                                onPress={() => { }}
                                            />
                                            <Text style={[mh5,commonText.h14font500Gray4]}>{data.status}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={[mv30, mh20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.cancel}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        onChange={handleCancelButton}
                        borderWidth={isCancelButtonActive ? 0 : 1} />
                    <SmallButton
                        width={DevWidth / 3.15}
                        title={labels.saveChange}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        onChange={handleSaveChangesClick}
                        borderWidth={isCancelButtonActive ? 1 : 0} />
                </View>
            </View>
        )
    }
    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                {/* <SearchHeader headerText={labels.privacy} /> */}
                <View style={[mh20, mt20]}>
                    {privacyData.map((data, index) => {
                        return (
                            <View style={[commonView.rowSpaceBetween]} key={data.id}>
                                <View style={[pv10]}>
                                    <TouchableOpacity
                                        onPress={() => openModal(data.id, data.screenName)}>
                                        <Text style={[commonText.h16fontNormalGray4]}>{data.heading}</Text>
                                    </TouchableOpacity>
                                    <Text style={[commonText.h12fontNormalGray]}>{data.status}</Text>
                                </View>
                                {index === 4 ? (
                                    <ToggleSwitch value={toggleVisible} onToggle={handleToggle} />

                                ) : (
                                    <CustomIcon name='chevron-right' size={15} color={colors.greyVar2} type='octicons' />
                                )}
                            </View>
                        )
                    })}
                </View>
                <IconModal
                    isVisible={statusPrivacyOptionModal}
                    onClose={() => handleStatusPrivacyOptionModal()}
                    contentComponent={<StatusPrivacyOption />}
                    iconName='stop-circle-outline'
                    iconType='MaterialCommunityIcons'
                    iconSize={24}
                />
                <IconModal isVisible={profileOptionModal}
                    onClose={() => handleProfilePicModal()}
                    contentComponent={<SettingsModal />}
                    iconName={'image-plus'}
                    iconType='MaterialCommunityIcons'
                    iconSize={25}
                />
                <IconModal isVisible={lastSeenOptionModal}
                    onClose={() => handleLastSeenModal()}
                    contentComponent={<LastSeenModal />}
                    iconName={'stop-circle-outline'}
                    iconType={'MaterialCommunityIcons'}
                    iconSize={25}
                />
                <IconModal isVisible={groupModal}
                    onClose={() => handleGroupModal()}
                    contentComponent={<GroupsModal />}
                    iconName={'group'}
                    iconType={'MaterialIcons'}
                    iconSize={25} />
            </View>
        </Fragment>
    );
};

export default Privacy