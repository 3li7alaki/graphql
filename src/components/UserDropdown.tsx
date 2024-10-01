import { useUser } from "@/contexts/UserContext";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {deleteCookie} from "cookies-next";

export default function UserDropdown() {
    const { user, dispatch } = useUser();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleRouteChange = () => {
            if (dropdownRef.current) {
                dropdownRef.current.style.display = "none";
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    const handleAuth = (event: React.MouseEvent) => {
        event.preventDefault();
        if (user) {
            dispatch({ type: 'CLEAR_USER' });
            deleteCookie('token');
        }
        router.push('/login');
    };

    return (
        <div className="flex items-center gap-2 lg:gap-3.5">
            <div className="menu" data-menu="true">
                <div
                    className="menu-item"
                    data-menu-item-offset="0, 10px"
                    data-menu-item-placement="bottom"
                    data-menu-item-toggle="dropdown"
                    data-menu-item-trigger="click|lg:click"
                >
                    <div className="menu-toggle btn btn-icon rounded-full">
                        <Image
                            alt=""
                            className="size-9 rounded-full border-2 border-primary"
                            src="/media/avatars/blank.png"
                            width={36}
                            height={36}
                        />
                    </div>
                    <div
                        className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[250px]"
                        ref={dropdownRef}
                    >
                        <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                            <div className="flex items-center gap-2">
                                <Image
                                    alt=""
                                    className="size-9 rounded-full border-2 border-primary"
                                    src="/media/avatars/blank.png"
                                    width={36}
                                    height={36}
                                />
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-sm text-gray-800 font-semibold leading-none">
                                        {user ? `${user.firstName} ${user.lastName}` : "Log in"}
                                    </span>
                                    <a className="text-xs text-gray-600 hover:text-primary font-medium leading-none disabled">
                                        {user ? user.login : "Email"}
                                    </a>
                                </div>
                            </div>
                            <span className="badge badge-xs badge-primary badge-outline">
                                {user ? `LVL ${user.level}` : ""}
                            </span>
                        </div>
                        <div className="menu-separator"></div>
                        <div className="flex flex-col">
                            <div className="menu-item mb-0.5">
                                <div className="menu-link">
                                    <span className="menu-icon">
                                        <i className="ki-filled ki-moon"></i>
                                    </span>
                                    <span className="menu-title">Dark Mode</span>
                                    <label className="switch switch-sm">
                                        <input
                                            data-theme-state="dark"
                                            data-theme-toggle="true"
                                            name="check"
                                            type="checkbox"
                                            defaultValue={1}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="menu-item px-4 py-1.5">
                                <a
                                    className="btn btn-sm btn-light justify-center"
                                    href=""
                                    onClick={handleAuth}
                                >
                                    {user ? "Log out" : "Log in"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}