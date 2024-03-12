import { createQuestion, bulkUpdateQuestions, updateQuestion, searchQuestions } from '@airtable';
import table from '@airtable/table';
import type { QuestionInput, QuestionUpdate, QuestionAssigneeUpdate } from '@airtable/types';

const mockQuestion = {
  'Assigned To': 'john.doe@example.com',
  'Question': 'What is the capital of France?',
  'Answer': 'Paris',
  'Company Name': 'Test Company Limited',
  'Created At': '2021-01-01T00:00:00.000Z',
  'Created By': 'jane.doe@example.com',
  'Question Description': "I need to know the capital of France for a project I'm working on.",
  'Updated At': '2021-01-01T00:00:00.000Z',
  'Updated By': 'jane.doe@example.com',
  '_companyId': 1,
  'Properties': 'section:Policies,vendor:IBM',
} satisfies QuestionInput;

describe('Questions', () => {
  beforeEach(async () => {
    const records = await table.select({ fields: [] }).all();

    if (records.length > 0) {
      await table.destroy(records.map((record) => record.id));
    }
  });

  test('createQuestion should save new row to airtable', async () => {
    const question = await createQuestion(mockQuestion);

    const foundQuestion = await table.find(question.id);

    expect(foundQuestion.fields).toEqual({
      ...mockQuestion,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      _recordId: expect.any(Number),
    });
  });

  test('updateQuestion should update specified question', async () => {
    const question = await createQuestion(mockQuestion);

    await updateQuestion(question.id, {
      Answer: 'New Paris',
      Properties: 'section:Policies,vendor:IBM,region:Europe',
    } satisfies QuestionUpdate);

    const foundQuestion = await table.find(question.id);

    expect(foundQuestion.fields.Answer).toEqual('New Paris');
    expect(foundQuestion.fields.Properties).toEqual('section:Policies,vendor:IBM,region:Europe');
  });

  test('bulkUpdateQuestions should update multiple questions', async () => {
    const question1 = await createQuestion(mockQuestion);
    const question2 = await createQuestion(mockQuestion);

    await bulkUpdateQuestions([
      {
        'id': question1.id,
        'Assigned To': 'jane.doe@example.com',
      },
      {
        'id': question2.id,
        'Assigned To': 'james.doe@example.com',
      },
    ] satisfies QuestionAssigneeUpdate);

    const foundQuestion1 = await table.find(question1.id);
    const foundQuestion2 = await table.find(question2.id);

    expect(foundQuestion1.fields['Assigned To']).toEqual('jane.doe@example.com');
    expect(foundQuestion2.fields['Assigned To']).toEqual('james.doe@example.com');
  });

  test('searchQuestions should return all questions if no query parameter is set', async () => {
    const question1 = await createQuestion(mockQuestion);
    const question2 = await createQuestion(mockQuestion);

    const questions = await searchQuestions();

    expect(questions).toEqual(expect.arrayContaining([question1, question2]));
  });

  test('searchQuestions should only return questions that have the assignee in the query', async () => {
    await createQuestion(mockQuestion);
    const question2 = await createQuestion({
      ...mockQuestion,
      'Assigned To': 'jane.doe@example.com',
    });

    const questions = await searchQuestions({ 'Assigned To': 'jane.doe@example.com' });

    expect(questions).toEqual([question2]);
  });

  test('searchQuestions should only return questions that contain the property inside the query', async () => {
    await createQuestion(mockQuestion);
    const question2 = await createQuestion({
      ...mockQuestion,
      Properties: 'section:Policies,vendor:IBM,region:Europe',
    });

    const questions = await searchQuestions({ Properties: 'region:Europe' });

    expect(questions).toEqual([question2]);
  });

  test('searchQuestions should only return questions that have questions or answers similar to the query string', async () => {
    await createQuestion(mockQuestion);
    const question2 = await createQuestion({
      ...mockQuestion,
      Question: 'Is pizza a vegetable?',
      Answer: 'No, pizza is not a vegetable.',
    });
    const question3 = await createQuestion({
      ...mockQuestion,
      Question: 'Is a vegan diet healthy?',
      Answer: 'Yes, a vegan diet can be healthy.',
    });

    const questions = await searchQuestions({ query: 'veggie' });

    expect(questions).toEqual([question2, question3]);
  });
});
