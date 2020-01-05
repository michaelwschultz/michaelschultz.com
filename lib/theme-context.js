import React from 'react'

export const themes = {
  teal: {
    backgroundImage: '1',
    textColor: 'color-teal',
  },
  pink: {
    backgroundImage: '2',
    textColor: 'pink',
  },
  white: {
    backgroundImage: '3',
    textColor: 'white',
  },
  green: {
    backgroundImage: '4',
    textColor: 'color-green',
  },
};

export const ThemeContext = React.createContext(
  themes.teal
);