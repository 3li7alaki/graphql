import { useRouter } from "next/router";
import UserDropdown from "@/components/UserDropdown";

export default function Header() {
    const router = useRouter();

    const HandleDashboard = (event) => {
        event.preventDefault();
        router.push('/');
    }

    return (
        <header
            className="header fixed top-0 z-10 left-0 right-0 flex items-stretch bg-[#fefefe] dark:bg-coal-500"
            data-sticky="true"
            data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
            data-sticky-name="header"
            id="header"
        >
            {/* begin: container */}
            <div className="container-fixed flex justify-between items-stretch lg:gap-4" id="header_container">
                <div className="menu menu-default flex flex-wrap justify-center gap-2.5 py-2">
                    <div className="menu-item">
                        <a className="menu-link" onClick={HandleDashboard}>
                            <span className="menu-icon">
                                <i className="ki-outline ki-chart"></i>
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </div>
                    <div className="menu-item">
                        <a className="menu-link disabled">
                            <span className="menu-icon">
                                <i className="ki-outline ki-profile-circle"></i>
                            </span>
                            <span className="menu-title">Profile</span>
                            <span className="menu-badge">
                                <span className="badge badge-sm badge-outline badge-pill badge-warning">Soon</span>
                            </span>
                        </a>
                    </div>
                </div>
                <UserDropdown />
            </div>
        </header>
    );
}
