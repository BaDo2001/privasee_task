import type { FC } from 'react';
import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { QuestionAssigneeUpdate } from '@privasee_task/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useBoolean } from 'usehooks-ts';

import { updateAssignee } from '@/api';
import { useQuestionContext } from '@/contexts/QuestionContext';

const AssigneeModal: FC = () => {
  const { value: showModal, setTrue: openModal, setFalse: closeModal } = useBoolean(false);
  const { selected, clearSelected } = useQuestionContext();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation<unknown, AxiosError, QuestionAssigneeUpdate>({
    mutationFn: async (data) => {
      await updateAssignee(data);

      await queryClient.invalidateQueries({ queryKey: ['questions'] });

      clearSelected();
      closeModal();
    },
  });

  const numSelected = selected.length;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const assignee = new FormData(event.currentTarget).get('assignee') as string;

    await mutateAsync({
      'ids': selected,
      'Assigned To': assignee,
    });
  };

  return (
    <>
      {numSelected > 0 && (
        <Button color="primary" onClick={openModal} variant="contained">
          Assign {numSelected} question{numSelected > 1 ? 's' : ''}
        </Button>
      )}
      <Dialog PaperProps={{ onSubmit, component: 'form' }} onClose={closeModal} open={showModal}>
        <DialogTitle>Assign questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign {numSelected} question{numSelected > 1 ? 's' : ''} to an assignee. Leave blank to unassign.
          </DialogContentText>

          {error ? <Typography sx={{ color: '#ef4444' }}>{error.message}</Typography> : null}

          <TextField fullWidth id="assignee" label="Assignee" name="assignee" sx={{ mt: 2 }} type="email" variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button disabled={isPending} onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssigneeModal;
