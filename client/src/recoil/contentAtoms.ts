import { atom } from 'recoil';

export interface Content {
  title:string
  link?:string
  contentType: string
  _id: string
  content?:string
  userId:string

  
}

export const contentListState = atom<Content[]>({
  key: 'contentState', 
  default: []
});