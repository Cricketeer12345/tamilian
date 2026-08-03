export const uyir = [
  { letter: "அ", transliteration: "a", word: "அம்மா", meaning: "Mother" },
  { letter: "ஆ", transliteration: "aa", word: "ஆறு", meaning: "River" },
  { letter: "இ", transliteration: "i", word: "இரவு", meaning: "Night" },
  { letter: "ஈ", transliteration: "ii", word: "ஈகை", meaning: "Generosity" },
  { letter: "உ", transliteration: "u", word: "உலகம்", meaning: "World" },
  { letter: "ஊ", transliteration: "uu", word: "ஊர்", meaning: "Town" },
  { letter: "எ", transliteration: "e", word: "எலி", meaning: "Rat" },
  { letter: "ஏ", transliteration: "ee", word: "ஏரி", meaning: "Lake" },
  { letter: "ஐ", transliteration: "ai", word: "ஐந்து", meaning: "Five" },
  { letter: "ஒ", transliteration: "o", word: "ஒளி", meaning: "Light" },
  { letter: "ஓ", transliteration: "oo", word: "ஓவியம்", meaning: "Painting" },
  { letter: "ஔ", transliteration: "au", word: "ஔவை", meaning: "Auvaiyaar" },
]

export const mei = [
  { letter: "க்", transliteration: "k", word: "கொக்கு", meaning: "Crane" },
  { letter: "ங்", transliteration: "ng", word: "சங்கம்", meaning: "Assembly" },
  { letter: "ச்", transliteration: "ch", word: "அச்சம்", meaning: "Fear" },
  { letter: "ஞ்", transliteration: "ny", word: "மஞ்சள்", meaning: "Yellow" },
  { letter: "ட்", transliteration: "t", word: "பாட்டன்", meaning: "Grandfather" },
  { letter: "ண்", transliteration: "n", word: "மண்", meaning: "Soil" },
  { letter: "த்", transliteration: "th", word: "பத்து", meaning: "10" },
  { letter: "ந்", transliteration: "n", word: "பந்து", meaning: "Ball" },
  { letter: "ப்", transliteration: "p", word: "கப்பல்", meaning: "Ship" },
  { letter: "ம்", transliteration: "m", word: "தம்பி", meaning: "Younger brother" },
  { letter: "ய்", transliteration: "y", word: "தாய்", meaning: "Mother" },
  { letter: "ர்", transliteration: "r", word: "சர்க்கரை", meaning: "Sugar" },
  { letter: "ல்", transliteration: "l", word: "பால்", meaning: "Milk" },
  { letter: "வ்", transliteration: "v", word: "செவ்வாய்", meaning: "Tuesday" },
  { letter: "ழ்", transliteration: "zh", word: "வாழ்க்கை", meaning: "Life" },
  { letter: "ள்", transliteration: "ll", word: "பற்கள்", meaning: "Teeth" },
  { letter: "ற்", transliteration: "rr", word: "குற்றம்", meaning: "Crime" },
  { letter: "ன்", transliteration: "n", word: "மனிதன்", meaning: "Human" },
]

// Each uyirmei combo: [word, meaning] or null if no common word
// Order follows uyir: அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ
const uyirmeiWords = {
  "க்": [
    ["அகம்", "Inner self"],       // க
    ["காடு", "Forest"],            // கா
    ["கிளி", "Parrot"],            // கி
    ["கீரை", "Spinach"],           // கீ
    ["குழந்தை", "Child"],          // கு
    ["கூடு", "Nest"],              // கூ
    ["கெட்டி", "Strong"],          // கெ
    ["கேள்வி", "Question"],        // கே
    ["கைகள்", "Hands"],            // கை
    ["கொடி", "Flag"],              // கொ
    ["கோபம்", "Anger"],            // கோ
    ["கௌரவம்", "Honour"],          // கௌ
  ],
  "ங்": [
    ["ஙனம்", "Manner"],            // ங
    ["அங்ஙாணம்", "In that way"],        // ங்கா - rare
    null,
    null,
    null,          // ங்கு
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  "ச்": [
    ["சமையல்", "Cooking"],         // ச
    ["சாப்பிடு", "Eat"],           // சா
    ["சிரிப்பு", "Laughter"],      // சி
    ["சீடன்", "Disciple"],         // சீ
    ["சுகம்", "Comfort"],          // சு
    ["சூரியன்", "Sun"],            // சூ
    ["செல்வம்", "Wealth"],         // செ
    ["சேவல்", "Rooster"],          // சே
    ["சைவம்", "Vegetarian"],       // சை
    ["சொல்", "Word"],              // சொ
    ["சோறு", "Cooked rice"],       // சோ
    ["சௌகரியம்", "Convenience"],      // சௌ
  ],
  "ஞ்": [
    ["உரிஞல்", "Peeling or rubbing"],           // ஞ
    ["ஞாயிறு", "Sunday"],          // ஞா
    null,
    null,
    ["உரிஞு", "Peel"],          // 
    null,
    ["ஞெகிழி", "Plastic"],
    null,
    null,
    null,
    null,
    null,
  ],
  "ட்": [
    ["டமரம்", "Drum"],             // ட
    ["டாக்டர்", "Doctor"],         // டா
    ["பட்டி", "Grandmother"],        // டி
    ["திடீர்", "Sudden"],         // டீ
    ["படுக்கை", "Bed"],            // டு
    ["குண்டூசி", "Needle"],  // டூ
    ["சுண்டெலி", "Mouse"],
    null,
    ["இடை", "Middle"],          // டே
    null,
    ["வீட்டோரம்", "Beside the house" ],
    null,
  ],
  "ண்": [
    ["மண்ணகம்", "Underground"],    // ண
    ["பாணம்", "Arrow"],            // ணா
    ["தணிக்கை", "Inspection"],     //ணி
    ["தணீர்", "Cool water"],       // ணீ
    ["கணுக்கால்", "Ankle"],        // ணு
    ["மணூல்", "Thread"],           // ணூ
    ["கணெகன்", "Accountant"],      // ணெ
    ["பணேடு", "Treasure"],         // ணே
    ["தணை", "Dam"],                // ணை
    ["பணொடு", "With money"],       // ணொ
    ["மணோகரன்", "Graceful one"],   // ணோ
    null,
  ],
  "த்": [
    ["தமிழ்", "Tamil"],            // த
    ["தாய்", "Mother"],            // தா
    ["திரை", "Screen"],            // தி
    ["தீபம்", "Lamp"],             // தீ
    ["துணி", "Cloth"],             // து
    ["தூக்கம்", "Sleep"],          // தூ
    ["தெரு", "Street"],            // தெ
    ["தேன்", "Honey"],             // தே
    ["தைரியம்", "Courage"],        // தை
    ["தொழில்", "Profession"],      // தொ
    ["தோட்டம்", "Garden"],         // தோ
    null,
  ],
  "ந்": [
    ["நகரம்", "City"],             // ந
    ["நாடு", "Country"],           // நா
    ["நிலவு", "Moon"],             // நி
    ["நீர்", "Water"],             // நீ
    ["நுழைவு", "Entry"],           // நு
    ["நூல்", "Thread/Book"],       // நூ
    ["நெஞ்சு", "Heart/Chest"],     // நெ
    ["நேரம்", "Time"],             // நே
    ["நைபுணம்", "Expertise"],      // நை
    ["நொடி", "Moment"],            // நொ
    ["நோய்", "Disease"],           // நோ
    null,
  ],
  "ப்": [
    ["பழம்", "Fruit"],             // ப
    ["பாடல்", "Song"],             // பா
    ["பிள்ளை", "Child"],           // பி
    ["பீடம்", "Platform"],         // பீ
    ["புகழ்", "Fame"],             // பு
    ["பூமி", "Earth"],             // பூ
    ["பெண்", "Woman"],             // பெ
    ["பேச்சு", "Speech"],          // பே
    ["பைகள்", "Bags"],             // பை
    ["பொழுது", "Time/Weather"],    // பொ
    ["போர்", "War"],               // போ
    null,
  ],
  "ம்": [
    ["மனிதன்", "Human"],           // ம
    ["மாடு", "Cow"],               // மா
    ["மிளகு", "Pepper"],           // மி
    ["மீன்", "Fish"],              // மீ
    ["முகம்", "Face"],             // மு
    ["மூக்கு", "Nose"],            // மூ
    ["மெல்ல", "Slowly"],           // மெ
    ["மேகம்", "Cloud"],            // மே
    ["மைதானம்", "Ground/Field"],   // மை
    ["மொழி", "Language"],          // மொ
    ["மோதிரம்", "Ring"],           // மோ
    null,
  ],
  "ய்": [
    ["யானை", "Elephant"],          // ய
    ["யாழ்", "Lute"],              // யா
    ["இயிசை", "Music"],            // யி
    null,
    ["யுத்தம்", "War/Battle"],     // யு
    ["யூகம்", "Guess"],              // யூ
    ["பெரியெண்ணெய்", "Castor oil"], // யெ
    ["நீயே", "You yourself"],          // யே
    ["வாயை", "Mouth"],              // யை
    ["பெரியொளி", "Great light"],          // யொ
    ["யோசனை", "Thought"],          // யோ
    null,
  ],
  "ர்": [
    ["இரத்தம்", "Blood"],           // ர
    ["ராஜா", "King"],              // ரா
    ["ரிஷி", "Saint"],             // ரி
    ["ரீங்காரம்", "Humming"],      // ரீ
    ["ருசி", "Taste"],             // ரு
    ["ரூபாய்", "Rupee"],           // ரூ
    ["இரெயில்", "Train"],           // ரெ
    ["ரேகை", "Line/Mark"],         // ரே
    ["திரை", "Screen"],             // ரை
    null,
    ["இரோசா", "Rose"],              // ரோ
    null,
  ],
  "ல்": [
    ["லட்சியம்", "Ambition"],      // ல
    ["லாபம்", "Profit"],           // லா
    ["பல்லி", "Lizard"],            // லி
    ["பலீடு", "Sacrifice"],        // லீ
    ["லுங்கி", "Lungi (garment)"], // லு
    ["கல்லூரி", "College"],        // லூ
    null,         // லெ
    ["லேசான", "Lightweight"],        // லே
    null,
    null,
    ["லோகம்", "World/Metal"],      // லோ
    null,
  ],
  "வ்": [
    ["வகுப்பு", "Class"],          // வ
    ["வாழை", "Banana"],            // வா
    ["விளையாட்டு", "Sport/Game"],  // வி
    ["வீடு", "House"],             // வீ
    ["உணவு", "Food"],             // வு
    null,
    ["வெற்றி", "Victory"],         // வெ
    ["வேலை", "Work"],              // வே
    ["வைரம்", "Diamond"],          // வை
    ["வொழில்", "Profession"],      // வொ
    ["வோட்டு", "Vote"],            // வோ
    ["வௌவால்", "Bat"],
  ],
  "ழ்": [
    ["பழம்", "Fruit"],   // ழ
    ["விழா", "Festival"],            // ழா
    ["வாழிடம்", "Living place"],   // ழி
    ["கீழீடு", "To lower"],        // ழீ
    ["வாழும்", "Will live"],       // ழு
    ["வீழூக்கம்", "To fall"],
    null,
    ["கீழே", "Below"],        // ழே
    ["வாழை", "Banana"],
    ["பாழொழிந்தது", "Ruined"],
    null,
    null,
  ],
  "ள்": [
    ["மள்ளர்", "Warrior"],         // ள
    ["களால்", "By the field"],     // ளா
    ["களிப்பு", "Joy"],            // களி - ளி
    ["உள்ளீடு", "Input"],          // ளீ
    ["விளும்பு", "Desire"],        // ளு
    ["துள்ளூற்று", "Geyser"],
    ["முள்ளெடு", "Take the thorn off"],
    ["உள்ளே", "Inside"],          // ளே
    ["களைப்பு", "Tiredness"],      // ளை
    ["உள்ளொளி", "Inner light"],        // ளொ
    ["முள்ளோடு", "With the thorn"],
    null,
  ],
  "ற்": [
    ["பறவை", "Bird"],     // ற
    ["காற்றாடி", "Kite"],            // றா
    ["அறிவு", "Knowledge"] ,     // றி
    null,
    ["காற்று", "Wind"],        // று
    ["சிற்றூர்தி", "Van"],
    ["சிற்றெறும்பு", "Small ant"],
    ["காற்றே", "Wind itself"],
    ["பாறை", "Rock"],
    ["சொற்றொடர்", "Sentence"],
    ["பெற்றோர்", "Parent"],
    ["சுற்றௌடதம்", "Circular"],
  ],
  "ன்": [
    ["மன்னன்", "King"],           // ன
    ["கனா", "Dream"],  // னா
    ["தனிமை", "Loneliness"],       // னி
    ["தேனீ", "Bee"],         // னீ
    ["அனுப்பு", "Send"],  // னு
    ["புறநானூறு", "Ancient Tamil text"],  // னூ
    ["பொன்னெறி", "Golden path"],  // னெ
    ["பின்னே", "Behind"],  // னே
    ["பானை", "Vessel"],  // னை
    ["மின்னொளி", "Lightning"],  // னொ
    ["பின்னோக்கி", "Looking back"],  // னோ
    null,
  ],
}

const uyirSuffixMap = {
  "அ": "", "ஆ": "ா", "இ": "ி", "ஈ": "ீ",
  "உ": "ு", "ஊ": "ூ", "எ": "ெ", "ஏ": "ே",
  "ஐ": "ை", "ஒ": "ொ", "ஓ": "ோ", "ஔ": "ௌ",
}

const meiBaseMap = {
  "க்": "க", "ங்": "ங", "ச்": "ச", "ஞ்": "ஞ",
  "ட்": "ட", "ண்": "ண", "த்": "த", "ந்": "ந",
  "ப்": "ப", "ம்": "ம", "ய்": "ய", "ர்": "ர",
  "ல்": "ல", "வ்": "வ", "ழ்": "ழ", "ள்": "ள",
  "ற்": "ற", "ன்": "ன",
}

export const uyirmei = mei.map(consonant => ({
  consonant: consonant.letter,
  consonantTranslit: consonant.transliteration,
  combinations: uyir.map((vowel, vowelIndex) => {
    const base = meiBaseMap[consonant.letter]
    const suffix = uyirSuffixMap[vowel.letter]
    const combined = base + suffix
    const wordData = uyirmeiWords[consonant.letter]?.[vowelIndex]
    return {
      letter: combined,
      vowel: vowel.letter,
      transliteration: consonant.transliteration + vowel.transliteration,
      word: wordData ? wordData[0] : null,
      meaning: wordData ? wordData[1] : null,
    }
  })
}))