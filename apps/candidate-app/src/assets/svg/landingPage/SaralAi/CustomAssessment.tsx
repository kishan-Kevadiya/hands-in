export const CustomHalfCircle = ({ percentage = 100, size = 200 }) => {
    const strokeWidth = 8;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - strokeWidth / 2;

    const startAngle = 180; // left
    const endAngle = 0;     // right

    const polarToCartesian = (angle: number) => ({
        x: centerX + radius * Math.cos((angle * Math.PI) / 180),
        y: centerY + radius * Math.sin((angle * Math.PI) / 180),
    });

    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const fullPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;

    let progressPath = "";
    if (percentage > 0) {
        if (percentage >= 100) {
            progressPath = fullPath;
        } else {
            const progressAngle = startAngle - (percentage / 100) * 180;
            const progressPoint = polarToCartesian(progressAngle);
            const largeArcFlag = percentage >= 50 ? 1 : 0;
            const sweepFlag = 1; // clockwise
            progressPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${progressPoint.x} ${progressPoint.y}`;
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size / 2 + 40 }}>
                <svg height={size / 2 + 40} width={size} className="overflow-visible">
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3F1562" />
                            <stop offset="100%" stopColor="#DF6789" />
                        </linearGradient>
                    </defs>

                    {/* Background */}
                    <path
                        d={fullPath}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    {/* Progress */}
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

                {/* Center text */}
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                    <span className="text-4xl font-bold text-gray-800">{percentage}%</span>
                </div>
            </div>
            <p className="text-gray-600 mt-2">Custom SVG (Fixed)</p>
        </div>
    );
};
