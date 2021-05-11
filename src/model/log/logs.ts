import { Result } from "./result";
import { Colony } from "../entities/Colony";

export class Logs {

    public results: Result[] = []
    public listener: LogsListener

    constructor() {

    }

    addResult(colony: Colony, turns: number) {
        const result = new Result(
            colony.antDistributionMap,
            turns
        )
        this.results.push(result)

        if(this.listener) {
            this.listener.onResultAdded(result)
        }
    }
}

export interface LogsListener {
    onResultAdded(addedResult: Result)
}