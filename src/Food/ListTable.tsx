import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { capitalize } from "lodash";
import { Card, CardTitle } from "@/components/ui/card";

type TableProps = {
    list: any[];
};
export function ListTable({ list }: TableProps) {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentList = list.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(list.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Card className="p-4">
            <CardTitle className="pl-2 mb-3">{new Date().toDateString()}</CardTitle>
            <Table className="">
                <TableCaption>A list of your food supply.</TableCaption>
                <TableHeader>
                    <TableRow className="font-bold text-black">
                        <TableHead className="font-bold">Food</TableHead>
                        <TableHead className="font-bold">Type</TableHead>
                        <TableHead className="font-bold text-center">Quantity</TableHead>
                        <TableHead className="font-bold">Acquired from</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentList.map((list) => (
                        <TableRow key={list.id}>
                            <TableCell className="font-medium">{list.food}</TableCell>
                            <TableCell>{capitalize(list.food_type)}</TableCell>
                            <TableCell className="text-center">{list.quantity}</TableCell>
                            <TableCell>{list.acquired_from}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                className={
                                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    handlePageChange(Math.min(totalPages, currentPage + 1))
                                }
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </Card>
    );
}
