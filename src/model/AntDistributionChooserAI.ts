import { CustomMath } from 'src/utils/CustomMath'
import { AntType } from './entities/Ant'
import { Result } from './log/result'
import * as tf from '@tensorflow/tfjs';

export class AntDistributionChooserAI {

    constructor(private results: Result[]) { }

    async getPredictedDistribution() {

        //todo
        //make prediction from available data

        // const model = tf.sequential()
        // const inputData = this.getInputData(this.results)

        // model.add(tf.layers.dense({ inputShape: [4], units: inputData.length + 1 }))
        // model.add(tf.layers.dense({ units: 4 }));
        // model.compile({ loss: 'categoricalCrossentropy', optimizer: 'sgd' });

        // const test = tf.tensor4d([inputData, [4]])
        // const result = model.predict(test)
        // console.log(result.toString())

        const model = tf.sequential()

        const yData = this.getYData(this.results)
        const xData = this.getXData(this.results)

        const ys = tf.tensor2d(yData, [yData.length, yData[0].length]).div(tf.scalar(10));
        const xs = tf.tensor2d(xData, [xData.length, 1]).reshape([xData.length, 1]).div(tf.scalar(10));

        model.add(tf.layers.dense({ units: 100, inputShape: [50] }));
        model.add(tf.layers.reshape({ targetShape: [10, 10] }));

        let lstm_cells = [];
        for (let index = 0; index < 4; index++) {
            lstm_cells.push(tf.layers.lstmCell({ units: 20 }));
        }

        model.add(tf.layers.rnn({
            cell: lstm_cells,
            inputShape: [10, 10],
            returnSequences: false
        }));

        model.add(tf.layers.dense({ units: 1, inputShape: [20] }));

        // tf.train.adam(10)
        model.compile({
            optimizer: 'sgd',
            loss: 'meanSquaredError'
        });

        const hist = model.fit(xs, ys, {
                "batchSize": 4,
                "epochs": 3,
            }).then(() => {
                console.log(hist)
            });



        return { model: model, stats: hist };


        // const calc1 = CustomMath.randomRange(1, 100)
        // const calc2 = CustomMath.randomRange(1, 100 - calc1)
        // const calc3 = 100 - calc1 - calc2

        // return new Map([
        //     [AntType.GATHERER, calc1],
        //     [AntType.SOLDIER, calc2],
        //     [AntType.CARETAKER, calc3]
        // ])
    }

    private getInputData(results: Result[]) {
        const data: any[] = []

        results.forEach((result) => {
            data.push({
                "gatherers": result.antDistribution.get(AntType.GATHERER),
                "soldiers": result.antDistribution.get(AntType.SOLDIER),
                "caretakers": result.antDistribution.get(AntType.CARETAKER),
                "lifetime": result.colonyLifeTime,
            })
        })

        return data
    }

    private getYData(results: Result[]): any[] {
        const data: any[] = []

        results.forEach((result) => {
            data.push([
                result.antDistribution.get(AntType.GATHERER),
                result.antDistribution.get(AntType.SOLDIER),
                result.antDistribution.get(AntType.CARETAKER)
            ])
        })

        return data
    }

    private getXData(results: Result[]): any[] {
        const data: any[] = []

        results.forEach((result) => {
            data.push(result.colonyLifeTime)
        })

        return data
    }
}