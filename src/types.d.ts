interface Entry {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  diaryId?: string;
}

interface Diary {
  id?: string;
  title: string;
  type: "private" | "public";
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  entryIds: string[] | null;
}

interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  diaryIds: string[] | null;
}
