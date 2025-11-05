import React, { useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  PressableProps,
  Image,
} from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { COLORS } from '../../utils/constants';
import CustomIcon from '../Icon';
import { fontValue } from '../../utils/responsiveFonts';
import IMAGES from '../../utils/IMAGES';

interface ImageFastProps extends PressableProps {
  singleClickPreview?: boolean;
  onPress?: () => void;
  onCross?: () => void;
  source: number | any;
  resizeMode?: FastImageProps['resizeMode'];
  style?: ViewStyle | ViewStyle[];
  imageStyle?: ViewStyle | ViewStyle[];
  tintColor?: string;
  isOnline?: boolean;
  isCross?: boolean;
  isCloud?: boolean;
}

const ImageComponent: React.FC<ImageFastProps> = ({
  singleClickPreview,
  onPress,
  onCross,
  source,
  resizeMode,
  style,
  imageStyle,
  tintColor,
  isOnline,
  isCross,
  isCloud,
  ...pressableProps
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View
      style={[styles.imageStyle, style]}
    >
      <FastImage
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={[styles.image, imageStyle,]}
        source={source}
        tintColor={tintColor}
        resizeMode={resizeMode}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      )}
      {isCross && (
        <TouchableOpacity onPress={onCross} style={[styles.cross]}>
          <CustomIcon
            as="Entypo"
            name="cross"
            color={COLORS.black}
            size={fontValue(23)}
          />
        </TouchableOpacity>
      )}
      {isCloud && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={IMAGES.cloud}
            style={{
              height: fontValue(30),
              width: fontValue(30),
              alignSelf: 'center',
            }}
          />
        </View>
      )}
      {isOnline && (
        <View
          style={{
            backgroundColor: 'rgba(54, 206, 0, 1)',
            height: fontValue(10),
            width: fontValue(10),
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: fontValue(50),
            borderWidth: 2,
            borderColor: COLORS.white,
          }}></View>
      )}
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageStyle: {
    width: fontValue(30),
    height: fontValue(30),
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  cross: {
    position: 'absolute',
    top: fontValue(-10),
    right: fontValue(-10),
    backgroundColor: COLORS?.crossRed,
    borderRadius: fontValue(50),
  },
});
