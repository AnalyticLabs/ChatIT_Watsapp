declare global {
  interface Console {
    tron: any;
  }
}

// 👇 Add this part to handle SVG imports correctly
declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
