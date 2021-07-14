/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';
import styled from 'styled-components';

const Headers = styled.thead`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: deepskyblue;
  color: white;
`;

const Cell = styled.td`
  overflow: hidden;
  border: solid 0.4px lightgrey;
`;

const Row = styled.tr`
  min-width: 400px;
  cursor: pointer;
  :hover {
    background-color: #ddd;
  }
  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Table = styled.table`
  border-spacing: 50px 0;
  table-layout: fixed;
  width: clamp(400px, 800px, 1200px);
`;

const ImageTable: React.FC<any> = ({ data, setSelectedImageId }): any => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'filename',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Created By',
        accessor: 'user.username',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="py-4">
      <Table {...getTableProps()}>
        <Headers>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </Headers>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <Row
                {...row.getRowProps()}
                onClick={() => {
                  setSelectedImageId(row.original.id);
                }}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                  );
                })}
              </Row>
            );
          })}
        </tbody>
      </Table>

      <div className="pagination p-2">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const newpage = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(newpage);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSizes) => (
            <option key={pageSizes} value={pageSizes}>
              Show {pageSizes}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ImageTable;
