import { createContext } from 'react';
import generateContext from './generateContext';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../lib/api';

const useQuestionContextValue = () => {
  const questions = useQuery({ queryKey: ['questions'], queryFn: () => getQuestions({}) });

  const getQuestion = (id?: string) => {
    return questions.data?.data.find((question) => question.id === id);
  };

  return {
    questions,
    getQuestion,
  };
};

export const [useQuestionContext, QuestionProvider] = generateContext(useQuestionContextValue);
