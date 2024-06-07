document.addEventListener("DOMContentLoaded", function () {
  // const contentful = require("contentful");

  // Initialize Contentful client directly
  const client = contentful.createClient({
    space: "a5vqb0h4v6pt",
    accessToken: "oGXO7WACT5mN4bS502lZjlsTfJT8t49z1rXpMYK4r64",
  });

  // Fetch header content
  client
    .getEntries({ content_type: "header" })
    .then((response) => {
      if (response.items.length > 0) {
        const header = response.items[0].fields;
        document.getElementById(
          "site-title"
        ).innerHTML = `<a href="index.html">${header.title}</a>`;
        document.getElementById("nav-link").innerText =
          header.navigationLinkText;
        document.getElementById("nav-link").href = header.navigationLinkHref;
      } else {
        console.error("No entries found for header content type");
      }
    })
    .catch((err) => console.error("Error fetching header content:", err));

  // Fetch banner section content
  client
    .getEntries({ content_type: "bannerSection" })
    .then((response) => {
      if (response.items.length > 0) {
        const banner = response.items[0].fields;
        document.getElementById("top-image").src =
          banner.topImage.fields.file.url;
        document.getElementById("banner-image").src =
          banner.bannerImage.fields.file.url;
      } else {
        console.error("No entries found for bannerSection content type");
      }
    })
    .catch((err) =>
      console.error("Error fetching banner section content:", err)
    );

  // Add additional fetch logic for other sections here...
});
