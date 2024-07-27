import { extendTheme } from '@chakra-ui/react';
import { config } from 'process';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
export default theme;
