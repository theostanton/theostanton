import {describe, expect, it} from "@jest/globals";
import {id} from "./utils";

describe("Generate IDs", () => {

    it("Should handle lower case prefix", () => {
        const result = id("some_prefix")
        expect(result).toMatch(/some_prefix_[a-f0-9]{8}/)
    })

    it("Should handle upper case prefix", () => {
        const result = id("SOME_prefix")
        expect(result).toMatch(/some_prefix_[a-f0-9]{8}/)
    })

    it("Should handle non-slug case prefix", () => {
        expect(() => id("SOME_pr123ef@!ix")).toThrow()
    })

    it("Should handle no prefix", () => {
        const result = id()
        expect(result).toMatch(/[a-f0-9]{8}/)
    })

})