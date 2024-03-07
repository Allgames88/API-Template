import { IsInt, IsString, Min, IsArray } from "class-validator";

export class CreateBuddyDto {

    @IsString({ message: 'name debe ser una cadena' })
    name: string;

    @IsInt({ message: 'El valor de head debe ser un número entero' })
    @Min(0, { message: 'El valor de head debe ser igual o mayor que cero' })
    head: number;

    @IsInt({ message: 'El valor de hair debe ser un número entero' })
    @Min(0, { message: 'El valor de hair debe ser igual o mayor que cero' })
    hair: number;

    @IsInt({ message: 'El valor de clothes debe ser un número entero' })
    @Min(0, { message: 'El valor de clothes debe ser igual o mayor que cero' })
    clothes: number;

    @IsArray({ message: 'hairColor debe ser un Array...' })
    hairColor: number[]; // No necesitas validar los elementos del arreglo aquí, ya que eso se maneja en la entidad.

    @IsArray({ message: 'clothesColor debe ser un Array...' })
    clothesColor: number[]; // No necesitas validar los elementos del arreglo aquí, ya que eso se maneja en la entidad.
}
