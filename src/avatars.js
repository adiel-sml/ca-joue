// Personnages « Open Peeps » de Pablo Stanley (CC0), assemblés avec DiceBear.
// Chaque avatar est un réglage fixe (coiffure, visage, couleurs) pour rester identique d'une partie à l'autre.
import { createAvatar } from "@dicebear/core";
import * as openPeeps from "@dicebear/open-peeps";

const F_HEADS = ["long", "bun", "longCurly", "bangs", "buns", "longAfro", "mediumStraight", "twists", "longBangs", "hijab", "bantuKnots", "medium2"];
const H_HEADS = ["short1", "short2", "afro", "pomp", "flatTop", "dreads1", "short4", "mohawk", "cornrows", "shaved2", "hatBeanie", "short5"];
const FACES = ["smile", "smileBig", "cute", "calm", "cheeky", "lovingGrin1", "smileLOL", "eatingHappy", "driven", "smileTeethGap", "explaining", "solemn"];
const SKINS = ["ffdbb4", "edb98a", "d08b5b", "ae5d29", "694d3d"];
const CLOTHES = ["e78276", "ffcf77", "fdea6b", "78e185", "9ddadb", "8fa7df", "e279c7"];
const HAIR = ["2c1b18", "724133", "a55728", "d6b370", "4a312c", "c93305"];
const BG = ["ffbe0b", "ff6b35", "3a86ff", "2ec4b6", "8ac926", "ff4d6d"];

const make = (g, heads) => heads.map((head, i) => ({
  id: g + i, g,
  opts: {
    head: [head], face: [FACES[(i * 5 + (g === "h" ? 3 : 0)) % FACES.length]],
    skinColor: [SKINS[(i * 2 + (g === "h" ? 1 : 0)) % SKINS.length]],
    clothingColor: [CLOTHES[i % CLOTHES.length]], headContrastColor: [HAIR[i % HAIR.length]],
    facialHair: ["full", "goatee1", "moustache2"].slice(i % 3, i % 3 + 1),
    facialHairProbability: g === "h" && i % 4 === 1 ? 100 : 0,
    accessories: ["glasses2"], accessoriesProbability: i % 5 === 2 ? 100 : 0,
    maskProbability: 0, backgroundColor: [BG[i % BG.length]]
  }
}));

export const AVATARS = [...make("f", F_HEADS), ...make("h", H_HEADS)];
const cache = new Map();

export function avatarSvg(id) {
  if (!cache.has(id)) {
    const a = AVATARS.find(x => x.id === id) || AVATARS[0];
    cache.set(id, createAvatar(openPeeps, a.opts).toString());
  }
  return cache.get(id);
}
