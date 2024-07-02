import React from "react";

function Header() {
    return (
        <header className="py-3 shadow bg-customGrey w-full">
            <nav className="flex justify-between items-center mx-4">
                <div className="text-white">Welcome</div>
                <ul className="flex space-x-4">
                    <li>
                        <button className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Offline</button>
                    </li>
                    <li>
                        <button className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Online</button>
                    </li>
                    <li>
                        <button className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Account</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
