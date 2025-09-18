import React, {FC} from 'react';
import ReactPaginate from "react-paginate";

interface IProps {
    total: number;
    page: number;
    setSearchParams:(params: any) => void;
}
const PaginationComponent: FC<IProps> = ({total, page, setSearchParams}) => {

    const onPageChange = (selectedPage: {selected: number}) =>{
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", String(selectedPage.selected + 1));
            return newParams;
        });
    }
    return (
        <div className="p-lg-1">
            <ReactPaginate
                pageCount={Math.ceil(total / 25)}
                pageRangeDisplayed={7}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}
                forcePage={page - 1}

                containerClassName="pagination justify-content-center"
                pageClassName="page-item m-1"
                pageLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                previousClassName="page-item m-1"
                previousLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                nextClassName="page-item m-1"
                nextLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"
                breakClassName="page-item m-1"
                breakLinkClassName="page-link btn rounded-circle btn-outline-secondary text-secondary"

                previousLabel="<"
                nextLabel=">"
            />
        </div>
    );
};

export default PaginationComponent;