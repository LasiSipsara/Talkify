import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { LiaMicrophoneSlashSolid } from "react-icons/lia";
import { LiaMicrophoneSolid } from "react-icons/lia";
import useSendMessage from "../../hooks/useSendMessage";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { toast } from "react-hot-toast";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const { isMicrophoneOn, setIsMicrophoneOn } = useState(false);
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();

  const handleVoiceTyping = () => {
    // if (!browserSupportsSpeechRecognition) {
    //   toast.error("Your Browser doesn't support speech to text");
    // } else {
    //   toast.error("Your Browser  support speech to text");
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-5m rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={handleVoiceTyping}
        >
          {isMicrophoneOn ? (
            <LiaMicrophoneSolid />
          ) : (
            <LiaMicrophoneSlashSolid />
          )}
        </button>

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="spinner loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

// const MessageInput = () => {
//   return (
//     <form className="px-4 my-3">
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-5m rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3"
//         >
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;
