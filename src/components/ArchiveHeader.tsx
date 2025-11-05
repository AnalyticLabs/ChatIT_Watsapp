import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import styles from "../styles/chatListStyles";

interface Props {
  archivedCount: number;
  onPress?: () => void;
}

export default function ArchiveHeader({ archivedCount, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.archiveContainer]} onPress={onPress}>
      {/* <Image
        source={require("../../assets/icons/archive.png")}
        style={[styles.archiveIcon, { tintColor: colors.primary }]}
      /> */}
      <Text style={[styles.archiveText, { color: colors.textPrimary }]}>
        Archived
      </Text>
      {archivedCount > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.unreadText}>{archivedCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
