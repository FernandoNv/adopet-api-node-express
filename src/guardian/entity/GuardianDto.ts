import GuardianEntity from "./GuardianEntity";

export interface IGuardianDto {
  id: number | undefined;
  name: string;
  password: string;
  phone: string;
  photo?: string;
  address?: string;
}

export default class GuardianDto {
  mapToGuardian(dto: IGuardianDto): GuardianEntity {
    return new GuardianEntity(
      dto.id,
      dto.name,
      dto.password,
      dto.phone,
      dto.photo,
      dto.address
    );
  }

  mapToDto(guardian: GuardianEntity): IGuardianDto {
    return {
      id: guardian.id,
      name: guardian.name,
      password: guardian.password,
      phone: guardian.phone,
      photo: guardian.photo,
      address: guardian.address,
    };
  }
}
