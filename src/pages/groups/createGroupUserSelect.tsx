import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { MultiSelectOption } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt15, mt3, mt5, mv10, mv20, p10, pb5 } from '../../components/commonStyles';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { createGroupUserSelectData } from '../../utils/data/groupsData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';
import { commonText } from '../../components/commonText';

export type CreateGroupUserSelectProps = {

}

const CreateGroupUserSelect = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

    const handleCancelButton = () => {
        setIsCancelButtonActive(true);
    };

    const handleCreateButton = () => {
        setIsCancelButtonActive(false);
    };

    const handleItemSelect = (itemId: number) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item !== itemId)
            );
        } else {
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
        }
    };

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.CreateGroup} searchIcon={true} /> */}
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[flex1, mh20, mt15]}>
                    {
                        createGroupUserSelectData.map((item) => {
                            return (
                                <View key={item.id} style={[p10, mv10, styles.whiteCard,{backgroundColor: isDark() ? colors.darkModeVar4 : colors.white,}]}>
                                    <View style={[flexRow]}>
                                        <View style={[alignItemsCenter, justyfyCenter]}>
                                            <Image source={item.img} style={styles.profileImg} />
                                            <View style={[{ backgroundColor: item.status === 'active' ? '#20c997' : '', borderColor: isDark() ? colors.darkModeVar4 : colors.white, }, item.status === 'active' ? styles.status : null]} />
                                        </View>
                                        <View style={[flex1]}>
                                             <View style={[commonView.rowSpaceBetween,pb5]}>
                                                <View style={[]} >
                                                    <Text style={[mt3,commonText.h15Blackvar2Bold500]}>{item.name}</Text>
                                                    <Text style={[mt5,commonText.h14GreyVar4Bold400]}>{item.note}</Text>
                                                </View>
                                                <View style={[alignItemsCenter, justyfyCenter]}>
                                                    <MultiSelectOption selectedColor={colors.primaryVar3} unselectedColor={colors.greyVar6} isSelected={selectedItems.includes(item.id)} onSelect={() => handleItemSelect(item.id)} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style = {[mh20,mv20,commonView.rowSpaceBetween]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                    />
                    <SmallButton
                        title={labels.Create}
                        onChange={handleCreateButton}
                        backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                        textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                    />
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

export default CreateGroupUserSelect