import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { CustomModal } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh30, mt15, mt3, mt5, mv10, p10, pb5, pl13 } from '../../components/commonStyles';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { createGroupUserSelectData } from '../../utils/data/groupsData';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';

export type BlockedContactsProps = {

}

const BlockedContacts = (props: BlockedContactsProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [selectedBlockIcon, setSelectedBlockIcon] = useState(null);
    const statusBarHeight = getStatusBarHeight();
    const navigation = useNavigation();
    const handleBlockContacts = (event, item) => {
        setSelectedBlockIcon(item);
        const { pageX, pageY } = event.nativeEvent;
        const marginLeft = pageX + 30;
        setModalPosition({ x: marginLeft, y: pageY - statusBarHeight });
        setModalVisible(true);
    };
    const BlockChatOption = () => {
        return (
            <TouchableOpacity onPress={() => { }} style={{ marginHorizontal: 10 }}>
                <View style={[flexRow]}>
                    <View style={[alignItemsCenter, justyfyCenter]}>
                        <CustomIcon name='block-flipped' type="MaterialIcons" size={20} color={isDark() ? colors.greyVar3 : colors.blackVar1} />
                    </View>
                    <View style={[alignItemsCenter, justyfyCenter, pl13]}>
                        <Text style={[commonText.h14blackVar1bold400Text]}>Unblock</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.BlockedContacts} searchIcon={true} /> */}
            <View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={[flex1, mh30, mt15]}>
                        {
                            createGroupUserSelectData.map((item) => {
                                return (
                                    <View key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white }]}>
                                        <View style={[flexRow]}>
                                            <View style={[alignItemsCenter, justyfyCenter]}>
                                                <Image source={item.img} style={styles.profileImg} />
                                                <View style={[{ backgroundColor: item.status === 'active' ? '#20c997' : '' }, item.status === 'active' ? styles.status : null]} />
                                            </View>
                                            <View style={[flex1]}>
                                                 <View style={[commonView.rowSpaceBetween,pb5]}>
                                                    <View style={[]} >
                                                        <Text style={[mt3,commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                        <Text style={[mt5,commonText.h14GreyVar4Bold400]}>{item.note}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={(event) => handleBlockContacts(event, item)} style={[alignItemsCenter, justyfyCenter]}>
                                                        <CustomIcon name='block-flipped' type="MaterialIcons" color={isDark() ? colors.redVar2 : colors.red} size={16} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            {
                selectedBlockIcon && (
                    <CustomModal
                        isVisible={isModalVisible}
                        width={DevWidth * 0.45}
                        modalData={<BlockChatOption />}
                        marginTop={modalPosition.y}
                        marginLeft={modalPosition.x}
                        onClose={() => setModalVisible(false)}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    whiteCard: {
        height: 70,
        borderRadius: 5,
    },
    status: {
        borderWidth: 3,
        borderColor: isDark() ? colors.blackVar2 : colors.white,
        position: 'absolute',
        bottom: 0,
        right: 10,
        height: 15,
        width: 15,
        borderRadius: 10,
    },
});

export default BlockedContacts