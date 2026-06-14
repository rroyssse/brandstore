import {
  findDictionaryTranslation,
  translateTextWithDictionary,
} from './translationDictionary';

const productNameOverrides = {
  'Black Vegan Suit': 'Чорний еко-костюм',
  'Classic White Shirt': 'Класична біла сорочка',
  'Create Yourself Dress': 'Сукня Create Yourself',
  'Embroidered Hoodie': 'Худі з вишивкою',
  'Flawless Denim Midi Dress': 'Джинсова міді-сукня Flawless',
  'Flower Print Dress': 'Сукня з квітковим принтом',
  'Gold Embroidered Suit': 'Костюм із золотою вишивкою',
  'Hemp Embroidered Shirt': 'Конопляна сорочка з вишивкою',
  'Linen Embroidered Corset': 'Лляний вишитий корсет',
  'Oversized Beige Hoodie': 'Бежеве худі oversize',
  'Stay the Way Suit': 'Костюм Stay the Way',
  'Beige Trench Coat': 'Бежевий тренч',
};

const normalizeWhitespace = (value) => value.replace(/\s+/g, ' ').trim();

const capitalizeFirstLetter = (value) => {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const translateProductNameWithDictionary = (name, dictionaryEntries) => {
  if (!name) {
    return '';
  }

  if (productNameOverrides[name]) {
    return productNameOverrides[name];
  }

  const exactMatch = findDictionaryTranslation({
    entries: dictionaryEntries,
    term: name,
    from: 'en',
    to: 'uk',
  });

  if (exactMatch) {
    return exactMatch.target;
  }

  const translatedName = translateTextWithDictionary({
    entries: dictionaryEntries,
    text: name,
    from: 'en',
    to: 'uk',
    allowedKinds: ['term', 'name', 'color', 'category', 'fabric', 'tag'],
  });

  return capitalizeFirstLetter(normalizeWhitespace(translatedName));
};

export const getLocalizedField = (
  entity,
  fieldName,
  language,
  dictionaryEntries = []
) => {
  if (!entity) {
    return '';
  }

  const localizedFieldName = `${fieldName}Uk`;

  if (language === 'uk' && entity[localizedFieldName]) {
    return entity[localizedFieldName];
  }

  const baseValue = entity[fieldName] || entity[localizedFieldName] || '';

  if (language === 'uk' && fieldName === 'name') {
    return translateProductNameWithDictionary(baseValue, dictionaryEntries);
  }

  return baseValue;
};
