import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { navigationRef } from '../rootstack';
import { COLORS, SCREENS } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { setIsLoggedIn } from '../../redux/slices/auth';
import ProfileHeader from '../../components/ProfileHeader';
import { styles } from '../../assets/styles';
import Button from '../../components/Button';
import { fontValue } from '../../utils/responsiveFonts';
import RNText from '../../components/Text';


const ContactInfo = () => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isDeletePolicyVisible, setIsDeletePolicyVisible] = useState(false);
    const dispatch = useAppDispatch()
    const onOpenTooltip = () => setTooltipVisible(true);
    const onCloseTooltip = () => setTooltipVisible(false);
    const onOptionSelect = (option: string) => {
        console.log(option);
        switch (option) {
            case 'Change Password':
                navigationRef.navigate(SCREENS.ChatRoom);
                break;
            case 'Delete Account':
                setIsDeleteVisible(true)
                break;
            case 'Logout':
                dispatch(setIsLoggedIn(false));
                break;
        }
    };

    const handleDelete = () => {
        setIsDeleteVisible(false);
    };
    const handleDeletePolicy = () => {
        setIsDeletePolicyVisible(false);
    };

    return (
        // <View style={{ flex: 1, backgroundColor: COLORS.white }} >
        <View style={styles.container} >
            <Header
                title={"Kathryn Murphy"}
                infoButton={true}
                backButton={true}
                tooltipVisible={tooltipVisible}
                onOpenTooltip={onOpenTooltip}
                onCloseTooltip={onCloseTooltip}
            // onOptionSelect={onOptionSelect}
            />
            <ProfileHeader
                name="Kathryn Murphy"
                contact={`+91 ${7009173569}`}
                hashTags={['React', 'Node.js', 'JavaScript']}
                about="Hello, I'm Kathryn Murphy. I'm a software engineer with over 10 years of experience in the industry."
            />
            <View style={styles.mt5}>
                <RNText size={fontValue(10)} font="bold" textColor={COLORS.black}>
                    Description :
                </RNText>
                <RNText size={fontValue(10)} font="bold" textColor={COLORS.black} >
                    {/* {description} */}
                    Hey there! I am using ChatIt
                </RNText>
            </View>

        </View>
    )
}

export default ContactInfo
