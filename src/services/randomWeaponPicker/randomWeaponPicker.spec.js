import { randomWeaponPicker } from ".";
import weapons from "../weapons";

describe("randomPicker", () => {

    it("should be defined", () => {
        expect(randomWeaponPicker).toBeDefined();
    });

    it("should be a function", () => {
        expect(randomWeaponPicker).toBeInstanceOf(Function);
    });

    it("should return a weapon", () => {
        const randomWeapon = randomWeaponPicker();
        expect(weapons.includes(randomWeapon)).toBe(true);
    });
});