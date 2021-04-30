export class CustomMath {


    //get a random number between a range of numbers
    public static randomRange(min, max) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //returns a value clamped between the specified minimum and maximum
    public static clamp(val,min,max) : number {
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        return val;
    }
}