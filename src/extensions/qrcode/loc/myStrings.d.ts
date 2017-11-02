declare interface IVideoMenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'VideoMenuCommandSetStrings' {
  const strings: IVideoMenuCommandSetStrings;
  export = strings;
}
