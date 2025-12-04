import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

// Width based on 375 design width
export const SW = (dimension: number): number => {
  return (dimension / 375) * SCREEN_WIDTH;
};

// Height based on 812 design height
export const SH = (dimension: number): number => {
  return (dimension / 812) * SCREEN_HEIGHT;
};

// Font scaling based on height
export const SF = (dimension: number): number => {
  return (dimension / 812) * SCREEN_HEIGHT;
};

// Direct percentage height
export const heightPercent = (percent: number): number => {
  return (percent / 100) * SCREEN_HEIGHT;
};

// Direct percentage width
export const widthPercent = (percent: number): number => {
  return (percent / 100) * SCREEN_WIDTH;
};

// Font size as percentage of screen height
export const fontPercent = (percent: number): number => {
  return (percent / 100) * SCREEN_HEIGHT;
};
