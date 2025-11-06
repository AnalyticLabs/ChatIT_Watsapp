import React, { useEffect, useState } from 'react';
import {
    NavigationContainer,
    DefaultTheme,
    createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { slide } from '../../utils/navigationAnimation';
import { COLORS, ROLE, SCREENS, SocketEvent } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useColorScheme } from 'react-native';
import { setCordinates, setIsLoggedIn, setPrivacy, setRole, setRules, setTerms } from '../../redux/slices/auth';
import { get } from '../../utils/storage';
import {
    getNotificationListThunk,
    getPaymentCardThunk,
    getProfileThunk,
} from '../../redux/thunks/auth';
import { TOKEN_KEY } from '../../services/Endpoints';
// import SplashScreen from 'react-native-splash-screen';
import {
    getBrandListingThunk,
    getCartThunk,
    getProductCatListingThunk,
    getproductSubCategoriesThunk,
    getProductSubCatListingThunk,
    getVendorListingThunk,
    getUnreadMsgCountThunk,
} from '../../redux/thunks/home';
import {
    getUserSubjectThunk,
    getUserVerificationThunk,
    getVendorDetailThunk,
    getVendorItemThunk,
    getVendorStoreListThunk,
} from '../../redux/thunks/dashboard';
import { socket, SocketIO } from '../../utils/socket';
// import { getCurrentLocation } from '../../utils/LocationComponent';
import { getPrivacyCategoryService, getPrivacyService } from '../../services/Dashboard';
import { logToConsole } from '../../utils/functions';
import AuthStackNavigator from '../stacks/AuthStack';
import StackNavigator from '../stacks/bottom';
import ChatScreen from '../Chats/ChatScreen';
import ContactInfo from '../ContactInfo';
import CreateGroupScreen from '../Chats/Group/CreateGroupScreen';
import { setUnReadCountForMesage } from '../../redux/slices/home';

// import Subscription from '../RenterDashboard/subscription';

const MainStack = createStackNavigator();
export const screenOptions = {
    cardStyle: {
        backgroundColor: COLORS.white,
    },
    tabBarHideOnKeyboard: true,
    cardStyleInterpolator: slide,
    headerShown: false,

};

export const navigationRef = createNavigationContainerRef();

const RootStack = () => {
    const theme = useColorScheme();
    const { isLoggedIn, user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [isNavigationReady, setIsNavigationReady] = useState(false);
    const [privacyCategory, setPrivacyCategory] = useState<any>([]);


    const linking = {
        prefixes: ['ChatIt://'],
        config: {
            screens: {
                ChatRoom: 'ChatRoom',
                [SCREENS.app]: {
                    screens: {
                        [SCREENS.SettingsStackNavigator]: {
                            screens: {
                                [SCREENS.Subscription]: 'Subscription',
                                [SCREENS.OrderRequested]: 'OrderRequested',
                            },
                        },
                        [SCREENS.ChatStackNavigator]: {
                            screens: {
                                [SCREENS.productDetail]: 'productDetail',
                            },
                        },
                    },
                },
            },
        },
    };

    // useEffect(() => {
    //     if (user && user?.role) {
    //         dispatch(setRole(user?.role === 'vendor' ? ROLE.vendor : ROLE.user));
    //     }
    // }, [user]);

    const checkIsLoggedIn = async () => {
        const token = await get(TOKEN_KEY);
        if (token !== null) {
            dispatch(setIsLoggedIn(true));
            // SocketIO(); 
            socket.on(SocketEvent.UNREAD_COUNT_MESSAGE, data => {
                dispatch(setUnReadCountForMesage(data?.payload));
            });
        }
    };

    const getCart = () => {
        dispatch(getCartThunk({}));
        dispatch(getUnreadMsgCountThunk());
    };


    useEffect(() => {
        checkIsLoggedIn();
    }, [isLoggedIn]);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => setIsNavigationReady(true)}
            linking={linking}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: COLORS.white,

                },
            }}>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: slide,
                    cardStyle: {
                        backgroundColor: COLORS.white,
                    },
                }}>
                <MainStack.Screen
                    name={SCREENS.app}
                    options={{
                        cardStyleInterpolator: slide,
                    }}
                    component={isLoggedIn ? StackNavigator : AuthStackNavigator}
                />
                <MainStack.Screen
                    name={"ChatScreen"}
                    options={{
                        cardStyleInterpolator: slide,
                    }}
                    component={ChatScreen}
                />
                <MainStack.Screen
                    name={"ContactInfo"}
                    options={{
                        cardStyleInterpolator: slide,
                    }}
                    component={ContactInfo}
                />
                <MainStack.Screen
                    name={"CreateGroup"}
                    options={{
                        cardStyleInterpolator: slide,
                    }}
                    component={CreateGroupScreen}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
};
export default RootStack;
