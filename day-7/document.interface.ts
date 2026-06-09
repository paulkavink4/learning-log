export interface MyDocument{
    id:string
    title:string
    pages:number
}

export interface ApiResponse<T>{
    success:boolean
    data:T
}

export interface CreateDocumentRequest{
    title:string
    pages:number
}
