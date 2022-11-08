import { createContext } from 'react';

import { language } from '../defaults/language';
import { GettyPluginLocal } from '../api';

export const LanguageContext = createContext<GettyPluginLocal>(language);
