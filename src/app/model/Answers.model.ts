import { Questions } from './Questions.model';

export class Answers {
  id:number;
  answeringQuestion:string;
  rating:string;
  username:string;
  questionDTO:Questions;
}
