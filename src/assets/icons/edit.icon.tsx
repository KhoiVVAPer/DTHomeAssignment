import * as React from 'react';
import {SvgXml} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const EditIcon: React.FC<Props> = ({size, color}) => {
  return (
    <SvgXml
      xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.08641 10.7846L0.0299737 13.4259C-0.000472679 13.5019 -0.00792586 13.5853 0.00853804 13.6655C0.0250019 13.7458 0.0646589 13.8195 0.122593 13.8774C0.180526 13.9353 0.254189 13.975 0.334448 13.9915C0.414708 14.0079 0.498034 14.0005 0.574098 13.97L3.21519 12.9135C3.63631 12.745 4.01879 12.4926 4.33944 12.1718L13.4799 3.03164C13.8129 2.69859 14 2.24689 14 1.77589C14 1.3049 13.8129 0.853191 13.4799 0.520147C13.1469 0.187102 12.6952 0 12.2242 0C11.7532 0 11.3016 0.187102 10.9685 0.520147L1.82726 9.6603C1.50674 9.98104 1.25469 10.3635 1.08641 10.7846Z" fill="#FBBF2D"/>
      </svg>
      `}
      width={size}
      height={size}
      fill={color}
    />
  );
};
export {EditIcon};
