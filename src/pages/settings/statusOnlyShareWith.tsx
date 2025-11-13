import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { MultiSelectOption } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh30, ml15, mr15, mr30, mt15, mt3, mt5, mv10, mv20, p10, pb5, pl13, spaceBetween } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { createGroupUserSelectData } from '../../utils/data/groupsData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { Text } from 'react-native';

export type StatusOnlyShareWithProps = {

}

const StatusOnlyShareWith = (props: StatusOnlyShareWithProps) => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [optionSelect, setOptionSelect] = useState(false);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

    const handleCancelButton = () => {
        setIsCancelButtonActive(true);
        navigation.goBack();
    };

    const handleDeleteChatButton = () => {
        setIsCancelButtonActive(false);
        navigation.goBack();
    };

    const toggleHeaderMultiSelect = () => {
        setOptionSelect(!optionSelect);
        if (optionSelect) {
            setSelectedItems([]);
        } else {
            const allItemIds = createGroupUserSelectData.map((item) => item.id);
            setSelectedItems(allItemIds);
        }
    };

    const handleOptionSelect = () => {
        toggleHeaderMultiSelect();
    };

    const handleItemSelect = (itemId: number) => {
        if (optionSelect) {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item !== itemId)
            );
        } else {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.includes(itemId)
                    ? prevSelectedItems.filter((item) => item !== itemId)
                    : [...prevSelectedItems, itemId]
            );
        }
    };

    return (
        <View style={[flex1, { backgroundColor:  isDark() ? colors.darkModeVar2 :  colors.whiteVar0 }]} >
            <View>
               
                <View
                  style={[
                    commonView.topContainerWhiteCardBase,
                    { height: DevHeight / 10 },
                  ]}
                  {...props}
                >
                    <View style={[{ marginHorizontal: 25 }, flex1, justyfyCenter]}>
                        <View style={[flexRow, spaceBetween]}>
                            <View style={[flexRow]}>
                                <TouchableOpacity style={[justyfyCenter, alignItemsCenter, { marginTop: 2 }]}
                                    onPress={navigation.goBack}
                                >
                                    <CustomIcon name='chevron-left' color={isDark() ? colors.white : colors.black} size={18} type="entypo" />
                                </TouchableOpacity>
                                <Text style={[pl13,commonText.h18BlackText,]}>{labels.OnlyShareWith}</Text>
                            </View>
                            <View style={[commonView.rowSpaceAround]}>
                                <View style={[mr15]}>
                                    <CustomIcon name="search" size={20} color={isDark() ? colors.white : colors.greyVar4} type="Ionicons" />
                                </View>
                                <MultiSelectOption selectedColor={isDark() ? colors.greenVar2 : colors.green} unselectedColor={colors.greyVar6} isSelected={optionSelect} onSelect={handleOptionSelect} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[flex1, mh30, mt15]}>
                    {
                        createGroupUserSelectData.map((item) => {
                            return (
                                <View key={item.id} style={[p10, mv10, styles.whiteCard, {backgroundColor: isDark() ? colors.darkModeVar4 : colors.white}]}>
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
                                                <View style={[alignItemsCenter, justyfyCenter]}>
                                                    <MultiSelectOption selectedColor={colors.green} unselectedColor={colors.greyVar6} isSelected={selectedItems.includes(item.id)} onSelect={() => handleItemSelect(item.id)} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={[mv20, flex1]}>
                    <View style={[commonView.rowSpaceBetween]}>
                        <View style={{ flex: 0.85 }} />
                        <View style={[flexRow, flex1]}>
                            <View style={[]}>
                                <SmallButton
                                    title={labels.cancel}
                                    onChange={handleCancelButton}
                                    backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                                    textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                                    borderWidth={isCancelButtonActive ? 0 : 1}
                                    width={DevWidth / 4.5}
                                />
                            </View>
                            <View style={[mr30, ml15]}>
                                <SmallButton
                                    title={labels.Save}
                                    onChange={handleDeleteChatButton}
                                    backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                                    textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                                    borderWidth={isCancelButtonActive ? 1 : 0}
                                    width={DevWidth / 4.5}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    whiteCard: {
        height: 70,
        borderRadius: 5,
    },
    multiSelectBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StatusOnlyShareWith