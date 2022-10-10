export enum AsyncValueState {
    idle = 'idle',
    fetching = 'fetching',
    success = 'success',
    error = 'error',
}

export interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface ToDosState {
    state: AsyncValueState;
    latestValue: ToDo[]; // always use last known good even when there's an error
    latestError?: Error;
}
