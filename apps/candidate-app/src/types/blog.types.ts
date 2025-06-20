type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    views: number;
    author: {
        name: string;
        initials: string;
    };
    category: {
        name: string;
        slug: string;
    };
    featuredImage: {
        url: string;
        alt: string;
        caption: string;
    };
    content: ContentBlock[];
};

type ContentBlock =
    | { type: "paragraph"; content: string }
    | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; content: string }
    | { type: "list"; style: "unordered" | "ordered"; items: string[] };

export type { BlogPost, ContentBlock };