import { UserData } from "../../core/interfaces/IUserData";
import { IEventBasic } from "./IEvent";

export interface IReservations {
    eventId: number;
    userId: number;
    isActive: boolean;
    user?: UserData;
    event?: IEventBasic;
}

export interface IRegisterReservation extends Omit<IReservations, 'user' | 'event' > {}

export interface IUpdateReservation extends Partial<IRegisterReservation> {}
