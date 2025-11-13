import React from 'react';
import { View } from 'react-native';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { DevHeight } from '../../utils/device';
import { MediaHeader } from './mediaCommonHeader';
import { ImageViewPic } from '../../utils/svg';

export type ImageViewProps = {

}


const ImageView = (props: ImageViewProps) => {
    return (
        <View style={{ flex: 1 ,backgroundColor:isDark()?colors.darkModeVar2:colors.whiteVar0}}>
            <MediaHeader height={DevHeight / 7} startDot={true} Imagess={false} imageViewModal={true} />
            <View style={{alignItems:'center',justifyContent:'center',marginVertical:25}}>
            <ImageViewPic />
            </View>
        </View>
    )
}

export default ImageView