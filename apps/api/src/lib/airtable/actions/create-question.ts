import type { QuestionInput } from '@repo/types';
import { Question } from '@repo/types';
import table from '@airtable/table';

export const createQuestion = async (question: QuestionInput): Promise<Question> => {
  const record = await table.create(question, {
    typecast: true,
  });

  const result = await Question.safeParseAsync({
    ...record.fields,
    id: record.id,
  });

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};
