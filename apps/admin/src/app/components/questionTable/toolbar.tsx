import type { ChangeEvent, FC } from 'react';
import React, { useMemo } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { default as MuiToolbar } from '@mui/material/Toolbar';

import AssigneeModal from '@/components/assigneeModal';
import { useQuestionContext } from '@/contexts/QuestionContext';

export const UNASSIGNED = 'Unassigned';

const Toolbar: FC = () => {
  const { search, setSearch, assignee, setAssignee, properties, setProperties, questions } = useQuestionContext();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    if (event.target.value === UNASSIGNED) {
      setAssignee(null);
    } else {
      setAssignee(event.target.value);
    }
  };

  const handlePropertiesChange = (event: SelectChangeEvent<string[]>) => {
    setProperties(event.target.value as string[]);
  };

  const isPropertySelected = (property: string) => properties.includes(property);

  const questionsData = useMemo(() => questions.data?.data || [], [questions.data]);

  const assigneeOptions = useMemo(() => {
    return Array.from(new Set(questionsData.flatMap((question) => question['Assigned To'] || [])));
  }, [questionsData]);

  const propertiesOptions = useMemo(() => {
    return Array.from(new Set(questionsData.flatMap((question) => (question.Properties ? question.Properties.split(',') : [])).flat()));
  }, [questionsData]);

  return (
    <MuiToolbar
      sx={{
        p: 2,
        display: 'flex',
        gap: 4,
      }}
    >
      <TextField label="Search" onChange={handleSearchChange} sx={{ flex: 2 }} value={search} variant="outlined" />

      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="assignee-label">Assignee</InputLabel>
        <Select label="Assignee" labelId="assignee-label" onChange={handleAssigneeChange} value={assignee === null ? UNASSIGNED : assignee}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value={UNASSIGNED}>{UNASSIGNED}</MenuItem>

          {assigneeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {propertiesOptions.length > 0 && (
        <FormControl sx={{ height: 56, flex: 2 }}>
          <InputLabel id="property-label">Properties</InputLabel>
          <Select
            label="Properties"
            labelId="property-label"
            multiple
            onChange={handlePropertiesChange}
            renderValue={(selected) => selected.join(', ')}
            value={properties}
          >
            {propertiesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={isPropertySelected(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <AssigneeModal />
    </MuiToolbar>
  );
};

export default Toolbar;
