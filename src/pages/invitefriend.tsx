import React, { Fragment } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { flex1, flexRow, mt3, ph10, ph5 } from '../components/commonStyles';
import { commonText } from '../components/commonText';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { contactList } from '../utils/data/contactData';
import { DevWidth } from '../utils/device';
import { SearchHeader } from './media/mediaCommonHeader';

const InviteFriend = () => {

    const contactsByFirstLetter = contactList.reduce((acc, contact) => {
        const firstLetter = contact.contName.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});

    return (
        <Fragment>
            <StatusBar backgroundColor={colors.primaryVar3} />
            <View style={[flex1, { backgroundColor: colors.whiteVar0 }]}>
                {/* <SearchHeader headerText='Invite A Friend' searchIcon={true} /> */}
                <View style={flex1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {Object.keys(contactsByFirstLetter).map((letter) => (
                            <View key={letter}>
                                <Text style={styles.firstLetter}>{letter}</Text>
                                {contactsByFirstLetter[letter].map((data) => (
                                    <TouchableOpacity
                                        key={data.id}
                                        style={
                                            styles.cardContainer
                                        }
                                    >
                                        <View>
                                            <View>{data.profImg}</View>
                                        </View>
                                        <View>
                                            <Text style={[ph10,commonText.h16SemiBoldBlack]}>
                                                {data.contName}
                                            </Text>
                                            <View style={[flexRow, ph5, mt3]}>
                                                <CustomIcon
                                                    name="location-outline"
                                                    size={18}
                                                    color={colors.greyVar4}
                                                    type="Ionicons"
                                                />
                                                <Text style={[commonText.h15Grey]}>{data.location}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    whiteBg: {
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        overflow: 'hidden',
    },
    firstLetter: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: 10,
        marginLeft: 20,
    },
    cardContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 4,
        margin: 15,
        padding: 10,
        borderRadius: 8
    },
    selectedCardContainer: {
        backgroundColor: colors.primaryVar1,
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 8
    },
    roundNumber: {
        height: 25,
        width: 25,
        borderRadius: 20,
    },
    chatHeaderText: {
        fontSize: 19,
        color: colors.greyVar4,
        fontWeight: '700',
        top: 2
    },
    roundNumberText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 12,
        fontWeight: '400',
        marginTop: 3,
    },
    status: {
        borderWidth: 1.5,
        borderColor: colors.white,
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 15,
        width: 15,
        borderRadius: 100,
    },
    archiveCard: {
        height: 45,
        width: 0.90 * DevWidth,
        backgroundColor: colors.primaryVar1,
        borderRadius: 10
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
});

export default InviteFriend