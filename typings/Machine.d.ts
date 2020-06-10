declare interface Machine {
    StartAt: string;
    Comment?: string;
    TimeoutSeconds?: number;
    States: { [name: string]: object }
}

declare interface MachineState {
    Type: string;
    End?: boolean;
}
