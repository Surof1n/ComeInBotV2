export class DatabaseConnectError extends Error  {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}

export class DatabaseFindEntityError extends Error  {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}