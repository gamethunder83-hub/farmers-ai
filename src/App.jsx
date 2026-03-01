import { useState, useEffect } from "react";

/* 🌍 FULL TRANSLATIONS */
const translations = {
  English: {
    selectLang: "Select Language",
    title: "FarmersAI 🌾",
    analyze: "Analyze Plant",
    analyzing: "Analyzing Plant Health...",
    healthy: "Healthy",
    plant: "Plant",
    diseaseLabel: "Disease",
    action: "Action Recommended",
    treatment: "Treatment Plan",
    cause: "Cause",
    start: "Start Again",
    changeLang: "Change Language",

    plantName: "Tomato",
    diseaseName: "Early Blight",

    causeText: "Fungal infection detected in early stage.",
    treatmentList: [
      "Apply recommended fungicide",
      "Remove infected leaves",
      "Monitor plant regularly"
    ]
  },

  Hindi: {
    selectLang: "भाषा चुनें",
    title: "फार्मर्सएआई 🌾",
    analyze: "पौधे का विश्लेषण करें",
    analyzing: "पौधे की जांच हो रही है...",
    healthy: "स्वस्थ",
    plant: "पौधा",
    diseaseLabel: "रोग",
    action: "कार्रवाई की सिफारिश",
    treatment: "उपचार योजना",
    cause: "कारण",
    start: "फिर से शुरू करें",
    changeLang: "भाषा बदलें",

    plantName: "टमाटर",
    diseaseName: "अर्ली ब्लाइट",

    causeText: "प्रारंभिक अवस्था में फंगल संक्रमण पाया गया।",
    treatmentList: [
      "सुझाए गए फंगीसाइड का उपयोग करें",
      "संक्रमित पत्तियों को हटाएं",
      "नियमित रूप से पौधे की निगरानी करें"
    ]
  },

  Tamil: {
    selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    title: "பார்மர்ஸ்AI 🌾",
    analyze: "தாவரத்தை ஆய்வு செய்",
    analyzing: "தாவர ஆரோக்கியம் பரிசோதிக்கப்படுகிறது...",
    healthy: "ஆரோக்கியம்",
    plant: "தாவரம்",
    diseaseLabel: "நோய்",
    action: "நடவடிக்கை பரிந்துரை",
    treatment: "சிகிச்சை திட்டம்",
    cause: "காரணம்",
    start: "மீண்டும் தொடங்கு",
    changeLang: "மொழியை மாற்று",

    plantName: "தக்காளி",
    diseaseName: "ஆர்லி ப்ளைட்",

    causeText: "ஆரம்ப நிலையில் பூஞ்சை தொற்று கண்டறியப்பட்டது.",
    treatmentList: [
      "பரிந்துரைக்கப்பட்ட பூஞ்சைநாசினி பயன்படுத்தவும்",
      "பாதிக்கப்பட்ட இலைகளை அகற்றவும்",
      "தாவரத்தை নিয়মமாக பரிசோதிக்கவும்"
    ]
  },

  Telugu: {
    selectLang: "భాషను ఎంచుకోండి",
    title: "ఫార్మర్స్AI 🌾",
    analyze: "మొక్కను విశ్లేషించండి",
    analyzing: "మొక్క ఆరోగ్యాన్ని విశ్లేషిస్తోంది...",
    healthy: "ఆరోగ్యకరం",
    plant: "మొక్క",
    diseaseLabel: "రోగం",
    action: "చర్య సిఫార్సు",
    treatment: "చికిత్స ప్రణాళిక",
    cause: "కారణం",
    start: "మళ్లీ ప్రారంభించండి",
    changeLang: "భాష మార్చండి",

    plantName: "టమోటా",
    diseaseName: "ఎర్లీ బ్లైట్",

    causeText: "ప్రారంభ దశలో ఫంగల్ సంక్రమణ గుర్తించబడింది.",
    treatmentList: [
      "సిఫార్సు చేసిన ఫంగిసైడ్ ఉపయోగించండి",
      "సంక్రమిత ఆకులను తొలగించండి",
      "మొక్కను క్రమం తప్పకుండా పరిశీలించండి"
    ]
  }
};

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("farmersLang") || null
  );
  const [step, setStep] = useState("capture");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (language) {
      localStorage.setItem("farmersLang", language);
    }
  }, [language]);

  const t = language ? translations[language] : null;

  const handleAnalyze = () => {
    setStep("loading");

    setTimeout(() => {
      const isHealthy = Math.random() > 0.5;

      setResult({
        isHealthy
      });

      setStep("result");
    }, 2000);
  };

  /* 🌍 LANGUAGE SCREEN */
  if (!language) {
    return (
      <div className="container">
        <div className="langCard">
          <h2>{translations.English.selectLang}</h2>
          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              className="langButton"
              onClick={() => setLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <button
          className="langSwitch"
          onClick={() => setLanguage(null)}
        >
          🌍 {t.changeLang}
        </button>

        {step === "capture" && (
          <>
            <h1 className="title">{t.title}</h1>

            <label className="cameraCircle">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="previewImage"
                />
              ) : "📷"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <button
              className="button"
              disabled={!image}
              onClick={handleAnalyze}
            >
              {t.analyze}
            </button>
          </>
        )}

        {step === "loading" && (
          <>
            <h2>{t.analyzing}</h2>
            <div className="loader"></div>
          </>
        )}

        {step === "result" && result && (
          <>
            <h2>
              {t.plant}: {t.plantName}
            </h2>

            <h3>
              {result.isHealthy
                ? `${t.diseaseLabel}: ${t.healthy}`
                : `${t.diseaseLabel}: ${t.diseaseName}`}
            </h3>

            <button
              className="button"
              onClick={() => setStep("treatment")}
            >
              {t.action}
            </button>
          </>
        )}

        {step === "treatment" && (
          <>
            <h2>{t.treatment}</h2>
            <p><strong>{t.cause}:</strong> {t.causeText}</p>

            <ul className="list">
              {t.treatmentList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button
              className="button"
              onClick={() => {
                setImage(null);
                setStep("capture");
              }}
            >
              {t.start}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;