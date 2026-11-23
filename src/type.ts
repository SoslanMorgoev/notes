export type User = {
  id: number;
  name: string;
  email: string;
};

export type Note = {
  user_id: number;
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export type NewNote = {
  title: string;
  body: string;
};
