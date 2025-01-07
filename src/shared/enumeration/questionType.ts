export enum QuestionType {
  QA_EXPERT = 'QA_EXPERT',
  QA_LEADER = 'QA_LEADER',
  QA_INVESTOR = 'QA_INVESTOR',
  FAQ = 'FAQ',
}

export const questionTypeArray: QuestionType[] = [
  QuestionType.QA_EXPERT,
  QuestionType.QA_LEADER,
  QuestionType.QA_INVESTOR,
  QuestionType.FAQ,
];

export const mapQuestionType: { [key in QuestionType]: string } = {
  [QuestionType.QA_EXPERT]: 'enum.questionType.qa_expert',
  [QuestionType.QA_LEADER]: 'enum.questionType.qa_leader',
  [QuestionType.QA_INVESTOR]: 'enum.questionType.qa_investor',
  [QuestionType.FAQ]: 'enum.questionType.faq',
};
