import { IoSearchOutline } from "react-icons/io5";
import { MdHomeFilled, MdFavoriteBorder, MdMovie } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";

interface NavigationItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

export const navigation: NavigationItem[] = [
  {
    label: "Tv Shows",
    link: "/tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    link: "/movie",
    icon: <MdMovie />,
  },
  {
    label: "Favorite",
    link: "/favorite",
    icon: <MdFavoriteBorder />,
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
