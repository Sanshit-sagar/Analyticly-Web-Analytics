import React, { useRef, useContext } from 'react'
import { 
    TableRowGroup, 
    TableHeaderRow, 
    TableSelectAllCell, 
    TableColumnHeader,
    TableCheckboxCell, 
    TableRow,
    TableCell
} from './Elements'
import { useTableState } from '@react-stately/table';
import  { useTable } from '@react-aria/table'
import { GlobalStore } from '../../../store'

const mauveA = {
  mauveA1: '#58055803',
  mauveA2: '#29052907',
  mauveA3: '#2700270d',
  mauveA4: '#10011e12',
  mauveA5: '#0d021817',
  mauveA6: '#1201121d',
  mauveA7: '#08010f24',
  mauveA8: '#05001238',
  mauveA9: '#05001271',
  mauveA10: '#0400137b',
  mauveA11: '#02001091',
  mauveA12: '#05000fea',
}
const mauveDark = {
  mauve1: '#161618',
  mauve2: '#1c1c1f',
  mauve3: '#232326',
  mauve4: '#28282c',
  mauve5: '#2e2e32',
  mauve6: '#34343a',
  mauve7: '#3e3e44',
  mauve8: '#504f57',
  mauve9: '#706f78',
  mauve10: '#7e7d86',
  mauve11: '#a09fa6',
  mauve12: '#ededef',
}

function Table(props) {
    let state = useTableState({
      ...props,
      showSelectionCheckboxes: props.selectionMode === 'multiple'
    });
    let ref = useRef();
    let {collection} = state;
    let {gridProps} = useTable(props, state, ref);

    const uiState = useContext(GlobalStore.State)
  
    return (
      <table {...gridProps} ref={ref}>

        <TableRowGroup
          type="thead"
          style={{
            backgroundColor: uiState.darkMode ? mauveA.mauveA9 : mauveDark.mauve11,
            borderBottom: '2px solid', 
            borderBottomColor:uiState.darkMode ? mauveA.mauveA5 : mauveA.mauveA12
          }}
        >
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
              {[...headerRow.childNodes].map((column) =>
                column.props.isSelectionCell ? (
                  <TableSelectAllCell
                    key={column.key}
                    column={column}
                    state={state}
                  />
                ) : (
                  <TableColumnHeader
                    key={column.key}
                    column={column}
                    state={state}
                  />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableRowGroup>

        <TableRowGroup type="tbody">
          {[...collection.body.childNodes].map((row) => (
            <TableRow key={row.key} item={row} state={state}>
              {[...row.childNodes].map((cell) =>
                cell.props.isSelectionCell ? (
                  <TableCheckboxCell 
                    key={cell.key} 
                    cell={cell} 
                    state={state} 
                    style={{ backgroundColor: 'red' }} 
                  />
                ) : (
                  <TableCell 
                    key={cell.key} 
                    cell={cell} 
                    state={state} 
                  />
                )
              )}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    );
  }

export default Table