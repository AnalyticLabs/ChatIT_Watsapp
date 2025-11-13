import React, { Fragment, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CardHeaderText, ToggleSwitch } from '../../components/commonComponents';
import { flex1, justyfyCenter, mh20, mt15, mt20 } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { notificationData1, notificationData2 } from '../../utils/data/notificationData';
import { labels } from '../../utils/labels';
import { SearchHeader } from '../media/mediaCommonHeader';

export type NotificationProps = {}

const Notification = (props: NotificationProps) => {
    const [toggleVisible, setToggleVisible] = useState(false);
    const [toggleVisible1, setToggleVisible1] = useState(false);
    const [toggleVisible2, setToggleVisible2] = useState(false);
    const [toggleVisible3, setToggleVisible3] = useState(false);
    const [toggleVisible4, setToggleVisible4] = useState(false);

    const handleToggle = () => {
        setToggleVisible(!toggleVisible);
    }

    const handleToggle1 = () => {
        setToggleVisible1(!toggleVisible1);
    }

    const handleToggle2 = () => {
        setToggleVisible2(!toggleVisible2);
    }

    const handleToggle3 = () => {
        setToggleVisible3(!toggleVisible3);
    }

    const handleToggle4 = () => {
        setToggleVisible4(!toggleVisible4);
    }

    const text = (value: string) => {
        return (
            <Text style={[commonText.h14font500Gray41]}>{value}</Text>
        )
    }

    const notifyData = () => {
        return (
            <View >
                {notificationData1.map((item) => {
                    return (
                        <View style={[mt20]} key={item.id}>
                            <View style={[commonView.rowSpaceBetween]}>
                                <View>
                                    <Text style={[commonText.h14font500Gray41]}>{item.title}</Text>
                                    <Text style={[commonText.h12Grey]}>{item.subtitle}</Text>
                                </View>
                                <View style={[justyfyCenter]}>
                                    <CustomIcon name='chevron-right' size={15} color={isDark() ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                </View>
                            </View>
                        </View>
                    )
                })
                }
            </View>
        )
    };
    return (
        <Fragment>
            <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
                {/* <SearchHeader headerText={labels.notify} /> */}
                <ScrollView>
                    <View style={[mh20, mt20]}>
                        <View style={[commonView.rowSpaceBetween]}>
                            {text(labels.conversationTones)}
                            <ToggleSwitch value={toggleVisible} onToggle={handleToggle} />
                        </View>
                        <View style={[mt20]}>
                            <CardHeaderText text={labels.msg} />
                        </View>
                        {notifyData()}
                        <View style={[mt20]}>
                            <View style={[commonView.rowSpaceBetween]}>
                                <Text style={[commonText.h14font500Gray41]}>{labels.useHighPrioNotify}</Text>
                                <ToggleSwitch value={toggleVisible1} onToggle={handleToggle1} />
                            </View>
                            <View style={[mt15,commonView.rowSpaceBetween]}>
                                <Text style={[commonText.h14font500Gray41]}>{labels.reactionNotify}</Text>
                                <ToggleSwitch value={toggleVisible2} onToggle={handleToggle2} />
                            </View>
                        </View>
                        <View style={[mt20]}>
                            <CardHeaderText text={labels.Group} />
                            {notifyData()}
                            <View style={[mt20]}>
                                <View style={[commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h14font500Gray41]}>{labels.useHighPrioNotify}</Text>
                                    <ToggleSwitch value={toggleVisible3} onToggle={handleToggle3} />
                                </View>
                                <View style={[mt15,commonView.rowSpaceBetween]}>
                                    <Text style={[commonText.h14font500Gray4]}>{labels.reactionNotify}</Text>
                                    <ToggleSwitch value={toggleVisible4} onToggle={handleToggle4} />
                                </View>
                            </View>
                            <View style={[mt20]}>
                                <CardHeaderText text={labels.Calls} />
                                <View >
                                    {notificationData2.map((item) => {
                                        return (
                                            <View style={[mt20]} key={item.id}>
                                                <View style={[commonView.rowSpaceBetween]}>
                                                    <View>
                                                        <Text style={[commonText.h14font500Gray41]}>{item.title}</Text>
                                                       <Text style={[commonText.h12Grey]}>{item.subtitle}</Text>
                                                    </View>
                                                    <View style={[justyfyCenter]}>
                                                        <CustomIcon name='chevron-right' size={15} color={isDark() ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    )
};

export default Notification