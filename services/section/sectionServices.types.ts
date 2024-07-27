import { Todo } from '../todo';

export type SectionUpdate = Pick<Section, 'title'>;

export type Section = {
  title: string;
  id: string;
  todosList: Todo[];
};
