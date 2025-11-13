import React from 'react';
import { Image, View } from 'react-native';
import { flexRow, mt10, p10, pl13, spaceBetween } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { lastweekDocsData, recentDocsData } from '../../utils/data/mediaData';
import { Text } from 'react-native';

export type DocsProps = {

}




const Docs = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View >
            <View style={{ marginHorizontal: 20 }}>
                <Text style={[{ marginTop: 20 },commonText.h15Blackvar2Bold500]}>Recent</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                {recentDocsData.map((item, index) => (
                    <View key={index} >
                        <View style={[flexRow, spaceBetween, p10, mt10]} >
                            <View style={flexRow}>
                                <Image source={item.img} />
                                <View style={pl13}>
                                    <Text style={[{ lineHeight: 23 },commonText.h15Blackvar2Bold500]}>{item.docName}</Text>
                                    <Text style={[{ lineHeight: 16 },commonText.h12font400Grey]}>{item.storage}</Text>
                                </View>
                            </View>
                            <Text style={[commonText.h12font400Grey]}>{item.date}</Text>
                        </View>
                        {index !== recentDocsData.length - 1 &&
                            <View style={{ marginHorizontal: 10 }}>
                                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.fullCommonLineDividerGrey]} />
                            </View>
                        }
                    </View>
                ))}
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={[{ marginTop: 20 },commonText.h15Blackvar2Bold500]}>Last Week</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                {lastweekDocsData.map((item, index) => (
                    <View key={index}>
                        <View key={index} style={[flexRow, spaceBetween, p10, mt10]} >
                            <View style={flexRow}>
                                <Image source={item.img} />
                                <View style={pl13}>
                                    <Text style={[{ lineHeight: 23 },commonText.h15Blackvar2Bold500]}>{item.docName}</Text>
                                    <Text style={[{ lineHeight: 16 },commonText.h12font400Grey]}>{item.storage}</Text>
                                </View>
                            </View>
                             <Text style={[commonText.h12font400Grey]}>{item.date}</Text>
                        </View>
                        {index !== lastweekDocsData.length - 1 &&
                            <View style={{ marginHorizontal: 10 }}>
                                <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar3 : colors.greyVar0 },commonView.fullCommonLineDividerGrey]} />
                            </View>
                        }
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Docs