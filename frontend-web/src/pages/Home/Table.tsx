/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useFilters,
      useSortBy,
      usePagination
    );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  setSelectedImageId(row.original.id);
                }}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ImageTable;
