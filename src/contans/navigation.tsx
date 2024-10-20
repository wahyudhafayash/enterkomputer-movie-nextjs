import { IoSearchOutline } from "react-icons/io5";
import { MdHomeFilled, MdMovie } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { NavigationItem } from "@/utils/interface";

export const navigation: NavigationItem[] = [
  {
    label: "TV Shows",
    link: "/tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    link: "/movie",
    icon: <MdMovie />,
  },
];

export const mobileNavigation: NavigationItem[] = [
  {
    label: "Home",
    link: "/",
    icon: <MdHomeFilled />,
  },
  ...navigation,

  {
    label: "Search",
    link: "/search",
    icon: <IoSearchOutline />,
  },
];
