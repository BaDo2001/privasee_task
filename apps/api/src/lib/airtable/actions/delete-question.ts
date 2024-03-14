import table from '@/airtable/table';

export const deleteQuestion = async (id: string): Promise<void> => {
  await table.destroy(id);
};
