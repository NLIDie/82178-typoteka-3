import {print} from "@utils";

const MESSAGE = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
    --server <port>       запускает сервер
`;

export const commandHelp = {
  name: `--help` as const,
  async run(): Promise<void> {
    print.log(MESSAGE);
  }
};
