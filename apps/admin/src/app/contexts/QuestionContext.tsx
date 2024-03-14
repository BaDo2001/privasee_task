import { useEffect, useState } from 'react';
import generateContext from './generateContext';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../lib/api';
import { useDebounceValue } from 'usehooks-ts';

const useQuestionContextValue = () => {
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

  return {
    questions,
    getQuestion,
    search,
    setSearch,
    assignee,
    setAssignee,
    properties,
    setProperties,
  };
};

export const [useQuestionContext, QuestionProvider] = generateContext(useQuestionContextValue);
