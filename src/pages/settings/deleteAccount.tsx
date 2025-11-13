import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomTextInput } from '../../components/commonInputFields';
import { alignItemsCenter, alignSelfCenter, borderRadius10, flex1, flexRow, justyfyCenter, mh20, mh30, ml10, ml15, mr5, mt10, mt15, mt20, mt3, mt30, mv10, pb10 } from '../../components/commonStyles';
import {  commonText } from '../../components/commonText';
import {  commonView, } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { UsFlagTmg } from '../../utils/png';
import { SearchHeader } from '../media/mediaCommonHeader';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export type DeleteAccountProps = {

}


const DeleteAccount = (props: DeleteAccountProps) => {
    const [country, setCountry] = useState('India');
    const [phoneNumber, setPhoneNumber] = useState('9988776655');

    const handleCountry = (country: string) => {
        setCountry(country);
    }
    const handlePhoneNumber = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
    }
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.DeleteThisAccount} searchIcon={true} /> */}
            <ScrollView>
                <View style={[alignSelfCenter, mt30, borderRadius10, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.primaryVar4, }]}>
                    <View style={[flexRow, mh20, mt15]}>
                        <View style={[{ height: 35, width: 35, backgroundColor: isDark() ? `rgba(158, 158, 158,0.1)` : colors.primaryVar4 }, alignItemsCenter, justyfyCenter, borderRadius10, mt3]}>
                            <CustomIcon name='user' type="Feather" color={isDark() ? colors.greyVar3 : colors.primaryVar3} size={18} />
                        </View>
                        <View style={[flex1, mt10]}>
                            <View style={[commonView.rowSpaceBetween]}>
                                <Text style={[ml15,commonText.h15PurpleVar3Bold500]}>If you delete this account</Text>
                                <CustomIcon name='chevron-up' type="Feather" size={15} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                        </View>
                    </View>
                    <View style={[mv10,commonView.commonLineDividerPurple]} />
                    <View style={[pb10]}>
                        <View style={[flexRow, mh20]}>
                            <CustomIcon name='checkcircle' type="AntDesign" size={16} color={colors.primaryVar3} />
                            <Text style={[ml10, commonText.h14GreyVar4Bold400Text,{ letterSpacing: 0.5, fontSize: 15, lineHeight: 21 }]}>The account will be deleted from{'\n'}ChatIt and all your devices</Text>
                        </View>
                        <View style={[flexRow, mh20, mt10]}>
                            <CustomIcon name='checkcircle' type="AntDesign" size={16} color={colors.primaryVar3} />
                            <Text style={[ml10, commonText.h14GreyVar4Bold400Text,{ letterSpacing: 0.5, fontSize: 15, lineHeight: 21 }]}>Your message history will be erased</Text>
                        </View>
                        <View style={[flexRow, mh20, mt10]}>
                            <CustomIcon name='checkcircle' type="AntDesign" size={16} color={colors.primaryVar3} />
                           <Text style={[ml10, commonText.h14GreyVar4Bold400Text,{ letterSpacing: 0.5, fontSize: 15, lineHeight: 21 }]}>You will be removed from all your{'\n'}ChatIt groups.</Text>
                        </View>
                        <View style={[flexRow, mh20, mt10]}>
                            <CustomIcon name='checkcircle' type="AntDesign" size={16} color={colors.primaryVar3} />
                            <Text style={[ml10, commonText.h14GreyVar4Bold400Text,{ letterSpacing: 0.5, fontSize: 15, lineHeight: 21 }]}>Your google drive backup will be deleted</Text>
                        </View>
                    </View>
                </View>
                <View style={[mh30, mt20]}>
                    <Text style={[commonText.h14Blackvar2Bold500]}>To delete your account, confirm your country code and enter your phone number.</Text>
                </View>
                <View style={[mh30, mt20]}>
                    <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                        <View style={[commonView.rowSpaceBetween,flex1]}>
                            <View style={[flexRow]}>
                                <View style={[justyfyCenter]}>
                                    <CustomIcon name='globe' size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type="Feather" />
                                </View>
                                <CustomTextInput
                                    textColor={isDark() ? colors.greyVar0 : colors.blackVar1}
                                    value={country}
                                    onChangeText={(text) => handleCountry(text)}
                                />
                            </View>
                            <View style={[alignItemsCenter, justyfyCenter]}>
                                <CustomIcon name='chevron-down' type="Feather" size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                        </View>
                    </View>
                    <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                        <View style={[justyfyCenter, alignItemsCenter, flexRow]}>
                            <CustomIcon name='phone' size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type="Feather" />
                            <View style={[flexRow, ml15]}>
                                <Image source={UsFlagTmg} style={[{ height: 20, width: 20 }, mr5]} />
                                <CustomIcon name='chevron-down-outline' type="Ionicons" color={isDark() ? colors.greyVar0 : colors.blackVar2} size={15} />
                            </View>
                        </View>
                        <CustomTextInput
                            textColor={isDark() ? colors.greyVar0 : colors.blackVar1}
                            value={phoneNumber}
                            onChangeText={(text) => handlePhoneNumber(text)}
                        />
                    </View>
                </View>
                <View style={[styles.longButtonRed, mh20, { backgroundColor: isDark() ? colors.redVar2 : colors.red }]}>
                    <Text style={[commonText.h15font600]} >{labels.deleteAcc}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    longButtonRed: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 175,
        bottom: 10
    },
})

export default DeleteAccount