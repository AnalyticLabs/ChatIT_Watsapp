import {
    Alert,
    Image,
    Linking,
    Modal,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import ImageCropPicker, {
    Image as ImageType,
} from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { requestPermissions } from '../../utils/RequestPermissions';
import { styles as FixedStyles } from '../../assets/styles';
import CustomIcon from '../Icon';
import { COLORS } from '../../utils/constants';
import { logToConsole } from '../../utils/functions';
import { pick, isErrorWithCode } from '@react-native-documents/picker';
import { stat } from 'react-native-fs';
import { fontValue } from '../../utils/responsiveFonts';
import UploadImage from '../UploadImage';
import IMAGES from '../../utils/IMAGES';
import ImageComponent from '../imageComp';
import Phone from '../../assets/icons/phone.svg';
import Camera from '../../assets/icons/camera.svg';
import { useTheme } from '../../theme/ThemeProvider';



interface ImagePickerProps {
    isDoc?: boolean;
    isOpen?: boolean;
    addBanner?: boolean;
    isEditIcon?: boolean;
    onProfile?: () => void;
    customBorderStyle?: boolean;
    txtStyle?: object;
    isEdit?: boolean;
    SecndryTxt?: string;
    txtLogo?: string;
    isSingleImage?: boolean;
    profilBox?: boolean;
    removeImage?: () => void;
    profileSource?: string;
    disabledd?: boolean;
    Txt?: string;
    text?: string;
    onClose?: () => void;
    onPress?: () => void;
    getImage?: (path: string | number) => void;
    isPhotos?: boolean | any;
    disabled?: boolean;
    profile?: boolean;
    imageKey?: string;
    title?: string;
    customText?: string;
    screenOne?: boolean;
    vendorScreen?: boolean;
    iconPress?: boolean;
}

interface State {
    idImages: string[];
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    isDoc,
    isOpen,
    customBorderStyle,
    customText,
    addBanner,
    isEditIcon,
    onProfile,
    txtStyle,
    isEdit,
    SecndryTxt,
    txtLogo,
    isSingleImage,
    profilBox,
    removeImage,
    profileSource,
    disabledd,
    Txt,
    text,
    onClose,
    onPress,
    getImage,
    isPhotos,
    disabled,
    profile,
    imageKey,
    screenOne,
    title = 'Upload 2 ID Proofs (Front, Back)',
    vendorScreen,
    iconPress
}) => {
    const config = {
        width: 1920,
        height: 1080,
        cropping: false,
        freeStyleCropEnabled: false,
        quality: 0.5,
        mediaType: 'photo',
    };
    const [isImage, setIsImg] = useState<string[]>([]);
    const [state, setState] = useState<State>({
        idImages: [],
    });
    const { colors } = useTheme();


    const handleState = (key: keyof State, value: string[]) => {
        setState({ ...state, [key]: value });
    };

    const openCamera = async () => {
        const permissionResponse = await requestPermissions('CAMERA');
        if (permissionResponse.isGranted) {
            try {
                setTimeout(async () => {
                    const image: ImageType = await ImageCropPicker.openCamera(config);
                    if (image?.path) {
                        getImage?.(image?.path);
                    }
                }, 500);
            } catch (err) {
                logToConsole('camera picker Error Hai...', err);
            }
        }
    };

    const openGallery = async () => {
        try {
            if (Platform.OS === 'android') {
                setTimeout(async () => {
                    try {
                        const granted = await PermissionsAndroid.requestMultiple([
                            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                        ]);
                        if (
                            granted['android.permission.READ_MEDIA_IMAGES'] ===
                            PermissionsAndroid.RESULTS.GRANTED &&
                            granted['android.permission.ACCESS_MEDIA_LOCATION'] ===
                            PermissionsAndroid.RESULTS.GRANTED
                        ) {
                            const image: ImageType = await ImageCropPicker.openPicker(config);
                            if (image?.path) {
                                getImage?.(image?.path);
                            }
                        } else {
                            Alert.alert(
                                `permissions required`,
                                'To pick Image from Gallery, you have to give permisisons from settings',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => logToConsole('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Open Settings',
                                        onPress: () => {
                                            setTimeout(() => {
                                                Linking.openSettings('PHOTO_LIBRARY');
                                            }, 300);
                                        },
                                    },
                                ],
                            );
                        }
                    } catch (error) {
                        logToConsole('Error requesting storage permissions:', error);
                    }
                }, 500);
            }
            else {
                const photo = await requestPermissions('PHOTO_LIBRARY');
                if (photo.isGranted) {
                    const image: ImageType = await ImageCropPicker.openPicker(config);
                    if (image?.path) {
                        getImage?.(image?.path);
                        setIsImg([image?.path]);
                    }
                }
            }
        } catch (error) {
            logToConsole('gallery Picker Error hai...', error);
        }
    };

    const checkFileExists = async (filePath) => {
        try {
            const fileInfo = await stat(filePath.replace("file://", ""));
            logToConsole(`File exists. Size: ${fileInfo.size} bytes`);
            return true;
        } catch (error) {
            console.error("File does not exist:", error.message);
            return false;
        }
    };

    const uploadCOI = async (url: any) => {
        const data = {
            file: url?.[0],
            orderId: state.param?.orderId,
        }
        // try {
        //     const res = await uploadCOIService(data)
        // } catch (error) {
        //     logToConsole(error, 'while uploading coi', error?.response?.data, '---data---', data, '---url', url);

        // }
    }

    const pickDocument = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);
                const [result] = await pick();
                if (result?.uri) {
                    const localFilePath = await copyContentUriToLocalFile(result.uri);

                    if (!localFilePath) {
                        Alert.alert('Error', 'Unable to read selected file.');
                        return;
                    }
                    // const url = await uploadFile(localFilePath, 'application');
                    // uploadCOI(url?.data);
                }
            } else {
                const [result] = await pick()
                if (result) {
                    const fileUri = decodeURIComponent(result.uri);
                    const isFileValid = await checkFileExists(fileUri);
                    if (!isFileValid) {
                        return;
                    } else {
                        getImage?.(fileUri)
                    }
                }
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
            } else {
                logToConsole(error, 'ppp--p');
            }
        }
    };

    const copyContentUriToLocalFile = async (contentUri: string) => {
        console.log(contentUri, '---contentUri');

    };

    return (
        <>
            {profile ? (
                <UploadImage
                    txt={Txt}
                    title={text}
                    onGallery={onPress}
                    profileBox={addBanner}
                    imgLength={isImage?.length}
                />
            ) : (
                <>
                    {profilBox ? (
                        <TouchableOpacity
                            onPress={onProfile}
                            style={styles.wrapper}
                            disabled={!profileSource}
                        >
                            {profileSource ? (
                                <FastImage
                                    // source={{ uri: profileSource }}
                                    source={profileSource}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: fontValue(12),
                                    }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.imgWrp}>
                                        <Image source={IMAGES.vendorImg} style={FixedStyles.img} />
                                    </View>
                                    <Text
                                        style={[
                                            FixedStyles.fs14,
                                            { top: fontValue(5), textAlign: 'center' },
                                        ]}>
                                        Upload Banner Here
                                    </Text>
                                </View>
                            )}
                            {profileSource ? (
                                <TouchableOpacity style={styles.editWrp2}>
                                    <Image source={IMAGES.crossImg} style={FixedStyles.img} />
                                </TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    ) : screenOne ? (
                        <TouchableOpacity
                            onPress={onPress}
                            style={[
                                FixedStyles.borderWidth1,
                                FixedStyles.borderRad10,
                                FixedStyles.jcCenter,
                                FixedStyles.alignItemCenter,
                                FixedStyles.w100,
                                {
                                    borderStyle: customBorderStyle ? 'solid' : 'dashed',
                                    height: fontValue(156),
                                    borderColor: COLORS.titleOpacty,
                                },
                            ]}>
                            <Image
                                source={IMAGES.tracedImg}
                                style={{ height: fontValue(40), width: fontValue(40) }}
                            />
                            <Text
                                style={[
                                    FixedStyles.fs14,
                                    FixedStyles.poppinsSemiBold,
                                    FixedStyles.colorWhite,
                                    FixedStyles.mt5,
                                    { textAlign: 'center' },
                                ]}>
                                {customText ? customText : 'Upload photo'}
                            </Text>
                            <Text
                                style={[
                                    FixedStyles.fs12,
                                    FixedStyles.poppinsRegular,
                                    FixedStyles.colorWhite,
                                    FixedStyles.mt2,
                                    { textAlign: 'center' },
                                ]}>
                                Please upload Document
                            </Text>
                        </TouchableOpacity>
                    ) : vendorScreen ? (
                        <TouchableOpacity
                            onPress={onPress}
                            style={[
                                FixedStyles.borderWidth2,
                                FixedStyles.borderRad15,
                                FixedStyles.jcCenter,
                                FixedStyles.alignItemCenter,
                                FixedStyles.w100,
                                {
                                    borderStyle: 'dashed',
                                    height: fontValue(260),
                                    borderColor: COLORS.titleOpacty,
                                },
                            ]}>
                            <Image
                                source={IMAGES.bannerAdd}
                                style={{ height: fontValue(66), width: fontValue(66) }}
                            />
                            <Text
                                style={[
                                    FixedStyles.fs16,
                                    FixedStyles.poppinsSemiBold,
                                    FixedStyles.colorWhite,
                                    FixedStyles.mt5,
                                    { textAlign: 'center' },
                                ]}>
                                Add Banner Photo
                            </Text>
                            <Text
                                style={[
                                    FixedStyles.fs14,
                                    FixedStyles.poppinsRegular,
                                    FixedStyles.colorWhite,
                                    FixedStyles.mt2,
                                    { textAlign: 'center' },
                                ]}>
                                or drag and drop file
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity disabled={iconPress} onPress={onProfile} style={styles.profileImg}>
                                <ImageComponent
                                    // source={{ uri: profileSource }}
                                    source={profileSource}
                                    style={{
                                        height: fontValue(100),
                                        width: fontValue(100),
                                        borderRadius: fontValue(100),
                                    }}
                                    imageStyle={[
                                        FixedStyles.borderRad100,
                                        FixedStyles.img,
                                        FixedStyles.borderWidth2,
                                        FixedStyles.borderPrimary,
                                    ]}
                                />

                                {!isEdit && (
                                    <TouchableOpacity onPress={onProfile} style={[styles.editWrp, FixedStyles.borderRad100, {
                                        backgroundColor: colors.primary
                                    }]}>
                                        {/* <ImageComponent
                                            source={isEditIcon ? IMAGES.camIcon : fontValue}
                                            style={FixedStyles.img}
                                        /> */}
                                        <Camera style={{ color: COLORS.white }} />

                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                            <Text
                                style={[
                                    FixedStyles.poppinsMedium,
                                    txtStyle,
                                    { textAlign: 'center', marginTop: fontValue(10) },
                                ]}>
                                {txtLogo}
                            </Text>
                            {SecndryTxt && (
                                <Text
                                    style={[
                                        FixedStyles.colorWhite,
                                        {
                                            textAlign: 'center',
                                            marginTop: fontValue(10),
                                            color: COLORS.primary,
                                        },
                                    ]}>
                                    {SecndryTxt}
                                </Text>
                            )}
                        </>
                    )}
                </>
            )}
            <Modal
                animationType="slide"
                transparent
                visible={isOpen}
                onRequestClose={onClose}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{ width: '100%', height: '100%' }}
                    onPress={onClose}>
                    <View style={styles.backgroundblacktint} />
                    <View style={styles.viewForOptions}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <View style={styles.viewforChoosePhoto}>
                                <Text style={[styles.selectPhototxt, FixedStyles.fs16]}>
                                    Select photo from
                                </Text>
                                <View style={styles.sepratorLine} />
                                <TouchableOpacity
                                    style={[
                                        FixedStyles.fdr,
                                        FixedStyles.alignItemCenter,
                                        FixedStyles.ph5,
                                        { gap: fontValue(20) },
                                    ]}
                                    activeOpacity={0.6}
                                    onPress={openCamera}>
                                    <CustomIcon
                                        as="Ionicons"
                                        name="camera-outline"
                                        size={fontValue(22)}
                                        color={COLORS.black}
                                    />
                                    <Text
                                        style={[FixedStyles.poppinsMedium, styles.takephotoTxt]}>
                                        Take Photo
                                    </Text>
                                </TouchableOpacity>
                                {isDoc && <><View style={styles.sepratorLine} />
                                    <TouchableOpacity
                                        style={[
                                            FixedStyles.fdr,
                                            FixedStyles.alignItemCenter,
                                            FixedStyles.ph5,
                                            { gap: fontValue(20) },
                                        ]}
                                        activeOpacity={0.6}
                                        onPress={pickDocument}>
                                        <CustomIcon
                                            as="AntDesign"
                                            name="file1"
                                            size={fontValue(22)}
                                            color={COLORS.black}
                                        />
                                        <Text
                                            style={[FixedStyles.poppinsMedium, styles.takephotoTxt]}>
                                            Add File
                                        </Text>
                                    </TouchableOpacity></>}
                                <View style={styles.sepratorLine} />
                                <TouchableOpacity
                                    style={[
                                        FixedStyles.fdr,
                                        FixedStyles.alignItemCenter,
                                        FixedStyles.ph5,
                                        { gap: fontValue(20) },
                                    ]}
                                    activeOpacity={0.6}
                                    onPress={openGallery}>
                                    <CustomIcon
                                        as="Ionicons"
                                        name="images-outline"
                                        size={fontValue(22)}
                                        color={COLORS.black}
                                    />
                                    <Text
                                        style={[FixedStyles.poppinsMedium, styles.takephotoTxt]}>
                                        Choose from library
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.viewForcancel}>
                            <TouchableOpacity activeOpacity={0.6} onPress={onClose}>
                                <Text style={[FixedStyles.poppinsMedium, styles.takephotoTxt]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity >
            </Modal >
        </>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        borderRadius: fontValue(10),
    },
    imgWrp: {
        height: fontValue(30),
        width: fontValue(30),
    },
    mapImgContent: {
        alignItems: 'center',
    },
    pickerView: {
        width: '100%',
        borderColor: COLORS.darkTitle,
        borderRadius: fontValue(8),
        borderStyle: 'dotted',
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: fontValue(5),
    },

    backgroundblacktint: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.3,
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    backgroundblacktint2: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.6,
        justifyContent: 'center',
        position: 'absolute',
    },
    viewForOptions: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    viewForOptions2: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    viewforChoosePhoto: {
        backgroundColor: 'white',
        width: '96%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    viewforChoosePhoto2: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: fontValue(12),
        height: '100%',
        justifyContent: 'center',
    },
    selectPhototxt: {
        alignSelf: 'center',
        fontSize: fontValue(16),
        color: COLORS.darkTitle,
        marginTop: fontValue(10),
        marginBottom: fontValue(10),
    },
    sepratorLine: {
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.4,
    },
    takephotoTxt: {
        alignSelf: 'center',
        fontSize: fontValue(16),
        color: COLORS.black,
        marginTop: fontValue(10),
        marginBottom: fontValue(10),
    },
    viewForcancel: {
        marginTop: 7,
        marginBottom: fontValue(20),
        backgroundColor: 'white',
        width: '96%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    editWrp: {
        position: 'absolute',
        right: 0,
        bottom: fontValue(-1),
        height: fontValue(30),
        width: fontValue(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    editWrp2: {
        position: 'absolute',
        right: 5,
        top: fontValue(5),
        height: fontValue(30),
        width: fontValue(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: fontValue(100),
        width: fontValue(100),
        alignSelf: 'center',
        borderRadius: fontValue(50),
    },
    wrapper: {
        height: fontValue(150),
        width: '100%',
        backgroundColor: COLORS.mustard,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(131, 145, 161, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontValue(12),
        overflow: 'hidden',
    },
});
