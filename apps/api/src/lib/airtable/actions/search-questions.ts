import Fuse from 'fuse.js';
import table from '@airtable/table';
import type { Question, QuestionSearch } from '@airtable/types';
import { QuestionSearchResult } from '@airtable/types';

const createFilterFormula = (query: QuestionSearch) => {
  const filters = [
    query['Assigned To'] ? `FIND(LOWER('${query['Assigned To']}'), LOWER({Assigned To})) > 0` : 'TRUE()',
    query.Properties ? `FIND(LOWER('${query.Properties}'), LOWER({Properties})) > 0` : 'TRUE()',
  ];

  return `AND(${filters.join(',')})`;
};

export const searchQuestions = async (query: QuestionSearch = {}): Promise<Question[]> => {
  const results = await table
    .select({
      filterByFormula: createFilterFormula(query),
    })
    .all();

  const data = await QuestionSearchResult.safeParseAsync(
    results.map((record) => ({
      ...record.fields,
      id: record.id,
    })),
  );

  if (!data.success) {
    throw data.error;
  }

  if (!query.query) {
    return data.data;
  }

  const fuse = new Fuse<Question>(data.data, {
    keys: ['Question', 'Answer'],
    includeScore: true,
  });

  return fuse.search(query.query).map((result) => result.item);
};
