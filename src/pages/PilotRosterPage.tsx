import React, { useEffect } from "react";
import { Box } from "ink";
import PilotPreview from "../PilotPreview";
import { useCompconData } from "../hooks/useCompconData";
import Header from "../Header";
import useRegisterCommands from "../hooks/useRegisterCommands";
import { CommandHandler } from "../hooks/useCommandManager";
import { useLogger } from "../hooks/useLogger";
import { find } from "ramda";
import { useRouter } from "../Router";

const PilotRosterPage: React.FC = () => {
  const compconData = useCompconData();
  const logger = useLogger();
  const { goTo } = useRouter();

  const pilotCallsigns = compconData.pilots.map((pilot) => pilot.callsign);
  const pilotNames = compconData.pilots.map((pilot) => pilot.name);
  const customCompletions = [...pilotCallsigns, ...pilotNames];

  const commandHandler: CommandHandler = (token: string) => {
    const matchingPilot = find(
      (pilot) => pilot.name === token || pilot.callsign === token,
      compconData.pilots
    );

    if (matchingPilot) {
      goTo([{ name: "pilot-details", pilotId: matchingPilot.id }]);
      return true;
    }

    return false;
  };

  useRegisterCommands({ commandHandler, customCompletions });

  useEffect(() => {
    logger.info("Input pilot name or callsign:");
  }, []);

  return (
    <Box alignItems="flex-start" flexGrow={1} flexDirection="column">
      <Box
        alignSelf="flex-end"
        marginBottom={2}
        width="100%"
        height="100%"
        position="absolute"
        justifyContent="center"
        alignItems="center"
      >
        <Header
          text="P I  L O T S"
          dimColor
          color="blackBright"
          font="colossal"
        />
      </Box>

      <Box>
        {compconData.pilots.map((pilot) => (
          <PilotPreview pilot={pilot} key={pilot.id} />
        ))}
      </Box>
    </Box>
  );
};

export default PilotRosterPage;