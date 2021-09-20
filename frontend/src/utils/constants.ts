export const BASE_URL: string =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_BACKEND_URL;
export const DEFAULT_IMG: string = process.env.REACT_APP_DEFAULT_IMG_SOURCE;
export const UPLOAD_IMG_URL: string = process.env.REACT_APP_UPLOAD_IMG_URL!;
