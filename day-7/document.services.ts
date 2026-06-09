import {MyDocument} from "../interface/document.interface"
let documents:MyDocument[] = [
  {
    id: "D001",
    title: "Js Fundamentals",
    pages: 200,
  },
  {
    id: "D002",
    title: "Node Guide",
    pages: 150,
  },
  {
    id: "D003",
    title: "Typescript Basics",
    pages: 100,
  },
];

export const fetchDocuments = () => {
  return [
    { id: "D0001", title: "JS Fundamentals" },
    { id: "D001", title: "Node JS Basics" },
  ];
};
//Getting all Documents
export const fetchAllDocuments=():MyDocument[]=>documents

//Getting individual Documents
export const fetchDocumentById=(id:string):MyDocument | undefined=>{
    return documents.find((e)=>e.id==id)
}

//Creating Document

export const createDocument=(title:string, pages:number)=>{
    const newDoc:MyDocument={
        id:`D0${documents.length+1}`,
        title:title,
        pages:pages
    }

    documents.push(newDoc)
    return newDoc
}
