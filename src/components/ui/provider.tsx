'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
		</SessionProvider>
	);
}

// -----------------------------------------------------------
// "use client"

// import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
// import {
//   ColorModeProvider,
//   type ColorModeProviderProps,
// } from "./color-mode"

// export function Provider(props: ColorModeProviderProps) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   )
// }
