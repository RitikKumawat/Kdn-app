import {Dimensions} from 'react-native';
const baseScreenHeight = 800;

export const calculateResponsiveHeight = (baseSize: any) => {
  const screenHeight = Dimensions.get('window').height;
  const scaleFactor = screenHeight / baseScreenHeight;
  return baseSize * scaleFactor;
};
