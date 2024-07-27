import type { Metadata } from 'next';
import { ColorModeScript } from '@chakra-ui/react';
import { ReactNode } from 'react';

import TanStackProvider from './providers/TanStackProvider';
import ChakraProvider from './providers/ChakraProvider';
import theme from '../styles/theme';

export const metadata: Metadata = {
  title: 'TODO ',
  description: 'TODO - A simple todo app',
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider>{children}</ChakraProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
