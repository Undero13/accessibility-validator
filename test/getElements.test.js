const Parser = require("../class/Parser");

test("Can get element", () => {
  const parser = new Parser(
    '<body><div><a href="/link"><span>Placeholder text</span></a></div></body>'
  );

  expect(parser.getElements("span")[0].textContent).toBe("Placeholder text");
});

test("Bugfix test", () => {
  const parser = new Parser(
    "<body><article><a href='link'>Placeholder text</a></article></body>"
  );

  expect(parser.getElements("a")[0].outerHTML).toBe(
    '<a href="link">Placeholder text</a>'
  );

  expect(parser.getElements("article")[0].outerHTML).not.toBe(
    '<a href="link">Placeholder text</a>'
  );
});
