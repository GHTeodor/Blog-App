import { Request } from 'express';

import { IUser } from './user.interface';
import { IPost } from './post.interface';
import { IToken } from './token.interface';

export interface IRequestExtended extends Request {
    user?: IUser;
    post?: IPost;
    tokenInfo?: Partial<IToken>;
}
