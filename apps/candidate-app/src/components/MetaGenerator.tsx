import { useEffect } from "react";

interface MetaManagerProps {
    title: string;
    description: string;
    keywords?: string | string[];
    author?: string;
    language?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    twitterImage?: string;
    robots?: string;
    viewport?: string;
    themeColor?: string;
    schema?: object | Array<object>;
    additionalMeta?: Array<{
        name?: string;
        property?: string;
        content: string;
    }>;
}

/**
 * MetaManager - A React component that manages document metadata
 *
 * This component uses useEffect to update document metadata when mounted
 * and restores previous values when unmounted.
 */
const MetaManager = ({
    title,
    description,
    keywords,
    author,
    language,
    canonicalUrl = "https://headsin.co",
    ogImage,
    ogType = "website",
    twitterCard = "summary_large_image",
    twitterImage,
    robots,
    viewport,
    themeColor,
    schema,
    additionalMeta = [],
}: MetaManagerProps) => {
    useEffect(() => {
        // Save original values to restore on cleanup
        const originalTitle = document.title;
        const metaTags: Record<string, string> = {};

        // Set document title
        document.title = title;

        // Function to update a meta tag or create it if it doesn't exist
        const updateMetaTag = (selector: string, content: string) => {
            let metaTag = document.querySelector(selector) as HTMLMetaElement;

            // Save original value
            if (metaTag) {
                metaTags[selector] = metaTag.getAttribute("content") || "";
            } else {
                // Create the meta tag if it doesn't exist
                metaTag = document.createElement("meta");

                if (selector.includes("name=")) {
                    metaTag.setAttribute("name", selector.split("'")[1]);
                } else if (selector.includes("property=")) {
                    metaTag.setAttribute("property", selector.split("'")[1]);
                }

                document.head.appendChild(metaTag);
            }

            // Set new content
            metaTag.setAttribute("content", content);
        };

        // Update common meta tags
        updateMetaTag("meta[name='description']", description);

        // Handle keywords (can be string or array)
        if (keywords) {
            const keywordsContent = Array.isArray(keywords)
                ? keywords.join(", ")
                : keywords;
            updateMetaTag("meta[name='keywords']", keywordsContent);
        }

        // Author metadata
        if (author) {
            updateMetaTag("meta[name='author']", author);
        }

        // Language metadata
        if (language) {
            updateMetaTag("meta[name='language']", language);
            document.documentElement.setAttribute("lang", language);
        }

        // Robots directives
        if (robots) {
            updateMetaTag("meta[name='robots']", robots);
        }

        // Viewport settings
        if (viewport) {
            updateMetaTag("meta[name='viewport']", viewport);
        }

        // Theme color
        if (themeColor) {
            updateMetaTag("meta[name='theme-color']", themeColor);
        }

        // Open Graph metadata
        updateMetaTag("meta[property='og:title']", title);
        updateMetaTag("meta[property='og:description']", description);
        updateMetaTag("meta[property='og:type']", ogType);
        updateMetaTag("meta[property='og:url']", canonicalUrl);

        if (ogImage) {
            updateMetaTag("meta[property='og:image']", ogImage);
        }

        // Twitter Card metadata
        updateMetaTag("meta[name='twitter:card']", twitterCard);
        updateMetaTag("meta[name='twitter:title']", title);
        updateMetaTag("meta[name='twitter:description']", description);

        if (twitterImage || ogImage) {
            updateMetaTag(
                "meta[name='twitter:image']",
                twitterImage || ogImage || ""
            );
        }

        // Handle schema.org structured data
        if (schema) {
            // Remove any existing schema scripts first
            const existingSchemaScripts = document.querySelectorAll(
                'script[type="application/ld+json"]'
            );
            const originalSchemaScripts: {
                element: HTMLScriptElement;
                content: string;
            }[] = [];

            existingSchemaScripts.forEach((script) => {
                originalSchemaScripts.push({
                    element: script as HTMLScriptElement,
                    content: script.textContent || "",
                });
            });
        }

        // Add new schema script
        const schemaScript = document.createElement("script");
        schemaScript.type = "application/ld+json";
        schemaScript.textContent = JSON.stringify(schema);
        document.head.appendChild(schemaScript);

        // Store this created script for cleanup
        const createdSchemaScript = schemaScript;

        // Update canonical URL
        let canonicalLink = document.querySelector(
            "link[rel='canonical']"
        ) as HTMLLinkElement;
        const originalCanonical = canonicalLink?.getAttribute("href");

        if (canonicalLink) {
            canonicalLink.setAttribute("href", canonicalUrl);
        } else {
            canonicalLink = document.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            canonicalLink.setAttribute("href", canonicalUrl);
            document.head.appendChild(canonicalLink);
        }

        // Add any additional meta tags
        const createdMetaTags: HTMLMetaElement[] = [];
        additionalMeta.forEach((meta) => {
            const metaTag = document.createElement("meta");

            if (meta.name) {
                metaTag.setAttribute("name", meta.name);
            }

            if (meta.property) {
                metaTag.setAttribute("property", meta.property);
            }

            metaTag.setAttribute("content", meta.content);
            document.head.appendChild(metaTag);
            createdMetaTags.push(metaTag);
        });

        // Cleanup function - restore original values on unmount
        return () => {
            document.title = originalTitle;

            Object.entries(metaTags).forEach(([selector, content]) => {
                const metaTag = document.querySelector(
                    selector
                ) as HTMLMetaElement;
                if (metaTag) {
                    metaTag.setAttribute("content", content);
                }
            });

            // Remove the schema script we created
            if (
                schema &&
                createdSchemaScript &&
                document.head.contains(createdSchemaScript)
            ) {
                document.head.removeChild(createdSchemaScript);
            }

            if (canonicalLink && originalCanonical) {
                canonicalLink.setAttribute("href", originalCanonical);
            }

            // Remove any additional meta tags we created
            createdMetaTags.forEach((tag) => {
                document.head.removeChild(tag);
            });
        };
    }, [
        title,
        description,
        keywords,
        author,
        language,
        canonicalUrl,
        ogImage,
        ogType,
        twitterCard,
        twitterImage,
        robots,
        viewport,
        themeColor,
        schema,
        additionalMeta,
    ]);

    // This component doesn't render anything
    return null;
};

export default MetaManager;
