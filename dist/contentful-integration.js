"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contentful_1 = require("contentful");
document.addEventListener("DOMContentLoaded", function () {
    var client = (0, contentful_1.createClient)({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    // Function to update a section
    function updateSection(sectionId, title, content, imageUrl) {
        var section = document.getElementById(sectionId);
        if (section) {
            var h2 = section.querySelector("h2");
            var p = section.querySelector("p");
            if (h2) {
                h2.textContent = title;
            }
            if (p) {
                p.textContent = content;
            }
        }
        // Update image if available
        if (imageUrl) {
            var imageSection = section === null || section === void 0 ? void 0 : section.querySelector(".image img");
            if (imageSection) {
                imageSection.src = imageUrl;
            }
        }
    }
    // Function to create and append new gallery items
    function updateGallery(items) {
        var gallery = document.querySelector(".gallery");
        if (gallery) {
            // Reverse the array of items
            items.reverse();
            gallery.innerHTML = ""; // Clear existing content
            items.forEach(function (item) {
                var article = document.createElement("article");
                var link = document.createElement("a");
                link.href = item.link;
                link.classList.add("image");
                link.target = "#";
                var img = document.createElement("img");
                img.src = item.imageUrl;
                img.alt = item.title;
                link.appendChild(img);
                var caption = document.createElement("div");
                caption.classList.add("caption");
                var h3 = document.createElement("h3");
                h3.textContent = item.title;
                var p = document.createElement("p");
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
    function updatePartnerships(partnerships) {
        var partnershipsSection = document.querySelector("#partnerships .items");
        if (partnershipsSection) {
            // Reverse the array of items
            partnerships.reverse();
            partnershipsSection.innerHTML = ""; // Clear existing content
            partnerships.forEach(function (partnership) {
                var section = document.createElement("section");
                var img = document.createElement("img");
                img.classList.add("partnership-logo");
                img.src = partnership.logoUrl;
                img.alt = "".concat(partnership.title, " Logo");
                section.appendChild(img);
                partnershipsSection.appendChild(section);
            });
        }
    }
    client
        .getEntries({
        content_type: "header",
    })
        .then(function (response) {
        var headerEntry = response.items[0];
        if (headerEntry) {
            var title = headerEntry.fields.title;
            var navLinkText = headerEntry.fields.navLinkText;
            var headerTitle = document.querySelector("#header h1 a");
            var navLink = document.querySelector("#header nav a");
            if (headerTitle) {
                headerTitle.textContent = title;
            }
            if (navLink) {
                navLink.textContent = navLinkText;
            }
        }
    })
        .catch(function (err) { return console.error("Error fetching Contentful data:", err); });
    // Fetch and update sections
    client
        .getEntries({
        content_type: "section",
    })
        .then(function (response) {
        response.items.forEach(function (entry) {
            var sectionId = entry.fields.sectionId;
            var title = entry.fields.title;
            var content = entry.fields.content;
            var imageUrl = entry.fields.image
                ? entry.fields.image.fields.file.url
                : null;
            updateSection(sectionId, title, content, imageUrl);
        });
    })
        .catch(function (err) { return console.error("Error fetching Contentful data:", err); });
    // Fetch and update gallery
    client
        .getEntries({
        content_type: "galleryItem",
    })
        .then(function (response) {
        var galleryItems = response.items.map(function (entry) { return ({
            title: entry.fields.title,
            description: entry.fields.description,
            imageUrl: entry.fields.image.fields.file.url,
            link: entry.fields.link ? entry.fields.link : "#",
        }); });
        updateGallery(galleryItems);
    })
        .catch(function (err) { return console.error("Error fetching Contentful data:", err); });
    // Fetch and update partnerships
    client
        .getEntries({
        content_type: "partnership",
    })
        .then(function (response) {
        var partnerships = response.items.map(function (entry) { return ({
            title: entry.fields.title,
            logoUrl: entry.fields.logo.fields.file.url,
        }); });
        updatePartnerships(partnerships);
    })
        .catch(function (err) { return console.error("Error fetching Contentful data:", err); });
});
