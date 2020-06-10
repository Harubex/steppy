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

    private states: State[];

    /**
     * Initializes a new state machine.
     * @param initialState The state this machine will start at.
     * @param comment An optional comment for this machine.
     * @param timeout An optional timeout for this machine's run time, in seconds.
     */
    constructor(initialState: State, comment?: string, timeout?: number) {
        this.states = [initialState];
        this._comment = comment;
        this._timeout = timeout;
    }

    /**
     * Add a new state to this machine.
     * @param newState The state to add.
     */
    public addState(newState: State): void {
        if (this.states.some((state) => state.name === newState.name)) {
            throw new Error(`A state with the name ${newState.name} has already been added.`);
        }
        this.states.push(newState);
    }

    /**
     * Compiles this state machine and returns it as a JSON string.
     */
    public compile(): string {
        // Grab first state, add end marker to it.
        const startState = this.states[0];
        const startStateComp = startState.compile();
        startStateComp.End = true;
        // Create JSON object for machine.
        const machineJson: Machine = {
            StartAt: startState.name,
            States: {
                [startState.name]: startStateComp
            }
        };
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
