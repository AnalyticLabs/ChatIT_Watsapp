import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from "react-native-agora";
import { fetchAgoraToken } from "../services/agoraService";

const APP_ID = "e27f4b2a708f492d840d64e6b136c2d8"; // you can also keep in .env and inject

export default function CallScreen({ route }: any) {
  const { channelName, uid: uidFromServer, token, jwtToken } = route.params;
  const [engine, setEngine] = useState<RtcEngine | null>(null);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const init = async () => {
      const rtcEngine = await RtcEngine.create(APP_ID);
      await rtcEngine.enableVideo();
      rtcEngine.addListener("UserJoined", (uid) => {
        setRemoteUid(uid);
      });
      rtcEngine.addListener("UserOffline", (uid) => {
        setRemoteUid(null);
      });
      rtcEngine.addListener("JoinChannelSuccess", () => setJoined(true));
      setEngine(rtcEngine);
      
      // request token from server (if not supplied)
      let rtcToken = token;
      if (!rtcToken) {
        const data = await fetchAgoraToken(channelName, 0, "publisher", 3600);
        rtcToken = data.token;
      }
      await rtcEngine.joinChannel(rtcToken, channelName, null, 0);
    };

    init();

    return () => {
      (async () => {
        try {
          await engine?.leaveChannel();
          await engine?.destroy();
        } catch (e) {}
      })();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Channel: {channelName}</Text>
      <View style={{ flex: 1 }}>
        {joined && <RtcLocalView.SurfaceView style={{ flex: 1 }} channelId={channelName} renderMode={VideoRenderMode.Hidden} />}
      </View>
      <View style={{ height: 200 }}>
        {remoteUid ? <RtcRemoteView.SurfaceView style={{ flex: 1 }} uid={remoteUid} channelId={channelName} renderMode={VideoRenderMode.Hidden} /> : <Text>No Remote</Text>}
      </View>
      <Button title="Leave" onPress={async () => { await engine?.leaveChannel(); setJoined(false); }} />
    </View>
  );
}
