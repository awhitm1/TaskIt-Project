export class Task {
  constructor(
    public title: string,
    public dueDate: Date,
    public priority: string,
    public status: string,
    public taskID: number,
    public lastAction?: string
    ) {}
}
