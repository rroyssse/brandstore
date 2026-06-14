import bcrypt from 'bcryptjs';

const createProduct = ({
  name,
  nameUk,
  slug,
  category,
  color,
  tags,
  image,
  price,
  countInStock,
  brand,
  fabric,
  description,
  descriptionUk,
}) => ({
  name,
  nameUk,
  slug,
  category,
  color,
  tags,
  image,
  price,
  countInStock,
  brand,
  fabric,
  description,
  descriptionUk,
});

const users = [
  {
    name: 'Administrator',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'Olena Koval',
    email: 'olena.koval@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
  {
    name: 'Marta Ivanenko',
    email: 'marta.ivanenko@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];

const baseProducts = [
  createProduct({
    name: 'Create Yourself Dress',
    nameUk: 'Сукня Create Yourself',
    slug: 'defreiya-create-yourself-dress',
    category: 'Dresses',
    color: 'Black',
    tags: ['classic', 'capsule', 'office'],
    image: '/images/defreiya/DeFreiya-Dress-Create-yourself-126.jpg',
    price: 126,
    countInStock: 6,
    brand: 'DeFreiya',
    fabric: 'Viscose blend',
    description:
      'Elegant mini dress with a contrasting collar for everyday looks, office styling, and evening events.',
    descriptionUk:
      'Елегантна мінісукня з контрастним коміром для повсякденних образів, офісного гардероба та вечірніх виходів.',
  }),
  createProduct({
    name: 'Flawless Denim Midi Dress',
    nameUk: 'Джинсова мідісукня Flawless',
    slug: 'defreiya-flawless-denim-midi-dress',
    category: 'Dresses',
    color: 'Blue',
    tags: ['denim', 'midi', 'capsule'],
    image: '/images/defreiya/DeFreiya-Flawless-denim-midi-dress-153.jpg',
    price: 153,
    countInStock: 4,
    brand: 'DeFreiya',
    fabric: 'Denim',
    description:
      'Structured denim midi dress with a clean silhouette, slit detail, and comfortable fit.',
    descriptionUk:
      'Структурована джинсова мідісукня з лаконічним силуетом, розрізом і комфортною посадкою.',
  }),
  createProduct({
    name: 'Black Eco Suit',
    nameUk: 'Чорний еко-костюм',
    slug: 'defreiya-black-vegan-suit',
    category: 'Suits',
    color: 'Black',
    tags: ['eco', 'statement', 'party'],
    image: '/images/defreiya/DeFreiya-suit-black-vegan-120.jpg',
    price: 120,
    countInStock: 5,
    brand: 'DeFreiya',
    fabric: 'Eco leather blend',
    description:
      'Bold eco-leather set with a cropped jacket and skirt for statement evening styling.',
    descriptionUk:
      'Акцентний комплект з екошкіри з укороченим жакетом і спідницею для виразних вечірніх образів.',
  }),
  createProduct({
    name: 'Stay the Way Suit',
    nameUk: 'Костюм Stay the Way',
    slug: 'defreiya-stay-the-way-suit',
    category: 'Suits',
    color: 'Grey',
    tags: ['tailored', 'capsule', 'office'],
    image: '/images/defreiya/DeFreiya-Suit-Stay-the-way334.jpg',
    price: 334,
    countInStock: 3,
    brand: 'DeFreiya',
    fabric: 'Cotton blend',
    description:
      'Tailored suit with wide-leg trousers designed for a modern capsule wardrobe.',
    descriptionUk:
      'Костюм із чітким кроєм і широкими штанами, створений для сучасного капсульного гардероба.',
  }),
  createProduct({
    name: 'Classic White Shirt',
    nameUk: 'Класична біла сорочка',
    slug: 'defreiya-classic-white-shirt',
    category: 'Shirts',
    color: 'White',
    tags: ['classic', 'natural fabrics', 'base'],
    image: '/images/defreiya/Defreya-White-shirt-104.jpg',
    price: 104,
    countInStock: 9,
    brand: 'DeFreiya',
    fabric: 'Cotton',
    description:
      'Classic white shirt with a slightly oversized cut and versatile styling for work or everyday wear.',
    descriptionUk:
      'Класична біла сорочка з легко oversize-посадкою та універсальною стилізацією для офісу й щоденних образів.',
  }),
  createProduct({
    name: 'Flower Print Dress',
    nameUk: 'Сукня з квітковим принтом',
    slug: 'defreiya-flower-print-dress',
    category: 'Dresses',
    color: 'Ivory',
    tags: ['print', 'feminine', 'summer'],
    image: '/images/defreiya/defreya_dress_flower_print-170.jpg',
    price: 170,
    countInStock: 5,
    brand: 'DeFreiya',
    fabric: 'Viscose',
    description:
      'Feminine floral dress made for spring and summer collections with a light flowing feel.',
    descriptionUk:
      'Жіночна сукня з квітковим принтом для весняно-літніх колекцій із легкою пластичною тканиною.',
  }),
  createProduct({
    name: 'Beige Trench Coat',
    nameUk: 'Бежевий тренч',
    slug: 'polivik-beige-trench-coat',
    category: 'Outerwear',
    color: 'Beige',
    tags: ['natural fabrics', 'capsule', 'office'],
    image: '/images/polivik/beige-thench-coat-215.webp',
    price: 215,
    countInStock: 0,
    brand: 'PoliVik',
    fabric: 'Cotton twill',
    description:
      'Light trench coat created for layering in transitional seasons and smart daily outfits.',
    descriptionUk:
      'Легкий тренч для багатошарових образів у міжсезоння та продуманого міського гардероба.',
  }),
  createProduct({
    name: 'Oversized Beige Hoodie',
    nameUk: 'Бежеве худі oversize',
    slug: 'polivik-oversized-beige-hoodie',
    category: 'Hoodies',
    color: 'Beige',
    tags: ['oversized', 'casual', 'base'],
    image: '/images/polivik/cotton-beige-oversized-hoodie-99.webp',
    price: 99,
    countInStock: 11,
    brand: 'PoliVik',
    fabric: 'Cotton',
    description:
      'Soft oversized hoodie designed for relaxed everyday outfits and travel wardrobes.',
    descriptionUk:
      'М’яке худі oversize для розслаблених повсякденних образів і комфортного дорожнього гардероба.',
  }),
  createProduct({
    name: 'Embroidered Hoodie',
    nameUk: 'Худі з вишивкою',
    slug: 'polivik-embroidered-hoodie',
    category: 'Hoodies',
    color: 'Black',
    tags: ['embroidered', 'casual', 'limited edition'],
    image: '/images/polivik/embroidered-hoodie-90.webp',
    price: 90,
    countInStock: 7,
    brand: 'PoliVik',
    fabric: 'Cotton',
    description:
      'Casual black hoodie with embroidered accents inspired by contemporary Ukrainian design.',
    descriptionUk:
      'Повсякденне чорне худі з вишитими акцентами, натхненними сучасним українським дизайном.',
  }),
  createProduct({
    name: 'Hemp Embroidered Shirt',
    nameUk: 'Конопляна сорочка з вишивкою',
    slug: 'polivik-hemp-embroidered-shirt',
    category: 'Shirts',
    color: 'Beige',
    tags: ['natural fabrics', 'embroidered', 'eco'],
    image: '/images/polivik/hemp-shirt-with-embroidery-98.webp',
    price: 98,
    countInStock: 8,
    brand: 'PoliVik',
    fabric: 'Hemp',
    description:
      'Breathable shirt with embroidery inspired by Ukrainian motifs and a natural textured fabric.',
    descriptionUk:
      'Повітропроникна сорочка з вишивкою в українських мотивах і натуральною фактурною тканиною.',
  }),
  createProduct({
    name: 'Linen Embroidered Corset',
    nameUk: 'Лляний вишитий корсет',
    slug: 'polivik-linen-embroidered-corset',
    category: 'Corsets',
    color: 'Black',
    tags: ['embroidered', 'natural fabrics', 'statement'],
    image: '/images/polivik/linen-corset-with-embroidery-140.webp',
    price: 140,
    countInStock: 4,
    brand: 'PoliVik',
    fabric: 'Linen',
    description:
      'Statement corset that combines traditional embroidery with a clean modern silhouette.',
    descriptionUk:
      'Акцентний корсет, що поєднує традиційну вишивку з чистим сучасним силуетом.',
  }),
  createProduct({
    name: 'Gold Embroidered Suit',
    nameUk: 'Костюм із золотою вишивкою',
    slug: 'polivik-gold-embroidered-suit',
    category: 'Suits',
    color: 'Black',
    tags: ['embroidered', 'statement', 'festive'],
    image: '/images/polivik/suit-with-gold-embroidered-149.webp',
    price: 149,
    countInStock: 3,
    brand: 'PoliVik',
    fabric: 'Linen blend',
    description:
      'Festive suit with artisan-inspired gold embroidery for events, photo shoots, and special occasions.',
    descriptionUk:
      'Святковий костюм із золотою вишивкою в дусі ручної роботи для подій, фотосесій і особливих нагод.',
  }),
  createProduct({
    name: 'Organic Cotton T-Shirt',
    nameUk: 'Футболка з органічної бавовни',
    slug: 'defreiya-organic-cotton-tshirt',
    category: 'T-Shirts',
    color: 'White',
    tags: ['eco', 'base', 'natural fabrics'],
    image: '/images/defreiya/Defreya-White-shirt-104.jpg',
    price: 56,
    countInStock: 12,
    brand: 'DeFreiya',
    fabric: 'Cotton',
    description:
      'Minimal white T-shirt made from soft cotton for a clean base wardrobe.',
    descriptionUk:
      'Мінімалістична біла футболка з м’якої бавовни для базового гардероба.',
  }),
  createProduct({
    name: 'Blue Denim Shorts',
    nameUk: 'Сині джинсові шорти',
    slug: 'defreiya-blue-denim-shorts',
    category: 'Shorts',
    color: 'Blue',
    tags: ['denim', 'summer', 'casual'],
    image: '/images/defreiya/DeFreiya-Flawless-denim-midi-dress-153.jpg',
    price: 72,
    countInStock: 10,
    brand: 'DeFreiya',
    fabric: 'Denim',
    description:
      'High-rise denim shorts for summer wardrobes and easy casual combinations.',
    descriptionUk:
      'Джинсові шорти із завищеною талією для літнього гардероба та простих повсякденних поєднань.',
  }),
  createProduct({
    name: 'Milk Linen T-Shirt',
    nameUk: 'Молочна лляна футболка',
    slug: 'polivik-milk-linen-tshirt',
    category: 'T-Shirts',
    color: 'Ivory',
    tags: ['natural fabrics', 'base', 'summer'],
    image: '/images/polivik/hemp-shirt-with-embroidery-98.webp',
    price: 64,
    countInStock: 6,
    brand: 'PoliVik',
    fabric: 'Linen',
    description:
      'Lightweight linen T-shirt in a milk shade designed for breathable summer looks.',
    descriptionUk:
      'Легка лляна футболка молочного відтінку для повітряних літніх образів.',
  }),
  createProduct({
    name: 'Sand Cotton Shorts',
    nameUk: 'Пісочні бавовняні шорти',
    slug: 'polivik-sand-cotton-shorts',
    category: 'Shorts',
    color: 'Beige',
    tags: ['base', 'casual', 'summer'],
    image: '/images/polivik/cotton-beige-oversized-hoodie-99.webp',
    price: 68,
    countInStock: 8,
    brand: 'PoliVik',
    fabric: 'Cotton',
    description:
      'Comfortable cotton shorts in a neutral sand shade for everyday summer styling.',
    descriptionUk:
      'Зручні бавовняні шорти в нейтральному пісочному відтінку для щоденних літніх образів.',
  }),
];

const dropVariants = [
  {
    label: 'Dawn',
    labelUk: 'Dawn',
    slug: 'dawn',
    color: 'Ivory',
    priceDelta: 0,
    stockDelta: 1,
    extraTag: 'summer',
  },
  {
    label: 'Studio',
    labelUk: 'Studio',
    slug: 'studio',
    color: 'Grey',
    priceDelta: 8,
    stockDelta: 2,
    extraTag: 'office',
  },
  {
    label: 'Noir',
    labelUk: 'Noir',
    slug: 'noir',
    color: 'Black',
    priceDelta: 12,
    stockDelta: 0,
    extraTag: 'statement',
  },
  {
    label: 'Terra',
    labelUk: 'Terra',
    slug: 'terra',
    color: 'Beige',
    priceDelta: 6,
    stockDelta: 3,
    extraTag: 'base',
  },
  {
    label: 'Coast',
    labelUk: 'Coast',
    slug: 'coast',
    color: 'Blue',
    priceDelta: 10,
    stockDelta: 2,
    extraTag: 'casual',
  },
  {
    label: 'Olive',
    labelUk: 'Olive',
    slug: 'olive',
    color: 'Green',
    priceDelta: 7,
    stockDelta: 1,
    extraTag: 'natural fabrics',
  },
  {
    label: 'Cocoa',
    labelUk: 'Cocoa',
    slug: 'cocoa',
    color: 'Brown',
    priceDelta: 9,
    stockDelta: 4,
    extraTag: 'festive',
  },
];

const generatedTemplates = [
  {
    name: 'Aurora Tailored Vest',
    nameUk: 'Жилет Aurora',
    slugBase: 'aurora-tailored-vest',
    category: 'Suits',
    brand: 'DeFreiya',
    fabric: 'Cotton blend',
    image: '/images/defreiya/DeFreiya-Suit-Stay-the-way334.jpg',
    basePrice: 118,
    baseStock: 5,
    tags: ['capsule', 'office', 'tailored'],
    description:
      'Tailored vest for layered capsule looks with a clean shoulder line and structured fit.',
    descriptionUk:
      'Жилет із чітким кроєм для багатошарових капсульних образів зі структурованою посадкою.',
  },
  {
    name: 'Solstice Linen Shirt',
    nameUk: 'Сорочка Solstice',
    slugBase: 'solstice-linen-shirt',
    category: 'Shirts',
    brand: 'PoliVik',
    fabric: 'Linen',
    image: '/images/polivik/hemp-shirt-with-embroidery-98.webp',
    basePrice: 92,
    baseStock: 6,
    tags: ['natural fabrics', 'base', 'summer'],
    description:
      'Relaxed linen shirt designed for breathable summer dressing and smart casual combinations.',
    descriptionUk:
      'Лляна сорочка в розслабленому силуеті для повітряного літнього гардероба та smart casual образів.',
  },
  {
    name: 'Orbit Oversized Hoodie',
    nameUk: 'Худі Orbit',
    slugBase: 'orbit-oversized-hoodie',
    category: 'Hoodies',
    brand: 'PoliVik',
    fabric: 'Cotton',
    image: '/images/polivik/cotton-beige-oversized-hoodie-99.webp',
    basePrice: 88,
    baseStock: 8,
    tags: ['oversized', 'casual', 'base'],
    description:
      'Oversized hoodie with a soft silhouette and everyday comfort for city and travel wardrobes.',
    descriptionUk:
      'Худі oversize з м’яким силуетом і щоденним комфортом для міського та дорожнього гардероба.',
  },
  {
    name: 'Bloom Slip Dress',
    nameUk: 'Сукня Bloom',
    slugBase: 'bloom-slip-dress',
    category: 'Dresses',
    brand: 'DeFreiya',
    fabric: 'Viscose',
    image: '/images/defreiya/defreya_dress_flower_print-170.jpg',
    basePrice: 148,
    baseStock: 4,
    tags: ['feminine', 'summer', 'print'],
    description:
      'Fluid dress with a feminine line and elegant movement for warm-season styling.',
    descriptionUk:
      'Пластична сукня з жіночним силуетом і легким рухом для образів теплої пори року.',
  },
  {
    name: 'Form Denim Dress',
    nameUk: 'Сукня Form',
    slugBase: 'form-denim-dress',
    category: 'Dresses',
    brand: 'DeFreiya',
    fabric: 'Denim',
    image: '/images/defreiya/DeFreiya-Flawless-denim-midi-dress-153.jpg',
    basePrice: 158,
    baseStock: 5,
    tags: ['denim', 'midi', 'capsule'],
    description:
      'Denim dress with a clean line and contemporary shape for versatile daily wear.',
    descriptionUk:
      'Джинсова сукня з чистою лінією та сучасною формою для універсального щоденного гардероба.',
  },
  {
    name: 'Outline Corset Top',
    nameUk: 'Корсет Outline',
    slugBase: 'outline-corset-top',
    category: 'Corsets',
    brand: 'PoliVik',
    fabric: 'Linen',
    image: '/images/polivik/linen-corset-with-embroidery-140.webp',
    basePrice: 132,
    baseStock: 3,
    tags: ['statement', 'natural fabrics', 'embroidered'],
    description:
      'Corset-inspired top that brings artisan mood and a modern shape to evening outfits.',
    descriptionUk:
      'Топ у стилі корсета, який поєднує ремісничий настрій із сучасною формою для вечірніх образів.',
  },
  {
    name: 'Frame Trench Coat',
    nameUk: 'Тренч Frame',
    slugBase: 'frame-trench-coat',
    category: 'Outerwear',
    brand: 'PoliVik',
    fabric: 'Cotton twill',
    image: '/images/polivik/beige-thench-coat-215.webp',
    basePrice: 224,
    baseStock: 2,
    tags: ['capsule', 'office', 'natural fabrics'],
    description:
      'Structured trench coat for transitional weather, layering, and polished city styling.',
    descriptionUk:
      'Структурований тренч для міжсезоння, багатошарових комплектів і зібраних міських образів.',
  },
  {
    name: 'Pulse Cotton T-Shirt',
    nameUk: 'Футболка Pulse',
    slugBase: 'pulse-cotton-tshirt',
    category: 'T-Shirts',
    brand: 'DeFreiya',
    fabric: 'Cotton',
    image: '/images/defreiya/Defreya-White-shirt-104.jpg',
    basePrice: 54,
    baseStock: 9,
    tags: ['base', 'eco', 'natural fabrics'],
    description:
      'Clean cotton T-shirt that works as a reliable base layer in every season.',
    descriptionUk:
      'Лаконічна бавовняна футболка, яка працює як надійна база в будь-якому сезоні.',
  },
  {
    name: 'Ease Summer Shorts',
    nameUk: 'Шорти Ease',
    slugBase: 'ease-summer-shorts',
    category: 'Shorts',
    brand: 'DeFreiya',
    fabric: 'Cotton',
    image: '/images/defreiya/DeFreiya-Flawless-denim-midi-dress-153.jpg',
    basePrice: 66,
    baseStock: 7,
    tags: ['summer', 'casual', 'base'],
    description:
      'Easy-fit shorts built for warm-weather comfort, simple styling, and daily movement.',
    descriptionUk:
      'Шорти в комфортній посадці для спекотної погоди, простих стилізацій і щоденної мобільності.',
  },
  {
    name: 'Heritage Embroidered Hoodie',
    nameUk: 'Худі Heritage',
    slugBase: 'heritage-embroidered-hoodie',
    category: 'Hoodies',
    brand: 'PoliVik',
    fabric: 'Cotton',
    image: '/images/polivik/embroidered-hoodie-90.webp',
    basePrice: 96,
    baseStock: 5,
    tags: ['embroidered', 'casual', 'limited edition'],
    description:
      'Hoodie with embroidered accents inspired by Ukrainian heritage and updated for everyday wear.',
    descriptionUk:
      'Худі з вишитими акцентами, натхненними українською спадщиною та адаптованими до щоденного носіння.',
  },
  {
    name: 'Atelier Evening Suit',
    nameUk: 'Костюм Atelier',
    slugBase: 'atelier-evening-suit',
    category: 'Suits',
    brand: 'PoliVik',
    fabric: 'Linen blend',
    image: '/images/polivik/suit-with-gold-embroidered-149.webp',
    basePrice: 186,
    baseStock: 4,
    tags: ['festive', 'statement', 'embroidered'],
    description:
      'Evening suit with a strong silhouette and decorative details for special moments.',
    descriptionUk:
      'Вечірній костюм із виразним силуетом і декоративними деталями для особливих подій.',
  },
  {
    name: 'Balance Eco Set',
    nameUk: 'Комплект Balance',
    slugBase: 'balance-eco-set',
    category: 'Suits',
    brand: 'DeFreiya',
    fabric: 'Eco leather blend',
    image: '/images/defreiya/DeFreiya-suit-black-vegan-120.jpg',
    basePrice: 138,
    baseStock: 4,
    tags: ['eco', 'party', 'statement'],
    description:
      'Eco set with a bold finish designed for parties, editorials, and confident evening styling.',
    descriptionUk:
      'Еко-комплект із виразною фактурою для вечірок, зйомок і впевнених акцентних образів.',
  },
];

const editorialVariants = [
  {
    label: 'Luna',
    labelUk: 'Luna',
    slug: 'luna',
    color: 'Ivory',
    priceDelta: 4,
    stockDelta: 2,
    extraTag: 'summer',
  },
  {
    label: 'Canvas',
    labelUk: 'Canvas',
    slug: 'canvas',
    color: 'White',
    priceDelta: 6,
    stockDelta: 1,
    extraTag: 'base',
  },
  {
    label: 'Metro',
    labelUk: 'Metro',
    slug: 'metro',
    color: 'Grey',
    priceDelta: 8,
    stockDelta: 3,
    extraTag: 'office',
  },
  {
    label: 'Harbor',
    labelUk: 'Harbor',
    slug: 'harbor',
    color: 'Blue',
    priceDelta: 10,
    stockDelta: 2,
    extraTag: 'casual',
  },
  {
    label: 'Dune',
    labelUk: 'Dune',
    slug: 'dune',
    color: 'Beige',
    priceDelta: 7,
    stockDelta: 2,
    extraTag: 'natural fabrics',
  },
  {
    label: 'Velvet',
    labelUk: 'Velvet',
    slug: 'velvet',
    color: 'Black',
    priceDelta: 12,
    stockDelta: 1,
    extraTag: 'statement',
  },
  {
    label: 'Avenue',
    labelUk: 'Avenue',
    slug: 'avenue',
    color: 'White',
    priceDelta: 9,
    stockDelta: 4,
    extraTag: 'classic',
  },
  {
    label: 'Muse',
    labelUk: 'Muse',
    slug: 'muse',
    color: 'Ivory',
    priceDelta: 11,
    stockDelta: 3,
    extraTag: 'feminine',
  },
  {
    label: 'Pulse',
    labelUk: 'Pulse',
    slug: 'pulse',
    color: 'Black',
    priceDelta: 5,
    stockDelta: 2,
    extraTag: 'party',
  },
  {
    label: 'Horizon',
    labelUk: 'Horizon',
    slug: 'horizon',
    color: 'Beige',
    priceDelta: 13,
    stockDelta: 5,
    extraTag: 'capsule',
  },
];

const editorialTemplates = [
  {
    name: 'Nova Minimal Dress',
    nameUk: 'Сукня Nova',
    slugBase: 'nova-minimal-dress',
    category: 'Dresses',
    brand: 'DeFreiya',
    fabric: 'Viscose blend',
    image: '/images/defreiya/DeFreiya-Dress-Create-yourself-126.jpg',
    basePrice: 144,
    baseStock: 5,
    tags: ['capsule', 'feminine', 'classic'],
    description:
      'Minimal dress with a refined silhouette designed for day-to-evening styling and a modern wardrobe.',
    descriptionUk:
      'Мінімалістична сукня з вишуканим силуетом для образів від дня до вечора та сучасного гардероба.',
  },
  {
    name: 'Sculpt Denim Shirt',
    nameUk: 'Сорочка Sculpt',
    slugBase: 'sculpt-denim-shirt',
    category: 'Shirts',
    brand: 'DeFreiya',
    fabric: 'Denim',
    image: '/images/defreiya/Defreya-White-shirt-104.jpg',
    basePrice: 96,
    baseStock: 7,
    tags: ['denim', 'casual', 'base'],
    description:
      'Denim shirt with a clean structure and versatile styling for layered city looks.',
    descriptionUk:
      'Джинсова сорочка з чіткою формою та універсальною стилізацією для багатошарових міських образів.',
  },
  {
    name: 'Verve Tailored Suit',
    nameUk: 'Костюм Verve',
    slugBase: 'verve-tailored-suit',
    category: 'Suits',
    brand: 'DeFreiya',
    fabric: 'Cotton blend',
    image: '/images/defreiya/DeFreiya-Suit-Stay-the-way334.jpg',
    basePrice: 172,
    baseStock: 4,
    tags: ['tailored', 'office', 'capsule'],
    description:
      'Tailored suit created for polished office looks, presentations, and a confident capsule wardrobe.',
    descriptionUk:
      'Костюм зі структурованим кроєм для зібраних офісних образів, презентацій і впевненого капсульного гардероба.',
  },
  {
    name: 'Motive Embroidered Corset',
    nameUk: 'Корсет Motive',
    slugBase: 'motive-embroidered-corset',
    category: 'Corsets',
    brand: 'PoliVik',
    fabric: 'Linen',
    image: '/images/polivik/linen-corset-with-embroidery-140.webp',
    basePrice: 146,
    baseStock: 3,
    tags: ['embroidered', 'statement', 'natural fabrics'],
    description:
      'Corset with embroidered details that combines artisan inspiration and a bold contemporary silhouette.',
    descriptionUk:
      'Корсет із вишитими деталями, що поєднує ремісниче натхнення та виразний сучасний силует.',
  },
  {
    name: 'Drift Linen Shorts',
    nameUk: 'Шорти Drift',
    slugBase: 'drift-linen-shorts',
    category: 'Shorts',
    brand: 'PoliVik',
    fabric: 'Linen blend',
    image: '/images/polivik/cotton-beige-oversized-hoodie-99.webp',
    basePrice: 74,
    baseStock: 8,
    tags: ['summer', 'natural fabrics', 'casual'],
    description:
      'Breathable shorts with an easy fit for hot weather, vacation packing, and everyday movement.',
    descriptionUk:
      'Повітряні шорти комфортної посадки для спекотної погоди, відпусток і щоденної мобільності.',
  },
  {
    name: 'Signal Graphic Hoodie',
    nameUk: 'Худі Signal',
    slugBase: 'signal-graphic-hoodie',
    category: 'Hoodies',
    brand: 'PoliVik',
    fabric: 'Cotton',
    image: '/images/polivik/embroidered-hoodie-90.webp',
    basePrice: 94,
    baseStock: 6,
    tags: ['oversized', 'casual', 'limited edition'],
    description:
      'Graphic hoodie with a streetwear mood, relaxed volume, and comfortable daily wear feel.',
    descriptionUk:
      'Худі з вуличним настроєм, вільним об’ємом і комфортом для щоденного носіння.',
  },
  {
    name: 'Contour Trench Coat',
    nameUk: 'Тренч Contour',
    slugBase: 'contour-trench-coat',
    category: 'Outerwear',
    brand: 'PoliVik',
    fabric: 'Cotton twill',
    image: '/images/polivik/beige-thench-coat-215.webp',
    basePrice: 228,
    baseStock: 3,
    tags: ['capsule', 'office', 'classic'],
    description:
      'Trench coat with a defined shoulder line and elegant drape for refined transitional-season outfits.',
    descriptionUk:
      'Тренч із виразною лінією плеча та м’яким спаданням для вишуканих образів міжсезоння.',
  },
  {
    name: 'Origin Hemp Shirt',
    nameUk: 'Сорочка Origin',
    slugBase: 'origin-hemp-shirt',
    category: 'Shirts',
    brand: 'PoliVik',
    fabric: 'Hemp',
    image: '/images/polivik/hemp-shirt-with-embroidery-98.webp',
    basePrice: 102,
    baseStock: 6,
    tags: ['eco', 'natural fabrics', 'embroidered'],
    description:
      'Hemp shirt with tactile texture and expressive details inspired by contemporary Ukrainian design.',
    descriptionUk:
      'Конопляна сорочка з виразною фактурою та деталями, натхненними сучасним українським дизайном.',
  },
  {
    name: 'Core Cotton T-Shirt',
    nameUk: 'Футболка Core',
    slugBase: 'core-cotton-tshirt',
    category: 'T-Shirts',
    brand: 'DeFreiya',
    fabric: 'Cotton',
    image: '/images/defreiya/Defreya-White-shirt-104.jpg',
    basePrice: 52,
    baseStock: 10,
    tags: ['base', 'eco', 'classic'],
    description:
      'Cotton T-shirt built as a dependable base layer for minimal, layered, and travel wardrobes.',
    descriptionUk:
      'Бавовняна футболка, створена як надійна база для мінімалістичних, багатошарових і дорожніх гардеробів.',
  },
  {
    name: 'Aura Evening Dress',
    nameUk: 'Сукня Aura',
    slugBase: 'aura-evening-dress',
    category: 'Dresses',
    brand: 'DeFreiya',
    fabric: 'Viscose',
    image: '/images/defreiya/defreya_dress_flower_print-170.jpg',
    basePrice: 164,
    baseStock: 4,
    tags: ['party', 'feminine', 'statement'],
    description:
      'Evening dress with fluid movement and an expressive mood for events, celebrations, and special dinners.',
    descriptionUk:
      'Вечірня сукня з пластичним рухом і виразним настроєм для подій, святкувань і особливих вечерь.',
  },
];

const generatedProducts = generatedTemplates.flatMap((template, templateIndex) =>
  dropVariants.map((variant, variantIndex) =>
    createProduct({
      name: `${template.name} ${variant.label}`,
      nameUk: `${template.nameUk} ${variant.labelUk}`,
      slug: `${template.brand.toLowerCase()}-${template.slugBase}-${variant.slug}`,
      category: template.category,
      color: variant.color,
      tags: [...new Set([...template.tags, variant.extraTag])],
      image: template.image,
      price: template.basePrice + variant.priceDelta + (templateIndex % 3),
      countInStock: template.baseStock + variant.stockDelta + (variantIndex % 2),
      brand: template.brand,
      fabric: template.fabric,
      description: `${template.description} Featured in the ${variant.label} drop.`,
      descriptionUk: `${template.descriptionUk} Представлено у добірці ${variant.labelUk}.`,
    })
  )
);

const editorialProducts = editorialTemplates.flatMap((template, templateIndex) =>
  editorialVariants.map((variant, variantIndex) =>
    createProduct({
      name: `${template.name} ${variant.label}`,
      nameUk: `${template.nameUk} ${variant.labelUk}`,
      slug: `${template.brand.toLowerCase()}-${template.slugBase}-${variant.slug}`,
      category: template.category,
      color: variant.color,
      tags: [...new Set([...template.tags, variant.extraTag])],
      image: template.image,
      price: template.basePrice + variant.priceDelta + (templateIndex % 4),
      countInStock: template.baseStock + variant.stockDelta + (variantIndex % 3),
      brand: template.brand,
      fabric: template.fabric,
      description: `${template.description} Included in the ${variant.label} edit.`,
      descriptionUk: `${template.descriptionUk} Представлено в добірці ${variant.labelUk}.`,
    })
  )
);

const products = [...baseProducts, ...generatedProducts, ...editorialProducts];

const data = {
  users,
  products,
};

export default data;
