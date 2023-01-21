import { stringToLut, generateLut, lutToString } from "./generateLut";
import { describe, it, expect } from "vitest";

const ZERO_LUT = Array.from(
  { length: 27 },
  () => [0.0, 0.0, 0.0] as [number, number, number]
);

describe("stringToLut", () => {
  it("convert", () => {
    const s = ["# hoge", "", ...ZERO_LUT.map((s) => s.join(" ")), ""].join(
      "\n"
    );
    const lut = stringToLut(s);
    expect(lut).toHaveLength(27);
    expect(lut[0]).toHaveLength(3);
    expect(lut[0][0]).toBe(0);
  });
});

describe("generateLut", () => {
  it("convert", () => {
    const lut = generateLut(ZERO_LUT, ZERO_LUT);
    expect(lut).toHaveLength(27);
  });

  it.todo("results are correct");
});

describe("lutToString", () => {
  it("convert", () => {
    const expectedBody = [
      'TITLE "Generated by Generator"',
      "LUT_3D_SIZE 3",
      "",
      ...ZERO_LUT.map((rgb) => rgb.join(" ")),
      "",
    ].join("\n");
    expect(lutToString(ZERO_LUT)).toBe(expectedBody);
  });
});