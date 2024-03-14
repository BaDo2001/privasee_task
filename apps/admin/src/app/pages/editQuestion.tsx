import type { FC } from 'react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteQuestion, updateQuestion } from '@/api';
import type { QuestionFormType } from '@/components/questionForm';
import QuestionForm from '@/components/questionForm';
import { useQuestionContext } from '@/contexts/QuestionContext';

const EditQuestion: FC = () => {
  const {
    getQuestion,
    questions: { isLoading },
  } = useQuestionContext();

  const { id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      if (!id) {
        return;
      }

      await deleteQuestion(id);

      await queryClient.invalidateQueries({ queryKey: ['questions'] });

      navigate('/');
    },
  });

  if (isLoading) {
    return <CircularProgress sx={{ mx: 'auto' }} />;
  }

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

  const onDelete = () => {
    mutate();
  };

  return (
    <Box>
      <QuestionForm action={action} defaultValues={question} deletePending={isPending} onDelete={onDelete} type="update">
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Created by:</span> {question['Created By']}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Created at:</span> {new Date(question['Created At']).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Updated by:</span> {question['Updated By']}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold' }}>Updated at:</span> {new Date(question['Updated At']).toLocaleString()}
          </Typography>
        </Box>
      </QuestionForm>
    </Box>
  );
};

export default EditQuestion;
