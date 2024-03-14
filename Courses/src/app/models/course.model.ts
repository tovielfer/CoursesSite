export class Course {
  id!: number;
  name!: string;
  categoryId: number=0;
  countLessons!: number;
  lacturerId: number=-1;
  image!: string;
  type!: TypeLearning;
  dateStart!:Date;
  syllabus:string[]=[];
}
export enum TypeLearning {
  זום = 0,
  פרונטלי = 1
}