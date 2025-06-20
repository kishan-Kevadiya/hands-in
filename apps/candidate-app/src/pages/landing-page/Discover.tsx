import { DefaultImg } from "@/assets/images";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import { blogPosts } from "@/helpers/blog-data";
import { useNavigate } from "react-router";

const Discover = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-[1440px] w-full mx-auto">
            <MetaGenerator
                title="HeadsIn | Discover"
                description="Discover the latest shifts shaping the industry"
                canonicalUrl="https://www.headsin.co/discover"
            />
            {/* hero-section */}
            <section className="w-full">
                <div className="flex flex-col px-4 md:px-9 lg:px-13">
                    <div className="flex flex-col md:ps-2 py-10 lg:py-20 gap-3 md:gap-5">
                        <TextFade>
                            <h1 className="font-extrabold text-2xl leading-tight md:text-4xl lg:text-6xl lg:leading-[1.2] text-start rounded-lg">
                                Insights. Trends.
                                <span className="bg-gradient-to-r from-[#3F1562] to-primary bg-clip-text text-transparent">
                                    Opportunities
                                </span>
                            </h1>
                        </TextFade>
                        <TextFade delay={0.4}>
                            <p className="text-md md:text-lg text-[#2A2A2A] font-semibold">
                                Explore the latest shifts shaping the industry
                            </p>
                        </TextFade>
                    </div>

                    {blogPosts.map((items, index) =>
                        index === 0 ? (
                            <div
                                key={items.id}
                                className="relative w-full h-auto md:aspect-video gap-10 flex items-end justify-start rounded-3xl overflow-hidden bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${
                                        items.featuredImage.url || DefaultImg
                                    })`,
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent">
                                    <div className="flex flex-col justify-between lg:justify-end h-full p-6 md:p-10 gap-4 md:gap-6 text-white">
                                        <div className="flex justify-between items-center gap-3 md:gap-6">
                                            <h2 className="text-xl md:text-3xl lg:text-5xl font-extrabold line-clamp-3">
                                                {items.title}
                                            </h2>
                                            <div
                                                className="flex bg-white/10 shrink-0 w-10 h-10 md:w-13 md:h-13 items-center justify-center rounded-xl cursor-pointer transition hover:scale-105 hover:bg-primary hover:text-white"
                                                onClick={() =>
                                                    navigate(
                                                        `/discover/${items.slug}`
                                                    )
                                                }
                                            >
                                                <i
                                                    className="pi pi-arrow-up-right"
                                                    style={{ color: "#FFFFFF" }}
                                                ></i>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-2 md:mt-4 gap-4 md:gap-6">
                                            <p className="text-sm md:text-lg font-medium line-clamp-2">
                                                {items.excerpt}
                                            </p>

                                            <div className="flex items-center gap-3 md:gap-5">
                                                <i
                                                    className="pi pi-calendar"
                                                    style={{ color: "#DF6789" }}
                                                ></i>
                                                <span className="text-sm md:text-base">
                                                    {items.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </section>

            {/* Discover jobs Cards*/}
            <section>
                <div className="">
                    <div className="flex flex-col mx-4 my-6 md:my-10 rounded-3xl h-fit">
                        <div className="grid grid-cols-1 p-2 md:p-4 lg:p-6 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {blogPosts.slice(1).map((item, index) => (
                                <div
                                    key={index}
                                    className="group w-full h-full flex flex-col bg-white p-2 md:p-3 lg:p-6 cursor-pointer gap-4 rounded-2xl justify-between hover:scale-105 transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                        navigate(`/discover/${item.slug}`)
                                    }
                                >
                                    <div className="flex w-full bg-gray-300 bg-cover overflow-clip rounded-3xl">
                                        <img
                                            src={
                                                item.featuredImage.url ||
                                                DefaultImg
                                            }
                                            alt={item.featuredImage.alt}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>
                                    <h4 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300 ease-in">
                                        {item.title}
                                    </h4>
                                    <p className="font-medium line-clamp-2">
                                        {item.excerpt}
                                    </p>
                                    <div className="flex items-center ">
                                        <span className="text-[#878787]">
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Discover;
