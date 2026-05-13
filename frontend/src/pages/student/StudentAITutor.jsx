import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Mic, Send, Volume2, Globe, Play, Pause, ChevronDown, RotateCcw, StopCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AudioWave } from '../../components/ui/AudioWave';

const LANG_MAP = {
  en: { name: 'English', code: 'en-IN' },
  hi: { name: 'Hindi', code: 'hi-IN' },
  kn: { name: 'Kannada', code: 'kn-IN' },
  te: { name: 'Telugu', code: 'te-IN' }
};

// Advanced Knowledge Base
const MOCK_KNOWLEDGE_BASE = {
  ashoka: {
    en: "Ashoka was one of the greatest kings of ancient India. He belonged to the Maurya dynasty and ruled most of India.\n\n📜 Timeline:\n- 268 BCE: Became Emperor\n- 261 BCE: Kalinga War\n- 260 BCE: Embraced Buddhism\n\nAfter the Kalinga war, he followed peace and spread Buddhism across Asia. He is famous for his pillars and edicts.",
    hi: "अशोक प्राचीन भारत के सबसे महान राजाओं में से एक थे। वे मौर्य राजवंश के थे और उन्होंने अधिकांश भारत पर शासन किया।\n\nकलिंग युद्ध के बाद, उन्होंने शांति का पालन किया और एशिया भर में बौद्ध धर्म फैलाया।",
    kn: "ಅಶೋಕನು ಪ್ರಾಚೀನ ಭಾರತದ ಶ್ರೇಷ್ಠ ರಾಜರಲ್ಲಿ ಒಬ್ಬನಾಗಿದ್ದನು. ಅವನು ಮೌರ್ಯ ರಾಜವಂಶಕ್ಕೆ ಸೇರಿದವನು.\n\nಕಳಿಂಗ ಯುದ್ಧದ ನಂತರ, ಅವನು ಶಾಂತಿಯನ್ನು ಅನುಸರಿಸಿದನು ಮತ್ತು ಬೌದ್ಧಧರ್ಮವನ್ನು ಹರಡಿದನು.",
    te: "అశోకుడు ప్రాచీన భారతదేశపు గొప్ప రాజులలో ఒకరు. అతను మౌర్య రాజవంశానికి చెందినవాడు.\n\nకళింగ యుద్ధం తరువాత, అతను శాంతిని పాటించాడు మరియు బౌద్ధమతాన్ని వ్యాప్తి చేశాడు.",
    suggestions: ["Who were the Freedom Fighters?", "What is the Maurya Empire?"]
  },
  freedom: {
    en: "India's freedom fighters were brave individuals who fought against British rule to gain independence.\n\nSome famous leaders include:\n- Mahatma Gandhi (Non-violence)\n- Subhas Chandra Bose (Indian National Army)\n- Bhagat Singh (Youth Revolution)\n\nIndia finally gained independence on August 15, 1947.",
    hi: "भारत के स्वतंत्रता सेनानी वे बहादुर लोग थे जिन्होंने स्वतंत्रता प्राप्त करने के लिए ब्रिटिश शासन के खिलाफ लड़ाई लड़ी।",
    kn: "ಸ್ವಾತಂತ್ರ್ಯ ಪಡೆಯಲು ಬ್ರಿಟಿಷ್ ಆಳ್ವಿಕೆಯ ವಿರುದ್ಧ ಹೋರಾಡಿದ ವೀರರು ಭಾರತದ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟಗಾರರು.",
    te: "స్వాతంత్ర్యం పొందడానికి బ్రిటిష్ పాలనకు వ్యతిరేకంగా పోరాడిన ధైర్యవంతులు భారతదేశ స్వాతంత్ర్య సమరయోధులు.",
    suggestions: ["Who was Mahatma Gandhi?", "Tell me about 1947"]
  },
  solar_system: {
    en: "The Solar System consists of our star, the Sun, and everything bound to it by gravity. This includes 8 planets, dozens of moons, and millions of asteroids.\n\nThe planets are:\n1. Mercury\n2. Venus\n3. Earth (Our home!)\n4. Mars\n5. Jupiter\n6. Saturn\n7. Uranus\n8. Neptune",
    hi: "सौर मंडल में हमारा तारा, सूर्य, और गुरुत्वाकर्षण द्वारा इससे जुड़ी हर चीज शामिल है। इसमें 8 ग्रह शामिल हैं।",
    kn: "ಸೌರವ್ಯೂಹವು ನಮ್ಮ ನಕ್ಷತ್ರ, ಸೂರ್ಯ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣೆಯಿಂದ ಅದಕ್ಕೆ ಬಂಧಿತವಾಗಿರುವ ಎಲ್ಲವನ್ನೂ ಒಳಗೊಂಡಿದೆ. ಇದು 8 ಗ್ರಹಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
    te: "సౌర వ్యవస్థలో మన నక్షత్రం, సూర్యుడు మరియు గురుత్వాకర్షణ ద్వారా దానికి కట్టుబడి ఉన్న ప్రతిదీ ఉంటుంది. దీనిలో 8 గ్రహాలు ఉన్నాయి.",
    suggestions: ["Why is Earth special?", "Take a Science Quiz"]
  },
  plants: {
    en: "Plants are living things that make their own food using a process called Photosynthesis.\n\nKey parts of a plant:\n- Roots: Absorb water\n- Stem: Supports the plant\n- Leaves: Make food using sunlight\n- Flowers: Produce seeds",
    hi: "पौधे जीवित चीजें हैं जो प्रकाश संश्लेषण नामक प्रक्रिया का उपयोग करके अपना भोजन स्वयं बनाते हैं।",
    kn: "ಸಸ್ಯಗಳು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಎಂಬ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಳಸಿಕೊಂಡು ತಮ್ಮದೇ ಆದ ಆಹಾರವನ್ನು ತಯಾರಿಸುವ ಜೀವಿಗಳು.",
    te: "మొక్కలు కిరణజన్య సంయోగక్రియ అనే ప్రక్రియను ఉపయోగించి తమ స్వంత ఆహారాన్ని తయారుచేసే జీవులు.",
    suggestions: ["What is Photosynthesis?", "Solve a Biology Quiz"]
  },
  grammar: {
    en: "Grammar is the system and structure of a language. The basic building blocks are Parts of Speech:\n\n1. Noun: A person, place, or thing (e.g., Apple)\n2. Verb: An action word (e.g., Run)\n3. Adjective: Describes a noun (e.g., Red)\n\nExample sentence: The (adjective) dog (verb) fast.",
    hi: "व्याकरण किसी भाषा की प्रणाली और संरचना है। मूल निर्माण खंड 'पार्ट्स ऑफ स्पीच' हैं।",
    kn: "ವ್ಯಾಕರಣವು ಭಾಷೆಯ ವ್ಯವಸ್ಥೆ ಮತ್ತು ರಚನೆಯಾಗಿದೆ. ಮೂಲ ಬಿಲ್ಡಿಂಗ್ ಬ್ಲಾಕ್‌ಗಳು 'ಪಾರ್ಟ್ಸ್ ಆಫ್ ಸ್ಪೀಚ್'.",
    te: "వ్యాకరణం అనేది భాష యొక్క వ్యవస్థ మరియు నిర్మాణం. ప్రాథమిక నిర్మాణ విభాగాలు 'పార్ట్స్ ఆఫ్ స్పీచ్'.",
    suggestions: ["Give me an English Test", "What is an Adverb?"]
  },
  addition: {
    en: "Addition means combining numbers together to get a total.",
    hi: "जोड़ का अर्थ संख्याओं को मिलाकर कुल प्राप्त करना है।",
    kn: "ಸೇರಿಸುವಿಕೆ ಎಂದರೆ ಒಟ್ಟು ಪಡೆಯಲು ಸಂಖ್ಯೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುವುದು.",
    te: "కూడిక అంటే మొత్తం పొందడానికి సంఖ్యలను కలపడం.",
    suggestions: ["Try 25 + 15", "Practice Addition Quiz"]
  },
  fraction: {
    en: "A fraction represents a part of a whole. It has two parts:\n- Numerator (top): The number of parts you have.\n- Denominator (bottom): The total number of equal parts.\n\nExample: 1/2 means one half.",
    hi: "भिन्न पूरे के एक हिस्से का प्रतिनिधित्व करता है। इसके दो भाग होते हैं: अंश (ऊपर) और हर (नीचे)।",
    kn: "ಭಿನ್ನರಾಶಿ ಇಡೀ ಭಾಗವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ. ಇದು ಎರಡು ಭಾಗಗಳನ್ನು ಹೊಂದಿದೆ: ಅಂಶ ಮತ್ತು ಛೇದ.",
    te: "భిన్నం అనేది మొత్తంలో ఒక భాగాన్ని సూచిస్తుంది. దీనికి రెండు భాగాలు ఉన్నాయి: లవం మరియు హారం.",
    suggestions: ["Solve 1/2 + 1/4", "Practice Fractions"]
  },
  generic: {
    en: "That's an excellent question! I am your RuralAI teacher. Let's break this down into simple steps.",
    hi: "यह एक उत्कृष्ट प्रश्न है! मैं आपका RuralAI शिक्षक हूँ। आइए इसे सरल चरणों में तोड़ें।",
    kn: "ಇದು ಅತ್ಯುತ್ತಮ ಪ್ರಶ್ನೆ! ನಾನು ನಿಮ್ಮ ಗ್ರಾಮೀಣ ಎಐ ಶಿಕ್ಷಕ. ಇದನ್ನು ಸರಳ ಹಂತಗಳಾಗಿ ವಿಭಜಿಸೋಣ.",
    te: "ఇది అద్భుతమైన ప్రశ్న! నేను మీ రూరల్ ఎఐ ఉపాధ్యాయుడిని. దీనిని సాధారణ దశలుగా విభజిద్దాం.",
    suggestions: ["Tell me about Ashoka", "Teach me Fractions", "100 * 25"]
  }
};

const generateSmartResponse = (input) => {
  const text = input.toLowerCase();

  // Mathematical Solver Engine (Advanced)
  const mathRegex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;
  const match = text.match(mathRegex);
  
  if (match) {
    const num1 = parseInt(match[1], 10);
    const operator = match[2];
    const num2 = parseInt(match[3], 10);
    let result = 0;
    let stepEn = '', stepHi = '', stepKn = '', stepTe = '';
    
    if (operator === '+') { 
      result = num1 + num2; 
      stepEn = `Step 2:\nAdd the ones and tens:\n${num1} + ${num2} = ${result}`;
      stepHi = `चरण 2:\nइकाइयों और दहाईयों को जोड़ें:\n${num1} + ${num2} = ${result}`;
      stepKn = `ಹಂತ 2:\nಸೇರಿಸಿ:\n${num1} + ${num2} = ${result}`;
      stepTe = `దశ 2:\nకూడండి:\n${num1} + ${num2} = ${result}`;
    } else if (operator === '-') { 
      result = num1 - num2; 
      stepEn = `Step 2:\nSubtract the numbers:\n${num1} - ${num2} = ${result}`;
      stepHi = `चरण 2:\nसंख्याओं को घटाएं:\n${num1} - ${num2} = ${result}`;
      stepKn = `ಹಂತ 2:\nಕಳೆಯಿರಿ:\n${num1} - ${num2} = ${result}`;
      stepTe = `దశ 2:\nతీయండి:\n${num1} - ${num2} = ${result}`;
    } else if (operator === '*') { 
      result = num1 * num2;
      if (num2 > 9 && num1 > 9) {
        const ones = num2 % 10;
        const tens = Math.floor(num2 / 10) * 10;
        stepEn = `Step 2:\nMultiply by ones: ${num1} × ${ones} = ${num1 * ones}\n\nStep 3:\nMultiply by tens: ${num1} × ${tens} = ${num1 * tens}\n\nStep 4:\nAdd them together: ${num1*ones} + ${num1*tens} = ${result}`;
        stepHi = `चरण 2:\nइकाइयों से गुणा करें: ${num1} × ${ones} = ${num1 * ones}\n\nचरण 3:\nदहाईयों से गुणा करें: ${num1} × ${tens} = ${num1 * tens}\n\nचरण 4:\nउन्हें जोड़ें: ${num1*ones} + ${num1*tens} = ${result}`;
        stepKn = `ಹಂತ 2:\nಗುಣಿಸಿ: ${num1} × ${ones} = ${num1 * ones}\n\nಹಂತ 3:\nಗುಣಿಸಿ: ${num1} × ${tens} = ${num1 * tens}\n\nಹಂತ 4:\nಸೇರಿಸಿ: ${num1*ones} + ${num1*tens} = ${result}`;
        stepTe = `దశ 2:\nగుణించండి: ${num1} × ${ones} = ${num1 * ones}\n\nదశ 3:\nగుణించండి: ${num1} × ${tens} = ${num1 * tens}\n\nదశ 4:\nకలపండి: ${num1*ones} + ${num1*tens} = ${result}`;
      } else {
        stepEn = `Step 2:\nMultiply the numbers:\n${num1} × ${num2} = ${result}`;
        stepHi = `चरण 2:\nगुणा करें:\n${num1} × ${num2} = ${result}`;
        stepKn = `ಹಂತ 2:\nಗುಣಿಸಿ:\n${num1} × ${num2} = ${result}`;
        stepTe = `దశ 2:\nగుణించండి:\n${num1} × ${num2} = ${result}`;
      }
    } else if (operator === '/') { 
      result = (num1 / num2).toFixed(2);
      if (result.endsWith('.00')) result = parseInt(result);
      stepEn = `Step 2:\nDivide ${num1} by ${num2}\n${num1} ÷ ${num2} = ${result}`;
      stepHi = `चरण 2:\n${num1} को ${num2} से विभाजित करें\n${num1} ÷ ${num2} = ${result}`;
      stepKn = `ಹಂತ 2:\nಭಾಗಿಸಿ\n${num1} ÷ ${num2} = ${result}`;
      stepTe = `దశ 2:\nభాగించండి\n${num1} ÷ ${num2} = ${result}`;
    }

    return {
      translations: {
        en: `Step 1:\n${num1} ${operator.replace('*','×').replace('/','÷')} ${num2}\n\n${stepEn}\n\nFinal Answer:\n${result}`,
        hi: `चरण 1:\n${num1} ${operator.replace('*','×').replace('/','÷')} ${num2}\n\n${stepHi}\n\nअंतिम उत्तर:\n${result}`,
        kn: `ಹಂತ 1:\n${num1} ${operator.replace('*','×').replace('/','÷')} ${num2}\n\n${stepKn}\n\nಅಂತಿಮ ಉತ್ತರ:\n${result}`,
        te: `దశ 1:\n${num1} ${operator.replace('*','×').replace('/','÷')} ${num2}\n\n${stepTe}\n\nతుది సమాధానం:\n${result}`
      },
      suggestions: ["Would you like to solve 3 more problems?", "Explain Fractions"]
    };
  }

  // Knowledge Base Search
  if (text.includes('ashoka') || text.includes('maurya')) return { translations: MOCK_KNOWLEDGE_BASE.ashoka, suggestions: MOCK_KNOWLEDGE_BASE.ashoka.suggestions };
  if (text.includes('freedom') || text.includes('gandhi') || text.includes('bose')) return { translations: MOCK_KNOWLEDGE_BASE.freedom, suggestions: MOCK_KNOWLEDGE_BASE.freedom.suggestions };
  if (text.includes('solar') || text.includes('planet')) return { translations: MOCK_KNOWLEDGE_BASE.solar_system, suggestions: MOCK_KNOWLEDGE_BASE.solar_system.suggestions };
  if (text.includes('plant') || text.includes('photosynthesis')) return { translations: MOCK_KNOWLEDGE_BASE.plants, suggestions: MOCK_KNOWLEDGE_BASE.plants.suggestions };
  if (text.includes('grammar') || text.includes('noun')) return { translations: MOCK_KNOWLEDGE_BASE.grammar, suggestions: MOCK_KNOWLEDGE_BASE.grammar.suggestions };
  if (text.includes('fraction')) return { translations: MOCK_KNOWLEDGE_BASE.fraction, suggestions: MOCK_KNOWLEDGE_BASE.fraction.suggestions };
  if (text.includes('add')) return { translations: MOCK_KNOWLEDGE_BASE.addition, suggestions: MOCK_KNOWLEDGE_BASE.addition.suggestions };

  return { translations: MOCK_KNOWLEDGE_BASE.generic, suggestions: MOCK_KNOWLEDGE_BASE.generic.suggestions };
};

export const StudentAITutor = () => {
  const [messages, setMessages] = useState([
    { 
      id: 'init-1',
      role: 'ai', 
      displayLang: 'en',
      translations: {
        en: "Namaste! I am your RuralAI Master Tutor. I can teach you complex Math, Ancient History, Science, and English Grammar. What would you like to explore today?",
        hi: "नमस्ते! मैं आपका RuralAI मास्टर ट्यूटर हूँ। मैं आपको गणित, इतिहास, विज्ञान और अंग्रेजी सिखा सकता हूँ।",
        kn: "ನಮಸ್ತೆ! ನಾನು ನಿಮ್ಮ ಗ್ರಾಮೀಣ ಎಐ ಮಾಸ್ಟರ್ ಟ್ಯೂಟರ್. ನಾನು ನಿಮಗೆ ಗಣಿತ, ಇತಿಹಾಸ, ವಿಜ್ಞಾನ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಕಲಿಸಬಹುದು.",
        te: "నమస్తే! నేను మీ రూరల్ ఎఐ మాస్టర్ ట్యూటర్. నేను మీకు గణితం, చరిత్ర, సైన్స్ మరియు ఇంగ్లీష్ నేర్పగలను."
      },
      suggestions: ["Who was Ashoka?", "What is 45 * 12?", "Explain the Solar System"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState({ id: null });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [recognitionLang, setRecognitionLang] = useState('en-IN');
  const [openTranslateMenu, setOpenTranslateMenu] = useState(null);
  
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => { if (synthRef.current) synthRef.current.cancel(); };
  }, []);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { translations, suggestions } = generateSmartResponse(text);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        displayLang: 'en',
        translations,
        suggestions
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListen = () => {
    if (isListening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition is not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = recognitionLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const playAudio = (msgId, langKey, text) => {
    if (synthRef.current.speaking) synthRef.current.cancel();

    setActiveSpeech({ id: msgId });
    setHighlightIndex(-1);
    setIsPlaying(true);
    setIsPaused(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[langKey].code;
    utterance.volume = volume;
    utterance.rate = 0.9; 

    utterance.onboundary = (e) => { if (e.name === 'word') setHighlightIndex(e.charIndex); };
    utterance.onend = () => { setIsPlaying(false); setHighlightIndex(-1); setActiveSpeech({ id: null }); };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const pauseAudio = () => { if (synthRef.current.speaking && !synthRef.current.paused) { synthRef.current.pause(); setIsPaused(true); setIsPlaying(false); }};
  const resumeAudio = () => { if (synthRef.current.paused) { synthRef.current.resume(); setIsPaused(false); setIsPlaying(true); }};
  const stopAudio = () => { synthRef.current.cancel(); setIsPlaying(false); setIsPaused(false); setHighlightIndex(-1); setActiveSpeech({ id: null }); };

  const changeMessageLanguage = (msgId, newLang) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, displayLang: newLang } : m));
    setOpenTranslateMenu(null);
  };

  const renderHighlightedText = (text, isSpeakingThis) => {
    if (!isSpeakingThis || highlightIndex === -1) return text;
    const before = text.substring(0, highlightIndex);
    let nextSpace = text.indexOf(' ', highlightIndex);
    if (nextSpace === -1) nextSpace = text.length;
    const word = text.substring(highlightIndex, nextSpace);
    const after = text.substring(nextSpace);
    return <>{before}<span className="bg-yellow-200 text-yellow-900 rounded px-1">{word}</span>{after}</>;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 flex justify-between items-center text-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Advanced Education AI</h2>
            <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span> Math, Science, History & Languages
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setRecognitionLang(prev => {
          const langs = ['en-IN', 'hi-IN', 'kn-IN', 'te-IN'];
          return langs[(langs.indexOf(prev) + 1) % langs.length];
        })} className="border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold">
          <Globe size={16} className="mr-2" /> 
          Input: {recognitionLang.split('-')[0].toUpperCase()}
        </Button>
      </div>

      {/* Floating Voice Controls */}
      {(isPlaying || isPaused) && (
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-24 left-1/2 -translate-x-1/2 z-20 bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-4 shadow-xl border border-gray-700">
          <AudioWave isPlaying={isPlaying} />
          <div className="w-px h-6 bg-gray-600 mx-2"></div>
          {isPlaying ? <button onClick={pauseAudio} className="hover:text-blue-400 transition"><Pause size={20} fill="currentColor" /></button>
                     : <button onClick={resumeAudio} className="hover:text-blue-400 transition"><Play size={20} fill="currentColor" /></button>}
          <button onClick={() => {
            const msg = messages.find(m => m.id === activeSpeech.id);
            if(msg) playAudio(msg.id, msg.displayLang, msg.translations[msg.displayLang]);
          }} className="hover:text-blue-400 transition"><RotateCcw size={20} /></button>
          <button onClick={stopAudio} className="hover:text-red-400 transition"><StopCircle size={20} /></button>
          <div className="flex items-center gap-2 ml-4">
            <Volume2 size={16} className="text-gray-400" />
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => { setVolume(parseFloat(e.target.value)); if (utteranceRef.current) utteranceRef.current.volume = parseFloat(e.target.value); }} className="w-16 accent-blue-500" />
          </div>
        </motion.div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
        {messages.map((msg) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-3xl p-1 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 rounded-br-sm' : 'bg-white border border-gray-200 rounded-bl-sm'}`}>
              
              {msg.role === 'user' && (
                <div className="p-4 text-white text-base font-medium leading-relaxed">{msg.content}</div>
              )}

              {msg.role === 'ai' && msg.translations && (
                <div className="p-5 relative group">
                  {/* AI Actions Row */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{LANG_MAP[msg.displayLang].name}</span>
                    <div className="flex items-center gap-2 relative">
                      <button 
                        onClick={() => playAudio(msg.id, msg.displayLang, msg.translations[msg.displayLang])}
                        className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <Volume2 size={14} /> Play
                      </button>
                      <button 
                        onClick={() => setOpenTranslateMenu(openTranslateMenu === msg.id ? null : msg.id)}
                        className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                      >
                        <Globe size={14} /> Translate <ChevronDown size={14} />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {openTranslateMenu === msg.id && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                            {Object.entries(LANG_MAP).map(([k, v]) => (
                              <button key={k} onClick={() => changeMessageLanguage(msg.id, k)} className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-indigo-50 ${msg.displayLang === k ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600'}`}>
                                {v.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Text Content */}
                  <p className="text-gray-800 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                    {renderHighlightedText(msg.translations[msg.displayLang], activeSpeech.id === msg.id)}
                  </p>

                  {/* Smart Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                      {msg.suggestions.map((sug, i) => (
                        <button key={i} onClick={() => handleSend(sug)} className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-3xl rounded-bl-sm p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-100 shrink-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="flex gap-4">
          <Button variant="outline" className={`w-14 h-14 rounded-full border-2 transition-all duration-300 shrink-0 relative overflow-hidden ${isListening ? 'border-red-400 text-red-500 bg-red-50 shadow-[0_0_15px_rgba(248,113,113,0.4)]' : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50'}`} onClick={toggleListen} title="Speak Question">
            {isListening && <span className="absolute inset-0 bg-red-400/20 animate-ping rounded-full" />}
            <Mic size={24} className={isListening ? 'animate-pulse relative z-10' : 'relative z-10'} />
          </Button>
          
          <div className="flex-1 relative flex items-center">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend(input)} placeholder={isListening ? "Listening... Speak your question" : "Ask about Math, Science, History, or Grammar..."} className="w-full h-14 pl-6 pr-16 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 font-medium transition-shadow" />
            <Button className="absolute right-2 w-10 h-10 rounded-full p-0 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 shadow-md transition-transform active:scale-95" onClick={() => handleSend(input)}>
              <Send size={18} className="ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
