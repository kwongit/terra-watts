const contentful = require("contentful");

// Wait for the window to load completely before executing the script
// window.addEventListener("load", async function () {
window.addEventListener("DOMContentLoaded", async function () {
  try {
    // Initialize Contentful client directly
    const client = contentful.createClient({
      space: "",
      accessToken: "",
    });

    // Fetch header content
    const headerResponse = await client.getEntries({ content_type: "header" });
    if (headerResponse.items.length > 0) {
      const header = headerResponse.items[0].fields;
      document.getElementById(
        "site-title"
      ).innerHTML = `<a href="index.html">${header.title}</a>`;
      document.getElementById("nav-link").innerText = header.navigationLinkText;
      document.getElementById("nav-link").href = header.navigationLinkHref;
    } else {
      console.error("No entries found for header content type");
    }

    // Fetch banner section content
    const bannerResponse = await client.getEntries({
      content_type: "bannerSection",
    });
    if (bannerResponse.items.length > 0) {
      const banner = bannerResponse.items[0].fields;
      document.getElementById("top-image").src =
        banner.topImage.fields.file.url;
      document.getElementById("banner-image").src =
        banner.bannerImage.fields.file.url;
    } else {
      console.error("No entries found for bannerSection content type");
    }

    // Add additional fetch logic for other sections here...
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
  }
});
