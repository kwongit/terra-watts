import { createClient, Entry } from 'contentful';

document.addEventListener("DOMContentLoaded", () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  // Define interfaces for Contentful entry fields
  interface HeaderFields {
    title: string;
    navLinkText: string;
  }

  interface SectionFields {
    sectionId: string;
    title: string;
    content: string;
    image?: { fields: { file: { url: string } } };
  }

  interface GalleryItemFields {
    title: string;
    description: string;
    image: { fields: { file: { url: string } } };
    link?: string;
  }

  interface PartnershipFields {
    title: string;
    logo: { fields: { file: { url: string } } };
  }

  // Function to update a section
  function updateSection(sectionId: string, title: string, content: string, imageUrl: string | null) {
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
      const imageSection = section?.querySelector<HTMLImageElement>(`.image img`);
      if (imageSection) {
        imageSection.src = imageUrl;
      }
    }
  }

  // Function to create and append new gallery items
  function updateGallery(items: { title: string, description: string, imageUrl: string, link: string }[]) {
    const gallery = document.querySelector(".gallery");
    if (gallery) {
      // Reverse the array of items
      items.reverse();
      gallery.innerHTML = ""; // Clear existing content
      items.forEach((item) => {
        const article = document.createElement("article");
        const link = document.createElement("a");
        link.href = item.link;
        link.classList.add("image");
        link.target = "#";
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

  // Function to update partnerships
  function updatePartnerships(partnerships: { title: string, logoUrl: string }[]) {
    const partnershipsSection = document.querySelector("#partnerships .items");
    if (partnershipsSection) {
      // Reverse the array of items
      partnerships.reverse();
      partnershipsSection.innerHTML = ""; // Clear existing content
      partnerships.forEach((partnership) => {
        const section = document.createElement("section");
        const img = document.createElement("img");
        img.classList.add("partnership-logo");
        img.src = partnership.logoUrl;
        img.alt = `${partnership.title} Logo`;
        section.appendChild(img);
        partnershipsSection.appendChild(section);
      });
    }
  }

  client
    .getEntries<HeaderFields>({
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
    .catch((err) => console.error("Error fetching Contentful Nav Bar data:", err));

  // Fetch and update sections
  client
    .getEntries<SectionFields>({
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
    .catch((err) => console.error("Error fetching Contentful Main Content data:", err));

  // Fetch and update gallery
  client
    .getEntries<GalleryItemFields>({
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
    .catch((err) => console.error("Error fetching Contentful Team Member data:", err));

  // Fetch and update partnerships
  client
    .getEntries<PartnershipFields>({
      content_type: "partnership",
    })
    .then((response) => {
      const partnerships = response.items.map((entry) => ({
        title: entry.fields.title,
        logoUrl: entry.fields.logo.fields.file.url,
      }));
      updatePartnerships(partnerships);
    })
    .catch((err) => console.error("Error fetching Contentful Partnership data:", err));
});
