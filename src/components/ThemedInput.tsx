import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../theme/ThemeProvider";
import {styles as commonStyles} from "../assets/styles"
import { fontValue } from "../utils/responsiveFonts";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: any;
  image?: string;
}

export default function ThemedInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  image,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.inputContainer, { borderColor: colors.border }]}>

      {image && (
        <View style={styles.imageContainer} >
          <Image
            source={image}
            style={commonStyles.img}
          />
        </View>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.textSecondary }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: fontValue(12),
    paddingHorizontal: fontValue(12),
    paddingVertical: fontValue(10),
    marginBottom: fontValue(16),
  },
  input: {
    flex: 1,
    fontSize: fontValue(16),
  },
  imageContainer: {
    width: fontValue(24),
    height: fontValue(24),
    marginRight: fontValue(12),
  },
});
