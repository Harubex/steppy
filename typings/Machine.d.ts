declare interface Machine {
    StartAt: string;
    Comment?: string;
    TimeoutSeconds?: number;
    States: { [name: string]: MachineState }
}

declare interface MachineState {
    Type: string;
    End?: boolean;
    Next?: string;
}

declare interface TaskMachineState extends MachineState {
    Resource: string;
    TimeoutSeconds: number;
    HeartbeatSeconds?: number;
}
