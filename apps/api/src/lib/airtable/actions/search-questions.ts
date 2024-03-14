import type { Question, QuestionSearch } from '@privasee_task/types';
import { QuestionSearchResult } from '@privasee_task/types';
import Fuse from 'fuse.js';

import table from '@/airtable/table';

const createPropertyFilter = (query: QuestionSearch) => {
  if (!query.Properties) {
    return 'TRUE()';
  }

  return `OR(${query.Properties.split(',')
    .map((property) => `FIND(LOWER('${property}'), LOWER({Properties})) > 0`)
    .join(',')})`;
};

const createAssigneeFilter = (query: QuestionSearch) => {
  if (!query['Assigned To']) {
    return 'TRUE()';
  }

  if (query['Assigned To'].type === 'unassigned') {
    return 'LEN({Assigned To}) = 0';
  }

  return `FIND(LOWER('${query['Assigned To'].value}'), LOWER({Assigned To})) > 0`;
};

const createFilterFormula = (query: QuestionSearch) => {
  const filters = [createAssigneeFilter(query), createPropertyFilter(query)];

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
