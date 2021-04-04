import { List, Source, Destination } from './move.typings';

// TODO: Add jsdoc

export default function move(list: List, sourceId: string, destId: string): List {
  const listCopy = JSON.parse(JSON.stringify(list)) as List;

  let source: Source;
  let dest: Destination;

  listCopy.forEach((folder) => {
    if (folder.id === sourceId) throw new Error('You cannot move a folder');

    if (folder.id === destId) dest = { folder };

    folder.files.forEach((file, fileIndex) => {
      if (file.id === destId) throw new Error('You cannot specify a file as the destination');

      if (file.id === sourceId) {
        if (folder.id === destId) throw new Error('You cannot move within the same folder');

        source = { folder, file, fileIndex };
      }
    });
  });

  if (!source) throw new Error(`No file could be found with id '${sourceId}'`);

  if (!dest) throw new Error(`No folder could be found with id '${destId}'`);

  source.folder.files.splice(source.fileIndex, 1);

  dest.folder.files.push(source.file);

  return listCopy;
}
