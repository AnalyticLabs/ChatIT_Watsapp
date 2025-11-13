import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ToggleSwitch } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, ml15, mt20, mv10 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { GroupSettingData } from '../../utils/data/groupsData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

export type GroupSettingsProps = {

}


const GroupSettings = (props: GroupSettingsProps) => {
    const initialToggleStates = GroupSettingData.map(item => item.id === 1 || item.id === 2);

    const [toggleStates, setToggleStates] = useState(initialToggleStates);

    const toggleSwitch = (index: number) => {
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
    };

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 :  colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.GroupSetting} /> */}
            <View style={[mt20, mh20]}>
                {
                    GroupSettingData.map((item) => {
                        return (
                            <View style={[flexRow, alignItemsCenter, justyfyCenter, mv10]} key={item.id}>
                                <View style={{ height: 30, width: 30, borderRadius: 8, backgroundColor: item.bgcolor, alignItems: 'center', justifyContent: 'center' }}>
                                    <CustomIcon name={item.iconName} size={item.iconSize} type={item.iconType} color={item.iconColor} />
                                </View>
                                <View style={[flex1, ml15,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h14Blackvar2Bold500]}>{item.name}</Text>
                                    <ToggleSwitch value={toggleStates[item.id]} onToggle={() => toggleSwitch(item.id)} />
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default GroupSettings