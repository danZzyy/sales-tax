import mocha from 'mocha';
import { expect } from 'chai';
import { calcService } from '../src/services/calc-service';

describe('Test calc-service.ts', () => {
    describe('Test checkDecimals(num: number)', () => {
        it('should return zero for no decimals', () => {
            expect(calcService.checkDecimals(10)).to.equal(0);
        });
        it('should return number of decimal places', () => {
            expect(calcService.checkDecimals(10.001)).to.equal(3);
            expect(calcService.checkDecimals(10.12345)).to.equal(5);
            expect(calcService.checkDecimals(10.12345678)).to.equal(8);
        });
    });
});