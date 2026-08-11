/* Maa Ke Haton Ka Acchar — product list.
   HOW TO EDIT: change name / price / size / emoji. To add a product: copy one whole
   block { ... }, paste after the last one, edit it. Save. Done!

   Fields:
   - cat: "mango" | "spicy" | "sweet" | "mixed" | "combo"   (filter category)
          use cat: "seasonal" for the Seasonal section
   - badge: "" | "new" | "bestseller" | "soldout" | "offer"  (shown on the card)
   - rating: 0-5, reviews: count shown under the name
   - variants: sizes with price and mrp (mrp only if discounted; use same as price
     when no discount). Add or remove variants freely.
   - name/desc: can be in 9 languages; missing languages fall back to English. */
const PRODUCTS = [
  {
    id: "mango",
    cat: "mango",
    emoji: "🥭",
    badge: "bestseller",
    rating: 4.8,
    reviews: 214,
    variants: [
      { size: "250g", price: "₹90", mrp: "₹110" },
      { size: "500g", price: "₹150", mrp: "₹180" },
      { size: "1kg", price: "₹280", mrp: "₹330" }
    ],
    name: {
      en: "Mango Pickle (Aam Ka Achar)",
      hi: "आम का अचार",
      bn: "আমের আচার",
      or: "ଆମ୍ବ ଅଚାର",
      te: "మామిడి పచ్చడి",
      mr: "आंब्याचे लोणचे",
      ta: "மாம்பழ ஊறுகாய்",
      gu: "કેરીનું અથાણું",
      pa: "ਅੰਬ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Sweet, tangy and spicy — made from raw mango and sun-dried spices.",
      hi: "कच्चे आम और धूप में सुखाए मसालों से बना — मीठा, खट्टा और तीखा।"
    }
  },
  {
    id: "lemon",
    cat: "spicy",
    emoji: "🍋",
    badge: "",
    rating: 4.7,
    reviews: 156,
    variants: [
      { size: "250g", price: "₹70", mrp: "₹85" },
      { size: "500g", price: "₹120", mrp: "₹140" },
      { size: "1kg", price: "₹225", mrp: "₹265" }
    ],
    name: {
      en: "Lemon Pickle (Nimbu Ka Achar)",
      hi: "नींबू का अचार",
      bn: "লেবুর আচার",
      or: "ନେଙ୍ଗୁଡ଼ି ଅଚାର",
      te: "నిమ్మ పచ్చడి",
      mr: "लिंबाचे लोणचे",
      ta: "எலுமிச்சை ஊறுகாய்",
      gu: "લીંબુનું અથાણું",
      pa: "ਨਿੰਬੂ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Classic tangy lemon pickle — perfect with any meal.",
      hi: "क्लासिक खट्टा नींबू अचार — हर खाने के साथ बेहतरीन।"
    }
  },
  {
    id: "chilli",
    cat: "spicy",
    emoji: "🌶️",
    badge: "new",
    rating: 4.9,
    reviews: 98,
    variants: [
      { size: "250g", price: "₹80", mrp: "₹95" },
      { size: "500g", price: "₹130", mrp: "₹155" },
      { size: "1kg", price: "₹245", mrp: "₹290" }
    ],
    name: {
      en: "Green Chilli Pickle (Mirchi Ka Achar)",
      hi: "हरी मिर्च का अचार",
      bn: "কাঁচা মরিচের আচার",
      or: "କଞ୍ଚା ଲଙ୍କା ଅଚାର",
      te: "పచ్చి మిర్చి పచ్చడి",
      mr: "हिरव्या मिरचीचे लोणचे",
      ta: "பச்சை மிளகாய் ஊறுகாய்",
      gu: "લીલા મરચાંનું અથાણું",
      pa: "ਹਰੀ ਮਿਰਚ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Fiery and flavourful — for those who love it hot.",
      hi: "तेज़ तीखा और स्वादिष्ट — उनके लिए जो तीखा पसंद करते हैं।"
    }
  },
  {
    id: "mixed",
    cat: "mixed",
    emoji: "🫙",
    badge: "bestseller",
    rating: 4.8,
    reviews: 341,
    variants: [
      { size: "250g", price: "₹110", mrp: "₹130" },
      { size: "500g", price: "₹180", mrp: "₹210" },
      { size: "1kg", price: "₹340", mrp: "₹400" }
    ],
    name: {
      en: "Mixed Pickle",
      hi: "मिक्स अचार",
      bn: "মিক্স আচার",
      or: "ମିକ୍ସ ଅଚାର",
      te: "మిక్స్డ్ పచ్చడి",
      mr: "मिक्स लोणचे",
      ta: "மிக்ஸ் ஊறுகாய்",
      gu: "મિક્સ અથાણું",
      pa: "ਮਿਕਸ ਅਚਾਰ"
    },
    desc: {
      en: "A family mix of mango, lemon, chilli and more — our most popular!",
      hi: "आम, नींबू, मिर्च और बहुत कुछ का पारिवारिक मिश्रण — सबसे लोकप्रिय!"
    }
  },
  {
    id: "garlic",
    cat: "spicy",
    emoji: "🧄",
    badge: "",
    rating: 4.6,
    reviews: 87,
    variants: [
      { size: "250g", price: "₹200", mrp: "₹240" },
      { size: "500g", price: "₹380", mrp: "₹450" }
    ],
    name: {
      en: "Garlic Pickle (Lehsun Ka Achar)",
      hi: "लहसुन का अचार",
      bn: "রসুনের আচার",
      or: "ରସୁଣ ଅଚାର",
      te: "వెల్లుల్లి పచ్చడి",
      mr: "लसणाचे लोणचे",
      ta: "பூண்டு ஊறுகாய்",
      gu: "લસણનું અથાણું",
      pa: "ਲਸਣ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Rich, strong flavour — great for digestion.",
      hi: "गाढ़ा और तेज़ स्वाद — पाचन के लिए भी लाभदायक।"
    }
  },
  {
    id: "amla",
    cat: "sweet",
    emoji: "🟢",
    badge: "",
    rating: 4.7,
    reviews: 129,
    variants: [
      { size: "250g", price: "₹95", mrp: "₹115" },
      { size: "500g", price: "₹160", mrp: "₹190" },
      { size: "1kg", price: "₹300", mrp: "₹350" }
    ],
    name: {
      en: "Amla Pickle (Gooseberry)",
      hi: "आंवले का अचार",
      bn: "আমলকির আচার",
      or: "ଅଁଳା ଅଚାର",
      te: "ఉసిరి పచ్చడి",
      mr: "आवळ्याचे लोणचे",
      ta: "நெல்லிக்காய் ஊறுகாய்",
      gu: "આંવળાનું અથાણું",
      pa: "ਆਂਵਲੇ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Healthy and tasty — full of Vitamin C.",
      hi: "स्वादिष्ट और सेहतमंद — विटामिन सी से भरपूर।"
    }
  },
  {
    id: "sample_pack",
    cat: "combo",
    emoji: "🎁",
    badge: "bestseller",
    rating: 4.9,
    reviews: 176,
    variants: [
      { size: "5 × 150g", price: "₹399", mrp: "₹499" },
      { size: "5 × 150g + Kheer Mix", price: "₹450", mrp: "₹560" }
    ],
    name: {
      en: "Sample Pack — 5 Mini Jars",
      hi: "सैंपल पैक — 5 मिनी जार",
      bn: "স্যাম্পল প্যাক — ৫টি মিনি জার",
      or: "ସାମ୍ପଲ ପ୍ୟାକ୍ — ୫ ମିନି ଜାର",
      te: "సాంపిల్ ప్యాక్ — 5 మినీ జాడీలు",
      mr: "सॅम्पल पॅक — 5 मिनी डबे",
      ta: "சாம்பிள் பேக் — 5 மினி ஜாடிகள்",
      gu: "સેમ્પલ પેક — 5 મિની બરણીઓ",
      pa: "ਸੈਂਪਲ ਪੈਕ — 5 ਮਿੰਨੀ ਡੱਬੇ"
    },
    desc: {
      en: "Try 5 different pickles in one pack — perfect for first-time customers.",
      hi: "एक पैक में 5 अलग-अलग अचार — नए ग्राहकों के लिए बेहतरीन।"
    }
  },
  {
    id: "combo_pack",
    cat: "combo",
    emoji: "🧺",
    badge: "offer",
    rating: 4.8,
    reviews: 203,
    variants: [
      { size: "3 × 500g", price: "₹420", mrp: "₹490" },
      { size: "5 × 500g", price: "₹650", mrp: "₹765" }
    ],
    name: {
      en: "Family Combo Pack (15% OFF)",
      hi: "फैमिली कॉम्बो पैक (15% OFF)",
      bn: "ফ্যামিলি কম্বো প্যাক (১৫% ছাড়)",
      or: "ଫ୍ୟାମିଲି କମ୍ବୋ ପ୍ୟାକ୍ (୧୫% ଛାଡ଼)",
      te: "ఫ్యామిలీ కాంబో ప్యాక్ (15% ఆఫ్)",
      mr: "फॅमिली कॉम्बो पॅक (15% सूट)",
      ta: "குடும்ப காம்போ பேக் (15% தள்ளுபடி)",
      gu: "ફેમિલી કોમ્બો પેક (15% ઓફ)",
      pa: "ਫੈਮਿਲੀ ਕੰਬੋ ਪੈਕ (15% OFF)"
    },
    desc: {
      en: "Our bestsellers together in one special-priced combo — perfect for the whole family.",
      hi: "हमारे सबसे लोकप्रिय अचार एक साथ — पूरे परिवार के लिए बेहतरीन कीमत पर।"
    }
  },
  {
    id: "seasonal_mango",
    cat: "seasonal",
    emoji: "🥭",
    badge: "",
    rating: 4.9,
    reviews: 64,
    variants: [
      { size: "500g", price: "₹150", mrp: "₹175" },
      { size: "1kg", price: "₹280", mrp: "₹330" }
    ],
    name: {
      en: "Fresh Mango Pickle (Summer Special)",
      hi: "ताज़ा आम का अचार (गर्मी स्पेशल)",
      bn: "তাজা আমের আচার (গ্রীষ্মকালীন)",
      or: "ତାଜା ଆମ୍ବ ଅଚାର (ଗ୍ରୀଷ୍ମ)",
      te: "తాజా మామిడి పచ్చడి (వేసవి)",
      mr: "ताजे आंब्याचे लोणचे (उन्हाळी)",
      ta: "புதிய மாம்பழ ஊறுகாய் (கோடை)",
      gu: "તાજું કેરીનું અથાણું (ઉનાળો)",
      pa: "ਤਾਜ਼ਾ ਅੰਬ ਦਾ ਅਚਾਰ (ਗਰਮੀ)"
    },
    desc: {
      en: "Made fresh every summer from the season's best mangoes. Limited stock!",
      hi: "हर गर्मी में मौसम के सबसे अच्छे आमों से ताज़ा बनता है। सीमित स्टॉक!"
    }
  },
  {
    id: "seasonal_amla",
    cat: "seasonal",
    emoji: "🟢",
    badge: "",
    rating: 4.7,
    reviews: 41,
    variants: [
      { size: "500g", price: "₹160", mrp: "₹185" }
    ],
    name: {
      en: "Winter Amla Pickle",
      hi: "सर्दियों का आंवला अचार",
      bn: "শীতকালীন আমলকি আচার",
      or: "ଶୀତ ଅଁଳା ଅଚାର",
      te: "చలికాలం ఉసిరి పచ్చడి",
      mr: "हिवाळी आवळ्याचे लोणचे",
      ta: "குளிர்கால நெல்லிக்காய் ஊறுகாய்",
      gu: "શિયાળાનું આંવળાનું અથાણું",
      pa: "ਸਰਦੀਆਂ ਦਾ ਆਂਵਲੇ ਦਾ ਅਚਾਰ"
    },
    desc: {
      en: "Winter special — tangy amla pickle that keeps you healthy all season.",
      hi: "सर्दियों का स्पेशल — खट्टा आंवला अचार जो पूरे मौसम सेहतमंद रखता है।"
    }
  },
  {
    id: "seasonal_nimbu",
    cat: "seasonal",
    emoji: "🍋",
    badge: "",
    rating: 4.8,
    reviews: 52,
    variants: [
      { size: "500g", price: "₹120", mrp: "₹140" }
    ],
    name: {
      en: "Winter Lemon Pickle",
      hi: "सर्दियों का नींबू अचार",
      bn: "শীতকালীন লেবুর আচার",
      or: "ଶୀତ ନେଙ୍ଗୁଡ଼ି ଅଚାର",
      te: "చలికాలం నిమ్మ పచ్చడి",
      mr: "हिवाळी लिंबाचे लोणचे",
      ta: "குளிர்கால எலுமிச்சை ஊறுகாய்",
      gu: "શિયાળાનું લીંબુનું અથાણું",
      pa: "ਸਰਦੀਆਂ ਦਾ ਨਿੰਬੂ ਅਚਾਰ"
    },
    desc: {
      en: "Made in the cold season when lemons are at their juiciest.",
      hi: "ठंड के मौसम में बना, जब नींबू सबसे रसीले होते हैं।"
    }
  }
];
