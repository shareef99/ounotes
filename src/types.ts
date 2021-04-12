export interface NotesType {
    docId: string;
    year: string;
    sem: string;
    subject: string;
    createdAt: any;
    createdBy: string;
    email: string;
    url: string;
    name: string;
    newName: string | undefined;
}

export interface userType {
    name: string;
    year: string;
    sem: string;
    uid: string;
    providerId: string;
    email: string;
    group: string;
}

export interface metaDataType {
    name: string;
    size: number;
    type: string;
}
