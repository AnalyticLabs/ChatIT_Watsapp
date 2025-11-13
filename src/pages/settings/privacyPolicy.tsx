import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { flex1, m15, mt30 } from '../../components/commonStyles';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { privacyContentData } from '../../utils/data/termsAndConditions';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

export type PrivacyPolicyProps = {}

const PrivacyPolicy = (props: PrivacyPolicyProps) => {
    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                {/* <SearchHeader headerText={labels.privacyPolicy} /> */}
                <ScrollView>
                    <View style={[m15, mt30]}>
                        {privacyContentData(labels.privacyPolicy)}
                        {privacyContentData(labels.termText2)}
                        {privacyContentData(labels.termText2)}
                        {privacyContentData(labels.termText2)}
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    )
};

export default PrivacyPolicy;