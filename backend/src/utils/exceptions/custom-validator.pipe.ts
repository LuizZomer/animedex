import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      const formattedErrors = this.flattenValidationErrors(errors);
      throw new BadRequestException(formattedErrors);
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private flattenValidationErrors(errors: any[]): string[] {
    return errors.reduce((acc, error) => {
      if (error.constraints) {
        acc.push(...Object.values(error.constraints));
      }
      if (error.children && error.children.length > 0) {
        acc.push(...this.flattenValidationErrors(error.children));
      }
      return acc;
    }, []);
  }
}
