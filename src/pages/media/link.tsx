
import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { flexRow, mt15, spaceBetween } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark, useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { LinkData } from '../../utils/data/mediaData';



const splitTextIntoLines = (text, maxLineLength) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentLine.length + word.length <= maxLineLength) {
            currentLine += (currentLine.length > 0 ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines;
};

const Link = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    return (
        <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Text style={[{ lineHeight: 20, marginTop: 20 },commonText.h15Blackvar2Bold500]}>Recent</Text>
            {LinkData.map((item, index) => {
                const lines = splitTextIntoLines(item.headertxt, 30);
                return (
                    <View key={index} style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={item.img} style={[{ height: 70, width: 70 }, mt15]} />
                            <View style={{ flex: 1, paddingLeft: 15, paddingTop: 12 }}>
                                {lines.map((line, lineIndex) => (
                                    <Text key={lineIndex} style={[{ lineHeight: 23 },commonText.h15Blackvar2Bold500]}>
                                        {line}
                                    </Text>
                                ))}
                                <Text style={[{ marginTop: 8 },commonText.h12font400Grey]}>{item.website}</Text>
                            </View>
                        </View>
                        <View style={[flexRow, spaceBetween, { paddingTop: 15 }]}>
                            <Text style={[commonText.h14GreyVar4Bold400]}>{item.link}</Text>
                            <CustomIcon name='chevron-right' color={isDark() ? colors.greyVar3 : colors.greyVar4} size={20} type="MaterialIcons" />
                        </View>
                        <View style={{ paddingTop: 15 }}>
                            <View style={[{ backgroundColor: isDarkTheme ? colors.greyVar0 : colors.greenVar2 },commonView.fullCommonLineDividerGrey]} />
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export default Link;