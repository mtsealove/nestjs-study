import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata): any {
    if (!this.isValid(value.toUpperCase())) {
      throw new BadRequestException('status must be PRIVATE or PUBLIC');
    }
    return value;
  }

  private isValid(status: any) {
    return this.StatusOptions.indexOf(status) !== -1;
  }
}
