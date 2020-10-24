import {print} from '@utils';
import {createAPIServer} from '@service/server';
import {ArticlesStorage} from '@service/services/articles-storage';
import {FileSystemStorage} from '@service/services/file-system-storage';
import {MOCK_FILE_PATH} from '@service/constants';
import {TArticle} from '@service/entities/articles';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = `localhost`;

export const commandServer = {
  name: `--server` as const,
  async run(port: string): Promise<void> {
    const serverPort = Number.parseInt(port, 10)
      ? Number.parseInt(port, 10)
      : DEFAULT_PORT;

    const articlesFileSystemStorage = new FileSystemStorage<TArticle>(MOCK_FILE_PATH);
    const articles = await articlesFileSystemStorage.load();
    const articlesStorage = new ArticlesStorage(articles);

    const apiServer = createAPIServer(articlesStorage);

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
