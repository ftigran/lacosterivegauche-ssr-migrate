type PrizeGroup = {
  name: string;
  title: string;
};

type PrizeCategory = {
  name: string;
  title: string;
};

export type PrizeVariant = {
  id: number;
  name: string;
  title: string;
};

export type Prize = {
  id: number;
  name: string;
  title: string;
  caption?: string | null;
  coin: number;
  pickpoint_need: number;
  priz_ordered_count: number;
  residue: number;
  priz_group: PrizeGroup;
  priz_category: PrizeCategory;
  priz_variant?: Array<PrizeVariant>;
};

export type TOnOrder = (prize: Prize, prizeVariantId?: number) => void;
