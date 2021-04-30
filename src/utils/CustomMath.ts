export class CustomMath {


    //get a random number between a range of numbers
    public static randomRange(min, max) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}