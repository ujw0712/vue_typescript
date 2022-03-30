export interface Ref<T> {
  value: T;
}

export interface Board {
  id: number;
  title: string;
  contents: string;
}

export interface Response<T> {
  result: boolean;
  data?: T;
}