import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { flex1, mh10, mt10, mt5, mv3 } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { manageDevicesdata } from '../../utils/data/manageDeviceData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

interface CardHeaderTextProps {
    text: string;
}

export const CardHeaderText1: React.FC<CardHeaderTextProps> = ({ text }) => {
    return (
        <View style={[mt5, { alignItems: 'flex-start' }]}>
            <View style={[styles.headerCard, {
                backgroundColor: (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.redVar1),
            }]}>
                <Text style={[mh10,commonText.h14redText]}>
                    {text}
                </Text>
            </View>
        </View >
    )
};

export const cardDetails = () => {
    return (
        <View >
            {manageDevicesdata.map((item) => {
                return (
                    <View key={item.id} style={{marginBottom:15}}>
                        <View style={[styles.cardContainer, {
                            backgroundColor: isDark() ? colors.darkModeVar4 : colors.white,
                            borderColor: isDark() ? colors.darkModeVar5 : colors.greyVar0
                        }]} >
                            <View>
                                 <View  style={[mv3,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h15font500Black]}>{item.date}</Text>
                                    <Text style={[commonText.h14font400Gray4]}>{item.dateAndtime}</Text>
                                </View>
                                 <View  style={[mv3,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h15font500Black]}>{item.device}</Text>
                                    <Text style={[commonText.h14font400Gray4]}>{item.deviceName}</Text>
                                </View>
                                 <View  style={[mv3,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h15font500Black]}>{item.ipAdd}</Text>
                                    <Text style={[commonText.h14font400Gray4]}>{item.ipId}</Text>
                                </View>
                                <View  style={[mv3,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h15font500Black]}>{item.location}</Text>
                                    <Text style={[commonText.h14font400Gray4]}>{item.devLoc}</Text>
                                </View>
                                 <View  style={[mv3,commonView.rowSpaceBetween]}>
                                    <Text style={[mt10,commonText.h15font500Black]}>{item.status}</Text>
                                    <CardHeaderText1 text={labels.Delete} />
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })
            }
        </View>
    )
};

export type manageDevicesProps = {
}

const ManageDevices = (props: manageDevicesProps) => {
    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                {/* <SearchHeader headerText={labels.manageDev} /> */}
                <ScrollView>
                    <View style={{marginTop:20,marginHorizontal:20}}>
                    {cardDetails()}
                    {cardDetails()}
                    {cardDetails()}
                    {cardDetails()}
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    )
};

export default ManageDevices
const styles = StyleSheet.create({
    headerCard: {
        borderRadius: 8,
        padding: 10
    },
    cardContainer: {
        borderRadius: 10,
        padding: 12,
        borderWidth: 2,
    }
});