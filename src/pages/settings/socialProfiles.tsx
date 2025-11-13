import React from 'react';
import { Text, View } from 'react-native';
import { alignItemsCenter, flex1, flexRow, p20, ph10 } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { socilProfile } from '../../utils/data/socialServiceData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

export type socialProfilesProps = {
}

const SocialProfiles = (props: socialProfilesProps) => {
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.socialPro} editIcon={true}  /> */}
            <View>
                {socilProfile.map((socialProfile) => (
                    <View key={socialProfile.id} style={[p20]}>
                        <View style={[flexRow, alignItemsCenter]}>
                            <View style={[{ backgroundColor: isDark() ? colors.darkModeVar7 : colors.primaryVar4 },commonView.iconBackground]}>
                                <CustomIcon name={socialProfile.iconName} type={socialProfile.iconType} size={socialProfile.iconSize} color={isDark() ? colors.greyVar3 : colors.primaryVar3} />
                            </View>
                            <View style={[ph10]}>
                                <Text style={[commonText.h12fontBold400GreyVar4]}>{socialProfile.name}</Text>
                                <Text style={[commonText.h15font500Black]} >{socialProfile.link}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default SocialProfiles;