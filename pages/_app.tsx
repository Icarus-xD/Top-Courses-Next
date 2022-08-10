import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';
import Head from 'next/head';
import router from 'next/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== 'undefined') {
		ym('hit', url);
	}
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

	return (
		<>
			<Head>
				<title>MyTop - наш лучший топ</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel='preconnect' href='https://mc.yandex.ru' />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_RU' />
			</Head>
			<YMInitializer 
				accounts={[]}
				options={{webvisor: true, defer: true}}
				version='2'
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;