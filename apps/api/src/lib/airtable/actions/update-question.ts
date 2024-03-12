import table from "@airtable/table";
import type { Question, QuestionAssigneeUpdate } from "@airtable/types";

export const updateQuestion = async (
  id: string,
  question: Partial<Question>,
) => {
  const record = await table.update(id, question, {
    typecast: true,
  });
  return record;
};

export const bulkUpdateQuestions = async (
  questions: QuestionAssigneeUpdate,
) => {
  const chunks = [];

  for (let i = 0; i < questions.length; i += 10) {
    chunks.push(questions.slice(i, i + 10));
  }

  const records = await Promise.all(
    chunks.map((chunk) =>
      table.update(
        chunk.map((q) => ({
          id: q.id,
          fields: {
            "Assigned To": q["Assigned To"],
          },
        })),
        {
          typecast: true,
        },
      ),
    ),
  );

  return records.flat();
};
