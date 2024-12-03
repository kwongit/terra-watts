import { test, expect } from "@playwright/test";

// Enable headed mode for debugging
test.use({ headless: false });

// Page Title and Description
test("Check page title and description meta tags are correct", async ({
  page,
}) => {
  // Use 'page' to interact with the web app, e.g., navigating to a URL
  await page.goto("https://terra-watts.com/");

  // Use 'expect' to assert conditions about the page state, e.g., check the title. This is the preferred way to check title, as it waits for the title to be available before checking it (unlike page.title()) - https://playwright.dev/docs/api/class-page#pagewaitfortitle
  await expect(page).toHaveTitle("Terra Watts - Renewable Energy Solutions");

  // Check for description meta tag content - https://playwright.dev/docs/api/class-locator#locatorgetattribute. This is the preferred way to check meta tag content, as it waits for the content to be available before checking it (unlike page.getAttribute()) - https://playwright.dev/docs/api/class-page#pagegetattribute.
  // Note: The description meta tag content is not visible on the page, so we need to use getAttribute() to get the content. If the content is visible on the page, we can use textContent() to get the content.
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute("content");
  expect(description).toBe(
    "Terra Watts provides innovative subsurface wireless transmission to power your future."
  );
});

// Navigation Link
// TODO: Need to debug this test
test("Check 'Want To Chat?' button navigates to Contact section", async ({
  page,
}) => {
  await page.goto("https://terra-watts.com/");
  await page.click('text="Want To Chat?"');
  await page.waitForSelector("#contact");
  const contactVisible = await page.isVisible("#contact");
  expect(contactVisible).toBe(true);
  await expect(page).toHaveURL("https://terra-watts.com/#contact");
});

// Spotlight Sections: Ensure that each spotlight section has the expected content.

// Meet the Team Section: Verify the CEO's information is displayed correctly and the link works.

// Partnerships Section: Check that the partnerships section displays the correct logo.

// Social Media Links: Validate that social media links are present and direct to the correct URLs.

// Images Visibility: Check that important images are visible on the page.
