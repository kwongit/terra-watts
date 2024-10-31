import { test, expect } from "@playwright/test";

test("Landing Page should load successfully", async ({ page }) => {
  // Use 'page' to interact with the web app, e.g., navigating to a URL
  await page.goto("https://terra-watts.com/");

  // Use 'expect' to assert conditions about the page state, e.g., check the title. This is the preferred way to check title, as it waits for the title to be available before checking it (unlike page.title()) - https://playwright.dev/docs/api/class-page#pagewaitfortitle
  await expect(page).toHaveTitle("Terra Watts - Renewable Energy Solutions");

  // TODO: Add more tests here
  // Check for description meta tag content - https://playwright.dev/docs/api/class-locator#locatorgetattribute
  // const description = await page
  //   .locator('meta[name="description"]')
  //   .getAttribute("content");
  // expect(description).toBe(
  //   "Terra Watts provides innovative subsurface wireless transmission to power your future."
  // );
});
