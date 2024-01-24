//archivo SimpleTable.jsx'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, 
  getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from 'react'

function SimpleTable({data,columns}) {
  
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering]=useState("");
  const table = useReactTable({
    data, columns, getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting, 
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div>
      <input type="text" value={filtering} onChange={(e)=>setFiltering(e.target.value)}/>
      <table>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {
                      header.isPlaceholder ? null:
                      flexRender(header.column.columnDef.header, header.getContext()
                      )}
                      {
                        { asc: '⬆️', desc: '⬇️' }[header.column.getIsSorted() ?? null]
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          {
            table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(footer => (
                  <th key={footer.id}>
                    {flexRender(footer.column.columnDef.footer,
                      footer.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))
          }
        </tfoot>
      </table>
      <button onClick={() => table.setPageIndex(0)}>Primera pagina</button>
      <button onClick={() => table.previousPage()}>Pagina anterior</button>
      <button onClick={() => table.nextPage()}>Pagina siguiente</button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>ultima pagina</button>
    </div>
  )
}
export default SimpleTable
