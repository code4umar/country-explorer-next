export type Country = {
  name: string;
  capital: string;
  population: number;
  region: string;
  languages: string[];
  flag: string;
  cca3: string;
  borders: string[];
};

export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
