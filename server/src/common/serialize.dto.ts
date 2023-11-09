import { ClassConstructor, plainToClass } from "class-transformer";

export function serializeDto<T, V>(dto: ClassConstructor<T>, data: V): T {
    return plainToClass(dto, data, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true

    });

}
