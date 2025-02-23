import {Dimensions} from 'react-native';
const baseScreenWidth = 360;

export const calculateResponsiveFontSize = (baseFontSize: any) => {
  const screenWidth = Dimensions.get('window').width;
  const scaleFactor = screenWidth / baseScreenWidth;
  return baseFontSize * scaleFactor;
};
