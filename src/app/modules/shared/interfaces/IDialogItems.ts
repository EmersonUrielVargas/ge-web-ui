import { DialogAction } from "../enums/EDialogAction";

export interface DialogItems {
    title:string;
    labelBtnAccept: string;
    labelBtnCancel: string;
    actionType: DialogAction;
}