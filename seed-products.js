const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Products from frontend with proper Arabic text
const products = [
  {
    name: "دهان الحنظل وذروة الجمل – راحة طبيعية",
    category: "علاجي طبيعي",
    price: 2990,
    size: "50g",
    image: "/green.jpeg",
    description: "دهان طبيعي مستخلص من سنام الجمل والحنظل، مصمم ليمنحك راحة سريعة وطبيعية من آلام الجسم والخشونة، بدون أي مواد كيميائية.",
    isNew: true,
    quantity: 10,
    costPrice: 1500,
    details: {
      benefits: [
        "تخفيف الخشونة وآلام المفاصل والعظام",
        "تخفيف آلام الرقبة والديسك",
        "علاج فعال لعرق النساء ومشط القدم",
        "تركيبة طبيعية 100% خالية من الكيماويات"
      ],
      usage: {
        routine: "ضع الدهان على المنطقة المصابة مرتين يومياً.",
        tip: "يُفضل تغطية المنطقة بقماش لزيادة الفعالية.",
        bestTime: "الاستخدام الأمثل: قبل النوم لضمان راحة تامة عند الاستيقاظ."
      }
    }
  },
  {
    name: "شحم سنام الجمل – كنز الصحراء الخام",
    category: "كنوز الصحراء",
    price: 2600,
    size: "200g",
    image: "/jamal.jpeg",
    description: "منتج طبيعي 100%، مستخلص من سنام الإبل، خالي من المواد الكيميائية. كنز صحي وجمالي شامل يعيد للجسم توازنه وحيويته.",
    isNew: false,
    quantity: 10,
    costPrice: 1300,
    details: {
      benefits: [
        "علاج طبيعي للربو، السعال، والتهابات الحلق",
        "تسكين آلام المفاصل والروماتيزم وتشقق القدمين",
        "ترطيب عميق وتفتيح طبيعي للبشرة",
        "تقوية الشعر ومنع تساقطه"
      ],
      usage: {
        skin: "للعناية الخارجية: دهن الجسم أو الشعر بالشحم المذاب حسب الحاجة.",
        hair: "لتقوية الشعر: يدلك الفروة بالشحم المذاب ويترك لساعة قبل الغسل.",
        internal: "للعلاج الداخلي: تناول ملعقة صغيرة من الشحم المذاب صباحاً ومساءً."
      }
    }
  },
  {
    name: "زيت الأركان تندوف الخام – الذهب السائل",
    category: "كنوز الصحراء",
    price: 1750,
    size: "10ml",
    image: "/arkan.jpeg",
    description: "يُستخرج من لوز شجرة الأركان التي تنمو في تندوف. يُعرف بـ 'الذهب السائل' لفوائده العظيمة ويحتوي على فيتامين E الطبيعي.",
    isNew: false,
    quantity: 10,
    costPrice: 900,
    details: {
      benefits: [
        "مضاد طبيعي للتجاعيد وعلامات الشيخوخة",
        "يعالج حب الشباب ويصفي البشرة",
        "يرطب الشعر الجاف والمجعد"
      ],
      usage: "قطرات بسيطة تدلك على البشرة أو الشعر قبل النوم."
    }
  },
  {
    name: "كريم الوجه بذروة الجمل والنيلة الصحراوية",
    category: "الذهب الأزرق",
    price: 2990,
    size: "50g",
    image: "/face.jpeg",
    description: "مزيج ملكي يجمع بين فوائد ذروة الجمل المغذية والنيلة الصحراوية المفتحة لتصفية البشرة وشد الترهلات.",
    isNew: false,
    quantity: 10,
    costPrice: 1500,
    details: {
      benefits: [
        "تبييض فوري وتوحيد لون البشرة",
        "التخلص من الكلف وآثار الشمس",
        "شد البشرة المترهلة"
      ],
      usage: "يُدهن على وجه نظيف قبل النوم يومياً."
    }
  },
  {
    name: "النيلة الصحراوية الخام 💙",
    category: "كنوز الصحراء",
    price: 990,
    size: "20g",
    image: "/blue.jpeg",
    description: "نيلة تندوف الأصلية الخام، السر الصحراوي لتفتيح الجسم وتوحيد لونه بلمسة واحدة.",
    isNew: false,
    quantity: 10,
    costPrice: 500,
    details: {
      benefits: [
        "تفتيح المناطق الداكنة",
        "توحيد لون البشرة وإزالة البقع",
        "نعومة حريرية"
      ],
      usage: "تخلط مع الزبادي أو ماء الورد كقناع لمدة 20 دقيقة."
    }
  },
  {
    name: 'إكسير الصحراء – راحة طبيعية للمفاصل والعضلات',
    category: 'علاجي طبيعي',
    price: 299,
    size: "50g",
    image: "/yellow.jpeg",
    description: 'من قلب الصحراء… يأتيك سر الراحة الطبيعية. تركيبة طبيعية 100% تخفف آلام المفاصل والعضلات وتساعد في حالات الروماتيزم والتهابات الخفيفة.',
    isNew: true,
    quantity: 10,
    costPrice: 150,
    details: {
      benefits: [
        'يخفف آلام المفاصل والعضلات',
        'يساعد في حالات الروماتيزم والالتهابات الخفيفة',
        'مثالي بعد المجهود الرياضي',
        'تركيبة طبيعية 100%',
        'امتصاص سريع دون أثر دهني',
        'إحساس بالدفء أو البرودة المريحة'
      ],
      usage: 'ضع كمية صغيرة ودلّك بلطف 2 – 3 مرات يوميًا عند الحاجة. لا يوضع على الجروح المفتوحة ويُتجنب ملامسة العينين.'
    }
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products:`);
    
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (ID: ${product._id})`);
    });

    console.log('\nProducts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
