import React from "react";

const Header = () => (
  <ul className="flex ml-auto w-full font-bold ">
    <li className="text-xs text-yellow-500 ml-auto mr-6 border-b-2 hover:border-yellow-300 curser-pointer">
      Day 1
    </li>
    <li className="text-xs text-yellow-500 mr-6 alert-notice cursor-pointer border-b-2 hover:border-yellow-300">
      Day 2
    </li>
    <li className="text-xs text-yellow-500 mr-6 cursor-pointer border-b-2 hover:border-yellow-300">
      Day 3
    </li>
    <li className="text-xs text-yellow-500 mr-6 cursor-pointer border-b-2 hover:border-yellow-300">
      Day 4
    </li>
    <li className="text-xs text-yellow-500 cursor-pointer border-b-2 hover:border-yellow-300">
      Day 5
    </li>
  </ul>
);

export default Header;
