export type User = {
  id: number;
  name: string;
  email: string;
};

export type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export type NewNote = {
  title: string;
  body: string;
};
