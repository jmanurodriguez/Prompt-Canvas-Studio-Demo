export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string[];
  tags: string[];
  author: {
    id: string;
    name: string;
  };
  likes: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  collections: string[];
  createdPrompts: string[];
} 