import Script from 'next/script'

type AnalyticsScriptsProps = {
  /** GA4 measurement ID, e.g. "G-XXXXXXXXXX" */
  gaMeasurementId?: string
  /** Yandex Metrika counter ID, e.g. "00000000" */
  yandexCounterId?: string
}

/*
  <AnalyticsScripts /> demonstrates how Google Analytics 4 (gtag.js) and
  Yandex Metrika are injected. It is rendered from the root layout's <head>.

  Next.js <Script> strategies:
    - "afterInteractive": loads after the page becomes interactive (GA4).
    - "lazyOnload": loads during idle time (Yandex).

  In production, swap the placeholder IDs for real ones (ideally via env vars,
  e.g. process.env.NEXT_PUBLIC_GA_ID). Scripts are skipped when no ID is set.
*/
export function AnalyticsScripts({
  gaMeasurementId,
  yandexCounterId,
}: AnalyticsScriptsProps) {
  return (
    <>
      {/* Google Analytics 4 (gtag.js) */}
      {gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {/* Yandex Metrika */}
      {yandexCounterId ? (
        <Script id="yandex-metrika" strategy="lazyOnload">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
            ym(${yandexCounterId}, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true });
          `}
        </Script>
      ) : null}
    </>
  )
}
