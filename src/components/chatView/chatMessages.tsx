
import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import {
    State as GestureState,
    PanGestureHandler,
} from 'react-native-gesture-handler';
import { pl6 } from '../../components/commonStyles';
import { isDark } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { commonText,  } from '../commonText';

const ChatMessage = ({ message, onSwipeRight, onPress, hanldeLogPress, selectedCards, toggleCardSelection, editedMessageText }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    const onSwipeGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                },
            },
        ],
        {
            useNativeDriver: false,
        }
    );

    const onSwipeGestureStateChange = (event) => {
        if (event.nativeEvent.oldState === GestureState.ACTIVE) {
            const swipeDistance = event.nativeEvent.translationX;
            if (swipeDistance > 50) {
                onSwipeRight();
                console.log('Hi');
            }
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <PanGestureHandler
            onGestureEvent={onSwipeGestureEvent}
            onHandlerStateChange={onSwipeGestureStateChange}
            activeOffsetX={[-200, 50]}
        >
            <Animated.View
                style={[
                    {
                        backgroundColor: selectedCards.includes(message.id) ? (isDark() ? colors.darkModeVar6 : colors.primaryVar4) : 'transparent',
                        transform: [{ translateX: translateX }],
                    },
                ]}
            >
                <TouchableOpacity
                    key={message.id}
                    onPress={() => {
                        if (selectedCards.length === 0) {
                            console.log('--');
                        } else {
                            toggleCardSelection(message.id); // Use the toggle function from props
                        }
                    }}
                    onLongPress={(event) => {
                        hanldeLogPress(event, message.id);
                        if (!selectedCards.includes(message.id)) {
                            toggleCardSelection(message.id);
                        }
                    }}
                >
                    <View>
                        <Text style={[message.type === 'sentmsg' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },commonText.h12font400Grey]}>{message.time}</Text>
                        <Text style={pl6}> {message.icon}</Text>
                    </View>
                    <View style={[
                        message.type === 'sentmsg' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },
                        { marginHorizontal: 20 },
                    ]}>{message.message}</View>
                </TouchableOpacity>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default ChatMessage;