import { v4 as uuidv4 } from 'uuid';
import { Id, Value } from './types';

export class Element {
  id: Id;
  value: Value;

  constructor(value: Value) {
    this.id = uuidv4();
    this.value = value;
  }
}
