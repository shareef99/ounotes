export interface NotesType {
    year: string;
    sem: string;
    subject: string;
    createdAt: any;
    createdBy: string;
    email: string;
    url: string;
    name: string;
}

export interface userType {
    name: string;
    year: string;
    sem: string;
    uid: string;
    providerId: string;
    email: string;
}

export interface AllNotesDetailsType {
    year: string;
    sem: string;
    subjects: string[];
}
