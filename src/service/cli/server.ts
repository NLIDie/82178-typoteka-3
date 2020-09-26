import http from 'http';
import path from 'path';
import {promises as fs} from 'fs';

import {print} from '@utils';
import {Publication} from '@entities/publication';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = `localhost`;
const PATH_TO_MOCKS = path.join(__dirname, `../../../mocks.json`);

enum HttpCode {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
}

const sendResponse = (
    response: http.ServerResponse,
    statusCode: HttpCode,
    message: string
) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>
  `.trim();

  response.statusCode = statusCode;
  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
};

const onClientConnect: http.RequestListener = async (
    request: http.IncomingMessage,
    response: http.ServerResponse
): Promise<void> => {
  const notFoundMessageText = `Not found`;

  switch (request.url) {
    case `/`: {
      let mockContent = `[]`;

      try {
        mockContent = await fs.readFile(PATH_TO_MOCKS, `utf-8`);
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      const publications: Publication[] = JSON.parse(mockContent);
      const message = publications
        .map((publication) => `<li>${publication.title}</li>`)
        .join(``);

      sendResponse(response, HttpCode.OK, `<ul>${message}</ul>`);
      break;
    }

    default: {
      sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
    }
  }
};

export const commandServer = {
  name: `--server` as const,
  async run(...args: string[]): Promise<void> {
    const port = Number.parseInt(args[0], 10);
    const isValid = !Number.isNaN(port);

    const serverPort = isValid
      ? port
      : DEFAULT_PORT;

    http.createServer(onClientConnect)
        .listen(serverPort, DEFAULT_HOST)
        .on(`listening`, (error: Error | undefined): void => {
          if (error !== undefined) {
            return print.error(`Ошибка при создании сервера: `, error);
          }

          return print.success(`Ожидаю соединений на ${DEFAULT_HOST}:${serverPort}`);
        });
  }
};
