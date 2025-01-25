import { UserInterface } from '../models/userModel';

declare global {
    namespace Express {
        interface User extends UserInterface {}
    }
}
