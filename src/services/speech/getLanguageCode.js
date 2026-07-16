import { languageSpeechCodes } from "../../utils/languages";

export function getLanguageCode(language) {
  return languageSpeechCodes[language] ?? "en-US";
}
