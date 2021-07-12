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

const Row = styled.tr`
  cursor: pointer;
  :hover {
    background-color: #ddd;
  }
  :nth-child(even) {
    background-color: #f2f2f2;
  }
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
    <div className="my-4">
      <table {...getTableProps()}>
        <Headers>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </Headers>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
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
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </Row>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ImageTable;
