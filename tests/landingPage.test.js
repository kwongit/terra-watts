import { test, expect } from "@playwright/test";
import { expectedSpotlightContent } from "./data/expectedSpotlightContent.js";

// Enable headed mode for debugging
// test.use({ headless: false });

test.describe("Landing Page Tests", () => {
  // Reuse common setup for navigating to the landing page
  test.beforeEach(async ({ page }) => {
    // Use 'page' to interact with the web app, e.g., navigating to a URL
    await page.goto("https://terra-watts.com/");
  });

  // 1. Page Title and Description
  test("Check page title and description meta tags are correct", async ({
    page,
  }) => {
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

  // 2. Navigation Link
  test("Check 'Want To Chat?' link navigates to Contact section", async ({
    page,
  }) => {
    // Click the "Want To Chat?" link
    await page.click('a[href="#contact"]');

    // Verify the URL includes #contact
    await expect(page).toHaveURL("https://terra-watts.com/#contact");

    // Verify the contact section is scrolled into view
    // page.evaluate() allows you to run JavaScript code within the browser's context, giving you direct access to the DOM, including methods like getBoundingClientRect().
    const scrolledToContact = await page.evaluate(() => {
      // Use querySelector() (inside page.evaluate or page.$$eval) when you need to perform more complex interactions within the browser context.
      const contactSection = document.querySelector("#contact");
      const rect = contactSection.getBoundingClientRect();
      // Ensures the top of the section is within the viewport
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    expect(scrolledToContact).toBe(true);
  });

  // 3. Spotlight Sections
  test("Check spotlight sections have the expected content", async ({
    page,
  }) => {
    // Extract headings and paragraphs within spotlight sections
    // If you’re extracting data from multiple elements in bulk, page.$$eval() is typically the way to go.
    // `page.$$eval` selects all elements with the class "spotlight" and evaluates a function on them.
    const spotlightContent = await page.$$eval(".spotlight", (sections) =>
      sections.map((section) => {
        // For each spotlight section, extract the text content of the <h2> heading.
        // Use querySelector() (inside page.evaluate or page.$$eval) when you need to perform more complex interactions within the browser context.
        const heading = section.querySelector("h2").textContent.trim();

        // Extract the text content of the <p> paragraph.
        const paragraph = section
          // Select the <p> element within the section.
          .querySelector("p")
          // Get the text content of the paragraph.
          .textContent // Replace multiple spaces, newlines, and tabs with a single space to normalize whitespace.
          .replace(/\s+/g, " ")
          // Remove leading and trailing spaces.
          .trim();

        // Return an object containing the extracted heading and paragraph.
        return { heading, paragraph };
      })
    );

    // Verify that the number of spotlight sections found matches the expected number (3)
    expect(spotlightContent.length).toBe(3);

    // Verify that the extracted spotlight content matches the expected content
    expect(spotlightContent).toEqual(expectedSpotlightContent);
  });

  // TODO: next tests to add
  // 4. Meet the Team Section
  test("Check team section displays CEO information and link works", async ({
    page,
    context,
  }) => {
    // Verify the heading of the team section
    // Use page.textContent() when you want to quickly get the text content of an element and let Playwright handle waiting for the element.
    const teamHeading = await page.textContent("#team-members h2");
    expect(teamHeading).toBe("Meet the team");

    // Verify the title of the team member
    const memberTitle = await page.textContent("#team-members h3");
    expect(memberTitle).toBe("Co-Founder & CEO");

    // Verify the name of the team member
    const memberName = await page.textContent("#team-members p");
    expect(memberName).toBe("Kaitlyn Suarez");

    // Verify the href attribute of the link
    const memberLink = await page.getAttribute("#team-members a", "href");
    expect(memberLink).toBe("https://www.activate.org/terra-watts");

    // Prepare to handle the new tab
    const [newPage] = await Promise.all([
      // Waits for a new tab (page) to open in the browser context. This is necessary because clicking the link initiates the tab opening asynchronously.
      context.waitForEvent("page"),
      // Clicks the link that is expected to open a new tab. The Promise.all ensures the click action and the wait for the new tab happen simultaneously.
      page.click("#team-members a"),
    ]);

    // Wait for the new page to fully load
    await newPage.waitForLoadState("domcontentloaded");

    // Verify the URL of the new tab
    expect(newPage.url()).toBe("https://www.activate.org/terra-watts");
  });

  // 5. Partnerships Section: Check that the partnerships section displays the correct logo.

  // 6. Social Media Links: Validate that social media links are present and direct to the correct URLs.

  // 7. Images Visibility: Check that important images are visible on the page.
});
