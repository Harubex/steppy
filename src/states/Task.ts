import State from "./State";

const defaultTimeout = 60;
export default class Task extends State {

    public get resourceId(): string {
        return this._resourceId;
    }
    private _resourceId: string;

    public get timeout(): number {
        return this._timeout > 0 ? this._timeout : defaultTimeout;
    }
    private _timeout: number;

    public get heartbeat(): Maybe<number> {
        return Number(this._heartbeat) > 0 ? this._heartbeat : undefined;
    }
    private _heartbeat: Maybe<number>;



    /**
     * Sets the fields for a task state.
     * @param name The name for this state.
     * @param resourceId The id of an amazon resource to execute when in this state.
     * @param timeout The timeout for this state. Defaults to 60.
     * @param heartbeat An optional heartbeat timeout to provide.
     */
    constructor(name: string, resourceId: string, timeout: number = defaultTimeout, heartbeat?: number) {
        super(name, "Task");
        this._resourceId = resourceId;
        this._timeout = timeout;
        this._heartbeat = heartbeat;
    }

    public compile(): TaskMachineState {
        const json: TaskMachineState = Object.assign(this.compileCommon(), {
            Resource: this.resourceId,
            TimeoutSeconds: this.timeout
        });

        if (this.heartbeat) {
            json.HeartbeatSeconds = this.heartbeat;
        }

        return json;
    }
}
