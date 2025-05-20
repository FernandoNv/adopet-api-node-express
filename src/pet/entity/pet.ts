export const PetBreeds = {
  DOG: "dog",
  CAT: "cat",
  NOT_DEFINED: "not_defined",
} as const;

export type PetBreedEnum = (typeof PetBreeds)[keyof typeof PetBreeds];

export interface IPetDto {
  id?: number;
  name?: string;
  breed?: PetBreedEnum;
  birthDate?: Date;
  adopted?: boolean;
}
