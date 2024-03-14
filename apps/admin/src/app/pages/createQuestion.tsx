import React from 'react';
import { createQuestion } from '../../lib/api';
import QuestionForm, { QuestionFormType } from '../components/questionForm';

const CreateQuestion = () => {
  const action = async (data: QuestionFormType) => {
    await createQuestion({
      ...data,
      'Assigned To': data['Assigned To'] || undefined,
      'Company Name': 'Test Company',
      '_companyId': 1,
      'Created At': new Date().toISOString(),
      'Updated At': new Date().toISOString(),
      'Created By': 'test@example.com',
      'Updated By': 'test@example.com',
    });
  };

  return <QuestionForm type="create" defaultValues={{}} action={action} />;
};

export default CreateQuestion;
