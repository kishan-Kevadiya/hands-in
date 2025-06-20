import { DefaultImg } from "@/assets/images";
import WordPullUp from "@/components/animated/WordPullUp";
import MetaGenerator from "@/components/MetaGenerator";
import { blogPosts } from "@/helpers/blog-data";
import { BlogPost } from "@/types/blog.types";
import React, { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const DiscoverDetail: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [detail, setDetail] = useState<BlogPost>();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (slug) {
            const selectedDetail: BlogPost = blogPosts.find(
                (item) => item.slug === slug
            )!;
            setDetail(selectedDetail);
        }
    }, [slug]);

    if (!detail) {
        return (
            <p className="text-center text-gray-500 mt-6">Detail not found.</p>
        );
    }

    return (
        <div className="flex flex-col bg-[#F8F8F8] rounded-3xl items-center mb-10 md:mb-20 justify-center mx-4 md:mx-10 p-4 md:p-6 lg:p-10">
            <MetaGenerator
                title={`HeadsIn | ${detail.title}`}
                description={detail.excerpt}
                canonicalUrl={`https://www.headsin.co/discover/${detail.slug}`}
            />

            <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-6 md:gap-10 px-0 lg:px-13">
                <h3 className="text-[#DF6789] text-start font-semibold text-md md:text-xl">
                    <span
                        onClick={() => navigate("/discover")}
                        className="pi pi-arrow-left mr-3 hover:bg-[#DF6789] hover:text-white rounded-sm p-2 transition-all duration-300 ease-in-out cursor-pointer"
                    ></span>{" "}
                    {detail.category.name}
                </h3>

                <WordPullUp>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                        {detail.title}
                    </h1>
                </WordPullUp>

                <div className="flex w-full aspect-video bg-amber-50 rounded-[30px] md:rounded-3xl bg-cover overflow-hidden">
                    <img
                        src={detail.featuredImage.url || DefaultImg}
                        alt={detail.featuredImage.alt}
                        className="w-full aspect-video object-cover rounded-3xl"
                    />
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                    <span className="pi pi-calendar text-[#DF6789] text-xl ml-4"></span>
                    <span className="text-[#3F3F3F] font-semibold text-md md:text-lg">
                        {detail.date}
                    </span>
                </div>

                <div className="prose prose-sm md:prose-lg max-w-none font-medium w-full p-4 md:p-6 text-black bg-white rounded-3xl">
                    {detail.content &&
                        detail?.content.map((section, index) => {
                            if (section.type === "paragraph") {
                                return (
                                    <p
                                        key={index}
                                        dangerouslySetInnerHTML={{
                                            __html: section.content,
                                        }}
                                    />
                                );
                            } else if (section.type === "heading") {
                                const HeadingTag =
                                    `h${section.level}` as keyof JSX.IntrinsicElements;
                                return (
                                    <HeadingTag key={index}>
                                        {section.content}
                                    </HeadingTag>
                                );
                            } else if (section.type === "list") {
                                if (section.style === "unordered") {
                                    return (
                                        <ul key={index}>
                                            {section.items.map(
                                                (item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        dangerouslySetInnerHTML={{
                                                            __html: item,
                                                        }}
                                                    />
                                                )
                                            )}
                                        </ul>
                                    );
                                } else {
                                    return (
                                        <ol key={index}>
                                            {section.items.map(
                                                (item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        dangerouslySetInnerHTML={{
                                                            __html: item,
                                                        }}
                                                    />
                                                )
                                            )}
                                        </ol>
                                    );
                                }
                            }
                            return null;
                        })}
                </div>
            </div>
        </div>
    );
};

export default DiscoverDetail;
