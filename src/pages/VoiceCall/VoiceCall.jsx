import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";


const AudioCall = ({ channel, token, uid, iconOnly = false }) => {
    const client = useRef(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
    const localAudioTrack = useRef(null);
    const [joined, setJoined] = useState(false);
    const [localSpeaking, setLocalSpeaking] = useState(false);
    const [remoteSpeaking, setRemoteSpeaking] = useState(false);


    useEffect(() => {
        client.current.enableAudioVolumeIndicator(); // start volume monitoring

        client.current.on("volume-indicator", (volumes) => {
            volumes.forEach((volume) => {
                if (volume.uid === uid) {
                    setLocalSpeaking(volume.level > 5); // threshold
                } else {
                    setRemoteSpeaking(volume.level > 5);
                }
            });
        });
    }, []);


    const joinCall = async () => {
        try {
            // 🔹 Get token & appId from your backend
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

            // 🔹 Join the Agora channel
            await client.current.join('f9380eb239b64da997b887ea4823b509', channel, token, uid);

            // 🔹 Create microphone track (NO camera)
            localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();

            // 🔹 Publish only audio
            await client.current.publish([localAudioTrack.current]);

            // 🔹 Handle remote users
            client.current.on("user-published", async (user, mediaType) => {
                await client.current.subscribe(user, mediaType);

                if (mediaType === "audio") {
                    user.audioTrack.play(); // plays audio directly
                }
            });

            client.current.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    console.log("Remote user stopped audio");
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
        } catch (err) {
            console.error("Error leaving audio call:", err);
        }
    };

    return (
        <div>
            {!iconOnly ? (
                <Button
                    variant="default"
                    className="w-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 text-white"
                    onClick={joinCall}
                >
                   <Phone className="mr-3 h-5 w-5 " /> Join Audio Call
                </Button>
            ) : (
                <Button className="cosmic-gradient text-white"
                    size="sm"
                    variant="outline"
                    onClick={joinCall} >
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
                    <div className="flex flex-col md:flex-row gap-5 bg-[#222] p-5 rounded-lg text-white">
                        {/* Local User */}
                        <div className="w-[320px] h-[240px] md:w-[320px] md:h-[320px] bg-black flex flex-col items-center justify-center rounded-lg">
                            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
                                👤
                            </div>
                            <p className="mt-3">You</p>

                            {/* Mic activity icon */}
                            {localSpeaking ? (
                                <span className="mt-2 animate-pulse text-green-400">🎤 Speaking</span>
                            ) : (
                                <span className="mt-2 text-gray-400">🎤 Silent</span>
                            )}
                        </div>

                        {/* Remote User */}
                        <div className="w-[320px] h-[240px] md:w-[320px] md:h-[320px] bg-black flex flex-col items-center justify-center rounded-lg">
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
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
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
