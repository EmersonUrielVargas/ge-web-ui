import { FormControlStatus } from "@angular/forms";

export interface IGenericForm<T> {
    data: T;
    formStatus: FormControlStatus
}

