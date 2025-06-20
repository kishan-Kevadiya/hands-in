import {
    AllYours,
    Alpino,
    DecodeUp,
    FlabbyFit,
    Goldi,
    Gruham,
    Jainam,
    Knovator,
    LaughLogicLabs,
    Narola,
    Ouros,
    RNW,
    Sahjanand,
    Sudathi,
    Sunora,
    Techsyne
} from "@/assets/images";
import React from "react";

type AnimatedCounterProps = {
    img: string;
};

const Statistics: React.FC = () => {
    return (
        <div className="inline-flex flex-nowrap overflow-hidden bg-white/5 backdrop-blur-sm md:py-20">
            <div className="shrink-0 flex items-center justify-start animate-scroll">
                {[
                    AllYours,
                    Alpino,
                    DecodeUp,
                    FlabbyFit,
                    Goldi,
                    LaughLogicLabs,
                    Gruham,
                    Jainam,
                    Knovator,
                    // Liger,
                    // Malhar,
                    Narola,
                    Ouros,
                    RNW,
                    // S_LOGO,
                    Sahjanand,
                    // Sangini,
                    Sudathi,
                    Sunora,
                    Techsyne,
                ].map((img, index) => (
                    <StatisticsCard key={index} img={img} />
                ))}
            </div>
            <div className="shrink-0 flex items-center justify-start animate-scroll">
                {[
                    AllYours,
                    Alpino,
                    DecodeUp,
                    FlabbyFit,
                    Goldi,
                    LaughLogicLabs,
                    Gruham,
                    Jainam,
                    Knovator,
                    // Liger,
                    // Malhar,
                    Narola,
                    Ouros,
                    RNW,
                    // S_LOGO,
                    Sahjanand,
                    // Sangini,
                    Sudathi,
                    Sunora,
                    Techsyne,
                ].map((img, index) => (
                    <StatisticsCard key={index} img={img} />
                ))}
            </div>
        </div>
    );
};

export default Statistics;

const StatisticsCard: React.FC<AnimatedCounterProps> = ({ img }) => {
    return (
        <div className="shrink-0 max-w-none">
            <div className="w-40 h-20 flex items-center justify-center m-10">
                <img
                    src={img}
                    alt="Sponsor"
                    className="w-full h-auto object-contain saturate-0 hover:saturate-100 transition duration-500 ease-in-out"
                />
            </div>
        </div>
    );
};
