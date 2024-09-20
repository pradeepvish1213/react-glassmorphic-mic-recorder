"use client";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from "react";
import { FaMicrophone, FaStop, FaDownload } from 'react-icons/fa';
import './ReactMicroPhoneRecordButton.css';

const ReactMicroPhoneRecordButton = ({recordingMaxDuration = 240}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const audioStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const getMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
                audioStreamRef.current = stream;
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setAudioBlob(new Blob([event.data], {type: "audio/wav"}));
                    }
                };
            } catch (error) {
                console.error("Error accessing microphone:", error);
            }
        };

        getMediaStream();

        return () => {
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach((track) => track.stop());
            }
            clearInterval(timerRef.current);
        };
    }, []);

    const handleToggleRecording = useCallback((event) => {
        event.preventDefault();
        if (isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        } else {
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            setAudioBlob(null);

            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => {
                    if (prevTime >= recordingMaxDuration - 1) {
                        mediaRecorderRef.current.stop();
                        setIsRecording(false);
                        clearInterval(timerRef.current);
                        return recordingMaxDuration;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
    }, [isRecording, recordingMaxDuration]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleDownload = () => {
        if (audioBlob) {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            const url = URL.createObjectURL(audioBlob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `recording_${date}_${time}.wav`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="record-button-container body">
            <div className="button-group">
                <button 
                    onClick={handleToggleRecording}
                    className={`record-button ${isRecording ? 'record-button-recording' : 'record-button-idle'}`}
                >
                    {isRecording ? (
                        <>
                            <FaStop className="icon" />
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <FaMicrophone className="icon" />
                            {audioBlob ? "Record Again" : "Start Recording"}
                        </>
                    )}
                </button>

                {isRecording && (
                    <div className="timer-container">
                        <p className="timer-label">Recording in progress</p>
                        <p className="timer">{formatTime(recordingTime)}</p>
                    </div>
                )}

                {audioBlob && (
                    <div className="audio-container">
                        <div className="audio-preview">
                            <p className="audio-label">Preview:</p>
                            <audio controls className="w-full">
                                <source src={URL.createObjectURL(audioBlob)} type="audio/wav"/>
                            </audio>
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="download-button"
                        >
                            <FaDownload className="icon" />
                            Download Recording
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

ReactMicroPhoneRecordButton.propTypes = {
    recordingMaxDuration: PropTypes.number
};


export default ReactMicroPhoneRecordButton;
