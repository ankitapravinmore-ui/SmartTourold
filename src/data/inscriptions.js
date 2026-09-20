/**
 * Curated Ancient Epigraphy & Inscription Database
 * Powers Module 8: Working Plaque Scanner & Regional TTS Audio Pipeline
 */

export const INSCRIPTIONS_DATABASE = [
  {
    id: 'inscr-amer-1612',
    monument: 'Amer Fort (Jaipur)',
    plaqueTitle: 'Amer Fort Western Rampart Inscription (1612 AD)',
    era: '17th Century Rajputana (Mughal Era)',
    script: 'Early Nagari / Rajasthani Dialect',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    originalExcerpt: 'संवत १६६९ वर्षे वैशाख सुदी... महाराजाधिराज मानसिंह देव कारितम्...',
    audioGuideNarrations: {
      en: 'This 1612 AD stone inscription marks the expansion of the western battlements by Maharaja Man Singh I. It honors the stone masons and invokes Goddess Shila Devi for divine protection against invaders.',
      hi: 'यह 1612 ईस्वी का शिलालेख महाराजा मानसिंह प्रथम द्वारा पश्चिमी परकोटे के विस्तार को दर्शाता है। इसमें स्थानीय कारीगरों का उल्लेख है और युद्ध में सुरक्षा हेतु देवी शिला माता की स्तुति की गई है।',
      ta: 'இந்த கி.பி 1612 கல்வெட்டு, முதலாம் மான் சிங் மன்னரால் கட்டப்பட்ட ஆம்பர் கோட்டையின் மேற்கு சுவர்களைக் குறிக்கிறது. இது படையெடுப்பிலிருந்து பாதுகாப்பதற்காக சிலா தேவியை போற்றுகிறது.',
      kn: 'ಕ್ರಿ.ಶ. 1612 ರ ಈ ಶಾಸನವು ಮಹಾರಾಜ ಮಾನ್ ಸಿಂಗ್ ನಿರ್ಮಿಸಿದ ಅಮೇರ್ ಕೋಟೆಯ ಪಶ್ಚಿಮ ರಕ್ಷಣಾ ಗೋಡೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ ಮತ್ತು ಶಿಲಾ ದೇವಿಯ ಆಶೀರ್ವಾದವನ್ನು ಕೋರುತ್ತದೆ.'
    },
    historicalSignificance: 'Demonstrates the architectural fusion of Rajput grid masonry with Persian hydraulic lift channels.'
  },
  {
    id: 'inscr-sarnath-ashoka',
    monument: 'Sarnath Deer Park (Varanasi)',
    plaqueTitle: 'Ashokan Schism Pillar Edict (250 BC)',
    era: 'Maurya Empire (3rd Century BCE)',
    script: 'Ancient Brahmi Script (Prakrit Language)',
    image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=600&q=80',
    originalExcerpt: 'देवानंपिये पियदसि लाजा हेवं आहा: ये केनपि संघे भेत्तवे...',
    audioGuideNarrations: {
      en: 'Emperor Ashoka warns that any monk or nun who breaks the unity of the Sangha will be robed in white cloth and expelled. It sits directly beneath the original four-lion capital, India’s national emblem.',
      hi: 'सम्राट अशोक का यह आदेश संघ की एकता बनाए रखने का निर्देश देता है। यह मूल रूप से चार सिंहों वाले शीर्ष के नीचे स्थित था, जो अब भारत का राष्ट्रीय प्रतीक है।',
      ta: 'அசோக பேரரசரின் இந்த பிராமி கல்வெட்டு, சங்கத்தின் ஒற்றுமையை நிலைநிறுத்துமாறு கட்டளையிடுகிறது. இது இந்தியாவின் தேசிய சின்னமான நான்கு சிங்கங்களின் அடிப்பகுதியாகும்.',
      kn: 'ಅಶೋಕ ಚಕ್ರವರ್ತಿಯ ಈ ಬ್ರಾಹ್ಮೀ ಶಾಸನವು ಬೌದ್ಧ ಸಂಘದ ಐಕ್ಯತೆಯನ್ನು ಕಾಪಾಡುವಂತೆ ಆಜ್ಞಾಪಿಸುತ್ತದೆ. ಇದು ಭಾರತದ ರಾಷ್ಟ್ರ ಲಾಂಛನದ ಮೂಲ ಶಿಲೆಯಾಗಿದೆ.'
    },
    historicalSignificance: 'One of the earliest deciphered Brahmi stone records by James Prinsep in 1837.'
  },
  {
    id: 'inscr-belur-hoysala',
    monument: 'Chennakeshava Temple (Hoysala)',
    plaqueTitle: 'Vishnuvardhana Victory Stele (1117 AD)',
    era: 'Hoysala Dynasty (12th Century CE)',
    script: 'Old Kannada Script (Halegannada)',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80',
    originalExcerpt: 'ಸ್ವಸ್ತಿ ಸಮಸ್ತ ಭುವನಾಶ್ರಯ ಶ್ರೀ ಪ್ರಿಥ್ವೀ ವಲ್ಲಭ ಮಹಾರಾಜಾಧಿರಾಜ ವಿಷ್ಣುವರ್ಧನ ದೇವ...',
    audioGuideNarrations: {
      en: 'King Vishnuvardhana records the consecration of the magnificent Chennakeshava shrine following his military victory over the Chola viceroy at the battle of Talakad in 1117 AD.',
      hi: 'होयसल राजा विष्णुवर्धन द्वारा 1117 ईस्वी में तलकाड के युद्ध में चोलों पर विजय के उपलक्ष्य में चेन्नाकेशव मंदिर की स्थापना का प्रामाणिक विवरण।',
      ta: 'ஹொய்சாள மன்னர் விஷ்ணுவர்த்தனன் தலக்காடு போரில் சோழர்களை வென்றதன் நினைவாக இந்த செந்நாகேசவ கோயிலை நிறுவியதை விவரிக்கும் பழைய கன்னடக் கல்வெட்டு.',
      kn: 'ಹೊಯ್ಸಳ ರಾಜ ವಿಷ್ಣುವರ್ಧನನು ತಲಕಾಡಿನ ಯುದ್ಧದಲ್ಲಿ ಚೋಳರ ಮೇಲೆ ವಿಜಯ ಸಾಧಿಸಿದ ನೆನಪಿನಲ್ಲಿ ಕ್ರಿ.ಶ. 1117 ರಲ್ಲಿ ಚನ್ನಕೇಶವ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದ ಚಾರಿತ್ರಿಕ ಹಳೆಗನ್ನಡ ಶಾಸನ.'
    },
    historicalSignificance: 'Supreme example of soapstone intricate micro-carving by master sculptor Jakanachari.'
  }
];
