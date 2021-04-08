import React from 'react';
import { GlobalContextType } from '../../types';
import { PolarProjectionType } from './types';

const PolarContext = React.createContext<
  GlobalContextType<PolarProjectionType>
>({});

export default PolarContext;
