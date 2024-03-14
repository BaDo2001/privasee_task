import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import { updateQuestion } from '@/api';
import type { QuestionFormType } from '@/components/questionForm';
import QuestionForm from '@/components/questionForm';
import { useQuestionContext } from '@/contexts/QuestionContext';

const EditQuestion: FC = () => {
  const { getQuestion } = useQuestionContext();

  const { id } = useParams();

  const question = getQuestion(id);

  if (!id || !question) {
    return (
      <Typography sx={{ fontSize: 24 }} variant="h2">
        Question not found
      </Typography>
    );
  }

  const action = async (data: QuestionFormType) => {
    await updateQuestion(id, data);
  };

  return <QuestionForm action={action} defaultValues={question} type="update" />;
};

export default EditQuestion;
