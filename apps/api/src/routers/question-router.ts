import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { QuestionUpdate, QuestionAssigneeUpdate, QuestionSearch, BaseQuestionInput } from '@repo/types';
import { createQuestion, bulkUpdateQuestions, updateQuestion, searchQuestions } from '@airtable';

const questionRouter = Router();

questionRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const parsedData = await QuestionSearch.safeParseAsync(req.query);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      const data = await searchQuestions(parsedData.data);

      res.status(200).json(data);
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

questionRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const parsedData = await BaseQuestionInput.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      const user = req.auth.claims?.email;

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const data = await createQuestion({
        ...parsedData.data,
        'Created By': user,
        'Updated By': user,
        'Created At': new Date().toISOString(),
        'Updated At': new Date().toISOString(),
      });

      req.log.info({ id: data.id }, 'Question created');

      res.status(201).json({ message: 'Question created', id: data.id });
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

questionRouter.patch(
  '/update/:id',
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const parsedData = await QuestionUpdate.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      const user = req.auth.claims?.email;

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      await updateQuestion(id, {
        ...parsedData.data,
        'Updated By': user,
        'Updated At': new Date().toISOString(),
      });

      req.log.info({ id }, 'Question answer updated');

      res.status(200).json({ message: 'Question answered' });
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

questionRouter.patch(
  '/assignee',
  asyncHandler(async (req, res) => {
    try {
      console.log('req.body', req.body);

      const parsedData = await QuestionAssigneeUpdate.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      const user = req.auth.claims?.email;

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      await bulkUpdateQuestions(parsedData.data.ids, {
        'Assigned To': parsedData.data['Assigned To'],
        'Updated By': user,
        'Updated At': new Date().toISOString(),
      });

      req.log.info('Question assignee updated');

      res.status(200).json({ message: 'Question assigned' });
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

export { questionRouter };
