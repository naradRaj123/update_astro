import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  User,
  Settings,
  Bell,
  ShoppingBag,
  Star,
  MessageSquare,
  Video,
  HelpCircle,
  LogOut,
  Zap,
  Heart,
  VideoIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";



const VideoCall = ({ channel, uid, iconOnly = false, time }) => {
  const client = useRef(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
  const localAudioTrack = useRef(null);
  const localVideoTrack = useRef(null);
  const localRef = useRef();
  const remoteRef = useRef();
  const [joined, setJoined] = useState(false);
  const [localJoined, setLocalJoined] = useState(false);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const {toast} = useToast();

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (localJoined && remoteJoined && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  },[localJoined, remoteJoined])

  useEffect(() => {
    if(!time) return;

    const maxSeconds = time

    if (seconds >= maxSeconds) {
      leaveCall();
      toast({
        title:"Session Duration Complete.",
        description: "Your session duration has been complete. Thank you!"
      })
    }
  }, [seconds, time])

  const joinCall = async () => {
    console.log("join call button clicked.")
    setJoined(true);
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
      setLocalJoined(true);
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
          setRemoteJoined(true);
        }
        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });

      client.current.on('user-unpublished', () => {
        remoteRef.current.innerHTML = '';
      });

    } catch (error) {
      console.error('Failed to join call:', error);
      setJoined(false);
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

      setLocalJoined(false);
      setRemoteJoined(false);
      setSeconds(0);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (time) {
        setConsultingAstro("")
      }
    } catch (err) {
      console.error('Error leaving the call:', err);
    }
  };

  return (
    <div>
      {!iconOnly ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border"
          onClick={joinCall}
        >
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500"
            )}>
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Video Calls</p>
              <p className={cn(
                "text-sm font-medium text-green-600",
              )}>
                ACTIVE
              </p>
            </div>
          </div>
          {/* <Button
                checked={isActive}
                onCheckedChange={onToggle}
                className={cn("bg-blue-500"
                )}
              /> */}
        </motion.div>
        // <Button
        //   variant="default"
        //   className="w-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 text-white"
        //   onClick={joinCall}
        // >
        //   <VideoIcon className="mr-3 h-5 w-5 " /> Join Video Call
        // </Button>
      ) : (
        <Button className="cosmic-gradient text-white"
          size="sm"
          variant="outline"
          onClick={joinCall} >
          <VideoIcon />
        </Button>
      )}

      {/* <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div ref={localRef} style={{ width: '320px', height: '240px', border: '1px solid #333' }}></div>
        <div ref={remoteRef} style={{ width: '320px', height: '240px', border: '1px solid #333' }}></div>
      </div> */}
      {/* Modal for Video Call */}

      {joined && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {localJoined && remoteJoined && (
            <div className="text-white text-2xl font-bold mb-5">
              ⏱ {formatTime(seconds)}
            </div>
          )}
          <div>
            <div
              className="flex flex-col md:flex-row gap-5 bg-[#222] p-5 rounded-lg"
            >
              <div
                ref={localRef}
                className="w-[320px] h-[240px] md:w-[620px] md:h-[500px] bg-black"
              ></div>
              <div
                ref={remoteRef}
                className="w-[320px] h-[240px] md:w-[620px] md:h-[500px] bg-black"
              ></div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
              <button
                onClick={leaveCall}
                style={{
                  // position: "absolute",
                  // top: "20px",
                  // right: "20px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Leave Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
