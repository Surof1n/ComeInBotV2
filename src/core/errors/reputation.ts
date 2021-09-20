export class ErrorReputationDate extends Error  {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}