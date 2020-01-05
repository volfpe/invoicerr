import React from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'
import { COLORS, BREAKPOINTS_MAX, button } from '../utils/styles'
import { Link } from 'react-router-dom'


const Container = styled.div`
    > table {
        width: 100%;
        @media (max-width: ${BREAKPOINTS_MAX.MD}) {
            width: calc(100% + 30px);
            margin-left: -15px;
            margin-right: -15px;
        }

        thead {
            border-bottom: 2px solid ${COLORS.belize};
        }

        th {
            height: 40px;
            border-bottom: 4px solid ${COLORS.belize};
            color: ${COLORS.belize};
        }

        tr {
            height: 40px;
        }
        td {
            > a {
                height: 100%;
                padding-left: 15px;
                color: ${COLORS.black};
                text-decoration: none;
                display: block;
            }
        }
        .odd {
            background-color: ${COLORS.white};
            &:hover {
                background-color: #CECECE;
            }
        }
        .even {
            background-color: ${COLORS.clouds};
            &:hover {
                background-color: #C7D5D8;
            }
        }
    }
`

const AddButton = styled.div`
    ${button}
    width: 230px;
    margin-top: 20px;

    @media (max-width: ${BREAKPOINTS_MAX.MD}) {
        width: calc(100% - 30px);
    }

`

interface TableProps {
    columnsTable: {
        Header: string
        accessor: any
    }[]
    button?: {
        link: string
        text: string
    }
    data: Array<any>
    rowLinkPrefix: string;
}

const Table: React.FC<TableProps> = ({ columnsTable, data, button, rowLinkPrefix }) => {

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        columns,
    } = useTable({
        columns: columnsTable,
        data,
    })

    return (
        <Container>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row)
                        return (
                            <tr className={index % 2 ? 'even' : 'odd'} {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}><Link to={rowLinkPrefix + row.original._id}>{cell.render('Cell')}</Link></td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {button &&
                <Link to={button.link} style={{ textDecoration: 'none' }}>
                    <AddButton>
                            {button.text}
                    </AddButton>
                </Link>
            }
        </Container>
    )
}

export default Table