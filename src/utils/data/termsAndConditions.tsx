import React from 'react';
import { Text, View } from 'react-native';
import { flex1, flexRow, m15, mh10, ml5, mt30, mv20, mv5 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { SearchHeader } from '../../pages/media/mediaCommonHeader';
import { isDark } from '../../theme/themeContext';
import { colors } from '../colors';
import { labels } from '../labels';
import { CheckCircleIcon } from '../svg';

export type termsAndConditionsProps = {
}

export const termText = () => {
    return (
        <View>
            <Text style={[mv20,commonText.h14font400Gray4, { letterSpacing: 1.2, textAlign: 'justify', lineHeight: 25 }]}>{labels.termTextCon}</Text>
        </View>
    )
}

export const privacyContentData = (value: string) => {
    return (
        <View>
            <Text style={[commonText.h15font500Black]}>{value}</Text>
            {termText()}
        </View>
    )
}

export const agreeText = (text1: string, text2: string) => {
    return (
        <View style={[flexRow, mv5]}>
            <CheckCircleIcon />
            <View style={[mh10, flexRow]}>
                <Text style={[commonText.h14font400Gray4]}>{text1}</Text>
                <Text style={[ml5,commonText.h14BlackText]}>{text2}</Text>
            </View>
        </View>

    )
}

const TermsAndConditions = (props: termsAndConditionsProps) => {
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.termandCondition} /> */}
            <View style={[m15, mt30]} >
                {privacyContentData(labels.termsandcondition1)}
                {privacyContentData(labels.termText2)}
                {privacyContentData(labels.termText2)}
                <View style={{ margin: 20 }}>
                    {agreeText(labels.agreeText, labels.termsandcondition1)}
                    {agreeText(labels.agreeText, labels.privacyPolicy)}
                </View>
            </View>
        </View>
    )
}

export default TermsAndConditions