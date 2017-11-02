export interface IPerson {
  id: string;
  title: string;
  email: string;
  sip: string;
  picture: string;
}

export interface IListItem {
  ID: string;
  PermMask: string;
  FSObjType: string;
  FileRef: string;
  ItemChildCount: string;
  FolderChildCount: string;
  SMTotalSize: string;
  Title: string;
  FileLeafRef: string;
  ContentTypeId: string;
  Date: string;
  Trainer: IPerson[];
  Link: string;
}
