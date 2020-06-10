import type State from "./states";

// American Sign Language machine
export default class ASLMachine {
    //#region Properties
    /**
     * Returns the comment provided for this machine, or undefined if one was not provided.
     */
    public get comment(): Maybe<string> {
        return this._comment || undefined; // Filter out falsy types.
    }
    private _comment: Maybe<string>;

    /**
     * Returns the timeout provided for this machine, or undefined if one was not provided.
     */
    public get timeout(): Maybe<number> {
        return Number(this._timeout) > 0 ? this._timeout : undefined;
    }
    private _timeout: Maybe<number>;
    // #endregion

    private states: Map<string, State> = new Map<string, State>();

    private startAs: string;

    /**
     * Initializes a new state machine.
     * @param initialState The state this machine will start at.
     * @param comment An optional comment for this machine.
     * @param timeout An optional timeout for this machine's run time, in seconds.
     */
    constructor(initialState: State, comment?: string, timeout?: number) {
        this.states.set(initialState.name, initialState);
        this._comment = comment;
        this._timeout = timeout;
        this.startAs = initialState.name;
    }

    /**
     * Add a new state to this machine.
     * @param newState The state to add.
     */
    public addState(newState: State): void {
        if (this.states.has(newState.name)) {
            throw new Error(`A state with the name ${newState.name} has already been added.`);
        }
        this.states.set(newState.name, newState);
    }

    /**
     * Adds or changes the transition from one previously-added state to another.
     * @param currentStateName Name of the state to transition from.
     * @param nextStateName Name of the next state to execute.
     */
    public addStateTransition(currentStateName: string, nextStateName: string): void {
        if (currentStateName === nextStateName) {
            throw new Error("A state can't transition to itself.")
        }
        const currentState = this.states.get(currentStateName);
        if (!currentState || !this.states.has(nextStateName)) {
            throw new Error("One or both states specified have not been added to this machine.")
        }
        currentState.next = nextStateName;
    }

    public markEndState(endStateName: string) {
        if (!this.states.has(endStateName)) {
            throw new Error(`A state with the name ${endStateName} does not exist.`);
        }
        this.states.forEach((state) => {
            // Adds end for provided state, and unsets end values for all states,
            state.end = state.name === endStateName;
        });
    }

    /**
     * Compiles this state machine and returns it as a JSON string.
     */
    public compile(): string {
        // Grab the initial state for this machine.
        const startState = this.states.get(this.startAs);
        if (!startState) {
            throw new Error("Unable to find initial state.");
        }
        // Create JSON object for machine.
        const machineJson: Machine = {
            StartAt: this.startAs,
            States: {}
        };

        // This doesn't account for circular references.
        for (const [name, state] of this.states.entries()) {
            // In theory, any state without a transition designated would be an "end" state.
            if (!state.next) {
                state.end = true;
            }
            machineJson.States[name] = state.compile();
        }

        // Add optional fields.
        if (this.comment) {
            machineJson.Comment = this.comment;
        }
        if (this.timeout) {
            machineJson.TimeoutSeconds = this.timeout;
        }
        // Stringify and return.
        return JSON.stringify(machineJson);
    }
}
