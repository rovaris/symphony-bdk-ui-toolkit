import { transparentize } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? theme.theme.white
    : transparentize(0.9, theme.theme.white));

export const getBoxShadowColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT
    ? transparentize(0.86, theme.theme.white)
    : theme.theme.grey
);

export const getBorderColor = ({ theme }) => (
  theme.mode === THEME_TYPES.LIGHT ? theme.theme.grey : null
);