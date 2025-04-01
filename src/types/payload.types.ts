export interface adminBody {
    user?: object;
    users?: object[];
    pagination?: {
        totalUsers: number;
        currentPage: number;
        totalPages: number;
        pageSize: number;
    };
}

export interface userBody {
    user: object;
}

export interface loginBody {
    user: object;
    token: string;
}