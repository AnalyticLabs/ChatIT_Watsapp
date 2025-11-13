import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfileCard } from '../../components/commonComponents';
import { flex1, flexRow, mh15, mt30, mv10, spaceBetween } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { personDetail } from '../../utils/data/contactData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { SearchHeader } from '../media/mediaCommonHeader';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export type contactDetailsProps = {

}

const ContactDetails = (props: contactDetailsProps) => {
    const navigation=useNavigation()

    const handleIcon=(id:number)=>{
        if(id === 1){
navigation.navigate(screenName.SingleAudioCallRing)
        }
    }
    
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.contactDetails} editDotIcon={true} /> */}
            <View style={{ margin: 20 }}>
                <ProfileCard />
                <View style={[mt30]}>
                    {
                        personDetail.map((data, index) => (
                            <View key={data.id} style={[mv10]}>
                                {index === 0 ? (
                                    <View style={[flexRow, spaceBetween]}>
                                        <View>
                                            <Text style={[commonText.h12font400Grey]}>{data.title}</Text>
                                            <Text style={[commonText.h15Blackvar2Bold500]}>{data.subTitle}</Text>
                                        </View>
                                        <View style={[flexRow]}>
                                            <TouchableOpacity style={[ mh15,styledComponentsSheet.iconContainer2]} onPress={()=>navigation.navigate(screenName.ChatView as never)}>
                                                <CustomIcon name='chatbox-outline' size={15} color={colors.white} type='Ionicons' />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[ mh15,styledComponentsSheet.iconContainer2]} onPress={()=>{handleIcon(data.id)}}>
                                                <CustomIcon name={data.iconName} size={15} color={colors.white} type={data.iconType} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={[flexRow, spaceBetween]}>
                                        <View>
                                            <Text style={[commonText.h12font400Grey]}>{data.title}</Text>
                                            <Text style={[commonText.h15Blackvar2Bold500]}>{data.subTitle}</Text>
                                        </View>
                                        <TouchableOpacity style={[ mh15,styledComponentsSheet.iconContainer2]}>
                                            <CustomIcon name={data.iconName} size={15} color={colors.white} type={data.iconType} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
};

export default ContactDetails;