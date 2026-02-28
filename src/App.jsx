import { useState, useEffect } from "react";

/* 🌍 FULL TRANSLATIONS */
const translations = {
  English: {
    selectLang: "Select Language",
    title: "FarmersAI 🌾",
    analyze: "Analyze Plant",
    analyzing: "Analyzing Plant Health...",
    healthy: "Healthy",
    disease: "Early Blight",
    action: "Action Recommended",
    treatment: "Treatment Plan",
    cause: "Cause",
    start: "Start Again",
    changeLang: "Change Language",

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
    disease: "अर्ली ब्लाइट",
    action: "कार्रवाई की सिफारिश",
    treatment: "उपचार योजना",
    cause: "कारण",
    start: "फिर से शुरू करें",
    changeLang: "भाषा बदलें",

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
    disease: "ஆர்லி ப்ளைட்",
    action: "நடவடிக்கை பரிந்துரை",
    treatment: "சிகிச்சை திட்டம்",
    cause: "காரணம்",
    start: "மீண்டும் தொடங்கு",
    changeLang: "மொழியை மாற்று",

    causeText: "ஆரம்ப நிலையில் பூஞ்சை தொற்று கண்டறியப்பட்டது.",
    treatmentList: [
      "பரிந்துரைக்கப்பட்ட பூஞ்சைநாசினி பயன்படுத்தவும்",
      "பாதிக்கப்பட்ட இலைகளை அகற்றவும்",
      "தாவரத்தை নিয়மமாக பரிசோதிக்கவும்"
    ]
  },

  Telugu: {
    selectLang: "భాషను ఎంచుకోండి",
    title: "ఫార్మర్స్AI 🌾",
    analyze: "మొక్కను విశ్లేషించండి",
    analyzing: "మొక్క ఆరోగ్యాన్ని విశ్లేషిస్తోంది...",
    healthy: "ఆరోగ్యకరం",
    disease: "ఎర్లీ బ్లైట్",
    action: "చర్య సిఫార్సు",
    treatment: "చికిత్స ప్రణాళిక",
    cause: "కారణం",
    start: "మళ్లీ ప్రారంభించండి",
    changeLang: "భాష మార్చండి",

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
      const confidence = Math.floor(Math.random() * 20) + 70;

      setResult({
        status: isHealthy ? "healthy" : "disease",
        confidence
      });

      setStep("result");
    }, 2000);
  };

  /* 🌍 LANGUAGE SCREEN */
  if (!language) {
    return (
      <div style={styles.container}>
        <div style={styles.langCard}>
          <h2>{translations.English.selectLang}</h2>

          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              style={styles.langButton}
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
    <div style={styles.container}>
      <div style={styles.card}>
        <button
          style={styles.langSwitch}
          onClick={() => setLanguage(null)}
        >
          🌍 {t.changeLang}
        </button>

        {step === "capture" && (
          <>
            <h1 style={styles.title}>{t.title}</h1>

            <label style={styles.cameraCircle}>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  style={styles.previewImage}
                />
              ) : "📷"}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <button
              style={styles.button}
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
            <div style={styles.loader}></div>
          </>
        )}

        {step === "result" && result && (
          <>
            <h2>
              {result.status === "healthy"
                ? `${t.healthy} – ${result.confidence}%`
                : `${t.disease} – ${result.confidence}%`}
            </h2>

            <button
              style={styles.button}
              onClick={() => setStep("treatment")}
            >
              {t.action}
            </button>
          </>
        )}

        {step === "treatment" && (
          <>
            <h2>{t.treatment}</h2>
            <p>{t.cause}: {t.causeText}</p>

            <ul style={styles.list}>
              {t.treatmentList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <button
              style={styles.button}
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

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.25), transparent 40%), #000",
    color: "white"
  },

  langCard: {
    background: "rgba(20,40,30,0.7)",
    padding: "40px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    textAlign: "center"
  },

  langButton: {
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(34,197,94,0.2)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "white",
    cursor: "pointer"
  },

  card: {
    background: "rgba(20,40,30,0.6)",
    padding: "40px",
    borderRadius: "20px",
    width: "400px",
    textAlign: "center",
    position: "relative"
  },

  langSwitch: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "#22c55e",
    cursor: "pointer"
  },

  title: {
    color: "#22c55e",
    marginBottom: "20px"
  },

  cameraCircle: {
    margin: "20px auto",
    width: "120px",
    height: "120px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    cursor: "pointer",
    overflow: "hidden"
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  button: {
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "10px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  loader: {
    margin: "20px auto",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "6px solid rgba(34,197,94,0.2)",
    borderTop: "6px solid #22c55e",
    animation: "spin 1s linear infinite"
  },

  list: {
    textAlign: "left",
    marginTop: "15px"
  }
};

export default App;