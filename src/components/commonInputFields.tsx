import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { styledComponentsSheet } from '../styledComponent/styledComponent';

interface CustomTextInputProps extends TextInputProps {
  placeholder?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  textColor?: string;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  textColor,
}) => {
  const { theme } = useTheme()
  const isDarkTheme = theme === 'dark';

  return (
    <View >
      <TextInput
        style={[{ color: textColor },styledComponentsSheet.inputData]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={isDarkTheme ? colors.greyVar3 : colors.greyVar4}
      />
    </View>
  );
};