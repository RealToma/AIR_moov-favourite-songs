import { GTM_ID, GTM_AUTH, GTM_PREVIEW } from '/lib/gtm'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}&gtm_auth=${GTM_AUTH}&gtm_preview=${GTM_PREVIEW}&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" />`
            }}
        />
      </body>
    </Html>
  )
}