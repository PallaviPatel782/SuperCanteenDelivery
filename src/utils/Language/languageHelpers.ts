import { I18nManager } from "react-native";

export const applyRTLSettings = async (lang: string) => {
  const isArabic = lang === "ar";

  if (isArabic && !I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    return true; 
  }

  if (!isArabic && I18nManager.isRTL) {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    return true; 
  }

  return false;
};
