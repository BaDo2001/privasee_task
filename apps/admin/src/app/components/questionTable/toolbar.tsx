import { default as MuiToolbar } from '@mui/material/Toolbar';
import React, { ChangeEvent, useState } from 'react';
import { FC } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useQuestionContext } from '../../contexts/QuestionContext';

interface Props {
  numSelected: number;
  assigneeOptions: (string | undefined)[];
  propertiesOptions: string[];
}

const Toolbar: FC<Props> = ({ numSelected, assigneeOptions, propertiesOptions }) => {
  const { search, setSearch, assignee, setAssignee, properties, setProperties } = useQuestionContext();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssignee(event.target.value);
  };

  const handlePropertiesChange = (event: SelectChangeEvent<string[]>) => {
    setProperties(event.target.value as string[]);
  };

  const isPropertySelected = (property: string) => properties.indexOf(property) !== -1;

  return (
    <MuiToolbar
      sx={{
        p: 2,
        display: 'flex',
        gap: 4,
      }}
    >
      <TextField label="Search" variant="outlined" sx={{ flex: 2 }} value={search} onChange={handleSearchChange} />

      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="assignee-label">Assignee</InputLabel>
        <Select labelId="assignee-label" value={assignee} label="Assignee" onChange={handleAssigneeChange}>
          <MenuItem value="">None</MenuItem>

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
            multiple
            labelId="property-label"
            value={properties}
            label="Properties"
            onChange={handlePropertiesChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
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

      {numSelected > 0 && (
        <Button color="primary" variant="contained">
          Assign {numSelected} question{numSelected > 1 ? 's' : ''}
        </Button>
      )}
    </MuiToolbar>
  );
};

export default Toolbar;
