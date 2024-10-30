import { test, expect } from "@playwright/test";

test("Landing Page should load successfully", async ({ page }) => {
  await page.goto("https://terra-watts.com/");

  // Preferred way to check title, as it waits for the title to be available before checking it (unlike page.title()) - https://playwright.dev/docs/api/class-page#pagewaitfortitle
  await expect(page).toHaveTitle("Terra Watts - Renewable Energy Solutions");
  // expect(await page.title()).toBe("Terra Watts - Renewable Energy Solutions");

  // TODO: Add more tests here
  // Check for description meta tag content - https://playwright.dev/docs/api/class-locator#locatorgetattribute

  // const description = await page
  //   .locator('meta[name="description"]')
  //   .getAttribute("content");
  // expect(description).toBe(
  //   "Terra Watts provides innovative subsurface wireless transmission to power your future."
  // );
});
