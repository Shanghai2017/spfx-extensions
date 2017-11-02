declare interface IQRCodeCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'QRCodeCommandSetStrings' {
  const strings: IQRCodeCommandSetStrings;
  export = strings;
}
