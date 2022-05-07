import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MdxComponentProps } from "."
import { Paper, Title } from '..'

type TableProps = {
  // The break width, below which the table will render in it's narrow layout.
  // The default is 0 which disables the narrow layout.
  $breakWidth: number | null
}

type ContainerProps = TableProps & {
  // The max width of the table (default: 1400px).
  $maxWidth: number | null
}

// helper function for setting the break width
const breakWidth = ({ $breakWidth }: {$breakWidth: number | null}) => ($breakWidth || 0)

const Container = styled.div<ContainerProps>`
  max-width: ${({ $maxWidth }) => $maxWidth || 1400}px;
  margin: auto;

  @media (max-width: ${breakWidth}px) {
    border: 0;
    /* this is the max size of a one column table
    max-width: 800px;
  }
`

const Table = styled.table<TableProps>`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  @media (max-width: ${breakWidth}px) {
    border: 0;
  }
`

const TR = styled.tr<TableProps>`
  background-color: #f8f8f8;
  border: 1px solid #ddd;

  @media (max-width: ${breakWidth}px) {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
`

const TH = styled.th.attrs({scope: "col"})`
  padding: 4px;
  text-align: center;
`

const THead = styled.thead<TableProps>`
  @media (max-width: ${breakWidth}px) {
    display: none;
  }
`

const TD = styled.td<TableProps>`
  padding: 4px;
  /* TODO this is making assumptions about the user's layout requirements (OK for now) */
  text-align: ${({ $breakWidth }) => $breakWidth ? "center" : "left"};

  @media (max-width: ${breakWidth}px) {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
    
    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }
    
    &:last-child {
      border-bottom: 0;
    }
  }
`

export type TableContentProps = MdxComponentProps & {
  // The max width of the table (default: 1400px).
  maxWidth: number | null
  // The break width, below which the table will render in it's narrow layout.
  // The default is 0 which disables the narrow layout.
  breakWidth: number | null
  // The table header text, if any.
  headers: string[] | null
  // The relative widths of columns (all equals if not set)
  widths: number[] | null
  // The table data: [row][col]
  data: string[][]
}

// A component that renders a responsive table. The component is based on the approach in this
// example: https://codepen.io/AllThingsSmitty/pen/MyqmdM
const TableContent: FC<TableContentProps> = (
  { title, body, headers, widths, data, maxWidth, breakWidth}
): ReactElement => {
  // set empty headers, if not defined
  const theHeaders = (headers === null ? Array(data[0].length).fill("") : headers)
  // set equal widths, if not defined
  const theWidths = (widths === null ? Array(theHeaders.length).fill(1) : widths)
  const total = theWidths.reduce((previous, current) => previous + current)
  return <Container $breakWidth={breakWidth} $maxWidth={maxWidth}>
    <Title>{ title }</Title>
    <Paper>
      <MDXRenderer>{ body }</MDXRenderer>
    </Paper>
    <Paper>
      <Table $breakWidth={breakWidth}>
        {
          headers === null
          ?
          null
          :
          <THead $breakWidth={breakWidth}>
            <TR $breakWidth={breakWidth}>
              {theHeaders.map((header, h) => (
                <TH style={{width: `${100 * theWidths[h] / total}%`}} key={h}>
                  { header }
                </TH>
              ))}
            </TR>
          </THead>
        }
        <tbody>
          {data.map((row, r) => (
            <TR $breakWidth={breakWidth} key={r}>
              {row.map((cell, c) => (
                <TD $breakWidth={breakWidth} key={c} data-label={theHeaders[c]}>
                  { cell }
                </TD>) 
              )}
            </TR>
          ))}
        </tbody>
      </Table>
    </Paper>
  </Container>
}
  
export default TableContent
