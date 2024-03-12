import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createQuestion, bulkUpdateQuestions, updateQuestion } from '@airtable';
import { QuestionUpdate, QuestionAssigneeUpdate, QuestionInput } from '@airtable/types';

const questionRouter = Router();

questionRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const parsedData = await QuestionInput.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      // TODO: Get the user from the request and set Created By and Updated By fields accordingly, also set Created At and Updated At fields

      const data = await createQuestion(parsedData.data);

      req.log.info({ id: data.id }, 'Question created');

      res.status(201).json({ message: 'Question created', id: data.id });
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

questionRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const parsedData = await QuestionUpdate.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      // TODO: Get the user from the request and set Updated By fields accordingly, also set Updated At fields

      await updateQuestion(id, parsedData.data);

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
      const parsedData = await QuestionAssigneeUpdate.safeParseAsync(req.body);

      if (!parsedData.success) {
        req.log.error(parsedData.error);

        res.status(400).json(parsedData.error);
        return;
      }

      // TODO: Get the user from the request and set Updated By fields accordingly, also set Updated At fields

      await bulkUpdateQuestions(parsedData.data);

      req.log.info('Question assignee updated');

      res.status(200).json({ message: 'Question assigned' });
    } catch (error) {
      req.log.error(error);

      res.status(500).json({ message: 'Internal Server Error' });
    }
  }),
);

export { questionRouter };
