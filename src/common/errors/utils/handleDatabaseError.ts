import { DatabaseError } from '../types/DatabaseError';
import { PrismaClientError } from '../types/PrismaClientError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';

enum PrismaErrors {
  UniqueConstraintFaill = 'P2002',
}

export const handleDatabaseErrors = (error: PrismaClientError): Error => {
  switch (error.code) {
    case PrismaErrors.UniqueConstraintFaill:
      return new UniqueConstraintError(error);

    default:
      return new DatabaseError(error.message);
  }
};
