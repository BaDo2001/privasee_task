import { useCallback, useEffect, useMemo, useState } from 'react';

import type { QuestionSearch } from '@privasee_task/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounceValue } from 'usehooks-ts';

import { getQuestions } from '@/api';

import generateContext from './generateContext';

const getAssignee = (value: string | null): QuestionSearch['Assigned To'] => {
  if (value === null) {
    return {
      type: 'unassigned',
    };
  }

  if (value === '') {
    return undefined;
  }

  return {
    type: 'assigned',
    value,
  };
};

const useQuestionContextValue = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [assignee, setAssignee] = useState<string | null>('');
  const [properties, setProperties] = useState<string[]>([]);

  const [debouncedValue, setValue] = useDebounceValue(search, 500);

  useEffect(() => {
    setValue(search);
  }, [search, setValue]);

  const questions = useQuery({
    queryKey: ['questions', assignee, properties.join(','), debouncedValue],
    queryFn: () =>
      getQuestions({
        'Assigned To': getAssignee(assignee),
        'Properties': properties.length ? properties.join(',') : undefined,
        'query': debouncedValue,
      }),
    refetchOnMount: false,
  });

  const getQuestion = useCallback(
    (id?: string) => {
      return questions.data?.data.find((question) => question.id === id);
    },
    [questions.data],
  );

  const updateSelected = useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    },
    [selected],
  );

  const clearSelected = useCallback(() => {
    setSelected([]);
  }, []);

  const value = useMemo(
    () => ({
      questions,
      getQuestion,
      search,
      setSearch,
      assignee,
      setAssignee,
      properties,
      setProperties,
      selected,
      updateSelected,
      clearSelected,
    }),
    [questions, getQuestion, search, setSearch, assignee, setAssignee, properties, setProperties, selected, updateSelected, clearSelected],
  );

  return value;
};

export const [useQuestionContext, QuestionProvider] = generateContext(useQuestionContextValue);
