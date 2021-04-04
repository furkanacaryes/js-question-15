import { List, Folder, File } from './move.typings';

export default function move(list: List, sourceId: string, destId: string): List {
  const listCopy = JSON.parse(JSON.stringify(list)) as List;

  let destFolder: Folder | undefined;
  let source: { folder: Folder; file: File; index: number } | undefined;

  listCopy.forEach((folder) => {
    if (folder.id === sourceId) throw new Error('You cannot move a folder');

    if (folder.id === destId) destFolder = folder;

    folder.files.forEach((file, index) => {
      if (file.id === destId) throw new Error('You cannot specify a file as the destination');

      if (file.id === sourceId) source = { folder, file, index };
    });
  });

  if (!source) throw new Error(`No file could be found with id '${sourceId}'`);

  if (!destFolder) throw new Error(`No folder could be found with id '${destId}'`);

  source.folder.files.splice(source.index, 1);

  destFolder.files.push(source.file);

  return listCopy;
}
