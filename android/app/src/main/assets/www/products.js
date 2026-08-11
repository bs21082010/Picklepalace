/* Maa Ke Haton Ka Acchar — product list.
   HOW TO EDIT: find a product, change name / price / size / emoji.
   To add a product: copy one whole block { ... }, paste after the last one,
   remove the comma if needed, and edit it. Save the file. Done!

   If a language is missing for name/desc, the site shows English text for it.
   cat: "regular" = normal section, "seasonal" = seasonal section. */
const PRODUCTS = [
  {
    id: "mango",
    cat: "regular",
    emoji: "🥭",
    price: "₹150",
    size: "500g",
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
    cat: "regular",
    emoji: "🍋",
    price: "₹120",
    size: "500g",
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
    cat: "regular",
    emoji: "🌶️",
    price: "₹130",
    size: "500g",
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
    cat: "regular",
    emoji: "🫙",
    price: "₹180",
    size: "500g",
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
    cat: "regular",
    emoji: "🧄",
    price: "₹200",
    size: "250g",
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
    cat: "regular",
    emoji: "🟢",
    price: "₹160",
    size: "500g",
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
    id: "seasonal_mango",
    cat: "seasonal",
    emoji: "🥭",
    price: "₹150",
    size: "500g",
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
    price: "₹160",
    size: "500g",
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
    price: "₹120",
    size: "500g",
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
