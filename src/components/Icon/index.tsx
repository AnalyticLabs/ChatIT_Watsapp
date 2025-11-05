import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CustomIconProps } from '../../types/utils';
import { COLORS } from '../../utils/constants';

// Map all icon sets
const Icons = {
  MaterialCommunityIcons,
  Entypo,
  Feather,
  MaterialIcons,
  Fontisto,
  Ionicons,
  FontAwesome,
  FontAwesome6,
  Octicons,
  AntDesign,
  FontAwesome5,
  EvilIcons,
} as const;

// Limit `as` prop to valid keys only
type IconSetName = keyof typeof Icons;

interface FixedCustomIconProps extends CustomIconProps {
  as: IconSetName;
}

const CustomIcon: React.FC<FixedCustomIconProps> = ({
  name,
  as,
  size = 24,
  color = COLORS.black,
}) => {
  const IconComponent = Icons[as];
  return <IconComponent name={name} size={size} color={color} />;
};

export default CustomIcon;
