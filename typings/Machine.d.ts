declare interface Machine {
    StartAt: string;
    Comment?: string;
    TimeoutSeconds?: number;
    States: { [name: string]: string }
}
