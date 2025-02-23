import {Dimensions} from 'react-native';
const baseScreenWidth = 360;

export const calculateResponsiveWidth = (baseFontWidth: any) => {
  const screenWidth = Dimensions.get('window').width;
  const scaleFactor = screenWidth / baseScreenWidth;
  return baseFontWidth * scaleFactor;
};
