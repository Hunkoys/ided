export type Index = number;
const index: Index = 0;
export const Index: string = typeof index;

export type Id = string;
const id: Id = '';
export const Id: string = typeof id;

export type Value = any;
const value: Value = undefined;
export const Value: string = typeof value;

export type Key = { id: Id } | { value: Value } | Element;
