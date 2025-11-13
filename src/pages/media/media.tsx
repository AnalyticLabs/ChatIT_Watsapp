import React from 'react';
import { View } from 'react-native';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { DevHeight } from '../../utils/device';
import { MediaHeader } from './mediaCommonHeader';


const Media = () => {
    return (
        <View style={{ flex: 1 ,backgroundColor: isDark()?colors.darkModeVar2:colors.whiteVar0}}>
            <MediaHeader Imagess={true} height={DevHeight/5} />
        </View>
    )
}

export default Media