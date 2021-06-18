import { createContext } from 'react';
import { ConfirmType } from './types';

const ConfirmContext = createContext<ConfirmType | undefined>(undefined);

export default ConfirmContext;
