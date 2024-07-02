import React from "react";

function Timer({ time }) {
    // Format the time in MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    return (
        <input
            disabled={true}
            value={formatTime(time)}
            className="bg-white text-black text-center w-20 h-10 flex items-center justify-center rounded"
        />
    );
}

export default Timer