import Loader from "@/components/ui/loader/Loader";
import { getUser } from "@/helpers/apis/auth";
import { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { COMPANY_DETAILS, JOB_DETAILS } from ".";

const ProtectedRouter = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                setTimeout(() => setIsAuthenticated(!!user), 500);
            } catch {
                setIsAuthenticated(false); // Set to false if request fails
            }
        };

        fetchUser();
    }, []);

    // Show loading until authentication is determined
    if (isAuthenticated === null)
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader isVisible />
            </div>
        );

    // Exclude certain routes from being protected
    const excludedRoutes = [JOB_DETAILS, COMPANY_DETAILS];

    const isExcludedRoute = excludedRoutes.some((route) =>
        location.pathname.includes(route)
    );

    if (isExcludedRoute) {
        return children;
    }

    return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRouter;
