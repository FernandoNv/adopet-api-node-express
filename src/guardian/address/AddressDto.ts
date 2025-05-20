import AddressEntity from "./AddressEntity";

export interface IAddressDto {
  id?: number;
  city: string;
  state: string;
}

export default class AddressDto {
  mapToAddress(dto: IAddressDto | undefined): AddressEntity | undefined {
    if (!dto) return dto;
    return new AddressEntity(dto.id, dto.city, dto.state);
  }

  mapToDto(address: AddressEntity): IAddressDto {
    return {
      id: address.id,
      city: address.city,
      state: address.state,
    } as IAddressDto;
  }
}
