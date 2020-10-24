import {promises as fs} from 'fs';
import path from 'path';
import {print} from '@utils';

const MOCK_FILE_PATH = path.resolve(__dirname, `../../../mocks.json`);

class MockData<D> {
  private _data: D[] | null = null;
  private _filePath: string;

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  public async load(): Promise<D[]> {
    if (this._data !== null) {
      return this._data;
    }

    const fileContent = await this._readFile();
    this._data = this._parseContentFile(fileContent);

    return this._data;
  }

  public async save(data: D[]): Promise<void> {
    return this._writeFile(data);
  }

  private async _writeFile(data: D[]): Promise<void> {
    const content = JSON.stringify(data, undefined, 2);

    try {
      await fs.writeFile(this._filePath, content, `utf-8`);
    } catch (err) {
      print.error(`Не удалось записать данные в файл "${this._filePath}". `, err);
    }
  }

  private async _readFile(): Promise<string> {
    let content = `[]`;

    try {
      content = await fs.readFile(this._filePath, `utf-8`);
    } catch (err) {
      print.error(`Не удалось прочитать файл "${this._filePath}". `, err);
    }

    return content;
  }

  private _parseContentFile(content: string): D[] {
    let data: D[] = [];

    try {
      data = JSON.parse(content) as D[];
    } catch (err) {
      print.error(`Не удалось преобразовать данные из файла. `, err);
    }

    return data;
  }
}

export const mockData = new MockData(MOCK_FILE_PATH);
