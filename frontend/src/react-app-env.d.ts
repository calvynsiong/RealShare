/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_DEFAULT_IMG_SOURCE: string;
    REACT_APP_BACKEND_URL: string;
    REACT_APP_BACKEND_URL_PROD: string;
  }
}
