import Fuse from 'fuse.js';
import type { Question, QuestionSearch } from '@repo/types';
import { QuestionSearchResult } from '@repo/types';
import table from '@airtable/table';

const createFilterFormula = (query: QuestionSearch) => {
  const proprtiesFilter = query.Properties
    ? `OR(${query.Properties.split(',')
        .map((property) => `FIND(LOWER('${property}'), LOWER({Properties})) > 0`)
        .join(',')})`
    : 'TRUE()';

  const filters = [query['Assigned To'] ? `FIND(LOWER('${query['Assigned To']}'), LOWER({Assigned To})) > 0` : 'TRUE()', proprtiesFilter];

  return `AND(${filters.join(',')})`;
};

export const searchQuestions = async (query: QuestionSearch = {}): Promise<Question[]> => {
  const results = await table
    .select({
      filterByFormula: createFilterFormula(query),
      sort: [{ field: '_recordId', direction: 'desc' }],
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
