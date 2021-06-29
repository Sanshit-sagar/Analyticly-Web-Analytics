
import '../styles/globals.css';
import '../styles/nprogress.css';

import Router from 'next/router';
import { Store } from '../store';
import { ThemeProvider } from 'next-themes'
import { Provider as AuthProvider } from 'next-auth/client'
import NProgress from 'nprogress';

// import AuthWrapper from '../components/Auth/index'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  
  return (
    <AuthProvider 
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ThemeProvider 
        enableSystem={true} 
        attribute="class"
      >
        <Store>
          <Component  {...pageProps} />
        </Store>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
