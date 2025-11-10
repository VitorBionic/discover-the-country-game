export const DIFFICULTIES = {
  easy: {
    tag: "Fácil",
    lifepoints: 7,
    time: 30,
    hints: ["flags", "capital", "languages", "region", "area", "population"],
  },
  medium: {
    tag: "Normal",
    lifepoints: 4,
    time: 20,
    hints: ["languages", "region", "area", "population"],
  },
  hard: {
    tag: "Difícil",
    lifepoints: 2,
    time: 10,
    hints: ["population"],
  },
} as const;