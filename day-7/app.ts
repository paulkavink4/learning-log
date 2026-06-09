import express, { Request, Response } from "express";
import { MyDocument, ApiResponse } from "./interface/document.interface";
import{getAllDocuments, createDocuments, getById} from "./controllers/document.controller"
const app = express();
const PORT: number = 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running...");
});

// app.get("/document", (req: Request, res: Response) => {
//   const doc: MyDocumet = {
//     id: "D001",
//     title: "Node Js Fundamentals",
//     pages: 20,
//   };

//   res.json(doc)
// });

app.get("/document", (req: Request, res: Response) => {
  const response: ApiResponse<MyDocument> = {
    success: true,
    data: {
      id: "D002",
      title: "Node Guide",
      pages: 2000,
    },
  };

  res.send(response)
});

app.get("/documents",getAllDocuments)
app.use(express.json())
app.post("/create",createDocuments)
app.get("/documents/:id",getById)

