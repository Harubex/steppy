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

    /**
     * Abstract ctor - sets the common fields for a state.
     * @param name The name of this state.
     * @param type The type of this state.
     */
    protected constructor(name: string, type: StateType) {
        this._name = name;
        this._type = type;
    }

    /**
     * Compiles this state and returns it as a JSON-encodable object.
     */
    protected compileCommon(): MachineState {
        return {
            Type: this.type
        };
    }

    /**
     * A function to be instantiated by all substates - return fields to merge with common values.
     */
    public abstract compile(): MachineState;
}
