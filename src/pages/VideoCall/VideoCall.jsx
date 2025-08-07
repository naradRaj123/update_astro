import React, { useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';


const VideoCall = ({ channel, uid }) => {
  const client = useRef(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
  const localAudioTrack = useRef(null);
  const localVideoTrack = useRef(null);
  const localRef = useRef();
  const remoteRef = useRef();
  const [joined, setJoined] = useState(false);

  const joinCall = async () => {
    console.log("join call button clicked.")
    try {
      // 1. Fetch the App ID and Token
      const res = await axios.get(`https://astro-talk-backend.onrender.com/web/agora/astro/token`, {
        params: {
          channelname: channel,
          Uid: uid,
        },
      });
      const { appId, token } = res.data;

      console.log("response data", res)
      // 2. Join the channel
      await client.current.join('f9380eb239b64da997b887ea4823b509', channel, token, uid);

      // 3. Create and play local tracks
      localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();
      localVideoTrack.current.play(localRef.current);

      // 4. Publish local tracks
      await client.current.publish([localAudioTrack.current, localVideoTrack.current]);

      // 5. Subscribe to remote
      client.current.on('user-published', async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);
        if (mediaType === 'video') {
          user.videoTrack.play(remoteRef.current);
        }
        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });

      client.current.on('user-unpublished', () => {
        remoteRef.current.innerHTML = '';
      });

      setJoined(true);
    } catch (error) {
      console.error('Failed to join call:', error);
    }
  };

  const leaveCall = async () => {
    try {
      if (localAudioTrack.current) {
        localAudioTrack.current.stop();
        localAudioTrack.current.close();
      }
      if (localVideoTrack.current) {
        localVideoTrack.current.stop();
        localVideoTrack.current.close();
      }
      await client.current.leave();
      setJoined(false);
    } catch (err) {
      console.error('Error leaving the call:', err);
    }
  };

  return (
    <div>
      <h2>1-to-1 Agora Video Call</h2>
      {!joined ? (
        <button style={{backgroundColor:"pink"}} onClick={joinCall}>Join Call</button>
      ) : (
        <button onClick={leaveCall}>Leave Call</button>
      )}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div ref={localRef} style={{ width: '320px', height: '240px', border: '1px solid #333' }}></div>
        <div ref={remoteRef} style={{ width: '320px', height: '240px', border: '1px solid #333' }}></div>
      </div>
    </div>
  );
};

export default VideoCall;
