import type { Question } from '@repo/types';
import table from '@airtable/table';

export const updateQuestion = async (id: string, question: Partial<Question>) => {
  const record = await table.update(id, question, {
    typecast: true,
  });
  return record;
};

export const bulkUpdateQuestions = async (ids: string[], question: Partial<Question>) => {
  const chunks = [];

  for (let i = 0; i < ids.length; i += 10) {
    chunks.push(ids.slice(i, i + 10).map((id) => ({ id, fields: question })));
  }

  const records = await Promise.all(
    chunks.map((chunk) =>
      table.update(
        chunk.map((q) => q),
        {
          typecast: true,
        },
      ),
    ),
  );

  return records.flat();
};
