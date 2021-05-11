import { Result } from "./result";
import { Colony } from "../entities/Colony";

export class Logs {

    public results: Result[] = []

    constructor() {

    }

    addResult(colony: Colony, turns: number) {
        this.results.push(new Result(
            colony.antDistributionMap,
            turns
        ))
    }
}