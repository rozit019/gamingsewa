import { useMemo } from "react";
import ffimage from "../assets/ff.jpg"; // Import the Free Fire image

export const useTopupPackages = (game) => {
  const packages = useMemo(() => {
    if (game === "efootball") {
      return [
        {
          id: 1,
          label: "100 Coins",
          price: 150,
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 2,
          label: "300 Coins",
          price: 400,
          icon: "/e.webp",
          bonus: "50",
          popular: false,
        },
        {
          id: 3,
          label: "500 Coins",
          price: 650,
          icon: "/e.webp",
          bonus: "100",
          popular: true,
        },
        {
          id: 4,
          label: "1000 Coins",
          price: 1200,
          icon: "/e.webp",
          bonus: "200",
          popular: false,
        },
        {
          id: 5,
          label: "2000 Coins",
          price: 2300,
          icon: "/e.webp",
          bonus: "500",
          popular: false,
        },
        {
          id: 6,
          label: "5000 Coins",
          price: 5500,
          icon: "/e.webp",
          bonus: "1500",
          popular: false,
        },
      ];
    } else if (game === "freefire") {
      return [
        {
          id: 1,
          label: "100 Diamonds",
          price: 120,
          icon: ffimage,
          popular: false,
        },
        {
          id: 2,
          label: "310 Diamonds",
          price: 350,
          icon: ffimage,
          bonus: "10",
          popular: false,
        },
        {
          id: 3,
          label: "520 Diamonds",
          price: 580,
          icon: ffimage,
          bonus: "20",
          popular: true,
        },
        {
          id: 4,
          label: "1060 Diamonds",
          price: 1150,
          icon: ffimage,
          bonus: "60",
          popular: false,
        },
        {
          id: 5,
          label: "2180 Diamonds",
          price: 2300,
          icon: ffimage,
          bonus: "180",
          popular: false,
        },
        {
          id: 6,
          label: "5600 Diamonds",
          price: 5700,
          icon: ffimage,
          bonus: "600",
          popular: false,
        },
      ];
    }
    return [];
  }, [game]);

  return { packages };
};
