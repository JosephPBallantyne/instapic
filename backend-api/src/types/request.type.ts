import { Request } from 'express';

export interface RequestWithFile extends Request {
  userId?: number;
  files: any;
}
