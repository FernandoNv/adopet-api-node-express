import GuardianEntity from "./GuardianEntity";
import AddressDto, { IAddressDto } from "../address/AddressDto";

export interface IGuardianDto {
  id: number | undefined;
  name: string;
  password: string;
  phone: string;
  photo?: string;
  address?: IAddressDto;
}

export default class GuardianDto {
  constructor(private readonly addressDto: AddressDto) {}
  mapToGuardian(dto: IGuardianDto): GuardianEntity {
    return new GuardianEntity(
      dto.id,
      dto.name,
      dto.password,
      dto.phone,
      dto.photo,
      this.addressDto.mapToAddress(dto.address)
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
