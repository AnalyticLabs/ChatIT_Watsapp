import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Button,
  Text,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  VideoSourceType,
  CameraDirection,
} from 'react-native-agora';

const appId = 'e27f4b2a708f492d840d64e6b136c2d8';
const channelName = 'ChatIt';
const token =
  '007eJxTYDgjPFdn1u7H/BqXNQJmHlVq/cM0g79BcJ3VLYW967hvvnNXYEg1Mk8zSTJKNDewSDOxNEqxMDFIMTNJNUsyNDZLBnKN3J5lNAQyMuiIb2NmZIBAEJ+NwTkjscSzhIEBADqQHog=';
const uid = 0;

const CallScreen = () => {
  const agoraEngineRef = useRef<any>();
  const [joined, setJoined] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  // ✅ Ask for permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
      if (!allGranted) Alert.alert('Permissions not granted!');
      return allGranted;
    }
    return true;
  };

  useEffect(() => {
    const setupAgora = async () => {
      const granted = await requestPermissions();
      if (!granted) return;

      const agoraEngine = createAgoraRtcEngine();
      agoraEngineRef.current = agoraEngine;

      agoraEngine.initialize({
        appId,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      // ✅ Enable video + audio
      agoraEngine.enableVideo();
      agoraEngine.enableAudio();

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('✅ Joined channel successfully');
          setJoined(true);
        },
        onUserJoined: (connection, remoteUid) => {
          console.log('👤 Remote user joined:', remoteUid);
          setRemoteUid(remoteUid);
        },
        onUserOffline: (connection, remoteUid) => {
          console.log('👋 Remote user left:', remoteUid);
          setRemoteUid(null);
        },
        onLeaveChannel: () => {
          console.log('👋 Left channel');
          setJoined(false);
          setRemoteUid(null);
        },
        onError: (err) => {
          console.log('❌ Agora Error:', err);
        },
      });

      setIsInitialized(true);
    };

    setupAgora();

    return () => {
      if (agoraEngineRef.current) {
        agoraEngineRef.current.leaveChannel();
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      }
    };
  }, []);

  // ✅ Join channel
  const joinChannel = () => {
    const agoraEngine = agoraEngineRef.current;
    if (!agoraEngine) return;

    console.log('🚀 Joining channel...');
    agoraEngine.startPreview();
    agoraEngine.joinChannel(token, channelName, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveChannel = () => {
    if (agoraEngineRef.current) {
      agoraEngineRef.current.leaveChannel();
      setJoined(false);
      setRemoteUid(null);
    }
  };

  // 🎙 Mute / Unmute mic
  const toggleMute = () => {
    const agoraEngine = agoraEngineRef.current;
    const newState = !isMuted;
    agoraEngine.muteLocalAudioStream(newState);
    setIsMuted(newState);
  };

  // 📷 Turn camera on/off
  const toggleCamera = () => {
    const agoraEngine = agoraEngineRef.current;
    const newState = !isCameraOn;
    if (newState) {
      agoraEngine.enableLocalVideo(true);
    } else {
      agoraEngine.enableLocalVideo(false);
    }
    setIsCameraOn(newState);
  };

  // 🔄 Switch front/back camera
  const switchCamera = () => {
    const agoraEngine = agoraEngineRef.current;
    agoraEngine.switchCamera();
    setIsFrontCamera((prev) => !prev);
  };

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Initializing Agora...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* ✅ Remote user video fills screen */}
      {remoteUid !== null ? (
        <RtcSurfaceView
          canvas={{ uid: remoteUid }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: '#111',
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#111',
          }}
        >
          <Text style={{ color: '#fff' }}>
            Waiting for another user to join...
          </Text>
        </View>
      )}

      {/* ✅ Local user video small overlay (like WhatsApp self-view) */}
      {joined && (
        <View
          style={{
            position: 'absolute',
            width: 120,
            height: 180,
            top: 60,
            right: 20,
            borderRadius: 12,
            overflow: 'hidden',
            zIndex: 99,
            backgroundColor: '#222',
          }}
        >
          <RtcSurfaceView
            canvas={{ uid: 0 }}
            sourceType={VideoSourceType.VideoSourceCamera}
            zOrderMediaOverlay={true}
            zOrderOnTop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}

      {/* ✅ Floating control buttons overlayed on video */}
      {joined && (
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            zIndex: 100,
          }}
        >

          <TouchableOpacity
            onPress={toggleMute}
            style={{
              backgroundColor: isMuted ? 'red' : 'rgba(255,255,255,0.3)',
              padding: 16,
              borderRadius: 40,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              {isMuted ? 'Unmute' : 'Mute'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={switchCamera}
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: 16,
              borderRadius: 40,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleCamera}
            style={{
              backgroundColor: isCameraOn
                ? 'rgba(255,255,255,0.3)'
                : 'red',
              padding: 16,
              borderRadius: 40,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              {isCameraOn ? 'Cam Off' : 'Cam On'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={leaveChannel}
            style={{
              backgroundColor: 'red',
              padding: 16,
              borderRadius: 40,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>End</Text>
          </TouchableOpacity>
        </View>
      )}

      {!joined && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
        >
          <TouchableOpacity
            onPress={joinChannel}
            style={{
              backgroundColor: '#1E90FF',
              paddingVertical: 14,
              paddingHorizontal: 40,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              Join Call
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CallScreen;
