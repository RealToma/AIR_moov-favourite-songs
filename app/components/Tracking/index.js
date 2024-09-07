import { GTM_ID, GTM_AUTH, GTM_PREVIEW } from '/lib/gtm'
import Head from 'next/head'

const Tracking = () => {
  return (
    <>
      {/* Google Tag Manager - Global base code */}
      {GTM_ID && (
        <Head>
          <script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${GTM_AUTH}&gtm_preview=${GTM_PREVIEW}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        </Head>
      )}
    </>
  )
}

export default Tracking