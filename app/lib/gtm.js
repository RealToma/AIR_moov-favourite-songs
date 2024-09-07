export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
export const GTM_AUTH = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH
export const GTM_PREVIEW = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_PREVIEW

export const pageview = (url) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}

export const pushTracker = ({ event, params }) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const eventData = {
      event,
      ...params,
    }
    window.dataLayer.push(eventData)
  }
}