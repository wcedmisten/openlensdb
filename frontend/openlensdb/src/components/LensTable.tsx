import type { Lens } from "../types/Lens";
import './LensTable.css';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

export default function LensTable(props: { data: Lens[] }) {
    const columnHelper = createColumnHelper<Lens>()

    const columns = [
        columnHelper.accessor('model_name', {
            header: () => 'Model Name',
        }),
        columnHelper.accessor('aperture_max', {
            header: () => 'Max Aperture',
            cell: (info) => info.getValue() && "f/" + info.getValue().toString(),
        }),
        columnHelper.accessor('aperture_min', {
            header: () => 'Min Aperture',
            cell: (info) => info.getValue() && "f/" + info.getValue().toString(),
        }),
        columnHelper.accessor('focal_length_min', {
            header: () => 'Min Focal Length (mm)',
        }),
        columnHelper.accessor('focal_length_max', {
            header: () => 'Max Focal Length (mm)',
        }),
        columnHelper.accessor('mounts', {
            header: () => 'Mounts',
            cell: (info) => info.getValue().toString().replaceAll(',', ', '),
        }),
    ]

    const table = useReactTable({
        data: props.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2">
            <table className="striped-table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext(),
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}
