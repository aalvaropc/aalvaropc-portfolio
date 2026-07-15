import Layout from '../components/layouts/article'
import Reveal from '../components/reveal'
import CertificateCard from '../components/certificate-card'
import { certificates } from '../lib/certificates'
import { useI18n } from '../lib/i18nContext'

const Certificates = () => {
  const { t } = useI18n()

  return (
    <Layout title={t('certificates.title', 'Certificados')}>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">
        {t('certificates.title', 'Certificados')}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {t(
          'certificates.subtitle',
          'Certificaciones y credenciales que he obtenido.'
        )}
      </p>

      {certificates.length > 0 ? (
        <div className="flex flex-col gap-4">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.id} delay={index * 0.05}>
              <CertificateCard
                certificate={certificate}
                viewLabel={t('certificates.viewBadge', 'Ver credencial')}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
          {t('certificates.empty', 'Pronto añadiré certificaciones aquí.')}
        </div>
      )}
    </Layout>
  )
}

export default Certificates
