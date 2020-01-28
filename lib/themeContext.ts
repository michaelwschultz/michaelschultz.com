import React from 'react'
import { ThemeType } from './types';

export interface ThemeContextType {
  theme: ThemeType[],
}

export const Themes: ThemeType[] = [
  {
    backgroundImage: '1',
    textColor: 'color-teal',
  },
  {
    backgroundImage: '2',
    textColor: 'pink',
  },
  {
    backgroundImage: '3',
    textColor: 'pink',
  },
  {
    backgroundImage: '4',
    textColor: 'color-green',
  },
];

export const ThemeContext = React.createContext<ThemeType | null>(null);