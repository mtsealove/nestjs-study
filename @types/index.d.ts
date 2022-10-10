declare namespace NodeJS {
  declare interface ProcessEnv {
    DB_TYPE: 'mysql';
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
  }
}

declare interface IAccessToken {
  accessToken: string;
}
