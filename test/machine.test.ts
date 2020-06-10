import ASLMachine from "../src/ASLMachine";
import "mocha";
import { Pass, Task } from "../src/states";
import { expect } from "chai";

describe("State machine tests", () => {
    it("initializes a new state machine", () => {
        const passState = new Pass("test");
        const machine = new ASLMachine(passState);
        const json = machine.compile();
        expect(json).to.exist;
        console.log(json);
    });

    it("tries to add the same state twice", () => {
        expect(() => {
            const passState = new Pass("test");
            const machine = new ASLMachine(passState);
            machine.addState(passState);
        }).to.throw(Error);
    });

    it("tries to add an invalid state transition", () => {
        expect(() => {
            const passState = new Pass("test");
            const machine = new ASLMachine(passState);
            machine.addStateTransition("test", "moo")
        }).to.throw(Error);
    });

    it("adds multiple states", () => {
        const passState = new Pass("mypass");
        const lambdaMoo = new Task("moo", "arn:aws:lambda:us-east-1:123456789012:function:Moo");
        const lambdaMoo2 = new Task("moo2", "arn:aws:lambda:us-east-1:123456789012:function:Moo2");
        const machine = new ASLMachine(passState, "Some comment", 120);
        machine.addState(lambdaMoo);
        machine.addState(lambdaMoo2);
        machine.addStateTransition("mypass", "moo");
        machine.addStateTransition("moo", "moo2");
        const json = machine.compile();
        expect(json).to.exist;
        console.log(json);
    });
});
