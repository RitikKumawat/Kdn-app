declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';

type TFileType = {
  uri: string;
  name: string;
  type: string;
  size: number;
};
