import { Questions } from './Questions.model';

export class Answers {
  public answeringQuestion: string;
  public id: number;
  public questionDTO: Questions;
  public rating: string;
  public username: string;
}
