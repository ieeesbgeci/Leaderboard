export type EventType = "UserEvent" | { TeamEvent: { team_size: number } };

export interface EventInfo {
    id: string;
    name: string;
    logo: string;
    event_type: EventType;
    state: VaderState;
}
export enum VaderState {
    Added,
    Start,
    Stop,
}

export interface PlayerInfo {
    id: string;
    name: string;
    logo: string;
    score: number;
}

export type UserInfo = PlayerInfo;
export type TeamInfo = PlayerInfo;
