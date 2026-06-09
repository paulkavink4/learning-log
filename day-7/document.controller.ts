import { Request, Response } from "express";
import {
  fetchDocuments,
  fetchAllDocuments,
  fetchDocumentById,
  createDocument,
} from "../services/document.service";
import { CreateDocumentRequest } from "../interface/document.interface";
// export const getDocuments = (req: Request, res: Response) => {
//   try {
//     const docs = fetchDocuments();
//     res.json(docs);
//   } catch (error) {
//     res.status(500).json({success:false,message:"Server Error"})
//   }
// };

export const getAllDocuments = (req: Request, res: Response) => {
  try {
    const docs = fetchAllDocuments();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getById = (req: Request, res: Response): void => {
  const id = req.params.id as string;
  const doc = fetchDocumentById(id);
  if (doc) {
    res.json({
      success: true,
      data: doc,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Document not found",
    });
  }
};

export const createDocuments = (req: Request, res: Response) => {
  const {title,pages}=req.body as CreateDocumentRequest
  const doc = createDocument(title, pages);
  res.status(201).json({ success: true, data: doc });
};
