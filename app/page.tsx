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
        "If my nightmare is a culture inhabited by posthumans who regard their bodies as fashion accessories rather than the ground of being, my dream is a version of the posthuman that embraces the possibilities of information technologies without being seduced by fantasies of unlimited power and disembodied immortality, that recognizes and celebrates finitude as a condition of human being, and that understands human life is embedded in a material world of great complexity, one on which we depend for our continued survival.",
      reference: "How We Became Posthuman",
      author: "N. Katherine Hayles (1999)",
    },
    {
      exerpt:
        "But where are we to classify the ozone hole story, or global warming or deforestation? Where are we to put these hybrids? Are they human? Human because they are our work. Are they natural? Natural because they are not our doing. Are they local or global? Both.",
      reference: "We Have Never Been Modern",
      author: "Bruno Latour (1991)",
    },
    {
      exerpt:
        "Automatic teller machines, castrati, lesbians and other 'queers,' people with AIDS, people with 'multiple personality disorders,' the Allien and the Terminator: all participate in the profound technological, representational, sexual, and theoritecal changes in which bodies are implicated. Posthuman bodies address new interfaces between humans and techonology that are radically altering the experience of our own and others's body.",
      reference: "Posthuman bodies",
      author: "Judith Halberstam and Ira Livingston (1995)",
    },
    {
      exerpt:
        "The cognisphere takes up where the cyborg left off. No longer bound in a binary with the goddess but rather emblem and instantiation of dynamic cognitive flow between human, animal and machine, the cognisphere, like the world itself, is not binary but multiple, not a split creature but a co-evolving and densely interconnected complex system. ",
      reference: "Unfinished Work: From Cyborg to Cognisphere",
      author: "N. Katherine Hayles (2006)",
    },
    {
      exerpt:
        "The image of affective bodies forming assemblages will enable me to highlight some of the limitations in human-centered theories of action and to investigate some of the practical implications, for social-science inquiry and for public culture, of a theory of action and responsibility that crosses the human-nonhuman divide.",
      reference: "Vibrant Matter: A Political Ecology of Things",
      author: "Jane Bennett (2010)",
    },
  ];

  const [start, setStart] = useState(false);
  const [startFrames, setStartFrames] = useState(false);
  const [isFirefox, setIsFirefox] = useState(true);
  const [notificaton, setNotification] = useState(true);
  const [initalInput, setInitialInput] = useState({
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

    setInitialInput(
      inputs[currentIndex] || { exerpt: "", reference: "", author: "" }
    );
  }, []);

  useEffect(() => {
    if (initalInput.exerpt !== "") {
      const initalReading = `
The web-based performance you'll see speculates through a feedback loop that takes as its starting point the quote from
by ${initalInput.author} that says: ${initalInput.exerpt}`;
      setTimeout(() => speakDescription(initalReading), 3000);
    }
  }, [initalInput]);

  async function speakDescription(speculation: string): Promise<void> {
    const synth = window.speechSynthesis;

    await new Promise<void>((resolve) => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        resolve();
      } else if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => resolve();
      } else {
        resolve();
      }
    });

    const voices = synth.getVoices();

    const utterance = new SpeechSynthesisUtterance(speculation);
    utterance.voice = voices[132];
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onend = () => {
      playAudio();
      setTimeout(() => setStart(true), 2000);
      setTimeout(() => setStartFrames(true), 2000);
    };

    synth.speak(utterance);
  }

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.playbackRate = 0.6;
      audioRef.current.muted = true;
      audioRef.current
        .play()
        .then(() => {
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.muted = false;
            }
          }, 2000);
        })
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
      {!start && initalInput.exerpt != "" && (
        <div className="w-[900px] h-screen flex flex-col items-center justify-center m-auto text-justify-center text-last-center">
          <div className="text-2xl mb-8 uppercase">SLG-V5</div>
          <div className="text-sm mb-2">[initial inptut]</div>
          <div className="text-lg mb-4">{initalInput.exerpt}</div>
          <div className="text-sm mb-9">
            {initalInput.reference}
            <br />
            {initalInput.author}
          </div>
          <div className="text-sm mb-2"> [sound]</div>
          <div className="text-sm mb-12">
            valt​​​Ü​​​ü​​​d by catarina arbusto
          </div>
        </div>
      )}

      {startFrames && <Frame initialInput={initalInput.exerpt} />}
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src="./3626487201.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
