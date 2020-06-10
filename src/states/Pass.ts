import State from "./State";

export default class Pass extends State {


    constructor(name: string) {
        super(name, "Pass");
    }

    public compile() {
        return this.compileCommon();
    }
}
