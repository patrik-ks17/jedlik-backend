import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import nsideModel from "./nside.model";

export default class nsideController implements Controller {
    public path = "/api/ingatlan";
    public router = Router();
    private nsideM = nsideModel;

    constructor() {
        this.router.get("/api/ingatlan", this.getAll);
        this.router.get("/api/ingatlan/:id", this.getById);
        this.router.post("/api/ingatlan", this.create);
        this.router.patch("/api/ingatlan/:id", this.modifyPATCH);
        this.router.put("/api/ingatlan/:id", this.modifyPUT);
        this.router.delete("/api/ingatlan/:id", this.delete);
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.nsideM.find().populate("kategoria");
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const document = await this.nsideM.findById(id).populate("kategoria", "-_id");
            if (document) {
                res.send(document);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private create = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const createdDocument = new this.nsideM({
                ...body,
            });
            await createdDocument.save();
            res.status(201).send({_id: createdDocument.id});
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private modifyPATCH = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedDoc = await this.nsideM.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate("kategoria", "-_id");
            if (updatedDoc) {
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private modifyPUT = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.nsideM.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.nsideM.findById(id).populate("kategoria", "-_id");
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const successResponse = await this.nsideM.findByIdAndDelete(id);
            if (successResponse) {
                res.sendStatus(200);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
}
