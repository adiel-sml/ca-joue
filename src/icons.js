// Icônes Lucide (licence ISC), rendues en SVG inline pour garder un rendu HTML en chaînes.
import {
  LayoutGrid, Users, Trophy, Drama, Ban, Flame, ScanSearch, VenetianMask, Dices, X, ChevronLeft,
  Plus, Pencil, Trash2, Check, RotateCcw, Timer, Play, Eye, EyeOff, Share, SquarePlus, Download,
  Crown, Ghost, Heart, Swords, Shield, Laugh, Hourglass, Lightbulb, Shuffle, Info, Hand, Zap, Gavel,
  MessageSquareQuote, Square, Minus, UserPlus, Vote, Medal, Smartphone, Skull, HeartCrack, SkipForward
} from "lucide";

const I = {
  grid: LayoutGrid, users: Users, trophy: Trophy, drama: Drama, ban: Ban, flame: Flame, scanSearch: ScanSearch,
  mask: VenetianMask, dices: Dices, x: X, back: ChevronLeft, plus: Plus, pencil: Pencil, trash: Trash2,
  check: Check, undo: RotateCcw, timer: Timer, play: Play, eye: Eye, eyeOff: EyeOff, share: Share,
  squarePlus: SquarePlus, download: Download, crown: Crown, ghost: Ghost, heart: Heart, swords: Swords,
  shield: Shield, laugh: Laugh, hourglass: Hourglass, lightbulb: Lightbulb, shuffle: Shuffle, info: Info,
  hand: Hand, zap: Zap, gavel: Gavel, quote: MessageSquareQuote, stop: Square, minus: Minus,
  userPlus: UserPlus, vote: Vote, medal: Medal, phone: Smartphone, skull: Skull, heartCrack: HeartCrack,
  skip: SkipForward
};

const attrs = o => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(" ");

export function ic(name, size = 22) {
  const node = I[name];
  if (!node) return "";
  const kids = node[2].map(([tag, a]) => `<${tag} ${attrs(a)}/>`).join("");
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${kids}</svg>`;
}
