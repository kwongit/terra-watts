import { test, expect } from "@playwright/test";

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
    const scrolledToContact = await page.evaluate(() => {
      const contactSection = document.querySelector("#contact");
      const rect = contactSection.getBoundingClientRect();
      // Ensures the top of the section is within the viewport
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    expect(scrolledToContact).toBe(true);
  });

  // TODO: next tests to add
  // 3. Spotlight Sections
  test("Check spotlight sections have the expected content", async ({
    page,
  }) => {
    // Extract headings and paragraphs within spotlight sections
    const spotlightContent = await page.$$eval(".spotlight", (sections) =>
      sections.map((section) => {
        const heading = section.querySelector("h2")?.textContent?.trim();
        const paragraph = section
          .querySelector("p")
          ?.textContent?.replace(/\s+/g, " ") // Normalize whitespace
          .trim();
        return { heading, paragraph };
      })
    );

    // Expected content for headings and paragraphs
    const expectedContent = [
      {
        heading: "Critical Need",
        paragraph:
          "The demand for minerals vital to energy technologies is projected to surge by 500 percent by 2050, posing a significant challenge to combating climate change and ensuring national security. Geoscientists have expressed concerns about the limited resources available to meet the demand. It is therefore crucial to develop innovative approaches for the transition toward clean energy. One potential solution is to reduce our dependence on minerals by developing wireless methods to transmit power and electrify devices.",
      },
      {
        heading: "Technology Vision",
        paragraph:
          "Innovation in wireless power transmission can potentially reduce dependency on wires and batteries. However, current wireless power technology faces several limitations, including line-of-sight dependence and short transmission range. Terra Watts is revolutionizing the industry by introducing technology that uses the earth as a power propagation medium, enabling wireless power transmission at the kilometer scale. This technology allows for the direct operation of electrical devices via a receiver—no batteries required. Moreover, Terra Watts is innovating in underground data communication methods, an emerging technology that can uniquely facilitate simultaneous long-range wireless power transmission and data communication.",
      },
      {
        heading: "Potential For Impact",
        paragraph:
          "Terra Watt’s innovation in wireless power transmission has versatile applications across many industries. The near-term application will significantly impact farming by wirelessly powering and transmitting data to underground soil sensors. The long-term goal is to deliver power to larger electronic devices and buildings in agriculture and other industries. Moreover, advancements in wireless power transmission can increase the range of the energy grid by eliminating the need for wires, aiding in the challenges of delivering power to the last mile. The potential of wireless power transmission is enormous, and its development is crucial for a sustainable future.",
      },
    ];

    // Verify the number of spotlight sections
    expect(spotlightContent.length).toBe(3);

    // Verify the content of each section
    expect(spotlightContent).toEqual(expectedContent);
  });

  // 4. Meet the Team Section: Verify the CEO's information is displayed correctly and the link works.
  // 5. Partnerships Section: Check that the partnerships section displays the correct logo.
  // 6. Social Media Links: Validate that social media links are present and direct to the correct URLs.
  // 7. Images Visibility: Check that important images are visible on the page.
});
