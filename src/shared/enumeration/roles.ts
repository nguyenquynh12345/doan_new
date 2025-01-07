export enum Roles {
  INVESTOR = 'investor',
  LEADER = 'leader',
  EXPERT = 'expert',
  HOLDING_DIRECTOR = 'holding_director',
  NATIONAL_DIRECTOR = 'national_director',
  SYSTEM_ADMIN = 'system_admin',
}

export const RolessArray: Roles[] = [Roles.SYSTEM_ADMIN, Roles.HOLDING_DIRECTOR, Roles.NATIONAL_DIRECTOR];

export const mapRolesToString: { [key in Roles]: string } = {
  [Roles.INVESTOR]: 'enum.role.investor',
  [Roles.LEADER]: 'enum.role.leader',
  [Roles.EXPERT]: 'enum.role.expert',
  [Roles.HOLDING_DIRECTOR]: 'enum.role.holding',
  [Roles.NATIONAL_DIRECTOR]: 'enum.role.national_director',
  [Roles.SYSTEM_ADMIN]: 'enum.role.admin',
};
