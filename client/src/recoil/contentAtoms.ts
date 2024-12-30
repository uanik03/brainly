import { contentSchema } from '@/components/AddContentModal';
import { atom } from 'recoil';
import { z } from 'zod';

export type Content = z.infer<typeof contentSchema>;

export const contentListState = atom<Content[]>({
  key: 'contentState', 
  default: []
});