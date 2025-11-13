import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { LongPurpleButton } from '../components/commonButtons';
import { flex1, mt30, mt8, spaceBetween } from '../components/commonStyles';
import { commonText } from '../components/commonText';
import { styledComponentsSheet } from '../styledComponent/styledComponent';
import { MiddleData } from '../utils/data/verfifyCodeData';
import { QrCodeImg } from '../utils/png';
import { StarredAndVerifycodeHeader } from './media/mediaCommonHeader';

const VerifyCode = () => {
    const [data, setData] = useState(MiddleData);
    return (
        <View style={flex1} >
            <StarredAndVerifycodeHeader headerText='Verify Security Code' isSearchDot={true} openModal={false} />
            <View style={[styledComponentsSheet.qrImgView]}>
                <Image source={QrCodeImg} />
            </View>
            <View style={[{ marginHorizontal: 40 }, mt30]}>
                <FlatList
                    columnWrapperStyle={[mt8, spaceBetween]}
                    numColumns={4}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={[commonText.h14GreyVar4Bold400]}>{item.num}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ marginHorizontal: 25, marginVertical: 40 }}>
                <Text style={[{ textAlign: 'center', letterSpacing: 0.3, lineHeight: 20 }, commonText.h14GreyVar4Bold400,]}>
                    To verify that messages and calls with Horace{'\n'} Keene are end-to-end encrypted, scan this code{'\n'} on their phone. You can also compare the {'\n'} number above instead.
                </Text>
            </View>
            <View style={{ marginHorizontal: 20, justifyContent: 'flex-end', flex: 1, bottom: 25 }}>
                <LongPurpleButton title='Scan Code' />
            </View>
        </View>
    )
}

export default VerifyCode