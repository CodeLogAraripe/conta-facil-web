export {};

import { IconType } from 'react-icons';
import { ReactNode } from 'react';

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface RoutesType {
    name: string;
    layout: string;
    component: ReactNode;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }
}

declare module '@chakra-ui/react' {
  import { As } from '@chakra-ui/react';
  
  type ExtendedAs = As | IconType;
  
  interface IconProps {
    as?: ExtendedAs;
  }
}
