import React from 'react';
import { FlatList, ImageBackground, View } from 'react-native';
import { alignItemsCenter, justyfyCenter, mh20, mt20 } from '../../components/commonStyles';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { DevHeight, DevWidth } from '../../utils/device';
import { MediaHeader } from './mediaCommonHeader';
import { VideoViewData } from '../../utils/data/mediaData';

export type ImageViewProps = {

}
const VideoView = (props: ImageViewProps) => {
    const renderItem = ({ item }) => (
        <View>
            <ImageBackground source={item.img} style={[alignItemsCenter,justyfyCenter,{ width: DevWidth, height: DevHeight/1.24}]} >
                <CustomIcon name="play-circle-o" size={40} color={colors.white} type="font-awesome" />
            </ImageBackground>
        </View>
    );

    return (
        <View >
            <MediaHeader height={DevHeight / 7} startDot={true} Imagess={false} imageViewModal={true} />
            <View style={[mh20,mt20]}>
            <FlatList
                data={VideoViewData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                snapToAlignment='center'
            />
            </View>
        </View>
    )
}

export default VideoView