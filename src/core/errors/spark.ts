export class ErrorAddCountNegative extends Error  {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}

export class ErrorMoreRemoveSparks extends Error {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}

export class ErrorEqualsMembersSend extends Error {
  constructor(
    public message: string,
  ) {
    super(message)
  }
}

