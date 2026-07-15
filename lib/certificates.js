// Your certifications — this is the single place to manage them.
//
// To add a certificate, drop a new object at the TOP of the array:
//   - title:    the credential name (e.g. "Associate Cloud Engineer")
//   - issuer:   who granted it (e.g. "Google Cloud")
//   - date:     year or issue date shown on the card
//   - badgeUrl: public link to the badge / verification page (e.g. your Credly badge)
//   - image:    OPTIONAL — put a file in public/images/certificates/ and reference
//               it here (e.g. "/images/certificates/gcp-ace.png") to show it on the card

export const certificates = [
  {
    id: 'gcp-associate-cloud-engineer',
    title: 'Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: '', // optional — add the issue year/date to show it on the card
    badgeUrl:
      'https://www.credly.com/badges/e6dbdcde-1b34-4ef2-b033-1eb226cff06f',
    image: '/images/certificates/gcp-ace.png'
  }
]
