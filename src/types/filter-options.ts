export type DatabaseProvider = "pg" | "mysql" | "mssql";

export class FilterOptions {
  provider: DatabaseProvider;

  constructor(provider: DatabaseProvider) {
    this.provider = provider;
  }
}
