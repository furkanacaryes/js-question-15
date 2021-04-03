export type File = {
  id: string;
  name: string;
};

export type Folder = {
  id: string;
  name: string;
  files: File[];
};

export type List = Folder[];
