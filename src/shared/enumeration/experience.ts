export enum Experience {
  LessThan5 = 'LessThan5',
  Between5And10 = 'Between5And10',
  Between10And20 = 'Between10And20',
  GreaterThan20 = 'GreaterThan20',
}

export const experienceArray: Experience[] = [
  Experience.LessThan5,
  Experience.Between5And10,
  Experience.Between10And20,
  Experience.GreaterThan20,
];

export const mapExperience: { [key in Experience]: string } = {
  [Experience.LessThan5]: '<5',
  [Experience.Between5And10]: '5 - 10',
  [Experience.Between10And20]: '10 - 20',
  [Experience.GreaterThan20]: '>20',
};
