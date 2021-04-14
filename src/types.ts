export interface NotesType {
    docId: string;
    sem: string;
    group: string;
    subject: string;
    createdAt: any;
    createdBy: string;
    email: string;
    type: string;
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
