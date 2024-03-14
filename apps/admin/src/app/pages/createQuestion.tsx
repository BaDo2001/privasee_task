import React from 'react';
import { createQuestion } from '@/api';
import QuestionForm, { QuestionFormType } from '@/components/questionForm';

const CreateQuestion = () => {
  const action = async (data: QuestionFormType) => {
    await createQuestion({
      ...data,
      'Assigned To': data['Assigned To'] || undefined,
      'Company Name': 'Test Company',
      '_companyId': 1,
    });
  };

  return <QuestionForm type="create" defaultValues={{}} action={action} />;
};

export default CreateQuestion;
