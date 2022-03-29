export interface Board {
  id: number;
  title: string;
  contents: string;
}

export interface Response {
  result: boolean;
  data: object;
}