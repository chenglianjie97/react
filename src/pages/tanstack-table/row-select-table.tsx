import { useReactTable, getCoreRowModel, createColumnHelper, ColumnDef, flexRender } from "@tanstack/react-table";
type Dto = {
  name: string;
  age: number;
  sex: string;
};
export const RowSelectTable: React.FC = () => {
  const data = [
    { name: "jimmy", age: 18, sex: "男" },
    { name: "chimmy", age: 17, sex: "女" },
  ];

  const col = createColumnHelper<Dto>();
  const columns = [
    col.accessor("name", {
      header: "姓名",
      cell: (info) => info.getValue(),
    }),
    col.group({
      id: "info",
      //   header: "详细信息",
      columns: [
        col.accessor("age", {
          header: "年龄",
          cell: ({ row }) => {
            return "18";
          },
        }),
        col.accessor("sex", {
          header: "性别",
          cell: ({ row }) => {
            return "男";
          },
        }),
      ],
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log("头部", table.getHeaderGroups().at(0));
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody> */}
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  );
};
