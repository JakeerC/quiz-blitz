import {Rarity} from './common';

export type Achievement = {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: Rarity;
};
