import React, { useEffect } from "react";
import yargs from "yargs";
import { any, flatten, isEmpty, isNil, reject } from "ramda";
import { useLogger } from "./useLogger";
import useCommandManager, { CommandHandlerGroup } from "./useCommandManager";
import { useDelayedLogger } from "./useDelayedLogger";

type Command = string | string[];

type Completion = {
  value: string;
  helpText: string;
};

function buildArgv(
  tokens: string[],
  commandHandlerGroups: CommandHandlerGroup[]
) {
  const commandBuilders = reject(
    isNil,
    commandHandlerGroups.map(({ commandBuilder }) => commandBuilder)
  );

  if (tokens[0] === "help") {
    tokens.shift();
    tokens.push("--help");
  }

  const baseArgv = yargs(tokens).scriptName("").help(false).version(false);

  return commandBuilders.reduce(
    (agg, commandBuilder) => commandBuilder(agg),
    baseArgv
  );
}

function tokenizeCommand(command: Command): string[] {
  return typeof command === "string" ? command.trim().split(/\ +/) : command;
}

function getTopCompletion(tokens: string[], completions: string[]) {
  return isEmpty(tokens) || isEmpty(tokens[0])
    ? null
    : (completions || [])
        .map((completion) => completion.split(":"))
        .map(([value, helpText]) => ({ value, helpText }))
        .find(({ value }) =>
          value.toLowerCase().startsWith(tokens.join(" ").toLowerCase())
        );
}

export function useRunCommand(command: Command) {
  const logger = useLogger();
  const delayedLogger = useDelayedLogger();
  const { commandHandlerGroups } = useCommandManager();
  const [completion, setCompletion] = React.useState<Completion | null>(null);
  const commandHandlers = commandHandlerGroups.map(
    ({ commandHandler }) => commandHandler
  );

  const customCompletions = reject(
    isNil,
    flatten(
      commandHandlerGroups.map(({ customCompletions }) => customCompletions)
    )
  );

  const tokens = tokenizeCommand(command);
  const argvP = buildArgv(tokens, commandHandlerGroups);
  const commandString =
    typeof command === "string" ? command : command.join(" ");

  useEffect(() => {
    argvP.getCompletion(tokens, (...args) => {
      // yargs types and docs are wrong
      const [_err, completions] = args as unknown as [Error | null, string[]];

      const allCompletions = [...customCompletions, ...completions];
      const topCompletion = getTopCompletion(tokens, allCompletions);

      if (topCompletion?.value !== completion?.value) {
        setCompletion(topCompletion || null);
      }
    });
  }, [command]);

  async function handleCommand(tokenString: string) {
    const argv = await argvP.argv;
    const isSuccess = any(
      (commandHandler) =>
        commandHandler(tokenString, {
          logger: delayedLogger,
          yargs: argvP,
          argv,
        }),
      commandHandlers
    );

    if (isSuccess) {
      logger.command(tokenString);
    } else {
      logger.error(`Invalid command: ${tokenString}`);
    }
  }

  async function runCommand() {
    const argv = await argvP.argv;
    const tokenString = argv._.map((el) => el.toString()).join(" ");
    handleCommand(tokenString);
  }

  async function runCompletion() {
    completion && handleCommand(completion.value);
  }

  return {
    runCommand,
    runCompletion,
    completion,
  };
}
