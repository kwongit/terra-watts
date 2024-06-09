document.addEventListener("DOMContentLoaded", () => {
  const client = contentful.createClient({
    // space: process.env.CONTENTFUL_SPACE_ID,
    // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    // process does not work. need to find another way to store API keys
    space: "gxq41zi7q6dh",
    accessToken: "gXpDSgdpbtZzG7Ze0_RvckuQLHLBWoHOw3e8zz-qoSQ",
  });

  // Function to update a section
  function updateSection(sectionId, title, content, imageUrl) {
    const section = document.getElementById(sectionId);
    if (section) {
      const h2 = section.querySelector("h2");
      const p = section.querySelector("p");
      if (h2) {
        h2.textContent = title;
      }
      if (p) {
        p.textContent = content;
      }
    }
    // Update image if available
    if (imageUrl) {
      const imageSection = document.querySelector(`#${sectionId} .image img`);
      if (imageSection) {
        imageSection.src = imageUrl;
      }
    }
  }

  // Function to update the gallery
  // function updateGallery(items) {
  //   const gallery = document.querySelector(".gallery");
  //   if (gallery) {
  //     items.forEach((item, index) => {
  //       const article = gallery.querySelector(
  //         `article:nth-child(${index + 1})`
  //       );
  //       if (article) {
  //         const link = article.querySelector("a");
  //         const img = article.querySelector("img");
  //         const h3 = article.querySelector("h3");
  //         const p = article.querySelector("p");

  //         if (link) link.href = item.link;
  //         if (img) img.src = item.imageUrl;
  //         if (img) img.alt = item.title;
  //         if (h3) h3.textContent = item.title;
  //         if (p) p.textContent = item.description;
  //       }
  //     });
  //   }
  // }

  // Function to create and append new gallery items
  function updateGallery(items) {
    const gallery = document.querySelector(".gallery");
    if (gallery) {
      gallery.innerHTML = ""; // Clear existing content
      items.forEach((item) => {
        const article = document.createElement("article");

        const link = document.createElement("a");
        link.href = item.link;
        link.classList.add("image");
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        link.appendChild(img);

        const caption = document.createElement("div");
        caption.classList.add("caption");

        const h3 = document.createElement("h3");
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.textContent = item.description;

        caption.appendChild(h3);
        caption.appendChild(p);

        article.appendChild(link);
        article.appendChild(caption);

        gallery.appendChild(article);
      });
    }
  }

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

  // Fetch and update sections
  client
    .getEntries({
      content_type: "section",
    })
    .then((response) => {
      response.items.forEach((entry) => {
        const sectionId = entry.fields.sectionId;
        const title = entry.fields.title;
        const content = entry.fields.content;
        const imageUrl = entry.fields.image
          ? entry.fields.image.fields.file.url
          : null;

        updateSection(sectionId, title, content, imageUrl);
      });
    })
    .catch((err) => console.error("Error fetching Contentful data:", err));

  // Fetch and update gallery
  client
    .getEntries({
      content_type: "galleryItem",
    })
    .then((response) => {
      const galleryItems = response.items.map((entry) => ({
        title: entry.fields.title,
        description: entry.fields.description,
        imageUrl: entry.fields.image.fields.file.url,
        link: entry.fields.link ? entry.fields.link : "#",
      }));
      updateGallery(galleryItems);
    })
    .catch((err) => console.error("Error fetching Contentful data:", err));
});
