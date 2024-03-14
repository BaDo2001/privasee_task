import * as z from 'zod';

export const BaseQuestionInput = z.object({
  'Company Name': z.string(),
  '_companyId': z.number(),
  'Question': z.string(),
  'Answer': z.string().default(''),
  'Assigned To': z.string().email().optional(),
  'Properties': z.string().default(''),
  'Question Description': z.string().default(''),
});

export type BaseQuestionInput = z.infer<typeof BaseQuestionInput>;

export const QuestionInput = BaseQuestionInput.extend({
  'Created At': z.string().datetime(),
  'Created By': z.string().email(),
  'Updated At': z.string().datetime(),
  'Updated By': z.string().email(),
});

export type QuestionInput = z.infer<typeof QuestionInput>;

export const Question = QuestionInput.extend({
  id: z.string(),
  _recordId: z.number(),
});

export type Question = z.infer<typeof Question>;

export const QuestionUpdate = z.object({
  'Answer': z.string().optional(),
  'Properties': z.string().optional(),
  'Assigned To': z.string().email().optional(),
});

export type QuestionUpdate = z.infer<typeof QuestionUpdate>;

export const QuestionAssigneeUpdate = z.object({
  'ids': z.array(z.string()),
  'Assigned To': z
    .string()
    .email()
    .transform((v) => v || '')
    .optional(),
});

export type QuestionAssigneeUpdate = z.infer<typeof QuestionAssigneeUpdate>;

export const QuestionSearch = z.object({
  'Assigned To': z.string().email().optional(),
  'Properties': z.string().optional(),
  'query': z.string().optional(),
});

export type QuestionSearch = z.infer<typeof QuestionSearch>;

export const QuestionSearchResult = z.array(Question);
