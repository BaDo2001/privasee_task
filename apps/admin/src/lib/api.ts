import axios from 'axios';
import type { Question, QuestionAssigneeUpdate, QuestionInput, QuestionSearch, QuestionUpdate } from './types';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('clerk-db-jwt');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getQuestions = async (search: QuestionSearch) => axios.get<Question[]>('/api/questions', { params: search });

export const createQuestion = async (question: QuestionInput) => axios.post<unknown>('/api/questions', question);

export const updateQuestion = async (id: string, question: QuestionUpdate) => axios.patch<unknown>(`/api/questions/${id}`, question);

export const updateAssignee = async (data: QuestionAssigneeUpdate) => axios.patch<unknown>('/api/questions/assignee', data);
