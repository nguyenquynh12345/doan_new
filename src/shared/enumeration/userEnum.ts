export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export const genderArray: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];

export const mapGenderToText: { [key in Gender]: string } = {
  [Gender.MALE]: 'app.profile.male',
  [Gender.FEMALE]: 'app.profile.female',
  [Gender.OTHER]: 'app.profile.other',
};

// const mapGenderToString:{[key in Gender]:string} ={}

export enum UserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}
