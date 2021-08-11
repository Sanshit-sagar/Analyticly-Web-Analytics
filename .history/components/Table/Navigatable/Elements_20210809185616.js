import React, { useRef } from 'react'
import {useFocusRing} from '@react-aria/focus'; 
import {mergeProps} from '@react-aria/utils';
import {
    useTable, useTableCell, useTableColumnHeader, 
    useTableHeaderRow, useTableRowGroup, useTableRow, 
    useTableSelectAllCheckbox, useTableSelectionCheckbox
} from '@react-aria/table'
import {useToggleState} from '@react-stately/toggle';
import {useCheckbox} from '@react-aria/checkbox';


export function TableRowGroup({type: Element, style, children}) {
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Element {...rowGroupProps} style={style}>
      {children}
    </Element>
  );
}

export function TableHeaderRow({item, state, children}) {
  let ref = useRef();
  let {rowProps} = useTableHeaderRow({node: item}, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

export function TableColumnHeader({column, state}) {
  let ref = useRef();
  let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      style={{
        textAlign: column.colspan > 1 ? 'center' : 'left',
        padding: '5px 10px',
        outline: isFocusVisible ? '2px solid orange' : 'none',
        cursor: 'default'
      }}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: '0 2px',
            visibility:
              state.sortDescriptor?.column === column.key ? 'visible' : 'hidden'
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

export function TableRow({item, children, state}) {
  let ref = useRef();
  let isSelected = state.selectionManager.isSelected(item.key);
  let {rowProps} = useTableRow({node: item}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  return (
    <tr
      style={{
        background: isSelected
          ? 'blueviolet'
          : item.index % 2
          ? 'var(--spectrum-alias-highlight-hover)'
          : 'none',
        color: isSelected ? 'white' : null,
        outline: isFocusVisible ? '2px solid orange' : 'none'
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

export function TableCell({cell, state}) {
  let ref = useRef();
  let {gridCellProps} = useTableCell({node: cell}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: '5px 10px',
        outline: isFocusVisible ? '2px solid orange' : 'none',
        cursor: 'default'
      }}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

export function TableCheckboxCell({cell, state}) {
  let ref = useRef();
  let {gridCellProps} = useTableCell({node: cell}, state, ref);
  let {checkboxProps} = useTableSelectionCheckbox({key: cell.parentKey}, state);

  let inputRef = useRef(null);
  let {inputProps} = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  return (
    <td {...gridCellProps} ref={ref}>
      <input {...inputProps} />
    </td>
  );
}

export function TableSelectAllCell({column, state}) {
  let ref = useRef();
  let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
  let {columnHeaderProps} = useTableColumnHeader({node: column}, state, ref);

  let {checkboxProps} = useTableSelectAllCheckbox(state);
  let inputRef = useRef(null);
  let {inputProps} = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  return (
    <th {...columnHeaderProps} ref={ref}>
      {
        isSingleSelectionMode && (
          <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>
        )
      }
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode ? {visibility: 'hidden'} : undefined}
      />
    </th>
  );
}
