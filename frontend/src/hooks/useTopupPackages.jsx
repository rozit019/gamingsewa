import { useMemo } from "react";
import ffimage from "../assets/ff.jpg";

export const useTopupPackages = (game) => {
  const data = useMemo(() => {
    if (game === "efootball") {
      const special = [
        {
          id: 13,
          label: "Starter Set: Luis Suárez",
          price: 230,
          originalPrice: "",
          icon: "/e.webp",
          popular: true,
        },
      ];

      const discount = [
        {
          id: 10,
          label: "260 Coins",
          price: 255,
          originalPrice: 440,
          icon: "/e.webp",
          bonus: "130 Free",
          popular: false,
        },
        {
          id: 11,
          label: "840 Coins",
          price: 1020,
          originalPrice: "",
          icon: "/e.webp",
          bonus: "290 Free",
          popular: false,
        },
        {
          id: 12,
          label: "1,630 Coins",
          price: 1905,
          originalPrice: "",
          icon: "/e.webp",
          bonus: "Extra Value",
          popular: false,
        },
      ];

      const regular = [
        {
          id: 1,
          label: "130 Coins",
          price: 255,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 2,
          label: "300 Coins",
          price: 575,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 3,
          label: "550 Coins",
          price: 1020,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 4,
          label: "750 Coins",
          price: 1390,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 5,
          label: "1,040 Coins",
          price: 1865,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 6,
          label: "2,130 Coins",
          price: 3810,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 7,
          label: "3,250 Coins",
          price: 5715,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 8,
          label: "5,700 Coins",
          price: 9700,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
        {
          id: 9,
          label: "12,800 Coins",
          price: 20205,
          originalPrice: "",
          icon: "/e.webp",
          popular: false,
        },
      ];

      return {
        sections: [
          { title: "⭐ Special Packs", items: special },
          { title: "🔥 Discount / Bonus Packs", items: discount },
          { title: "🎮 Regular Packs", items: regular },
        ],
        packages: [...special, ...discount, ...regular],
      };
    }

    if (game === "freefire") {
      const packs = [
        {
          id: 1,
          label: "100 Diamonds",
          price: 120,
          originalPrice: "",
          icon: ffimage,
          popular: false,
        },
        {
          id: 2,
          label: "310 Diamonds",
          price: 350,
          originalPrice: "",
          icon: ffimage,
          bonus: "10",
          popular: false,
        },
        {
          id: 3,
          label: "520 Diamonds",
          price: 580,
          originalPrice: "",
          icon: ffimage,
          bonus: "20",
          popular: true,
        },
        {
          id: 4,
          label: "1060 Diamonds",
          price: 1150,
          originalPrice: "",
          icon: ffimage,
          bonus: "60",
          popular: false,
        },
        {
          id: 5,
          label: "2180 Diamonds",
          price: 2300,
          originalPrice: "",
          icon: ffimage,
          bonus: "180",
          popular: false,
        },
        {
          id: 6,
          label: "5600 Diamonds",
          price: 5700,
          originalPrice: "",
          icon: ffimage,
          bonus: "600",
          popular: false,
        },
      ];
      return {
        sections: [{ title: "Diamond Packages", items: packs }],
        packages: packs,
      };
    }

    return { sections: [], packages: [] };
  }, [game]);

  return data;
};
