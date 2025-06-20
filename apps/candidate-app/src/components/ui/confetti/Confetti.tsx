import Lottie from 'lottie-react'
import React from 'react'
import confettiAnimation from "@/assets/lottiefiles/animation-confetti.json";

const Confetti: React.FC = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <Lottie
                animationData={confettiAnimation}
                autoPlay
                className="w-full h-full"
            />
            <Lottie
                animationData={confettiAnimation}
                autoPlay
                className="w-full h-full md:block hidden"
            />
        </div>
    )
}

export default Confetti
