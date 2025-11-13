import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { MultiSelectOption } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt15, mt3, mt5, mv10, p10, pb5 } from '../../components/commonStyles';
import { commonView } from '../../components/commonView';
import { isDark, useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { newChatData } from '../../utils/data/chatsData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

const Forward = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [optionSelect, setOptionSelect] = useState(false);

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
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.ForwardTo} searchIcon={true} /> */}
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={[flex1, mh20, mt15]}>
                    {
                        newChatData.map((item) => {
                            return (
                                <View key={item.id} style={[p10, mv10, styles.whiteCard, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white }]}>
                                    <View style={[flexRow]}>
                                        <View style={[alignItemsCenter, justyfyCenter]}>
                                            <Image source={item.img} style={styles.profileImg} />
                                            <View style={[{ backgroundColor: item.status === 'active' ? (isDark() ? colors.greenVar2 : colors.green) : '', borderColor: isDarkTheme ? colors.darkModeVar4 : colors.white }, item.status === 'active' ? styles.status : null]} />
                                        </View>
                                        <View style={[flex1]}>
                                            
                                                <View style={[commonView.rowSpaceBetween,pb5]}>
                                                <View style={[]} >
                                                   
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

export default Forward