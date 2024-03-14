import type { BaseQuestionInput, Question, QuestionAssigneeUpdate, QuestionSearch, QuestionUpdate } from '@privasee_task/types';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getQuestions = async (search: QuestionSearch) => axios.get<Question[]>('/api/questions', { params: search });

export const createQuestion = async (question: BaseQuestionInput) => axios.post<unknown>('/api/questions', question);

export const updateQuestion = async (id: string, question: QuestionUpdate) => axios.patch<unknown>(`/api/questions/update/${id}`, question);

export const updateAssignee = async (data: QuestionAssigneeUpdate) => axios.patch<unknown>('/api/questions/assignee', data);
