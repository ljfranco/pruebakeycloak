// types/node-env.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    KEYCLOAK_CLIENT_ID: string
    KEYCLOAK_CLIENT_SECRET: string
    KEYCLOAK_ISSUER: string
    NEXT_PUBLIC_GATEWAY_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    MERCADOPAGO_PUBLIC_KEY: string
  }
}