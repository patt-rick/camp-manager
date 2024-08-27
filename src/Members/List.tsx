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
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type TableProps = {
    list: any[];
    onViewCamper: (data: any) => void;
    onSearch: (searchString: string) => void;
    // searchTerm: string;
};
export function List({ list, onViewCamper, onSearch }: TableProps) {
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
        <Card className="p-4 m-4">
            <CardTitle className="pl-2 mb-3">{"Campers List"}</CardTitle>
            <Input
                placeholder="Search names..."
                onChange={(event) => onSearch(event.target.value)}
                className="max-w-sm"
            />
            <Table className="">
                <TableCaption>A list of your campers.</TableCaption>
                <TableHeader>
                    <TableRow className="font-bold text-black">
                        <TableHead className="font-bold">Name</TableHead>
                        <TableHead className="font-bold">Church</TableHead>
                        <TableHead className="font-bold">Classification</TableHead>
                        <TableHead className="font-bold text-center">Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentList.map((list) => (
                        <TableRow onClick={() => onViewCamper(list)} key={list.id}>
                            <TableCell className="font-medium">{`${list.last_name}, ${list.first_name}`}</TableCell>
                            <TableCell>{list.church}</TableCell>
                            <TableCell>{list.classification}</TableCell>
                            <TableCell className="text-center">{list.gender}</TableCell>
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
                        {renderPaginationItems()}
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
    function renderPaginationItems() {
        const items = [];
        const ellipsisThreshold = 1;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - ellipsisThreshold && i <= currentPage + ellipsisThreshold)
            ) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (
                (i === currentPage - ellipsisThreshold - 1 && i > 2) ||
                (i === currentPage + ellipsisThreshold + 1 && i < totalPages - 1)
            ) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        return items;
    }
}
