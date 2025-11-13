import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { CardHeaderText, CustomModal } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mb15, mh20, mr5, mt10, mt15, mt20, mt3, mt5, mv20, pl10, pl13, pt5, spaceBetween } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView, } from '../../components/commonView';
import { isDark, useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { colorIconsData, colorIconsDataSecond, groupMediaData, groupsData } from '../../utils/data/groupsData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { GroupProfileAvatarIcon } from '../../utils/svg';
import { SafeAreaView } from 'react-native';

export type GroupInfoProps = {

}

export const Header = () => {
    const [optionModal, setOptionModal] = useState(false);
    const navigation = useNavigation();
    const handleOptionModal = () => {
        setOptionModal(!optionModal)
    }


    const OptionModalComponent = () => {
        return (
            <View>
                <TouchableOpacity style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                    <View style={flexRow}>
                        <View style={[alignItemsCenter, justyfyCenter]}>
                            <CustomIcon name="pencil" size={20} color={isDark() ? colors.greyVar3 : colors.blackVar1} type="octicons" />
                        </View>
                        <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                            <Text style={[commonText.h14blackVar1bold400Text]}>Edit</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ marginVertical: 20 }}>
            <View style={[flexRow, spaceBetween, { marginHorizontal: 25 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.white : colors.greyVar4} size={16} type="Ionicons" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOptionModal}>
                    <CustomIcon name='dots-vertical' type="MaterialCommunityIcons" size={22} color={isDark() ? colors.white : colors.greyVar4} />
                </TouchableOpacity>
            </View>
            <CustomModal
                isVisible={optionModal}
                width={DevWidth * 0.49}
                modalData={<OptionModalComponent />}
                onClose={() => setOptionModal(false)}
            />
        </View>

    )
}

export const GroupProfileCard = () => {
    return (
        <View>
            <View style={{ marginTop: 50 }}>
                <View style={{
                    backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, height: DevHeight / 4.5, width: '100%', borderRadius: 20, elevation: 1, justifyContent: 'center',
                    shadowOpacity: 0.1, shadowColor: colors.greyVar0
                }}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text style={[commonText.h18Blackvar2Bold600]}>{labels.horaceKeene}</Text>
                        <Text style={[commonText.h14GreyVar4Bold400,]} >Group . 35 Participants</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
                                <CustomIcon name='video-outline' type="MaterialCommunityIcons" size={22} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                            <View style={[{ alignItems: 'center', justifyContent: 'center' }, pl10]}>
                                <CustomIcon name='phone' type="Feather" size={18} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                            <View style={[{ alignItems: 'center', justifyContent: 'center' }, pl10]}>
                                <CustomIcon name='chatbox-ellipses-outline' type="Ionicons" size={18} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', overflow: 'hidden' }}>
                <GroupProfileAvatarIcon />
            </View>
        </View>
    )
}

export const GroupInfoCard = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const socialMediaIcon = () => {
        return (
            <>
                <View style={[flexRow]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CustomIcon name='sc-facebook' type="EvilIcons" size={24} color={colors.black} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CustomIcon name='twitter' type="entypo" size={20} color={colors.black} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CustomIcon name='youtube' type="MaterialCommunityIcons" size={22} color={colors.black} />
                    </View>
                </View>
            </>
        )
    }
    const InfoCardData = [{
        "Phone": "9988776655",
        "Email Address": 'info@example.com',
        "Social Media": socialMediaIcon()
    }]

    return (
        <View style={mt20}>
            <View style={[commonView.rowSpaceBetween]}>
                <CardHeaderText text='Info' />
                <View style={[justyfyCenter, alignItemsCenter]}>
                    <CustomIcon name='pencil-outline' type='MaterialCommunityIcons' color={isDark() ? colors.greyVar3 : colors.black} size={20} />
                </View>
            </View>
            <View style={mt10}>
                <Text style={[mt5, commonText.h12fontBold400blackVar2]}>{labels.GroupDescription}</Text>
                <Text style={[mt5, commonText.h14BlackVar2Bold400Text]}>{labels.HelloIamUsingChatIt}</Text>
                <Text style={[{ color: colors.greyVar4 }, mt5, commonText.h12fontBold400GreyVar4]}>{labels.DummyText}</Text>
            </View>
            <View style={[mt15, mb15]}>
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />
            </View>
        </View>
    );
}

export const MediaCard = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View>
            <TouchableOpacity style={[flexRow, spaceBetween]} onPress={() => { }}>
                <CardHeaderText text='Media' />
                <View style={flexRow}>
                    <View style={[styles.roundNumber, { backgroundColor: 'rgba(97, 97, 97, 0.15) ' }, mt5, mr5]}>
                        <Text style={[styles.roundNumberText, { color: isDark() ? colors.greyVar4 : colors.greyVar4, }]}>68</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '180deg' }] }}>
                        <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} type="Ionicons"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.gridContainer}>
                {groupMediaData.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.gridItem}
                        onPress={() => {
                        }}
                    >
                        <Image
                            source={item.image}
                            style={styles.gridItemImage}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={[mt15, mb15]}>
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />
            </View>
        </View>
    )
}

export const Groups = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View>
            <View style={[commonView.rowSpaceBetween]}>
                <CardHeaderText text='35 Participants' />
                <View style={[justyfyCenter, alignItemsCenter]}>
                    <CustomIcon name='search' type='Feather' color={isDark() ? colors.greyVar3 : colors.black} size={20} />
                </View>
            </View>
            {groupsData.map((item, index) => (
                <View style={{}} key={index}>
                    {
                        item.id === 1 ? (
                            <View style={[styles.cardSurface, flex1, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, }]}>
                                <View style={[flex1, commonView.rowSpaceBetween]}>
                                    <View style={[flexRow, spaceBetween]}>
                                        <View>
                                            <Image source={item.img} style={[{ height: 40, width: 40, borderRadius: 100 }, mt3]} />
                                            <View style={[{ backgroundColor: item.status === 'active' ? '#20c997' : '' }, item.status === 'active' ? styles.status : null]} />
                                        </View>
                                        <View style={pl10}>
                                            <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                            <Text style={[{ color: colors.greyVar4 }, pt5, commonText.h14GreyVar4Bold400Text]}>{item.personName}</Text>
                                        </View>
                                    </View>
                                    <View style={[mr5, mt3]}>
                                        <CardHeaderText text='Admin' />
                                    </View>
                                </View>
                            </View>
                        ) : item.id === 2 ? (
                            <View style={[styles.cardSurface, flex1, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, }]}>
                                <View style={[flex1, commonView.rowSpaceBetween]}>
                                    <View style={[flexRow, spaceBetween]}>
                                        <View>
                                            <Image source={item.img} style={[{ height: 40, width: 40, borderRadius: 100 }, mt3]} />
                                            <View style={[{ backgroundColor: item.status === 'active' ? '#20c997' : '' }, item.status === 'active' ? styles.status : null]} />
                                        </View>
                                        <View style={pl10}>
                                            <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                            <Text style={[{ color: colors.greyVar4 }, pt5, commonText.h14GreyVar4Bold400Text]}>{item.personName}</Text>
                                        </View>
                                    </View>
                                    <View style={[mr5, mt3]}>
                                        <CardHeaderText text='Admin' />
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View style={[styles.cardSurface, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white, }]}>
                                <View>
                                    <Image source={item.img} style={[{ height: 40, width: 40, borderRadius: 100 }, mt3]} />
                                    <View style={[{ backgroundColor: item.status === 'active' ? '#20c997' : '' }, item.status === 'active' ? styles.status : null]} />
                                </View>
                                <View style={pl10}>
                                    <Text style={[commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                    <Text style={[{ color: colors.greyVar4 }, pt5, commonText.h14GreyVar4Bold400Text]}>{item.personName}</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
            ))}
            <View style={[mt20, mb15]}>
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />
            </View>
        </View>
    )
}

const ColorIconTab = () => {
    const navigation = useNavigation()
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View>
            {
                colorIconsData.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate(item.screenName as never)}>
                            <View style={[flexRow, spaceBetween, { paddingBottom: 15 }]}>
                                <View style={[flexRow]}>
                                    <View style={{ height: 35, width: 35, borderRadius: 8, backgroundColor: item.bgcolor, alignItems: 'center', justifyContent: 'center' }}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} type={item.iconType} color={item.iconColor} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14Blackvar2Bold500]}>{item.name}</Text>
                                    </View>
                                </View>
                                {
                                    item.id === 1 ? (
                                        <View style={[flexRow, alignItemsCenter, justyfyCenter]}>
                                            <View style={[styles.roundNumber, { backgroundColor: 'rgba(97, 97, 97, 0.05) ' }, mt5, mr5]}>
                                                <Text style={[styles.roundNumberText, { color: isDark() ? colors.greyVar4 : colors.greyVar4, }]}>10</Text>
                                            </View>
                                            <View style={[{ transform: [{ rotate: '180deg' }] }]}
                                            >
                                                <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} type="Ionicons"
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={[{ transform: [{ rotate: '180deg' }] }, flexRow, alignItemsCenter, justyfyCenter]}>
                                            <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} type="Ionicons"
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={[mt10, mb15]}>
                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 }, commonView.commonLineDividerGrey]} />
            </View>
        </View>
    )
}

export const ColorIconTabSecond = () => {
    const navigation = useNavigation();
    const [exitGroupModal, setExitGroupModal] = useState(false);

    const handleExitGroupModal = () => {
        setExitGroupModal(!exitGroupModal);
    }

    const handleOnPressColorIconTabSecond = (id: number, screenName: string) => {
        if (id === 1) {
            handleExitGroupModal();
        } else {
            navigation.navigate(screenName as never);
        }
    }

    const ExitGroupModal = () => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

        const handleCancelButton = () => {
            setIsCancelButtonActive(true);
            setExitGroupModal(false);
        };

        const handleDeleteChatButton = () => {
            setIsCancelButtonActive(false);
        };

        return (
            <View style={[mh20]} >
                <Text style={[commonText.h16font600Black]}>Exit Group?</Text>
                <Text style={[mt20, commonText.h14GreyVar4Bold400]}>Only group admins will be notifed that you{'\n'}left the group.</Text>
                <View style={[commonView.rowSpaceBetween, mv20]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.red : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.Exit}
                        onChange={handleDeleteChatButton}
                        backgroundColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar2 : colors.red)}
                        textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                    />
                </View>
            </View>
        )
    }

    return (
        <View>
            {
                colorIconsDataSecond.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => handleOnPressColorIconTabSecond(item.id, item.screenName)}>
                            <View style={[flexRow, spaceBetween, { paddingBottom: 15 }]}>
                                <View style={[flexRow]}>
                                    <View style={{ height: 26, width: 26, borderRadius: 8, backgroundColor: item.bgcolor, alignItems: 'center', justifyContent: 'center' }}>
                                        <CustomIcon name={item.iconName} size={item.iconSize} type={item.iconType} color={item.iconColor} />
                                    </View>
                                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                        <Text style={[commonText.h14Blackvar2Bold500]}>{item.name}</Text>
                                    </View>
                                </View>
                                <View style={[{ transform: [{ rotate: '180deg' }] }, flexRow, alignItemsCenter, justyfyCenter]}>
                                    <CustomIcon name='chevron-back-sharp' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={16} type="Ionicons"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <IconModal
                isVisible={exitGroupModal}
                onClose={() => handleExitGroupModal()}
                contentComponent={<ExitGroupModal />}
                iconName='logout'
                iconType='AntDesign'
                iconSize={24}
            />
        </View>
    )
}


const GroupInfo = (props: GroupInfoProps) => {
    return (
        <Fragment>
            <SafeAreaView style={[{ backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0, flex: 1 }, commonView.mainContainer]}>
                <Header />
                <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                    <GroupProfileCard />
                    <GroupInfoCard />
                    <MediaCard />
                    <ColorIconTab />
                    <Groups />
                    <ColorIconTabSecond />
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    roundNumber: {
        height: 24,
        width: 24,
        borderRadius: 12,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundNumberText: {
        fontWeight: '400',
        fontSize: 12,
    },
    cardSurface: {
        padding: 10,
        elevation: 2,
        marginTop: 15,
        flexDirection: 'row',
        borderRadius: 5,
        shadowColor: colors.greyVar3
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 15
    },
    gridItem: {
        flex: 1,
    },
    gridItemImage: {
        width: (Dimensions.get('window').width - 75) / 4,
        borderRadius: 10
    },
    status: {
        borderWidth: 3,
        borderColor: isDark() ? colors.black : colors.white,
        position: 'absolute',
        bottom: 3,
        right: 0,
        height: 15,
        width: 15,
        borderRadius: 10,
    },
})

export default GroupInfo