import {commandGenerate} from './generate';
import {commandVersion} from './version';
import {commandHelp} from './help';
import {commandServer} from './server';

type CommandName =
  | typeof commandGenerate.name
  | typeof commandVersion.name
  | typeof commandHelp.name
  | typeof commandServer.name;

type CLICommand = {
  name: CommandName;
  run: (...args: string[]) => Promise<void>;
}

const CLICommands: Record<CommandName, CLICommand> = {
  [commandGenerate.name]: commandGenerate,
  [commandVersion.name]: commandVersion,
  [commandHelp.name]: commandHelp,
  [commandServer.name]: commandServer
};

const DEFAULT_COMMAND = commandHelp;

export const processCLICommands = async (userArgs: string[]): Promise<void> => {
  const [commandName, ...commandValue] = userArgs;

  const command = CLICommands[commandName as CommandName] ?? DEFAULT_COMMAND;

  command.run(...commandValue);
};
