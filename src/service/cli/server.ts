import {print} from '@utils';
import {apiServer} from '@service/server';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = `localhost`;

export const commandServer = {
  name: `--server` as const,
  async run(port: string): Promise<void> {
    const serverPort = Number.parseInt(port, 10)
      ? Number.parseInt(port, 10)
      : DEFAULT_PORT;

    apiServer
      .listen(serverPort, DEFAULT_HOST)
      .on(`listening`, (error: Error | undefined): void => {
        if (error !== undefined) {
          return print.error(`Ошибка при создании API Server: Error: ${error}`);
        }

        return print.success(`API Server: ожидаю соединений на ${DEFAULT_HOST}:${serverPort}`);
      });
  }
};
