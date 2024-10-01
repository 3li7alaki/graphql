export default function Footer() {
    return <footer className="footer">
        <div className="container-fixed">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
                <div className="flex order-2 md:order-1 gap-2 font-normal text-2sm">
                    <span className="text-gray-500">2024©</span>
                    <a className="text-gray-600 hover:text-primary" href="https://reboot01.com/">
                        Reboot01
                    </a>
                </div>
                <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm text-gray-600">
                    <a className="hover:text-primary" href="https://learn.reboot01.com/intra/">
                        Intra
                    </a>
                    <a className="hover:text-primary" href="https://learn.reboot01.com/git/">
                        Gitea
                    </a>
                    <a className="hover:text-primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        Resources
                    </a>
                </nav>
            </div>
        </div>
    </footer>
}