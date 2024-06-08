// import { createClient } from "https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js";

const client = contentful.createClient({
  // space: process.env.CONTENTFUL_SPACE_ID,
  // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: window.env.CONTENTFUL_SPACE_ID,
  accessToken: window.env.CONTENTFUL_ACCESS_TOKEN,
});

document.addEventListener("DOMContentLoaded", () => {
  client
    .getEntries({
      content_type: "header",
    })
    .then((response) => {
      const headerEntry = response.items[0];
      if (headerEntry) {
        const title = headerEntry.fields.title;
        const navLinkText = headerEntry.fields.navLinkText;

        const headerTitle = document.querySelector("#header h1 a");
        const navLink = document.querySelector("#header nav a");

        if (headerTitle) {
          headerTitle.textContent = title;
        }
        if (navLink) {
          navLink.textContent = navLinkText;
        }
      }
    })
    .catch((err) => console.error("Error fetching Contentful data:", err));
});
