import path from 'path';

export enum ExitCode {
  SUCCESS = 0,
  ERROR = 1
}

export enum HttpCode {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
}

export const MOCK_FILE_PATH = path.resolve(__dirname, `../../../mocks.json`);
