import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { CustomModal } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh10, mh20, mt10, mt20, mv20, pb10, pl10, pl13, pl15, pt10, spaceBetween } from '../../components/commonStyles';
import {  commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { contactThreeDotIcon } from '../../utils/data/contactData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import Docs from './docs';
import ImageScreen from './image';
import Link from './link';
import Video from './video';

export type MediaProps = {

}



interface TabControlProps {
    tabs: { label: string; count?: number }[];
    activeTab: string;
    onTabPress: (tab: string) => void;
}

export const TabControl: React.FC<TabControlProps> = ({ tabs, activeTab, onTabPress }) => {
    return (
        <View style={[styles.tabContainer]}>
            {tabs.map((tabInfo) => (
                <View style={[flex1]} key={tabInfo.label}>
                    <View style={{ borderBottomWidth: activeTab === tabInfo.label ? 0 : 2, borderBottomColor: (isDark() ? colors.darkModeVar1 : colors.greyVar7) }}>
                        <TouchableOpacity
                            style={[
                                { borderBottomWidth: activeTab === tabInfo.label ? 2 : 0 },
                                { borderBottomColor: activeTab === tabInfo.label ? (isDark() ? colors.white : colors.primaryVar3) : "" },
                            ]}
                            onPress={() => onTabPress(tabInfo.label)}
                        >
                            <View style={[flexRow, pb10]}>
                                <Text
                                    style={[
                                        styles.tabText,
                                        { color: activeTab === tabInfo.label ? (isDark() ? colors.white : colors.primaryVar3) : (isDark() ? colors.blackVar1 : colors.greyVar3) },
                                    ]}
                                >
                                    {tabInfo.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};


interface MediaHeaderProps {
    Imagess?: boolean;
    height?: number;
    startDot?: boolean;
    imageViewModal?: boolean;
}

export const MediaHeader = (props: MediaHeaderProps) => {
    const [selectedTab, setSelectedTab] = useState('Image');
    const navigation = useNavigation();

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };
    const tabs = [
        { label: "Image" },
        { label: "Video" },
        { label: "Docs" },
        { label: "Links" },
    ];

    const imageViewModalData = [
        {
            id: 1,
            iconName: 'reply-outline',
            iconType: "MaterialCommunityIcons",
            text: labels.Forward,
        },
        {
            id: 2,
            iconName: 'chatbox-ellipses-outline',
            iconType: 'Ionicons',
            text: labels.Showinchat,
        },
        {
            id: 3,
            iconName: 'thumbs-down',
            iconType: 'Feather',
            text: labels.Report,
        },
        {
            id: 4,
            iconName: 'trash-2',
            iconType: 'Feather',
            text: labels.Delete,
        },
    ]

    const [optionModal, setOptionModal] = useState(false);

    const handleOptionModal = () => {
        setOptionModal(!optionModal)
    }

    const OptionModalComponent = () => {
        return (
            <View>
                {
                    imageViewModalData.map((item) => {
                        if (props.imageViewModal && item.id === 3) {
                            return null;
                        } else {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}
                                >
                                    <View style={flexRow}>
                                        <View style={[alignItemsCenter, justyfyCenter]}>
                                            <CustomIcon
                                                name={item.iconName}
                                                size={16}
                                                color={isDark() ? colors.greyVar3 : colors.blackVar1}
                                                type={item.iconType}
                                            />
                                        </View>
                                        <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                            <Text style={[commonText.h14blackVar1bold400Text]}>{item.text}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })
                }
            </View>
        )
    }

    return (
        <View style={{ flex: props.Imagess ? 1 : 0 }}>
            <View style={[commonView.topContainerWhiteCardBase, { height: props.height }]} />

            <View style={[{ marginHorizontal: 25, marginTop: 15 }, flex1, justyfyCenter]}>
                <View style={[flexRow, spaceBetween]}>
                    <View style={[flexRow]}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={pt10}>
                            <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.white : colors.blackVar2} size={16} type="Ionicons" />
                        </TouchableOpacity>
                        <View style={[flexRow]}>
                            <TouchableOpacity style={[pl10]}>
                                <Image source={require('../../../assets/images/png/profile.png')} />
                            </TouchableOpacity>
                            <View style={pl13}>
                                <Text style={[{ lineHeight: 23 }, commonText.h15Blackvar2Bold500]}>{labels.horaceKeene}</Text>
                                <Text style={[{ lineHeight: 20 }, commonText.h14GreyVar4Bold400,]}>{labels.online}</Text>
                            </View>
                        </View>
                    </View>
                    {props.startDot &&
                        <View style={[flexRow, alignItemsCenter]}>
                            <CustomIcon name='star' color={isDark() ? colors.white : colors.greyVar4} size={20} type="Feather" />
                            <TouchableOpacity style={pl10} onPress={handleOptionModal}>
                                <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={22} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
            {props.Imagess && <View style={{ marginHorizontal: 5, marginBottom: 22 }}>
                <TabControl tabs={tabs} activeTab={selectedTab} onTabPress={handleTabPress} />
            </View>}

            {selectedTab === "Image" && (
                <ScrollView>
                    {props.Imagess && <ImageScreen />}
                </ScrollView>
            )}
            {selectedTab === "Docs" && (
                <ScrollView>
                    {props.Imagess && <Docs />}
                </ScrollView>
            )}
            {selectedTab === "Video" && (
                <ScrollView>
                    {props.Imagess && <Video />}
                </ScrollView>
            )}
            {selectedTab === "Links" && (
                <ScrollView>
                    {props.Imagess && <Link />}
                </ScrollView>
            )}
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.47}
                modalData={<OptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 120 : 60}
                onClose={() => setOptionModal(false)}
            />
        </View>
    )

}


interface TextInputHeaderProps {
    height?: number;
    onBack: () => void

}

export const TextInputHeader = (props: TextInputHeaderProps) => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={[commonView.topContainerWhiteCardBase]} height={DevHeight / 7.5}{...props}>
                <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                    <View style={[flexRow, spaceBetween]}>
                        <View style={[flexRow]}>
                            <TouchableOpacity style={[alignItemsCenter, justyfyCenter]}
                                onPress={props.onBack}
                            >
                                <View style={{ top: 8 }}>
                                    <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.white : colors.black} size={16} type="Ionicons" />
                                </View>
                            </TouchableOpacity>
                            <View style={[pl13]}>
                                <TextInput placeholder='Search...' style={{
                                    borderBottomWidth: 1, borderBottomColor: isDark() ? 'rgba(78,80,114,0.5)' : colors.greyVar2, width: DevWidth / 1.35,
                                    fontSize: 14, fontWeight: '400', color: colors.blackVar1
                                }} />
                            </View>
                        </View>
                        <View style={[flexRow, alignItemsCenter]}>
                            <TouchableOpacity style={[pl10, mt10]} >
                                <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={22} color={isDark() ? colors.white : colors.greyVar4} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
interface StarredAndVerifycodeHeaderProps {
    height?: number;
    headerText: string;
    isSearchDot: boolean;
    pencilNavigate?: () => void;
    onPress?: () => void;
    openModal?: boolean
}

export const StarredAndVerifycodeHeader = (props: StarredAndVerifycodeHeaderProps) => {
    const navigation = useNavigation();
    const [optionModal, setOptionModal] = useState(false);
    const handleOptionModal = () => {
        setOptionModal(!optionModal);
    }

    const StarMessageModal = () => {
        return (
            <View>
                <TouchableOpacity style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                    <View style={flexRow}>
                        <View style={[alignItemsCenter, justyfyCenter]}>
                            <CustomIcon name='star' color={isDark() ? colors.greyVar4 : colors.blackVar1} size={18} type="Feather" />
                        </View>
                        <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                            <Text style={[commonText.h14blackVar1bold400Text]}>Unstar All</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            <View
                style={[
                    commonView.topContainerWhiteCardBase,
                    { height: DevHeight / 7.5 },
                ]}
                {...props}
            >
                <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                    <View style={[flexRow, spaceBetween]}>
                        <View style={[flexRow]}>
                            <TouchableOpacity style={[alignItemsCenter, justyfyCenter]}
                                onPress={navigation.goBack}
                            >
                                <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.white : colors.blackVar2} size={16} type="Ionicons" />
                            </TouchableOpacity>
                            <View style={pl13}>
                                <Text style={[commonText.h18BlackText,]}>{props.headerText}</Text>
                            </View>
                        </View>
                        {
                            props.isSearchDot ? (
                                <View style={[flexRow, alignItemsCenter]}>
                                    <TouchableOpacity onPress={props.onPress}>
                                        <CustomIcon name="search" size={20} color={isDark() ? colors.white : colors.greyVar4} type="Ionicons" />
                                    </TouchableOpacity>
                                    {props.openModal ? (
                                        <TouchableOpacity style={pl15} onPress={handleOptionModal} >
                                            <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                                        </TouchableOpacity>
                                    ) :
                                        <TouchableOpacity style={pl15} >
                                            <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            ) : (
                                <View style={[flexRow, alignItemsCenter]}>
                                    <CustomIcon name="search" size={20} color={isDark() ? colors.white : colors.greyVar4} type="Ionicons" />
                                    <TouchableOpacity onPress={props.pencilNavigate} style={pl15} >
                                        <CustomIcon name='pencil' type="octicons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.47}
                modalData={<StarMessageModal />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={() => setOptionModal(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 18,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row',
        marginLeft: 14,
        padding: 4
    },
});

// ====================== Search Header ==========================
interface SearchHeader {
    height?: number;
    headerText: string;
    searchIcon?: boolean;
    editIcon?: boolean;
    editDotIcon?: boolean;
}

export const SearchHeader = (props: SearchHeader) => {
    const [optionModal, setOptionModal] = useState(false);
    const [statusPrivacyOptionModal, setStatusPrivacyOptionModal] = useState(false);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

    const handleCancelButtonClick = () => {
        setIsCancelButtonActive(true);

    };

    const handleSaveChangesClick = () => {
        setIsCancelButtonActive(false);
        setStatusPrivacyOptionModal(false)
    };

    const handleCallOptionModal = () => {
        setOptionModal(!optionModal);
    }

    const navigation = useNavigation()


    const OptionModalComponent = () => {
        return (
            <View style={[flex1]}>
                {contactThreeDotIcon.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => {
                            if (item.id === 3) {
                                setOptionModal(false)
                                setStatusPrivacyOptionModal(true)
                            }
                        }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                            <View style={[flexRow]}>
                                <CustomIcon name={item.iconName} type={item.iconType} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                                <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                    <Text style={[commonText.h15Grey]}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
        )
    }


    const GroupsModal = () => {
        return (
            <View style={[mh20]}>
                <Text style={[commonText.h16font600Black]}>Block Number ?</Text>
                <Text style={[mt20, commonText.h14font400Gray4]}>You will no longer receive calls or texts</Text>
                <View style={[flexRow]}>
                    <Text style={[commonText.h14font400Gray4]}>form </Text>
                    <Text style={[commonText.h14font400Black]}>9988776655</Text>
                </View>
                <View style={[commonView.rowSpaceBetween, mv20]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleSaveChangesClick}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.block}
                        onChange={handleCancelButtonClick}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                    />
                </View>
            </View>
        )
    }


    return (
        <View>
            <View
                style={[
                    commonView.topContainerWhiteCardBase,
                    { height: DevHeight / .10 },
                ]}
                {...props}
            >

                <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                    <View style={[flexRow, spaceBetween]}>
                        <View style={[flexRow]}>
                            <TouchableOpacity style={[justyfyCenter, alignItemsCenter, { marginTop: 2 }]}
                                onPress={navigation.goBack}
                            >
                                <CustomIcon name='chevron-left' color={isDark() ? colors.white : colors.black} size={18} type="entypo" />
                            </TouchableOpacity>
                            <Text style={[pl13,commonText.h18BlackText,]}>{props.headerText}</Text>
                        </View>
                        {props.editIcon &&
                            <CustomIcon name='pencil' size={18} color={isDark() ? colors.white : colors.greyVar4} type='SimpleLineIcons' />}
                        {props.searchIcon &&
                            <CustomIcon name="search" size={20} color={isDark() ? colors.white : colors.greyVar4} type="Ionicons" />
                        }
                        {props.editDotIcon &&
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity style={[mh10]}
                                    onPress={() => { navigation.navigate(screenName.EditContact as never) }}>
                                    <CustomIcon name='pencil' type="octicons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCallOptionModal}>
                                    <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </View>
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.47}
                modalData={<OptionModalComponent />}
                marginTop={Platform.OS === 'ios' ? 100 : 48}
                onClose={() => setOptionModal(false)}
            />
            <IconModal
                isVisible={statusPrivacyOptionModal}
                onClose={() => setStatusPrivacyOptionModal(false)}
                contentComponent={<GroupsModal />}
                iconName='block-flipped'
                iconType='MaterialIcons'
                iconSize={24}
            />
        </View>
    )
}