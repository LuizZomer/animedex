export class ListAllMessagesOutput {
  id: number;
  createdAt: Date;
  message: string;
  user: {
    id: number;
    username: string;
  };
}
