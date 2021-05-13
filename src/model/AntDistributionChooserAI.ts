import { CustomMath } from 'src/utils/CustomMath'
import { AntType } from './entities/Ant'
import { Result } from './log/result'
import { _isNumberValue } from '@angular/cdk/coercion';
import { GlobalVars } from 'src/utils/GlobalVars';

export class AntDistributionChooserAI {

    private readonly antTypes: AntType[] = Object.values(AntType).filter((type) => {
        return !isNaN(Number(type))
    }) as AntType[]

    private progress: Progress

    constructor(private results: Result[]) {
        this.progress = new Progress()
        this.progress.currentType = this.antTypes[0]
    }

    getPredictedDistribution(finished: (distribution) => void): Map<AntType, number> {

        var distributionPrediction;
        this.progress.checkBestResult(this.results[this.results.length - 1])

        switch (this.progress.phase) {
            case ProgressPhase.INITIAL: {
                //eerste fase elk type ant 100% naar 0% uitvoeren
                distributionPrediction = this.getInitialDistribution()
                break
            }
            case ProgressPhase.EXPERTISE: {
                distributionPrediction = this.getExpertisedDistribution()
                break
            }
            case ProgressPhase.FINALISE: {
                finished(this.progress.bestResult.antDistribution)
                break
            }
            default: {
                return this.getRandomDistribution()
            }
        }

        const finalDistribution: Map<AntType, number> = new Map([...distributionPrediction.entries()].sort())
        return finalDistribution
    }

    private getRandomDistribution(): Map<AntType, number> {
        const calc1 = CustomMath.randomRange(1, 100)
        const calc2 = CustomMath.randomRange(1, 100 - calc1)
        const calc3 = 100 - calc1 - calc2

        return new Map([
            [AntType.GATHERER, calc1],
            [AntType.SOLDIER, calc2],
            [AntType.CARETAKER, calc3]
        ])
    }

    private getInitialDistribution(): Map<AntType, number> {
        //de eerstvolgende 100 - 80 - 60 - 40 - 20 - 0
        const nextPercentage = 80 - (GlobalVars.DISTRIBUTION_AI_STEP_SIZE * this.progress.typeSteps)
        const map = new Map([
            [this.progress.currentType, nextPercentage]
        ])

        //de rest opvullen met overgebleven waarde (100 - nextpercentage)
        this.antTypes.forEach((type) => {
            if (type !== this.progress.currentType) {
                const take = (100 - nextPercentage) / (this.antTypes.length - 1)
                map.set(type, take)
            }
        })

        //progress updaten
        this.progress.typeSteps += 1
        if (nextPercentage == 0) {
            //volgende type in de anttypes
            const nextType: AntType = this.antTypes[this.antTypes.indexOf(this.progress.currentType) + 1]
            if (nextType) {
                this.progress.nextType(nextType)
            } else {
                this.progress.nextPhase()
            }
        }

        return map
    }

    private getExpertisedDistribution(): Map<AntType, number> {

        const bestDistribution = this.progress.bestResult.antDistribution
        var adjustment = (GlobalVars.DISTRIBUTION_AI_STEP_SIZE / 4) * this.progress.expertiseSteps

        if (!this.progress.expertisePositive) {
            adjustment = adjustment * -1
        }

        const map = new Map([
            [this.progress.expertiseType, bestDistribution.get(this.progress.expertiseType) + adjustment]
        ])

        this.antTypes.forEach((type) => {
            if (type !== this.progress.expertiseType) {

                const adjustmentMinor = (-adjustment) / (this.antTypes.length - 1)
                map.set(type, bestDistribution.get(type) + adjustmentMinor)
            }
        })

        this.progress.expertiseSteps += 1

        if(this.progress.expertisePositive) {
            if(adjustment >= GlobalVars.DISTRIBUTION_AI_STEP_SIZE) {
                this.progress.expertisePositive = false
                this.progress.expertiseSteps = 1
            }
        } else {
            if(-adjustment >= GlobalVars.DISTRIBUTION_AI_STEP_SIZE) {
                this.progress.nextPhase()
            }
        }

        return map
    }
}

export class Progress {

    public phase: ProgressPhase = ProgressPhase.INITIAL
    public typeSteps: number = 0
    public currentType: AntType

    public bestResult: Result
    public expertiseSteps: number = 1
    public expertiseType: AntType
    public expertisePositive: boolean = true

    checkBestResult(result: Result) {
        if (this.bestResult == undefined) {
            this.setBestResult(result)
        } else {
            if (result.colonyLifeTime > this.bestResult.colonyLifeTime) {
                this.setBestResult(result)
            }
        }
    }

    private setBestResult(result: Result) {
        this.bestResult = result
        this.expertiseType = AntType[AntType[this.currentType]]
        this.expertiseSteps = 1
        this.expertisePositive = true
    }

    nextType(type: AntType) {
        this.currentType = type
        this.typeSteps = 0
    }

    nextPhase() {
        switch (this.phase) {
            case ProgressPhase.INITIAL: {
                this.phase = ProgressPhase.EXPERTISE
                break
            }
            case ProgressPhase.EXPERTISE: {
                this.phase = ProgressPhase.FINALISE
            }
        }
    }
}

export enum ProgressPhase {
    INITIAL,
    EXPERTISE,
    FINALISE
}