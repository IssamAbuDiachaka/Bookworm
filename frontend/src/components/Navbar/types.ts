export interface User {
  username: string;
}

export interface AuthProps {
  user: User | null;
  logout: () => void;
  navigate: (path: string) => void;
}
