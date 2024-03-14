import { useEffect, useState } from 'react';
import generateContext from './generateContext';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '@/api';
import { useDebounceValue } from 'usehooks-ts';

const useQuestionContextValue = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [properties, setProperties] = useState<string[]>([]);

  const [debouncedValue, setValue] = useDebounceValue(search, 500);

  useEffect(() => {
    setValue(search);
  }, [search, setValue]);

  const questions = useQuery({
    queryKey: ['questions', assignee, properties.join(','), debouncedValue],
    queryFn: () =>
      getQuestions({
        'Assigned To': assignee || undefined,
        'Properties': properties ? properties.join(',') : undefined,
        'query': debouncedValue,
      }),
  });

  const getQuestion = (id?: string) => {
    return questions.data?.data.find((question) => question.id === id);
  };

  const updateSelected = (id: string) => {
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
  };

  const clearSelected = () => {
    setSelected([]);
  };

  // TODO: memoize this

  return {
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
  };
};

export const [useQuestionContext, QuestionProvider] = generateContext(useQuestionContextValue);
