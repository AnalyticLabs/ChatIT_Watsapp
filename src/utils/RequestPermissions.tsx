import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, requestNotifications, checkNotifications } from 'react-native-permissions';
import { logToConsole } from './functions';


type permissions = 'READ_EXTERNAL_STORAGE' | 'WRITE_EXTERNAL_STORAGE' | 'RECORD_AUDIO' | 'READ_MEDIA_AUDIO' | 'READ_MEDIA_IMAGES' | 'READ_MEDIA_VIDEO' | 'READ_CONTACTS' | 'ACCESS_FINE_LOCATION' | 'ACCESS_COARSE_LOCATION' | "LOCATION_ALWAYS" | "LOCATION_WHEN_IN_USE" | 'WRITE_CONTACTS' | 'BLUETOOTH_CONNECT' | 'BLUETOOTH_SCAN' | 'PHOTO_LIBRARY' | 'PHOTO_LIBRARY_ADD_ONLY' | 'CAMERA' | 'MEDIA_LIBRARY' | 'BLUETOOTH_PERIPHERAL' | 'MICROPHONE' | 'CALENDARS' | 'CONTACTS';
const requestPermissions = async (type: permissions) => {
    let permissionGranted = false;
    let message = ` permission required for this feature.`;
    const permission =
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID[type]
            : PERMISSIONS.IOS[type];

    try {
        const permissionStatus = await check(permission);
        if (permissionStatus === RESULTS.GRANTED) {
            message = ` permission granted successfully!`;
            permissionGranted = true;
        } else if (permissionStatus === RESULTS.DENIED) {
            const requestResult = await request(permission);
            if (requestResult !== RESULTS.GRANTED && requestResult === RESULTS.BLOCKED) {
                // Handle persistent denial with user guidance
                message = ` permission is required. Please enable it in your device settings.`;
                Alert.alert(` permissions required`, message, [
                    {
                        text: 'Cancel',
                        onPress: () => logToConsole('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Enable permission',
                        onPress: () => {
                            setTimeout(() => {
                                Linking.openSettings();
                            }, 300);
                        },
                    },
                ]);
            }

            else {
                message = `permission granted. Thank you!`;
                permissionGranted = true;
            }
        } else if (permissionStatus === RESULTS.BLOCKED) {
            const requestResult = await request(permission);
            if (requestResult !== RESULTS.GRANTED) {
                // Handle persistent denial with user guidance
                message = `${type} permission is required. Please enable it in your device settings.`;
                // Optionally, open app settings directly for convenience:
                Alert.alert(`${type} permissions required`, message, [
                    {
                        text: 'Cancel',
                        onPress: () => logToConsole('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Enable permission',
                        onPress: () => {
                            setTimeout(() => {
                                Linking.openSettings();
                            }, 300);
                        },
                    },
                ]);
            } else {
                message = `${type} permission granted. Thank you!`;
                permissionGranted = true;
            }
        } else {
            // Unexpected permission status, handle as needed
        }
    } catch (error) {
        console.error('Error requesting permission:', error);
    }
    // return { isGraned: permissionGranted, Message: message };
    return { isGranted: permissionGranted, Message: message };
};
const requestNotificationPermission = async () => {
    let permissionGranted = false;
    let message = `Notification permission required for this feature.`;

    try {
        const permissionStatus = await checkNotifications();
        if (permissionStatus.status === RESULTS.GRANTED) {
            message = `Notification permission granted successfully!`;
            permissionGranted = true;
        } else if (permissionStatus.status === RESULTS.DENIED) {
            const requestResult = await requestNotifications([
                'alert',
                'badge',
                'sound',
            ]);
            if (
                requestResult.status !== RESULTS.GRANTED &&
                requestResult.status === RESULTS.BLOCKED
            ) {
                // Handle persistent denial with user guidance
                message = `Notification permission is required. Please enable it in your device settings.`;
                Alert.alert(`Notification permissions required`, message, [
                    {
                        text: 'Cancel',
                        onPress: () => logToConsole('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Enable permission',
                        onPress: () => {
                            setTimeout(() => {
                                Linking.openSettings();
                            }, 300);
                        },
                    },
                ]);
            } else {
                message = `Notification permission granted. Thank you!`;
                permissionGranted = true;
            }
        } else if (permissionStatus.status === RESULTS.BLOCKED) {
            const requestResult = await requestNotifications([
                'alert',
                'badge',
                'sound',
            ]);
            if (requestResult.status !== RESULTS.GRANTED) {
                // Handle persistent denial with user guidance
                message = `Notification permission is required. Please enable it in your device settings.`;
                // Optionally, open app settings directly for convenience:
                Alert.alert(`Notification permissions required`, message, [
                    {
                        text: 'Cancel',
                        onPress: () => logToConsole('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Enable permission',
                        onPress: () => {
                            setTimeout(() => {
                                Linking.openSettings();
                            }, 300);
                        },
                    },
                ]);
            } else {
                message = `Notification permission granted. Thank you!`;
                permissionGranted = true;
            }
        } else if (permissionStatus.status == 'limited') {
            message = `Notification permission granted. Thank you!`;
            permissionGranted = true;
            // Unexpected permission status, handle as needed
        } else {
        }
    } catch (error) {
        console.error('Error requesting permission:', error);
    }
    // return { isGraned: permissionGranted, Message: message };
    return { isGranted: permissionGranted, Message: message };
};

export { requestPermissions, requestNotificationPermission };
