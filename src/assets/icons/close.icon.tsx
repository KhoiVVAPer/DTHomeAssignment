import * as React from 'react';
import {SvgXml} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<Props> = ({size, color}) => {
  return (
    <SvgXml
      xml={`<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 10.8037L11 0.803711M1 0.803711L11 10.8037" stroke="#231F20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export {CloseIcon};
