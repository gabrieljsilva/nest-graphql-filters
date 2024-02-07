export type DatabaseProvider = "pg" | "mysql" | "mssql";
export declare class FilterOptions {
    provider: DatabaseProvider;
    constructor(provider: DatabaseProvider);
}
