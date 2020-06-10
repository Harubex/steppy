import { StateType } from "../../typings/StateType";

export default abstract class State {

    /**
     * The name of this state.
     */
    public get name(): string {
        return this._name;
    }
    private _name: string;

    /**
     * This state's type.
     */
    private get type(): StateType {
        return this._type;
    }
    private _type: StateType;

    public next: Maybe<string>;

    public end: boolean = false;

    /**
     * Abstract ctor - sets the common fields for a state.
     * @param name The name of this state.
     * @param type The type of this state.
     * @param next An optional state name to transition to.
     */
    protected constructor(name: string, type: StateType, next?: string) {
        this._name = name;
        this._type = type;
        this.next = next;
    }

    /**
     * Compiles this state and returns it as a JSON-encodable object.
     */
    protected compileCommon(): MachineState {
        const json: MachineState = {
            Type: this.type
        };

        if (this.next) {
            json.Next = this.next;
        }

        if (this.end) {
            json.End = true;
        }

        return json;
    }

    /**
     * A function to be instantiated by all substates - return fields to merge with common values.
     */
    public abstract compile(): MachineState;
}
