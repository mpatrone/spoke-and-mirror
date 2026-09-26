import { defineState } from "eve/context";
 
export interface Bike {
  make: string;
  model: string;
  wheelSize?: string;
  notes?: string;
}
 
export interface Garage {
  readonly bikes: Readonly<Record<string, Bike>>;
}
 
export const garage = defineState<Garage>("bikeshop.garage", () => ({
  bikes: {},
}));