import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { MainBackground } from './component/MainBackground/MainBackground.tsx';

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 2 } },
});

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ChakraProvider>
			<MainBackground>
				<App />
			</MainBackground>
		</ChakraProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
