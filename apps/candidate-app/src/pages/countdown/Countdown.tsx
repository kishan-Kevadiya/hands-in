import { useEffect, useState } from "react"
import { Link } from "react-router";
import InstagramIcon from "@/assets/svg/support/instagram.svg";
import LinkedinIcon from "@/assets/svg/support/linkedin.svg";
import XIcon from "@/assets/svg/support/x.svg";


// Calculate time left
function calculateTimeLeft() {

    const targetDate = new Date('2025-03-20T00:00:00.000Z');

    const difference = +targetDate - +new Date()

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
    }

    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

export default function Countdown() {
    // Set launch date (1 month from now)
    const [launchDate] = useState(() => {
        const date = new Date()
        date.setMonth(date.getMonth() + 1)
        return date
    })

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    // Update countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        // Clear interval on component unmount
        return () => clearInterval(timer)
    }, [launchDate])

    return (
        <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-background to-muted">
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="max-w-3xl w-full mx-auto text-center space-y-8">
                    {/* Logo/Brand */}
                    <div className="w-full flex flex-col items-center">
                        <div className="w-52 aspect-[6.04]">
                            <img src="/logo.webp" alt="logo" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <h2 className="bg-gradient-to-b from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent text-2xl font-bold sm:text-3xl md:text-4xl py-2">Something amazing is coming soon</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We're working hard to bring you our new website. Stay tuned for something special!
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="border border-primary rounded-lg p-4 shadow-sm">
                            <div className="text-3xl md:text-4xl font-bold">{timeLeft.days}</div>
                            <div className="text-muted-foreground">Days</div>
                        </div>
                        <div className="border border-primary rounded-lg p-4 shadow-sm">
                            <div className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</div>
                            <div className="text-muted-foreground">Hours</div>
                        </div>
                        <div className="border border-primary rounded-lg p-4 shadow-sm">
                            <div className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                            <div className="text-muted-foreground">Minutes</div>
                        </div>
                        <div className="border border-primary rounded-lg p-4 shadow-sm">
                            <div className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                            <div className="text-muted-foreground">Seconds</div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 w-full items-center justify-center">
                        <Link
                            to={"https://x.com/headsin.co"}
                            target="_blank"
                            className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#f4cbf8ad]"
                        >
                            <img
                                src={XIcon}
                                alt="x"
                                className="aspect-square h-full w-full"
                            />
                        </Link>
                        <Link
                            to={"https://www.linkedin.com/company/headsinco/"}
                            target="_blank"
                            className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#f4cbf8ad]"
                        >
                            <img
                                src={LinkedinIcon}
                                alt="linkedin"
                                className="aspect-square h-full w-full"
                            />
                        </Link>
                        <Link
                            to={
                                "https://www.instagram.com/headsin.co/profilecard/?igsh=MTEyd3pyYzhhYzMzMA%3D%3D"
                            }
                            target="_blank"
                            className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#f4cbf8ad]"
                        >
                            <img
                                src={InstagramIcon}
                                alt="instagram"
                                className="aspect-square h-full w-full"
                            />
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-6 border-t">
                <div className="container flex flex-col items-center justify-center gap-2 text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} HeadsIn. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

