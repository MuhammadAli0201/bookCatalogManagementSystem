import { Chapter } from "./chapter";
import { Tag } from "./tag";

export interface Book
{
    id:string,
    title:string,
    author:string,
    publicationYear:Date,
    isbn:string,
    genre:string,
    tags:Tag[],
    chapters:Chapter[],
    totalPages:number
}