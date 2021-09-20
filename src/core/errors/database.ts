export class DatabaseConnectError extends Error  {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}
