export class ListAllMessagesOutput {
  id: number;
  createdAt: Date;
  message: string;
  User: {
    id: number;
    username: string;
  };
}
