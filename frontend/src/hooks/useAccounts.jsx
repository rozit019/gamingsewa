import { useState, useEffect } from "react";

const MOCK_DB = [
  // eFootball
  {
    id: 1,
    game: "efootball",
    title: "Messi + Ronaldo Squad",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    region: "Global",
    ptw: 2300,
    coins: 4500,
    highestRank: "Division 1",
    rarity: "Legendary",
    description:
      "Ultimate dream team featuring both GOATs at max level. 15 iconic players including Mbappe, Haaland, and Neymar. Perfect for online ranked matches.",
    price: 89,
    badge: "Hot",
    verified: true,
    level: 72,
    status: "Active",
    features: ["15 Iconics", "Full Team", "Max Chem"],
  },
  {
    id: 2,
    game: "efootball",
    title: "Barcelona Dream Team",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=300&fit=crop",
    region: "EU",
    ptw: 1800,
    coins: 3200,
    highestRank: "Division 2",
    rarity: "Epic",
    description:
      "All-time Barcelona legends squad with Cruyff, Maradona, and Iniesta. High team chemistry with possession-based playstyle.",
    price: 65,
    badge: null,
    verified: false,
    level: 65,
    status: "Active",
    features: ["12 Iconics", "Tiki-Taka"],
  },
  {
    id: 3,
    game: "efootball",
    title: "Real Madrid Galacticos",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=300&fit=crop",
    region: "Global",
    ptw: 1200,
    coins: 2800,
    highestRank: "Division 3",
    rarity: "Epic",
    description:
      "Classic Galacticos lineup with Zidane, Ronaldo Nazario, and Beckham. Counter-attack playstyle with blistering pace.",
    price: 52,
    badge: null,
    verified: true,
    level: 58,
    status: "Active",
    features: ["10 Iconics", "Counter"],
  },
  {
    id: 4,
    game: "efootball",
    title: "Starter Pack Pro",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=400&h=300&fit=crop",
    region: "Asia",
    ptw: 3000,
    coins: 5000,
    highestRank: "Division 5",
    rarity: "Rare",
    description:
      "Fresh starter account with 5,000 GP and 3,000 eFootball coins. Includes 5 iconic players and a solid base team.",
    price: 35,
    badge: "Hot",
    verified: false,
    level: 45,
    status: "Fresh",
    features: ["5 Iconics", "3K Coins", "Fresh"],
  },

  // Mobile Legends
  {
    id: 5,
    game: "mobilelegends",
    title: "Mythical Glory Beast",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    region: "SEA",
    ptw: 150,
    coins: 8500,
    highestRank: "Mythical Glory 320★",
    rarity: "Legendary",
    description:
      "Top-tier account with 320 stars. 280+ skins including all Collector and Legend skins. All emblems maxed at level 60.",
    price: 120,
    badge: "Hot",
    verified: true,
    level: 85,
    status: "Active",
    features: ["280 Skins", "All Emblems"],
  },
  {
    id: 6,
    game: "mobilelegends",
    title: "Mythic V Sniper",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    region: "SEA",
    ptw: 80,
    coins: 4200,
    highestRank: "Mythic V 85★",
    rarity: "Epic",
    description:
      "Solid Mythic V account with 85 stars. 150 premium skins including multiple Starlight and Epic tier.",
    price: 75,
    badge: null,
    verified: false,
    level: 72,
    status: "Active",
    features: ["150 Skins", "Lvl 80"],
  },
  {
    id: 7,
    game: "mobilelegends",
    title: "Legend Smurf",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    region: "Global",
    ptw: 45,
    coins: 1200,
    highestRank: "Legend 5★",
    rarity: "Rare",
    description:
      "Clean smurf account at Legend rank with 5 stars. 90 skins and level 50 emblems. Low match count.",
    price: 42,
    badge: null,
    verified: true,
    level: 55,
    status: "Active",
    features: ["90 Skins", "Clean"],
  },

  // Clash of Clans
  {
    id: 8,
    game: "coc",
    title: "TH16 Maxed Base",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=400&h=300&fit=crop",
    region: "Global",
    ptw: 0,
    coins: 20000000,
    highestRank: "Legends League 5800",
    rarity: "Legendary",
    description:
      "Fully maxed Town Hall 16 base with all defenses, walls, and troops at maximum level. Heroes at max.",
    price: 150,
    badge: "Hot",
    verified: true,
    level: 16,
    status: "Maxed",
    features: ["Max Heroes", "20M Gold"],
  },
  {
    id: 9,
    game: "coc",
    title: "TH15 Semi-Max",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop",
    region: "EU",
    ptw: 0,
    coins: 15000000,
    highestRank: "Titan League 5100",
    rarity: "Epic",
    description:
      "Near-maxed Town Hall 15 with only a few upgrades remaining. Barbarian King at level 85, Archer Queen at 82.",
    price: 95,
    badge: null,
    verified: false,
    level: 15,
    status: "Semi-Maxed",
    features: ["Lvl 85 BK", "15M Elixir"],
  },
  {
    id: 10,
    game: "coc",
    title: "TH14 War Beast",
    image:
      "https://images.unsplash.com/photo-1612287230217-8c7c6c170b90?w=400&h=300&fit=crop",
    region: "Global",
    ptw: 0,
    coins: 8200000,
    highestRank: "Champion League 4200",
    rarity: "Rare",
    description:
      "War-focused Town Hall 14 account with maxed troops for war attacks. Archer Queen at level 80.",
    price: 68,
    badge: null,
    verified: true,
    level: 14,
    status: "War Ready",
    features: ["Max Troops", "Lvl 80 AQ"],
  },
];

export function useAccounts(gameFilter = null, limit = null) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/efootball")
      .then((res) => res.json())
      .then((data) => {
        let result = data;
        if (gameFilter) result = result.filter((i) => i.game === gameFilter);
        if (limit) result = result.slice(0, limit);
        setAccounts(result);
        setLoading(false);
      });
  }, [gameFilter, limit]);

  return { accounts, loading };
}
