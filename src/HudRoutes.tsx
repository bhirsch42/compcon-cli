import React from "react";
import { Route, useRouter } from "./Router";
import Compendium from "./Compendium";
import PilotRosterPage from "./pages/PilotRosterPage";
import { CommandBuilder, CommandHandler } from "./hooks/useCommandManager";
import useRegisterCommands from "./hooks/useRegisterCommands";
import PilotDetailsPage from "./pages/PilotDetailsPage";
import MechDetailsPage from "./pages/MechDetailsPage";

const commandBuilder: CommandBuilder = (argv) => {
  return argv
    .command("compendium", "Open the compendium", {})
    .command("pilots", "Open the pilot roster", {});
};

const Routes: React.FC = () => {
  const { goTo } = useRouter();

  const commandHandler: CommandHandler = (token: string, { logger }) => {
    switch (token) {
      case "compendium":
        goTo([{ name: "compendium" }]);
        logger.info("Opening compendium.");
        return true;
      case "pilots":
        goTo([{ name: "pilot-roster" }]);
        logger.info("Opening pilot roster.");
        return true;
      default:
        return false;
    }
  };

  useRegisterCommands({ commandHandler, commandBuilder });

  return (
    <>
      <Route path="pilot-roster">
        <PilotRosterPage />
      </Route>
      <Route path="compendium">
        <Compendium />
      </Route>
      <Route path="pilot-details">
        <PilotDetailsPage />
      </Route>
      <Route path="mech-details">
        <MechDetailsPage />
      </Route>
    </>
  );
};

export default Routes;
