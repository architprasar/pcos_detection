import { Home, Detector, Features } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  PhotoIcon
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: PhotoIcon,
    name: "Detector",
    path: "/detector",
    element: <Detector />,
  },
  {
    icon: DocumentTextIcon,
    name: "Features",
    path: "/features",
    element: <Features />,
  },
];

export default routes;
