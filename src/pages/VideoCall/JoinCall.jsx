import React, { useState } from 'react';
import VideoCall from './VideoCall';

const JoinCall = () => {
  const [channel, setChannel] = useState('');
  const [uid, setUid] = useState(Math.floor(Math.random() * 1000000));
  const [startCall, setStartCall] = useState(false);

  const handleStart = () => {
    if (channel.trim()) {
      setStartCall(true);
    } else {
      alert("Please enter a valid channel name.");
    }
  };

  return (
    <div style={{ padding: 20, marginTop:"5rem" }}>
      <h2>Join Existing Video Call</h2>

      {!startCall ? (
        <>
          <div style={{ marginBottom: 10 }}>
            <label htmlFor="channel">Channel Name:</label><br />
            <input
              type="text"
              id="channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Enter channel name"
              style={{ width: 300, padding: 8 }}
            />
          </div>

          <button
            onClick={handleStart}
            style={{ padding: '8px 16px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop:"5rem" }}
          >
            Join Call
          </button>
        </>
      ) : (
        <VideoCall channel={channel} uid={uid} />
      )}
    </div>
  );
};

export default JoinCall;
