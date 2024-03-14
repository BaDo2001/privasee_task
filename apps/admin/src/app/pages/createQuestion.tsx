import React from 'react';

import { createQuestion } from '@/api';
import type { QuestionFormType } from '@/components/questionForm';
import QuestionForm from '@/components/questionForm';

const CreateQuestion = () => {
  const action = async (data: QuestionFormType) => {
    await createQuestion({
      ...data,
      'Assigned To': data['Assigned To'] || undefined,
      'Company Name': 'Test Company',
      '_companyId': 1,
    });
  };

  return <QuestionForm action={action} defaultValues={{}} type="create" />;
};

export default CreateQuestion;
