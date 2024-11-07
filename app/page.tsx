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
    {
      exerpt:
        "What if the meaning of AI is not to be found in the way it competes, supersedes or sup plants us? What if, like the emergence of network theory, its purpose is to open our eyes and minds to the reality of intelligence as doable in all kinds of fantastic ways, many of them beyond our own rational understanding?",
      reference: "Ways of Being",
      author: "James Bridle (2022)",
    },
  ];

  const [start, setStart] = useState(false);
  const [startFrames, setStartFrames] = useState(false);
  const [isFirefox, setIsFirefox] = useState(true);
  const [notification, setNotification] = useState(true);
  const [initialInput, setInitialInput] = useState({
    exerpt: "",
    reference: "",
    author: "",
  });
  const [countdown, setCountdown] = useState(30);

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
    let currentIndex = savedIndex ? parseInt(savedIndex) : -2;

    currentIndex = (currentIndex + 1) % inputs.length;
    localStorage.setItem("inputIndex", currentIndex.toString());

    setInitialInput(
      inputs[currentIndex] || { exerpt: "", reference: "", author: "" }
    );

    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownTimer);
          playAudio();
          setStart(true);
          setStartFrames(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
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
      {!isFirefox && notification && (
        <div className="fixed top-0 left-0 w-full h-screen bg-slate-900/75 backdrop-blur-sm z-10 text-xl flex justify-center items-center">
          <div className="fixed top-5 right-6">
            <button className="text-2xl" onClick={handleCloseNotification}>
              ⛌
            </button>
          </div>
          For a better experience use Firefox.
        </div>
      )}
      {!start && initialInput.exerpt !== "" && (
        <div className="w-[900px] h-screen flex flex-col items-center justify-center m-auto text-justify-center text-last-center">
          <div className="text-3xl mb-8 uppercase">SLG-V5</div>
          <div className="text-sm mb-8">
            The upcoming web-based performance speculates through
            <br />a feedback loop with the following initial input
          </div>
          <div className="text-lg mb-6">{initialInput.exerpt}</div>
          <div className="text-sm mb-4">
            {initialInput.reference}
            <br />
            {initialInput.author}
          </div>
          <div className="text-sm"> [sound]</div>
          <div className="text-sm mb-12">
            valt​​​Ü​​​ü​​​d by catarina arbusto
          </div>

          <div className="text-2xl mb-12">starts in {countdown}s</div>
        </div>
      )}

      {startFrames && <Frame initialInput={initialInput.exerpt} />}
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src="./3626487201.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
