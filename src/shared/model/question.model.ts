import { Language } from '../enumeration/language';
import { QuestionType } from '../enumeration/questionType';

export interface INewQuestion {
  question: string;
  answer: string;
  type?: QuestionType;
  lang?: Language;
}

export interface IQuestion extends INewQuestion {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: string;
}
