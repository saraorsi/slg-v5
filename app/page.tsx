"use client";
import Frame from "@/components/Frames";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputs = [
    {
      exerpt:
        "The dichotomies between mind and body, animal and human, organism and machine, public and private, nature and culture, men and women, primitive and civilized are all in question ideologically.",
      reference: "A Cyborg Manifesto",
      author: "Donna Haraway (1985)",
    },
    {
      exerpt:
        "The cognisphere takes up where the cyborg left off. No longer bound in a binary with the goddess but rather emblem and instantiation of dynamic cognitive flow between human, animal and machine, the cognisphere, like the world itself, is not binary but multiple, not a split creature but a co-evolving and densely interconnected complex system. ",
      reference: "Unfinished Work: From Cyborg to Cognisphere",
      author: "N. Katherine Hayles (2006)",
    },
    {
      exerpt:
        "But where are we to classify the ozone hole story, or global warming or deforestation? Where are we to put these hybrids? Are they human? Human because they are our work. Are they natural? Natural because they are not our doing. Are they local or global? Both.",
      reference: "We Have Never Been Modern",
      author: "Bruno Latour (1991)",
    },
  ];

  const [start, setStart] = useState(false);
  const [startFrames, setStartFrames] = useState(false);
  const [isFirefox, setIsFirefox] = useState(true);
  const [notificaton, setNotification] = useState(true);
  const [startCountdown, setStartCountdown] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [input, setInput] = useState({
    exerpt: "",
    reference: "",
    author: "",
  });

  function handleCloseNotification() {
    setNotification(false);
  }

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      setIsFirefox(true);
    } else {
      setIsFirefox(false);
    }

    const savedIndex = localStorage.getItem("inputIndex");
    let currentIndex = savedIndex ? parseInt(savedIndex) : -1;

    currentIndex = (currentIndex + 1) % inputs.length;
    localStorage.setItem("inputIndex", currentIndex.toString());

    setInput(inputs[currentIndex]);
    setStartCountdown(true);
    setTimeout(() => playAudio(), 3000);
  }, []);

  useEffect(() => {
    if (startCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setStart(true);
      setStartFrames(true);
    }
  }, [startCountdown, countdown]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.04;
      audioRef.current.playbackRate = 0.6;
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
    }
  };

  return (
    <>
      {!isFirefox && notificaton && (
        <div className="fixed top-0 left-0 w-full h-screen bg-slate-900/75 backdrop-blur-sm z-10 text-xl flex justify-center items-center">
          <div className="fixed top-5 right-6">
            <button className="text-2xl" onClick={handleCloseNotification}>
              ⛌
            </button>
          </div>
          For a better experience use Firefox.
        </div>
      )}
      {!start && input.exerpt != "" && (
        <div className="w-[900px] h-screen flex flex-col items-center justify-center m-auto text-justify-center text-last-center">
          <div className="text-2xl mb-8 uppercase">SLG-V5</div>
          <div className="text-sm mb-2">[initial inptut]</div>
          <div className="text-lg mb-4">{input.exerpt}</div>
          <div className="text-sm mb-9">
            {input.reference}
            <br />
            {input.author}
          </div>
          <div className="text-sm mb-2"> [sound]</div>
          <div className="text-sm mb-12">
            valt​​​Ü​​​ü​​​d by catarina arbusto
          </div>
          {startCountdown && countdown > 0 && (
            <button className="text-lg bg-transparent w-[250px] py-2 px-8 text-green rounded-3xl border-solid border-2 border-[#00ff00]">
              Starts in {countdown < 10 && 0}
              {countdown}s
            </button>
          )}
        </div>
      )}

      {startFrames && <Frame initialInput={input.exerpt} />}
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src="./3626487201.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
