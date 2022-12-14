import { Box, Text } from "ink";
import React from "react";
import { find, propEq } from "ramda";
import TypeyText from "./TypeyText";
import lancerData from "./types/lancer-data";
import { EquipmentData } from "./types/lancer-data/mech/Equipment";

const { pilot_gear } = lancerData;

function getPilotGearRule(pilotGear: EquipmentData) {
  const pilotGearRule = find(propEq("id", pilotGear.id), pilot_gear);

  if (!pilotGearRule) {
    throw new Error(`Couldn't look up pilot gear: ${pilotGear.id}`);
  }

  return pilotGearRule;
}

const PilotGear: React.FC<{ pilotGear: EquipmentData | null }> = ({
  pilotGear,
}) => {
  if (!pilotGear) {
    return (
      <Box paddingX={1} flexDirection="column">
        <Text italic dimColor>
          Empty Slot
        </Text>
      </Box>
    );
  }

  const pilotGearRule = getPilotGearRule(pilotGear);

  return (
    <Box flexDirection="column">
      <TypeyText>{pilotGearRule.name}</TypeyText>
      <Box marginLeft={2} flexDirection="column">
        {pilotGearRule.damage && (
          <TypeyText>
            Damage:{" "}
            {pilotGearRule.damage
              .map((damage) => `${damage.type} (${damage.val})`)
              ?.join(", ")}
          </TypeyText>
        )}
        {pilotGearRule.range && (
          <TypeyText>
            Range:{" "}
            {pilotGearRule.range.map((range) => `${range.val}`)?.join(", ")}
          </TypeyText>
        )}
        {pilotGearRule.description && (
          <TypeyText dimColor>{pilotGearRule.description}</TypeyText>
        )}
      </Box>
    </Box>
  );
};

export default PilotGear;
