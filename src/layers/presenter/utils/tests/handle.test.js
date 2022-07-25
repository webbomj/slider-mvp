/**
 * @jest-environment jsdom
 */
const { getCoords } = require("../handle");
describe("Handle: arrScaleCreator", () => {
  document.body.innerHTML = `
    <input id="newTodoInput" />
    <button id="addTodoBtn">Add todo</button>
  `;
  global.scrollX = 10;
  global.scrollY = 20;

  const scrollBySpy = jest.fn();
  const getBoundingClientRectSpy = jest.fn(() => ({
    width: 100,
    left: 150,
    top: 140,
    height: 120,
  }));

  document.getElementById = jest.fn(() => ({
    scrollBy: scrollBySpy,
    getBoundingClientRect: getBoundingClientRectSpy,
  }));

  test("Should return validate object value", () => {
    const element = document.getElementById("newTodoInput");
    const result = { left: 160, width: 100, top: 160, height: 120 };

    expect(getCoords(element)).toEqual(result);
  });
});
