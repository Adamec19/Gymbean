'use client';

import { ChakraProvider as Provider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import theme from '../../styles/theme';

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider resetCSS theme={theme}>
      {children}
    </Provider>
  );
};

export default ChakraProvider;
