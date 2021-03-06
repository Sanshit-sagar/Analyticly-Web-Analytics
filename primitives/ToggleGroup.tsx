import { blackA, mauve } from '@radix-ui/colors';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';
import { darkTheme, styled, CSS, StitchesVariants } from '../stiches.config'

const ControlButton = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: '$loContrast',
  color: '$hiContrast',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 9,
  padding: '$1 $2',
  lineHeight: 1,
  borderColor: 'transparent',
  borderRight: 'thin solid $hiContrast',
  borderRightRadius: '0px',
  '&:first-child': { 
    marginLeft: 0, 
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4,
  },
  '&:last-child': { 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4, 
    borderRightColor: '$hiContrast',
  },
  '&:hover': { 
    backgroundColor: '$slate9',
    color: '$slate4',
  },
  '&[data-state=on]': { 
    backgroundColor: '$slate11',
    color: '$slate1',
  },
  '&[data-state=disabled]': { 
    color: 'transparent',
  },
  '&:focus': { 
    position: 'relative', 
    color: mauve.mauve6, 
    outline: 'none' 
  },
});

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '$slate10',
  border: 'thin solid $hiContrast',
  borderRadius: '$1',
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$loContrast',
  color: '$hiContrast',
  height: 28,
  width: 35,
  display: 'flex',
  fontSize: 9,
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: 'thin solid $hiContrast',
  '&:first-child': { 
    marginLeft: 0, 
    borderTopLeftRadius: 4, 
    borderBottomLeftRadius: 4,
  },
  '&:last-child': { 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4, 
    borderRightColor: '$hiContrast',
  },
  '&:hover': { 
    backgroundColor: '$slate9',
    color: '$slate4',
  },
  '&[data-state=on]': { 
    backgroundColor: '$slate11',
    color: '$slate1',
  },
  '&[data-state=disabled]': { 
    color: 'transparent',
  },
  '&:focus': { 
    position: 'relative', 
    color: mauve.mauve6, 
    outline: 'none' 
  },
});

// Exports
export const ToggleGroup = StyledToggleGroup;
export const ActionButtonItem = StyledItem;
export const ToggleButtonItem = ControlButton;

