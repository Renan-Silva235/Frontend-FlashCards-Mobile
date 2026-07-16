export const languageLabels = {
  English: "🇺🇸 Inglês",
  Spanish: "🇪🇸 Espanhol",
  Turkish: "🇹🇷 Turco",
};

export const languageFlags = {
  English: "🇺🇸",
  Spanish: "🇪🇸",
  Turkish: "🇹🇷",
};

export const languageSpeechCodes = {
  English: "en-US",
  Spanish: "es-ES",
  Turkish: "tr-TR",
};

export const languageOptions = [
  { id: "1", label: languageLabels.English, value: "English" },
  { id: "2", label: languageLabels.Spanish, value: "Spanish" },
  { id: "3", label: languageLabels.Turkish, value: "Turkish" },
];

export function getLanguageLabel(language) {
  return languageLabels[language] ?? null;
}

export function getLanguageFlag(language) {
  return languageFlags[language] ?? "🇹🇷";
}
