import React, { ReactNode } from 'react';
import { View } from 'react-native';
import {   styledComponentsSheet } from '../styledComponent/styledComponent';

export type customModalProps = {
    content: ReactNode
}

const CustomModal = (props: customModalProps) => {
    return (
        <View>
        <View style={[styledComponentsSheet.modalContainer]}>
          <View style={[styledComponentsSheet.halfCircle2]} />
                <View style={[styledComponentsSheet.modalContent]}>
                    {props.content}
                </View>
            </View>
        </View>
    )
}

export default CustomModal