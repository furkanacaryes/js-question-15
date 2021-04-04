export type BaseDirectoryItem = {
  id: string;
  name: string;
};

export type File = BaseDirectoryItem;

export type Folder = BaseDirectoryItem & {
  files: File[];
};

export type List = Folder[];
