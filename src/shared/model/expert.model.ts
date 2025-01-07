import { Experience } from '../enumeration/experience';

export interface IApplyExpert {
  field: string;
  degree: string;
  exp: Experience | undefined;
  resume: string;
  socialLink: string;
  blogLink1: string;
  blogLink2: string;
  blogLink3: string;
  blogLink: string[];
  org: string;
  orgPhone: string;
  orgMail: string;
  orgWebsite: string;
  orgAddress: string;
}
