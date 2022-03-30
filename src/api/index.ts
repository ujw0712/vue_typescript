import { Board, Response } from "@/types";

const getSimpleBoardList = () =>
  JSON.parse(localStorage.getItem("simpleBoardList") || "").list;

const setSimpleBoardList = (list: Board[]) =>
  localStorage.setItem("simpleBoardList", JSON.stringify({ list: list }));

export const getBoardList = (): Response => {
  if (!localStorage.getItem("simpleBoardList")) {
    setSimpleBoardList([
      {
        id: 1,
        title: "제목1",
        contents: "설명1",
      },
      {
        id: 2,
        title: "제목2",
        contents: "설명2",
      },
      {
        id: 3,
        title: "제목3",
        contents: "설명3",
      },
      {
        id: 4,
        title: "제목4",
        contents: "설명4",
      },
      {
        id: 5,
        title: "제목5",
        contents: "설명5",
      },
      {
        id: 6,
        title: "제목6",
        contents: "설명6",
      },
    ]);
  }

  return {
    result: true,
    data: getSimpleBoardList(),
  };
};

export const getBoardDetail = (id: number): Response => {
  const list: Board[] = getSimpleBoardList();

  return {
    result: true,
    data: list.find((l) => l.id === id) || [],
  };
};

export const createBoard = (params: Board): Response => {
  const getAddBoardId = () => Math.max(...list.map((o) => o.id)) + 1;
  const list: Board[] = getSimpleBoardList();
  params.id = getAddBoardId();
  list.push(params);
  setSimpleBoardList(list);

  return {
    result: true,
    data: {},
  };
};

export const updateBoard = (params: Board): Response => {
  const newList = [];
  const list: Board[] = getSimpleBoardList();
  for (const item of list) {
    if (item.id === params.id) {
      newList.push(params)
    } else {
      newList.push(item)
    }
  }
  setSimpleBoardList(newList);

  return {
    result: true,
    data: {},
  };
};


export const deleteBoard = (id: number): Response => {
  const list: Board[] = getSimpleBoardList();
  setSimpleBoardList(list.filter((l) => l.id != id));

  return {
    result: true,
    data: {},
  };
};
