import {cliCommandGenerate} from './generate';
import {cliCommandVersion} from './version';
import {cliCommandHelp} from './help';

export const processCLICommands = async (userArgs: string[]): Promise<void> => {
  const [commandName, commandValue] = userArgs;

  switch (commandName) {
    case cliCommandVersion.name: {
      cliCommandVersion.run();
      break;
    }

    case cliCommandGenerate.name: {
      const count = parseInt(commandValue, 10);
      const isValid = Boolean(count);

      cliCommandGenerate.run(isValid ? count : undefined);
      break;
    }

    default: {
      cliCommandHelp.run();
    }
  }
};
