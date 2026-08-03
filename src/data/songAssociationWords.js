const songWords = [
  {
    word: "மழை",
    transliteration: "Mazhai",
    meaning: "Rain",
    songs: [
      "Mazhai Kuruvi — Chekka Chivantha Vaanam (2018)",
      "Pudhu Vellai Mazhai — Roja (1992)",
      "Andhi Mazhai Pozhigirathu — Raja Paarvai (1981)"
    ]
  },
  {
    word: "கண்",
    transliteration: "Kaṇ",
    meaning: "Eye / Eyes",
    songs: [
      "Kan Pesum Vaarthaigal — 7G Rainbow Colony (2004)",
      "Unnai Kaanadhu Naan — Vishwaroopam (2013)",
      "Kannodu Kanbathellam — Jeans (1998)"
    ]
  },
  {
    word: "காதல்",
    transliteration: "Kaadhal",
    meaning: "Love",
    songs: [
      "Kadhal Rojave — Roja (1992)",
      "Kaadhal En Kaviye — Salmon 3D (2021)",
      "Kaadhal Sadugudu — Alaipayuthey (2000)"
    ]
  },
  {
    word: "வானம்",
    transliteration: "Vaanam",
    meaning: "Sky",
    songs: [
      "Vaan Varuvaan — Kaatru Veliyidai (2017)",
      "Vaan Engum Nee Minna — Endrendrum Punnagai (2013)",
      "Nila Nee Vaanam — Pokkisham (2009)"
    ]
  },
  {
    word: "நிலா",
    transliteration: "Nila",
    meaning: "Moon",
    songs: [
      "Nila Kaigirathu — Indira (1995)",
      "Chinna Chinna Vanna Kuyil — Mouna Ragam (1986)",
      "Vaa Vennila — Mella Thiranthathu Kadhavu (1986)"
    ]
  },
  {
    word: "பூ",
    transliteration: "Poo",
    meaning: "Flower",
    songs: [
      "Poo Pookum Osai — Minsara Kanavu (1997)",
      "Poove Sempoove — Solla Thudikuthu Manasu (1988)",
      "Poovukkul Olinthirukkum — Jeans (1998)"
    ]
  },
  {
    word: "தாய்",
    transliteration: "Thaai",
    meaning: "Mother",
    songs: [
      "Thaai Manne Vanakkam — A.R. Rahman (Vande Mataram Tamil) (1997)",
      "Thai Illamal Naan Illai — Adimai Penn (1969)",
      "Thaaye Yashoda — Morning Raga (2004)"
    ]
  },
  {
    word: "நண்பன்",
    transliteration: "Nanban",
    meaning: "Friend",
    songs: [
      "Nanbanai Partha Thethi — Ninaithale Inikkum (2009)",
      "Nanbane — Mankatha (2011)",
      "Mustafaa Mustafaa — Kadhal Desam (1996)"
    ]
  },
  {
    word: "கடல்",
    transliteration: "Kadal",
    meaning: "Sea",
    songs: [
      "Nenjukulle — Kadal (2013)",
      "Kadal Raasa Naan — Maryan (2013)",
      "Elay Keechan — Kadal (2013)"
    ]
  },
  {
    word: "இரவு",
    transliteration: "Iravu",
    meaning: "Night",
    songs: [
      "Iravingu Theevai — 96 (2018)",
      "Nallai Allai — Kaatru Veliyidai (2017)",
      "Vennilave Vennilave — Minsara Kanavu (1997)"
    ]
  },
  {
    word: "விழி",
    transliteration: "Vizhi",
    meaning: "Eye / Gaze",
    songs: [
      "Vizhi Moodi Yosithaal — Ayan (2009)",
      "Vizhigalin Aruginil Vaanam — Azhagiya Theeye (2004)",
      "En Vizhiyin Kanavu — Bangalore Naatkal (2016)"
    ]
  },
  {
    word: "ஊர்",
    transliteration: "Oor",
    meaning: "Village / Town",
    songs: [
      "Namma Ooru Singari — Ninaithale Inikkum (1979)",
      "Ooru Vittu Ooru Vandhu — Karagattakaran (1989)",
      "Oororam Puliyamaram — Paruthiveeran (2007)"
    ]
  },
  {
    word: "பாடல்",
    transliteration: "Paadal",
    meaning: "Song",
    songs: [
      "Paadatha Paattellam — Veera Thalattu (1998)",
      "Paadariyen Padippariyen — Sindhu Bhairavi (1985)",
      "Paattu Onnu Naan Paadattuma — Pudhiya Vaarpugal (1979)"
    ]
  },
  {
    word: "கனவு",
    transliteration: "Kanavu",
    meaning: "Dream",
    songs: [
      "Kanave Kanave — David (2013)",
      "Kanavellam Neethane — Dhilip Varman (Single)",
      "Kanavu Nanavagum — Chennai Girl (Single)"
    ]
  },
  {
    word: "வீடு",
    transliteration: "Veedu",
    meaning: "Home / House",
    songs: [
      "En Veettu Thottathil — Gentleman (1993)",
      "Veedu Varai Uravu — Paadha Kaanikkai (1962)",
      "Oru Veedu Iru Vaasal — Oru Veedu Iru Vaasal (1990)"
    ]
  },
  {
    word: "சின்ன",
    transliteration: "Chinna",
    meaning: "Small",
    songs: [
      "Chinna Machan — Charlie Chaplin 2 (2019)",
      "Chinna Chinna Aasai — Roja (1992)",
      "Enna Solla — Thangamagan (2016)"
    ]
  },
  {
    word: "மனசு",
    transliteration: "Manasu",
    meaning: "Heart / Mind",
    songs: [
      "Tholanja Manasu — Nesippaya (2025)",
      "Intha Maamanoda Manasu — Uthama Raasa (1993)",
      "Manasu Mayangum — Sippikkul Muthu (1986)"
    ]
  },
  {
    word: "தமிழ்",
    transliteration: "Tamizh",
    meaning: "Tamil",
    songs: [
      "Tamizha Tamizha — Roja (1992)",
      "Semmozhiyaana Tamizh Mozhiyaam — World Classical Tamil Conference (2010)",
      "Senthamizh Naadenum Pothinile — Bharathiyar (widely performed)"
    ]
  },
  {
    word: "பறவை",
    transliteration: "Paravai",
    meaning: "Bird",
    songs: [
      "Paravai Parandhuchu — Kadhalum Kadandhu Pogum (2016)",
      "Manam Kothi Paravai — Manam Kothi Paravai (2012)",
      "Adho Andha Paravai Pola — Aayirathil Oruvan (1965)"
    ]
  },
  {
    word: "நெஞ்சு",
    transliteration: "Nenju",
    meaning: "Heart / Chest",
    songs: [
      "Nenjukulle — Kadal (2013)",
      "Nenje Nenje — Ayan (2009)",
      "Oru Pere Varalaaru — Jana Nayagan (2026)"
    ]
  }
];

export default songWords;