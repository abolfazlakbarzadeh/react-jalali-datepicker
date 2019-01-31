import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { RangeDatePicker } from "../rangeDatePicker";
import "jest-styled-components";
import { theme } from "../utils/testUtils";

describe("input tests ", () => {
  afterEach(cleanup);
  test("start and end input value ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/02/12" end="1397/02/14" />,
    );
    const inputStart = getByTestId("input-start");
    const inputEnd = getByTestId("input-end");

    expect((inputStart as HTMLInputElement).value).toBe("1397/02/12");
    expect((inputEnd as HTMLInputElement).value).toBe("1397/02/14");
  });

  test("change start values in onChange event", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/02/12" end="1397/02/14" />,
    );
    const inputStart = getByTestId("input-start");
    const inputEnd = getByTestId("input-end");

    fireEvent.change(inputEnd, { target: { value: "1397/02/18" } });
    expect((inputEnd as HTMLInputElement).value).toBe("1397/02/18");

    fireEvent.change(inputStart, { target: { value: "1397/02/10" } });
    expect((inputStart as HTMLInputElement).value).toBe("1397/02/10");
  });
});

describe("RangeDatePicker days test", () => {
  afterEach(cleanup);
  test("change start days inside rangeDatePicker by clicking on the day ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/12" end="1397/10/16" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    const day = getByTestId("day-12");
    fireEvent.click(day);

    expect(day).toHaveStyleRule("background-color", theme.startRangeBackColor);
  });
  test("change continue days by hovering on the days ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/12" end="1397/10/16" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    const day = getByTestId("day-12");
    fireEvent.click(day);

    expect(day).toHaveStyleRule("background-color", theme.startRangeBackColor);

    const hoveredDay = getByTestId("day-17");
    fireEvent.mouseOver(hoveredDay);

    const continueDay = getByTestId("day-15");
    expect(continueDay).toHaveStyleRule(
      "background-color",
      theme.continueRangeBackColor,
    );
  });
  test("end select days by clicking on the hovered days ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/12" end="1397/10/16" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    const day = getByTestId("day-12");
    fireEvent.click(day);

    expect(day).toHaveStyleRule("background-color", theme.startRangeBackColor);
    // hovering
    const hoveredDay = getByTestId("day-17");
    fireEvent.mouseOver(hoveredDay);
    // clicking
    const clickedDay = getByTestId("day-17");
    fireEvent.click(clickedDay);

    expect(clickedDay).toHaveStyleRule(
      "background-color",
      theme.endRangeBackColor,
    );
  });

  test("range status ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/10" end="1397/10/20" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    const daysHeadRange = getByTestId("days-head-range");

    expect(daysHeadRange.textContent).toBe("10 تا 20 دی ماه");
  });
});

describe("arrows component test ", () => {
  afterEach(cleanup);
  test("clicking on right arrow ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/10" end="1397/10/20" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);

    const arrowRight = getByTestId("arrow-left");
    fireEvent.click(arrowRight);
    const headTitleText = getByTestId("days-head-title-text");

    expect(headTitleText.textContent).toBe("بهمن 1397");
  });

  test("clicking on left arrow ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/10" end="1397/10/20" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);

    const arrowRight = getByTestId("arrow-right");
    fireEvent.click(arrowRight);
    const headTitleText = getByTestId("days-head-title-text");

    expect(headTitleText.textContent).toBe("آذر 1397");
  });
  test("in selecting state increase month ", () => {
    const { getByTestId } = render(
      <RangeDatePicker start="1397/10/12" end="1397/10/16" />,
    );
    const inputStart = getByTestId("input-start");
    fireEvent.click(inputStart);
    // click on day
    const day = getByTestId("day-12");
    fireEvent.click(day);
    // click on arrow left
    const arrowRight = getByTestId("arrow-left");
    fireEvent.click(arrowRight);
    const headTitleText = getByTestId("days-head-title-text");
    expect(headTitleText.textContent).toBe("بهمن 1397");
    // hovering
    const hoveredDay = getByTestId("day-10");
    fireEvent.mouseOver(hoveredDay);
    // clicking
    const clickedDay = getByTestId("day-10");
    fireEvent.click(clickedDay);
    expect(clickedDay).toHaveStyleRule(
      "background-color",
      theme.endRangeBackColor,
    );
    expect(clickedDay).toHaveStyleRule(
      "background-color",
      theme.endRangeBackColor,
    );

    const daysHeadRange = getByTestId("days-head-range");
    expect(daysHeadRange.textContent).toEqual("12 دی تا 8 بهمن");
  });
});
