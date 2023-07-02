// errors p2002

import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class UniqueConstraintError extends ConflictError {
  constructor(erro: PrismaClientError) {
    const uniqueField = erro.meta.target;

    super(`A record with this ${uniqueField} already exists`);
  }
}
