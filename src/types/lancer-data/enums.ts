export enum Duration {
  Free = "Free",
  Turn = "Turn",
  NextTurn = "Next Turn",
  Round = "Round",
  NextRound = "Next Round",
  Scene = "Scene",
  Encounter = "Encounter",
  Mission = "Mission",
}

export enum ActivationType {
  None = "None",
  Free = "Free",
  Passive = "Passive",
  Protocol = "Protocol",
  Move = "Move",
  Quick = "Quick",
  Full = "Full",
  Invade = "Invade",
  FullTech = "Full Tech",
  QuickTech = "Quick Tech",
  Reaction = "Reaction",
  Other = "Other",
}

export enum MountType {
  Main = "Main",
  Heavy = "Heavy",
  AuxAux = "Aux/Aux",
  Aux = "Aux",
  MainAux = "Main/Aux",
  Flex = "Flex",
  Integrated = "Integrated",
}

// governs what can be added to a mount (weapon slot)
export enum FittingSize {
  Auxiliary = "Auxiliary",
  Main = "Main",
  Flex = "Flex",
  Heavy = "Heavy",
  Integrated = "Integrated",
}

export enum WeaponSize {
  Aux = "Auxiliary",
  Main = "Main",
  Heavy = "Heavy",
  Superheavy = "Superheavy",
}

export enum WeaponType {
  Rifle = "Rifle",
  Cannon = "Cannon",
  Launcher = "Launcher",
  CQB = "CQB",
  Nexus = "Nexus",
  Melee = "Melee",
  All = "???",
}

export enum ItemType {
  None = "",
  Action = "Action",
  CoreBonus = "CoreBonus",
  Frame = "Frame",
  PilotArmor = "PilotArmor",
  PilotWeapon = "PilotWeapon",
  PilotGear = "PilotGear",
  Skill = "Skill",
  Talent = "Talent",
  Tag = "Tag",
  MechWeapon = "MechWeapon",
  MechSystem = "MechSystem",
  WeaponMod = "WeaponMod",
  SystemMod = "SystemMod",
  NpcFeature = "NpcFeature",
}

export enum SystemType {
  System = "System",
  AI = "AI",
  Shield = "Shield",
  Deployable = "Deployable",
  Drone = "Drone",
  Tech = "Tech",
  Armor = "Armor",
  FlightSystem = "Flight System",
  Integrated = "Integrated",
  Mod = "Mod",
}

export enum SkillFamily {
  str = "str",
  dex = "dex",
  int = "int",
  cha = "cha",
}

export enum RangeType {
  Range = "Range",
  Threat = "Threat",
  Thrown = "Thrown",
  Line = "Line",
  Cone = "Cone",
  Blast = "Blast",
  Burst = "Burst",
}

export enum DamageType {
  Kinetic = "Kinetic",
  Energy = "Energy",
  Explosive = "Explosive",
  Heat = "Heat",
  Burn = "Burn",
  Variable = "Variable",
}

export enum MechType {
  Balanced = "Balanced",
  Artillery = "Artillery",
  Striker = "Striker",
  Controller = "Controller",
  Support = "Support",
  Defender = "Defender",
}

export enum HASE {
  H = "hull",
  A = "agi",
  S = "sys",
  E = "eng",
}

export enum ReserveType {
  Resources = "Resources",
  Tactical = "Tactical",
  Mech = "Mech",
  Project = "Project",
  Organization = "Organization",
}

export enum OrgType {
  Military = "Military",
  Scientific = "Scientific",
  Academic = "Academic",
  Criminal = "Criminal",
  Humanitarian = "Humanitarian",
  Industrial = "Industrial",
  Entertainment = "Entertainment",
  Political = "Political",
}

export enum EncounterSide {
  Enemy = "Enemy",
  Ally = "Ally",
  Neutral = "Neutral",
}

export enum ImageTag {
  Pilot = "pilot",
  NPC = "npc",
  Enemy = "enemy",
  Frame = "frame",
  Mech = "mech",
  Map = "map",
  Location = "location",
  Object = "object",
  Logo = "logo",
  Misc = "misc",
}

export enum DeployableType {
  Deployable = "Deployable",
  Drone = "Drone",
  Mine = "Mine",
}
