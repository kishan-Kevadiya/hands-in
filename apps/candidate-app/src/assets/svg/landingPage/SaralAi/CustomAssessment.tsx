export const CustomHalfCircle = ({ percentage = 100, size = 150 }) => {
    const strokeWidth = 8;
    const radius = size / 2 - strokeWidth / 2;
    const centerX = size / 2;
    const centerY = size / 2;

    // Convert polar angle to Cartesian coordinates
    const polarToCartesian = (angle: number) => ({
        x: centerX + radius * Math.cos((angle * Math.PI) / 180),
        y: centerY + radius * Math.sin((angle * Math.PI) / 180),
    });

    const startAngle = 180;
    const endAngle = 0;
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);

    // Calculate progress point based on percentage
    const progressAngle = startAngle - (percentage / 100) * 180;
    const progressPoint = polarToCartesian(progressAngle);

    // Full background arc path (180 degrees)
    const fullPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;

    // Progress arc path based on percentage
    let progressPath = "";
    if (percentage > 0) {
        if (percentage >= 100) {
            progressPath = fullPath;
        } else {
            const largeArcFlag = percentage >= 50 ? 1 : 0;
            progressPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${progressPoint.x} ${progressPoint.y}`;
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative" style={{ width: size, height: size / 2 }}>
                <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
                    <defs>
                        <linearGradient
                            id="progressGradient"
                            x1={start.x}
                            y1={start.y}
                            x2={percentage === 100 ? end.x : progressPoint.x}
                            y2={percentage === 100 ? end.y : progressPoint.y}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#3F1562" />
                            <stop offset="100%" stopColor="#DF6789" />
                        </linearGradient>
                    </defs>

                    {/* Background Arc */}
                    <path
                        d={fullPath}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    {/* Progress Arc */}
                    {percentage > 0 && (
                        <path
                            d={progressPath}
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    )}
                </svg>

                {/* Centered Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                    <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
                </div>
            </div>
        </div>
    );
};
