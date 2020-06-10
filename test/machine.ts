import ASLMachine from "../src/ASLMachine";
import "mocha";
import { Pass } from "../src/states";
import { expect } from "chai";

describe("State machine tests", () => {
    it("initializes a new state machine", () => {
        const passState = new Pass("test");
        const machine = new ASLMachine(passState);
        const json = machine.compile();
        expect(json).to.exist;
    });
});
