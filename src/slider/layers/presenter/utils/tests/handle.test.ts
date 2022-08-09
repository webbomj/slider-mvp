/**
 * @jest-environment jsdom
 */
const { getCoords } = require("../handle");

describe("Handle: arrScaleCreator", () => {
  document.body.innerHTML = `
    <input id="newTodoInput" />
    <button id="addTodoBtn">Add todo</button>
  `;

  const spyGetElement = jest.spyOn(document, "getElementById");
  test("Should return validate object value", () => {
    const element = document.getElementById("newTodoInput");
    spyGetElement.mockReturnValue(element);
    const result = { left: 0, width: 0, top: 0, height: 0 };

    expect(getCoords(element)).toEqual(result);
  });
});
