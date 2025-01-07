export enum Language {
  en = "en", //English
  vi = "vi", //Vietnamese
  // ru = "ru", //Russian
  // fr = "fr", //French
  // de = "de", //German
  // ja = "ja", //Japanese
  // ar = "ar", //Arabic
  // pt = "pt", //Portuguese
  // ko = "ko", //Korean
  // es = "es", //Spanish
  // zh = "zh", //Chinese
  // sk = "sk", //Slovak
}

export const languageArray: Language[] = [
  Language.en, 
  Language.vi, 
  // Language.ru, 
  // Language.fr, 
  // Language.de, 
  // Language.ja,
  // Language.ar,
  // Language.pt,
  // Language.ko,
  // Language.es,
  // Language.zh,
  // Language.sk
];

export const mapLanguage: { [key in Language]: string } = {
  [Language.en]: 'Tiếng Anh',
  [Language.vi]: 'Tiếng Việt',
  // [Language.ru]: 'Tiếng Nga',
  // [Language.fr]: 'Tiếng Pháp',
  // [Language.de]: 'Tiếng Đức',
  // [Language.ja]: 'Tiếng Nhật',
  // [Language.ar]: 'Tiếng Ả Rập',
  // [Language.pt]: 'Tiếng Bồ Đào Nha',
  // [Language.ko]: 'Tiếng Hàn',
  // [Language.es]: 'Tiếng Tây Ban Nha',
  // [Language.zh]: 'Tiếng Trung',
  // [Language.sk]: 'Tiếng Tiệp Khắc',
};