import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { useQuestionContext } from '@/contexts/QuestionContext';
import Dialog from '@mui/material/Dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QuestionAssigneeUpdate } from '@repo/types';
import { updateAssignee } from '@/api';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

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
        <Button color="primary" variant="contained" onClick={openModal}>
          Assign {numSelected} question{numSelected > 1 ? 's' : ''}
        </Button>
      )}
      <Dialog open={showModal} onClose={closeModal} PaperProps={{ onSubmit, component: 'form' }}>
        <DialogTitle>Assign questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign {numSelected} question{numSelected > 1 ? 's' : ''} to an assignee. Leave blank to unassign.
          </DialogContentText>

          {error && <Typography sx={{ color: '#ef4444' }}>{error.message}</Typography>}

          <TextField sx={{ mt: 2 }} autoFocus id="assignee" name="assignee" label="Assignee" type="email" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssigneeModal;
