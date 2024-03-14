import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { updateQuestion } from '../../lib/api';
import { useParams } from 'react-router-dom';
import { useQuestionContext } from '../contexts/QuestionContext';
import QuestionForm, { QuestionFormType } from '../components/questionForm';

const EditQuestion: FC = () => {
  const { getQuestion } = useQuestionContext();

  const { id } = useParams();

  const question = getQuestion(id);

  if (!id || !question) {
    return (
      <Typography variant="h2" sx={{ fontSize: 24 }}>
        Question not found
      </Typography>
    );
  }

  const action = async (data: QuestionFormType) => {
    await updateQuestion(id, data);
  };

  return <QuestionForm type="update" defaultValues={question} action={action} />;
};

export default EditQuestion;
