import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { launchCamera } from "react-native-image-picker";
import { SmallButton } from "../../components/commonButtons";
import { CustomModal } from "../../components/commonComponents";
import { IconModal } from "../../components/commonModal";
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh15, mh20, mt20, mv20, pl13, spaceBetween } from "../../components/commonStyles";
import {   commonText } from "../../components/commonText";
import {  styledComponentsSheet } from "../../styledComponent/styledComponent";
import { isDark, useTheme } from "../../theme/themeContext";
import CustomIcon from "../../utils/Icons";
import { colors } from "../../utils/colors";
import { threeDotIcon } from "../../utils/data/statusData";
import { DevHeight, DevWidth } from "../../utils/device";
import { labels } from "../../utils/labels";
import { screenName } from "../../utils/screenName";
import { MyStatusPic, StatusView1 } from "../../utils/svg";
import { commonView } from "../../components/commonView";

export const StatusOptionModalComponent = () => {

    return (
        <View>
            {
                threeDotIcon.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => { }} style={{ padding: 4, marginHorizontal: 10, paddingVertical: 10 }}>
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

export const AfterNavigation = () => {
    const [callOptionModal, setCallOptionModal] = useState(false);
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const handleCallOptionModal = () => {
        setCallOptionModal(!callOptionModal);
    }

    const closeCallOptionModal = () => {
        setCallOptionModal(false);
    }

    const navigation = useNavigation();

    const navigateToAnotherPage = () => {
        navigation.navigate(screenName.MyStatus as never);
    }

    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.primaryVar1 },styledComponentsSheet.topCard]}>
            <View style={[flexRow]}>
                <TouchableOpacity onPress={navigateToAnotherPage}>
                    <View style={[alignItemsCenter, justyfyCenter]}>
                        <StatusView1 />
                        <View style={{ position: 'absolute' }}>
                            <MyStatusPic />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[mh15, flexRow, spaceBetween, flex1]}>
                    <View>
                        <Text style={[{color:isDarkTheme?colors.greyVar0:colors.black},commonText.h15font500Black]}>{labels.myStatus}</Text>
                        <Text style={[{color:isDarkTheme?colors.greyVar3:colors.greyVar4},commonText.h14font400Gray4]}>{labels.muteTime1}</Text>
                    </View>
                    <TouchableOpacity
                        style={[alignItemsCenter, justyfyCenter]}
                        onPress={handleCallOptionModal}
                    >
                        <CustomIcon name='dots-three-horizontal' type='entypo' color={colors.greyVar3} size={15} />
                    </TouchableOpacity>
                </View>
                <CustomModal
                    isVisible={callOptionModal}
                    width={DevWidth * 0.50}
                    height={DevHeight * 0.4}
                    modalData={<StatusOptionModalComponent />}
                    marginTop={Platform.OS === 'ios'?100 : 160}
                    onClose={closeCallOptionModal}
                />
            </View>
        </View>
    )
};

export const BeforeNavigation = () => {
    const [Pic, setPic] = useState('');
    const [showIconModal, setShowIconModal] = useState(false);
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const openIconModal = () => {
        setShowIconModal(true);
    };

    const handleImageSelect = (base64Image: string) => {
        setPic(base64Image);
        setIsImagePickerOpen(false);
    };


    type StatusModalProps = {
        onImageSelect: (base64Image: string) => void;
    };

    const StatusModal: React.FC<StatusModalProps> = ({ onImageSelect }) => {
        const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
        const navigation = useNavigation();

        const handleCancelButton = () => {
            setIsCancelButtonActive(true);
            openCamera();
        };

        const handleDeleteChatButton = () => {
            navigation.navigate(screenName.StatusAdd as never)
            setShowIconModal(false)
        };


        const openCamera = () => {
            let options = {
                mediaType: 'photo',
                quality: 1,
                includeBase64: true,
            };
            launchCamera(options, response => {
                imageResponse(response);
            });
        };

        const imageResponse = (response: any) => {
            if (response.didCancel) {
            } else if (response.errorCode == 'permission') {
            } else if (response.errorCode == 'others') {
            } else if (response.assets[0].fileSize > 2097152) {
            } else if (response.assets && response.assets.length > 0) {
                onImageSelect(response.assets[0].base64);
            }
        };

        return (
            <View style={[mh20]} >
                <Text style={[commonText.h16font600Black]}>Choose Image</Text>
                <Text style={[mt20,commonText.h14GreyVar4Bold400]}>Choose image picking options.</Text>
                <View style={[commonView.rowSpaceBetween,mv20]}>
                    <SmallButton
                        title={labels.Camera}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? colors.darkModeVar4 : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.greyVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                        width={DevWidth / 3.15}
                        borderColor={`rgba(78, 80, 114, 0.3)`}
                    />
                    <SmallButton
                        title={labels.Gallery}
                        onChange={handleDeleteChatButton}
                        backgroundColor={isCancelButtonActive ? (isDark() ? colors.darkModeVar4 : colors.white) : colors.primaryVar3}
                        textColor={isCancelButtonActive ? (isDark() ? colors.greyVar3 : colors.greyVar4) : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                        width={DevWidth / 3.15}
                        borderColor={`rgba(78, 80, 114, 0.3)`}
                    />
                </View>
            </View>
        )
    };

    return (
        <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar7 : colors.primaryVar4 },styledComponentsSheet.topCard]}>
            <View style={[flexRow]}>
                <TouchableOpacity onPress={openIconModal}>
                    <MyStatusPic />
                    <View style={[{backgroundColor:isDarkTheme?colors.darkModeVar7:colors.white},styledComponentsSheet.circleBg]}>
                        <View style={[styledComponentsSheet.circleBg1]}>
                            <CustomIcon name='add' type='MaterialIcons' size={9} color={isDarkTheme ? colors.darkModeVar6 : colors.white} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[mh15, flexRow, spaceBetween, flex1]}>
                    <View >
                        <Text style={[{color:isDarkTheme?colors.greyVar0:colors.black},commonText.h15font500Black]}>{labels.myStatus}</Text>
                        <Text style={[{color:isDarkTheme?colors.greyVar3:colors.greyVar4},commonText.h14font400Gray4]}>{labels.statusUploadCont}</Text>
                    </View>
                    <IconModal
                        isVisible={showIconModal}
                        onClose={() => setIsImagePickerOpen(false)}
                        contentComponent={<StatusModal onImageSelect={handleImageSelect} />}
                        iconName='image-plus'
                        iconType='MaterialCommunityIcons'
                        iconSize={25}
                    />
                </View>
            </View>
        </View>
    );
}