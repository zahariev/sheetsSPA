import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Project {
  constructor(id) {
    this.id = id;
    this.name = '';
    this.clientId = null;
  }
  id: number;
  name: string;
  clientId: number;
}
