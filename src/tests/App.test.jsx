const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "../App.jsx"), "utf8");

describe("App", () => {
  test("sets up the application providers, router, navbar, and routes", () => {
    expect(appSource).toContain("<ThemeProvider>");
    expect(appSource).toContain("<AuthProvider>");
    expect(appSource).toContain("<BrowserRouter>");
    expect(appSource).toContain("<Navbar />");

    expect(appSource).toMatch(/<Route\s+path="\/"\s+element={<Home\s+\/>}\s+\/>/);
    expect(appSource).toMatch(/<Route\s+path="\/trending"\s+element={<Trending\s+\/>}\s+\/>/);
    expect(appSource).toMatch(/<Route\s+path="\/saved"\s+element={<Saved\s+\/>}\s+\/>/);
    expect(appSource).toMatch(/<Route\s+path="\/login"\s+element={<Login\s+\/>}\s+\/>/);
    expect(appSource).toMatch(/<Route\s+path="\*"\s+element={<NotFound\s+\/>}\s+\/>/);
  });
});
