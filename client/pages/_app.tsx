import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavbarLayout from '../components/navigation/navbarLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavbarLayout>
      <Component {...pageProps} />
    </NavbarLayout>
  );
}

export default MyApp;
