import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, PanResponder, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { SmallButton } from '../../components/commonButtons';
import { CustomModal } from '../../components/commonComponents';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt20, mv20, pl13 } from '../../components/commonStyles';
import {    commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { friendStatusModal } from '../../utils/data/statusData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { StatusImg1, StatusPic3 } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { FooterChatView } from '../chatView/messageComponents/messages';

export type MyStatusProps = {
};

const FriendStatus = (props: MyStatusProps) => {
    const navigation = useNavigation();
    const [cardOpen, setCardOpen] = useState(false);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [optionModal, setOptionModal] = useState(false);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
    const [statusPrivacyOptionModal, setStatusPrivacyOptionModal] = useState(false);

    const handleCancelButtonClick = () => {
        setIsCancelButtonActive(true);
    }

    const handleSaveChangesClick = () => {
        setIsCancelButtonActive(false);
        setStatusPrivacyOptionModal(false)
    }

    const handleCallOptionModal = () => {
        setOptionModal(!optionModal);
    }

    const handleCustomModal = (id: number) => {
        if (id === 1) {
            setOptionModal(false)
            setStatusPrivacyOptionModal(true)
        } else if (id === 3) {
            navigation.navigate(screenName.SingleAudioCallRing as never)
        } else if (id === 4) {
            navigation.navigate(screenName.SingleVideoCall as never)
        } else if (id === 5) {
            navigation.navigate(screenName.UserProfile as never)
        }
    }

    const translateY = new Animated.Value(0);
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            translateY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy < -50) {
                setCardOpen(true);
                Animated.timing(translateY, { toValue: -200, duration: 300, useNativeDriver: false }).start();
            } else {
                setCardOpen(false);
                Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: false }).start();
            }
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress1 < 1) {
                setProgress1(progress1 + 0.01);
            } else if (progress2 < 1) {
                setProgress2(progress2 + 0.01);
            } else {
                clearInterval(interval);
            }
        }, 2);

        return () => {
            clearInterval(interval);
        };
    }, [progress1, progress2]);

    const toggleCard = () => {
        if (translateY._value === 0) {
            setCardOpen(false);
            Animated.timing(translateY, { toValue: 0, duration: 10, useNativeDriver: false }).start();
        } else {
            setCardOpen(true);
            Animated.timing(translateY, { toValue: -200, duration: 10, useNativeDriver: false }).start();
        }
    };

    const closeCard = () => {
        setCardOpen(false);
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    };

    const OptionModalComponent = () => {
        return (
            <View>
                {friendStatusModal.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => { handleCustomModal(item.id) }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
                            <View style={[flexRow]}>
                                <CustomIcon name={item.iconName} type={item.iconType} size={item.iconSize} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                                <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                                    <Text style={[commonText.h15Grey]}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
        )
    };

    const GroupsModal = () => {
        return (
            <View style={[mh20]}>
                <Text style={[commonText.h16font600Black]}>{labels.blockModalTitle}</Text>
                
                <Text style={[mt20,commonText.h14font400Gray4]}>New Status updates from Horace Keene {'\n'}won’t appear under recent updates {'\n'}anymore.</Text>
                <View style={[commonView.rowSpaceBetween,mv20]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleSaveChangesClick}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                    />
                    <SmallButton
                        title={labels.mute}
                        onChange={handleCancelButtonClick}
                        backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                    />
                </View>
            </View>
        )
    };

    return (
        <View style={[flex1]}>
            <TouchableHighlight onPress={closeCard} style={{ flex: 1 }}>
                <Image source={StatusImg1} style={styles.image} />
            </TouchableHighlight>
            <View style={styles.progressBarsContainer}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={styles.progressBarContainer}>
                        <ProgressBar
                            progress={progress1}
                            width={null}
                            height={4}
                            color={'white'}
                            borderColor={'transparent'}
                            backgroundColor={colors.greyVar3}
                        />
                    </View>
                    <View style={styles.progressBarContainer}>
                        <ProgressBar
                            progress={progress2}
                            width={null}
                            height={4}
                            color={colors.white}
                            borderColor={'transparent'}
                            backgroundColor={colors.greyVar3}
                        />
                    </View>
                </View>
                <View style={[alignItemsCenter,commonView.rowSpaceBetween]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <CustomIcon name='chevron-left' size={15} color={colors.white} type='octicons' />
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 10 }}>
                            <Image source={StatusPic3} style={{ height: 42, width: 42 }} />
                        </View>
                        <View>
                            <Text style={[commonText.h15font500White]}>{labels.horaceKeene}</Text>
                            <Text style={[commonText.h14font400White]}>{labels.muteTime1}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ right: 15 }}
                            onPress={handleCallOptionModal}
                        >
                            <CustomIcon name='dots-three-vertical' type='entypo' color={colors.white} size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomModal
                    isVisible={optionModal}
                    width={DevWidth * 0.47}
                    modalData={<OptionModalComponent />}
                    marginTop={Platform.OS === 'ios' ? 100 : 48}
                    onClose={() => setOptionModal(false)}
                />
            </View>
            {cardOpen ? (
                <View style={{
                    backgroundColor: 'white', position: 'absolute', bottom: 0, width: '100%',
                    borderTopRightRadius: 25, borderTopLeftRadius: 25
                }} >
                    <FooterChatView />
                </View>
            ) : (
                <Animated.View
                    style={[styles.swipeableContainer, { transform: [{ translateY }] }]}
                    {...panResponder.panHandlers}
                >
                    <TouchableOpacity style={[flex1]} onPress={toggleCard}>
                        <View style={[alignItemsCenter]}>
                            <CustomIcon name='chevron-up' size={20} color={colors.white} type='octicons' />
                            <Text style={[commonText.h16font500White]}>Reply</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )}
            <IconModal
                isVisible={statusPrivacyOptionModal}
                onClose={() => setStatusPrivacyOptionModal(false)}
                contentComponent={<GroupsModal />}
                iconName='block-flipped'
                iconType='MaterialIcons'
                iconSize={24}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    progressBarsContainer: {
        left: 8,
        right: 8,
        marginTop: 10,
        position: 'absolute',
        flex: 1,
    },
    progressBarContainer: {
        flex: 1,
        marginRight: 8,
    },
    swipeableContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});

export default FriendStatus;