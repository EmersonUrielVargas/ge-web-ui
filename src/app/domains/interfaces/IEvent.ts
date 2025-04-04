import { UserData } from "../../core/interfaces/IUserData";

export interface IEvent {
    id: number;
    name: string;
    description: string;
    location: string;
    attendeesSize: number;
    eventDate: string;
    status: {
        id: number,
        description: string
    }
    organizerId: UserData;
}

export interface IEventBasic extends Omit<IEvent, 'status' | 'organizerId' > {
}

export interface IRegisterEvent extends IEventBasic {
    status: number,
    organizerId: number
}

