export type Amic = {
  data: string; // o Date si després la parses
  descripcio: string;
  foto: string;
  username: string;
};

export type InfoComarca = {
  amics: Amic[];
  num_amics: number;
};

export type ComarcaData = {
  d?: string;
  points?: string;
  viewBox?: string;
  info?: InfoComarca;
};

export type ComarquesMap = {
  [region: string]: ComarcaData;
};
