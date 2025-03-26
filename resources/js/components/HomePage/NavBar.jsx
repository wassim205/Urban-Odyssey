export default function NavBar() {
    return (
        <nav className="relative flex justify-center items-center w-full">
            <h1 className="text-[#D8C292] text-[40px] font-righteous">
                URBAN ODYSSEY
            </h1>

            <ul className="absolute right-0 flex space-x-4">
                <li>
                    <a href="/login"
                        className="text-white font-bebas text-[30px] mr-10">
                        JOIN US
                    </a>
                </li>
            </ul>
        </nav>
    );
}
