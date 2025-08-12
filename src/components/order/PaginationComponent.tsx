import React, {FC} from 'react';
import ReactPaginate from "react-paginate";

interface IProps {
    total: number;
    page: number;
    setSearchParams:(params: any) => void;
}
const PaginationComponent: FC<IProps> = ({total, page, setSearchParams}) => {

    const handlePageChange = (selectedPage: {selected: number}) =>{
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", String(selectedPage.selected + 1));
            return newParams;
        });
    }
    return (
        <div>
            <ReactPaginate
                pageCount={Math.ceil(total / 25)}
                pageRangeDisplayed={7}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                previousLabel="<"
                nextLabel=">"
            />
        </div>
    );
};

export default PaginationComponent;