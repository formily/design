import loader from '@monaco-editor/loader'

const Registry = {
  cdn: '//cdn.jsdelivr.net/npm',
}

export const setNpmCDNRegistry = (registry: string) => {
  Registry.cdn = registry
  const isProduction = process.env.NODE_ENV === 'production'
  const vsPath = isProduction
    ? 'http://cdn.zuo11.com/lib/vs'
    : `${registry}/monaco-editor@0.30.1/min/vs`
  loader.config({
    paths: {
      vs: vsPath,
    },
  })
}

export const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '')
