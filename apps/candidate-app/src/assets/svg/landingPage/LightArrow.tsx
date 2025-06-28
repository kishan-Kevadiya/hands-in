import React from "react";
import { motion } from "framer-motion";

const LightArrow: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        width="206"
        height="177"
        viewBox="0 0 206 177"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            viewport={{ once: true }}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M202.133 15.99C202.246 16.4261 202.218 17.0569 202.18 17.7348C202.091 19.3496 201.744 21.1928 201.615 22.0683C201.534 22.6318 201.925 23.1522 202.486 23.2349C203.049 23.3164 203.571 22.9274 203.652 22.3639C203.809 21.2913 204.268 18.834 204.258 16.9867C204.252 15.9959 204.091 15.1558 203.788 14.6437C203.274 13.7706 202.279 13.5522 200.871 14.2788C199.206 15.1393 196.487 17.5056 193.372 17.7634C192.808 17.8091 192.385 18.3094 192.433 18.8732C192.48 19.4406 192.977 19.8617 193.544 19.8148C196.513 19.5674 199.2 17.6865 201.066 16.5388C201.421 16.3211 201.866 16.1105 202.133 15.99Z"
            fill="#DF6789"
        />
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
                duration: 1,
            }}
            viewport={{ once: true }}
            d="M1 1C10.6667 16.5 35.9 50.2 59.5 61C83.1 71.8 100 65.5 105.5 61C108.167 59.3333 113.7 54.9 114.5 50.5C115.5 45 101 35 94.5 32C81.5159 26.0073 57.4194 21.9239 75.5 39C93.5 56 120.4 52.5 140.5 46.5C151.667 43.1667 170.5 37 179.5 32C187.752 27.4154 199.167 20.5 200 19"
            stroke="url(#paint0_linear_3864_51)"
            strokeWidth="2"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3864_51"
                x1="1"
                y1="33.9816"
                x2="200"
                y2="33.9816"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#DF6789" />
            </linearGradient>
        </defs>
    </svg>
);

export default LightArrow;