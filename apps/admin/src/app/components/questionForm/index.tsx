import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Question } from '@privasee_task/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type QuestionFormType = Pick<Question, 'Question' | 'Assigned To' | 'Properties' | 'Answer' | 'Question Description'>;

interface Props {
  type: 'create' | 'update';
  defaultValues: Partial<QuestionFormType>;
  action: (data: QuestionFormType) => Promise<void>;
  onDelete?: () => void;
  deletePending?: boolean;
}

const QuestionForm: FC<PropsWithChildren<Props>> = ({ type, defaultValues, action, onDelete, deletePending, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormType>({
    defaultValues,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation<unknown, AxiosError, QuestionFormType>({
    mutationFn: async (data) => {
      await action({
        ...data,
        'Assigned To': data['Assigned To'] || undefined,
      });

      await queryClient.invalidateQueries({ queryKey: ['questions'] });

      navigate('/');
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={() => void onSubmit()}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 20 }}>
        <Typography sx={{ fontSize: 32 }} variant="h1">
          {type === 'create' ? 'Create a question' : 'Edit question'}
        </Typography>

        {children}

        {error ? <Typography sx={{ color: '#ef4444' }}>{error.message}</Typography> : null}

        <Box>
          <TextField
            label="Question (required)"
            sx={{ width: '100%' }}
            variant="outlined"
            {...register('Question', { required: 'Question is required' })}
            disabled={type === 'update'}
          />
          <Typography sx={{ color: '#ef4444' }}>{errors.Question?.message}</Typography>
        </Box>

        <TextField label="Answer" variant="outlined" {...register('Answer')} />
        <TextField label="Assigned to" variant="outlined" {...register('Assigned To')} type="email" />
        <TextField label="Description" variant="outlined" {...register('Question Description')} disabled={type === 'update'} />
        <TextField label="Properties" variant="outlined" {...register('Properties')} />

        <Button disabled={isPending || deletePending} sx={{ width: 240, alignSelf: 'center' }} type="submit" variant="contained">
          {type === 'create' ? <>{isPending ? 'Creating...' : 'Create'}</> : <>{isPending ? 'Updating...' : 'Update'}</>}
        </Button>

        {type === 'update' && onDelete ? (
          <Button
            disabled={isPending || deletePending}
            onClick={onDelete}
            sx={{ bgcolor: '#ef4444', width: 240, alignSelf: 'center' }}
            variant="contained"
          >
            {deletePending ? 'Deleting...' : 'Delete'}
          </Button>
        ) : null}
      </Box>
    </form>
  );
};

export default QuestionForm;
