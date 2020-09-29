import {print} from '@utils';
import packageJSON from '../../../package.json';

export const commandVersion = {
  name: `--version` as const,
  async run(): Promise<void> {
    print.info(`v${packageJSON.version}`);
  }
};
