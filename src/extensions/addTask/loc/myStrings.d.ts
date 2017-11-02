declare interface IAddTaskCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'AddTaskCommandSetStrings' {
  const strings: IAddTaskCommandSetStrings;
  export = strings;
}
