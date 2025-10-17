import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AudioCall = ({ channel, token, uid, iconOnly = false }) => {
  const client = useRef(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const localAudioTrack = useRef(null);

  const [joined, setJoined] = useState(false);
  const [localSpeaking, setLocalSpeaking] = useState(false);
  const [remoteSpeaking, setRemoteSpeaking] = useState(false);

  // 🔹 Track both participants
  const [localJoined, setLocalJoined] = useState(false);
  const [remoteJoined, setRemoteJoined] = useState(false);

  // 🔹 Timer state
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    client.current.enableAudioVolumeIndicator();

    client.current.on("volume-indicator", (volumes) => {
      volumes.forEach((volume) => {
        if (volume.uid === uid) {
          setLocalSpeaking(volume.level > 5);
        } else {
          setRemoteSpeaking(volume.level > 5);
        }
      });
    });
  }, [uid]);

  // Start timer only when both joined
  useEffect(() => {
    if (localJoined && remoteJoined && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [localJoined, remoteJoined]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const joinCall = async () => {
    try {
      const res = await axios.get(
        `https://astro-talk-backend.onrender.com/web/agora/astro/token`,
        {
          params: {
            channelname: channel,
            Uid: uid,
          },
        }
      );

      const { appId, token } = res.data;

      // Join Agora channel
      await client.current.join("f9380eb239b64da997b887ea4823b509", channel, token, uid);

      // Mark local user joined
      setLocalJoined(true);

      // Create microphone track
      localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();

      // Publish audio
      await client.current.publish([localAudioTrack.current]);

      // Remote users
      client.current.on("user-published", async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);

        if (mediaType === "audio") {
          user.audioTrack.play();
          setRemoteJoined(true); // mark remote joined
        }
      });

      client.current.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          console.log("Remote user stopped audio");
          setRemoteJoined(false);
        }
      });

      setJoined(true);
    } catch (err) {
      console.error("Error joining audio call:", err);
    }
  };

  const leaveCall = async () => {
    try {
      if (localAudioTrack.current) {
        localAudioTrack.current.stop();
        localAudioTrack.current.close();
      }
      await client.current.leave();
      setJoined(false);

      // Reset states
      setLocalJoined(false);
      setRemoteJoined(false);
      setSeconds(0);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } catch (err) {
      console.error("Error leaving audio call:", err);
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
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Voice Calls</p>
              <p className={cn(
                "text-sm font-medium text-green-600",
              )}>
                ACTIVE
              </p>
            </div>
          </div>
        </motion.div>
        // <Button
        //   variant="default"
        //   className="w-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 text-white"
        //   onClick={joinCall}
        // >
        //   <Phone className="mr-3 h-5 w-5" /> Join Audio Call
        // </Button>
      ) : (
        <Button
          className="cosmic-gradient text-white"
          size="sm"
          variant="outline"
          onClick={joinCall}
        >
          <Phone />
        </Button>
      )}

      {joined && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Timer */}
          {localJoined && remoteJoined && (
            <div className="text-white text-2xl font-bold mb-5">
              ⏱ {formatTime(seconds)}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-5 bg-[#222] p-5 rounded-lg text-white">
            {/* Local User */}
            <div className="w-[320px] h-[240px] bg-black flex flex-col items-center justify-center rounded-lg">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
                👤
              </div>
              <p className="mt-3">You</p>
              {localSpeaking ? (
                <span className="mt-2 animate-pulse text-green-400">🎤 Speaking</span>
              ) : (
                <span className="mt-2 text-gray-400">🎤 Silent</span>
              )}
            </div>

            {/* Remote User */}
            <div className="w-[320px] h-[240px] bg-black flex flex-col items-center justify-center rounded-lg">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
                👤
              </div>
              <p className="mt-3">Astrologer</p>
              {remoteSpeaking ? (
                <span className="mt-2 animate-pulse text-green-400">🎤 Speaking</span>
              ) : (
                <span className="mt-2 text-gray-400">🎤 Silent</span>
              )}
            </div>
          </div>

          {/* Leave button */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={leaveCall}
              style={{
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
      )}
    </div>
  );
};

export default AudioCall;
