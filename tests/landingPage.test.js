import { test, expect } from "@playwright/test";
import { expectedSpotlightContent } from "./data/expectedSpotlightContent.js";

// Enable headed mode for debugging
// test.use({ headless: false });

// Define reusable selectors
const selectors = {
  descriptionMeta: 'meta[name="description"]',
  wantToChatLink: 'a[href="#contact"]',
  contactSection: "#contact",
  spotlightSections: ".spotlight",
  teamHeading: "#team-members h2",
  teamTitle: "#team-members h3",
  teamName: "#team-members p",
  teamLink: "#team-members a",
  partnershipsHeading: "#partnerships h2",
  partnershipLogos: ".partnership-logo",
  twitterLink: 'a[href="https://twitter.com/TerraWattsInc"]',
  linkedinLink: 'a[href="https://www.linkedin.com/company/terra-watts/"]',
  emailLink: 'a[href="mailto:kaitlyn@terra-watts.com?subject=Hello"]',
  worldImage: "#top-image",
  bannerImage: "#banner-image",
  // ceoImage: 'img[alt="Kaitlyn Suarez"]',
  ceoImage: 'img[alt="Co-Founder & CEO"]', // Being overriden by Contentful CMS
  // ceoImage: 'img[src*="li-profile-pic.jpg"]', // Alternative to use src attribute
};

test.describe("Landing Page Tests", () => {
  // Navigate to the landing page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://terra-watts.com/");
  });

  // 1. Page Title and Description
  test("Check page title and description meta tags are correct", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Terra Watts - Renewable Energy Solutions");

    // Note: Since <meta> tags are not rendered visibly on the page, we need to use getAttribute() to retrieve the "content" attribute value.
    const description = await page
      .locator(selectors.descriptionMeta)
      .getAttribute("content");
    expect(description).toBe(
      "Terra Watts provides innovative subsurface wireless transmission to power your future."
    );
  });

  // 2. Navigation Link
  test("Check 'Want To Chat?' link navigates to Contact section", async ({
    page,
  }) => {
    await page.click(selectors.wantToChatLink);
    await expect(page).toHaveURL(/#contact/);
    await expect(page.locator(selectors.contactSection)).toBeVisible();
  });

  // 3. Spotlight Sections
  test("Check spotlight sections have the expected content", async ({
    page,
  }) => {
    // If you’re extracting data from multiple elements in bulk, page.$$eval() is a great choice. It selects all elements matching the provided selector and evaluates a function on them.
    const spotlightContent = await page.$$eval(
      selectors.spotlightSections,
      (sections) =>
        sections.map((section) => {
          // For each section, extract the text content of the <h2> heading and the <p> paragraph. Use querySelector() inside page.$$eval() to interact with the elements within the browser context.
          const heading =
            section.querySelector("h2")?.textContent?.trim() || "";
          const paragraph =
            section
              .querySelector("p")
              ?.textContent?.replace(/\s+/g, " ")
              .trim() || "";
          return { heading, paragraph };
        })
    );
    expect(spotlightContent.length).toBe(3);
    expect(spotlightContent).toEqual(expectedSpotlightContent);
  });

  // 4. Meet the Team Section
  test("Check team section displays CEO information and link works", async ({
    page,
    context,
  }) => {
    await expect(page.locator(selectors.teamHeading)).toHaveText(
      "Meet the team"
    );
    await expect(page.locator(selectors.teamTitle)).toHaveText(
      "Co-Founder & CEO"
    );
    await expect(page.locator(selectors.teamName)).toHaveText("Kaitlyn Suarez");
    await expect(page.locator(selectors.teamLink)).toHaveAttribute(
      "href",
      "https://www.activate.org/terra-watts"
    );

    // Prepare to handle the new tab
    const [newPage] = await Promise.all([
      // Waits for a new tab (page) to open in the browser context. This is necessary because clicking the link initiates the tab opening asynchronously.
      context.waitForEvent("page"),
      // Clicks the link that is expected to open a new tab. The Promise.all ensures the click action and the wait for the new tab happen simultaneously.
      page.click(selectors.teamLink),
    ]);

    // Wait for the new page to fully load
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toBe("https://www.activate.org/terra-watts");
  });

  // 5. Partnerships Section
  test("Check partnerships section displays the correct logo", async ({
    page,
  }) => {
    await expect(page.locator(selectors.partnershipsHeading)).toHaveText(
      "Partnerships"
    );

    // Extract alt Attributes from All Logos.
    const logoAlts = await page.$$eval(selectors.partnershipLogos, (logos) =>
      logos.map((logo) => logo.alt)
    );
    expect(logoAlts).toContain("Activate Logo");
  });

  // 6. Social Media Links
  test("Check social media links are present and direct to the correct URLs", async ({
    page,
    context,
  }) => {
    await expect(page.locator(selectors.contactSection)).toContainText(
      "Get in touch"
    );
    await expect(page.locator(selectors.twitterLink)).toHaveAttribute(
      "href",
      "https://twitter.com/TerraWattsInc"
    );
    await expect(page.locator(selectors.linkedinLink)).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/terra-watts/"
    );
    await expect(page.locator(selectors.emailLink)).toHaveAttribute(
      "href",
      "mailto:kaitlyn@terra-watts.com?subject=Hello"
    );

    // Function to handle new tab opening and URL verification
    const verifyLinkOpensNewTab = async (linkSelector, expectedUrl) => {
      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.click(linkSelector),
      ]);

      // Wait for the new page to fully load
      await newPage.waitForLoadState("domcontentloaded");
      expect(newPage.url()).toBe(expectedUrl);
    };

    // Verify Twitter link
    await verifyLinkOpensNewTab(
      selectors.twitterLink,
      "https://x.com/TerraWattsInc?mx=2"
    );

    // Verify LinkedIn link
    await verifyLinkOpensNewTab(
      selectors.linkedinLink,
      "https://www.linkedin.com/company/terra-watts/"
    );
  });

  // 7. Images Visibility
  test("Check important images are visible", async ({ page }) => {
    await expect(page.locator(selectors.worldImage)).toBeVisible();
    await expect(page.locator(selectors.bannerImage)).toBeVisible();
    // console.log(await page.locator(selectors.ceoImage).getAttribute("alt")); // Debugging
    await expect(page.locator(selectors.ceoImage)).toBeVisible();
  });

  // TODO: Add more tests as needed
  // performance, accessibility, responsive design, etc.
  test("Page returns status code 200", async ({ page }) => {
    const response = await page.goto("https://terra-watts.com/");
    expect(response?.status()).toBe(200);
  });
});
