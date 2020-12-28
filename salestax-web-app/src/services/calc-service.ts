class CalcService {
    checkDecimals(num: number): number {
        const numArray = num.toString().split('.');
        if (numArray.length === 1) {
            return 0;
        }
        return numArray[1].length;
    }
}

export const calcService = new CalcService();