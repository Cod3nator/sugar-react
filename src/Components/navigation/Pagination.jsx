/* eslint-disable react/prop-types */
import down_arw from "../assets/down_arw.svg";
import { useCallback, useState } from "react";

const Pagination = ({
  rowsPage,
  changeRows,
  totalPages,
  pageChange,
  totalPatient,
}) => {
  const [openPop, setOpenPop] = useState();
  const rowPage_btn = useCallback(() => {
    setOpenPop((prev) => {
      return !prev;
    });
  });
  return (
    <div className="pagination">
      <div className="select-rows">
        Row per Page: {rowsPage} <img src={down_arw} onClick={rowPage_btn} />
        {openPop && (
          <div className="rows-page">
            <div
              className="rows"
              onClick={() => {
                changeRows(15);
              }}
            >
              15
            </div>
            <div
              className="rows"
              onClick={() => {
                changeRows(50);
              }}
            >
              50
            </div>
            <div
              className="rows"
              onClick={() => {
                changeRows(100);
              }}
            >
              100
            </div>
            <div
              className="rows"
              onClick={() => {
                changeRows(150);
              }}
            >
              150
            </div>
          </div>
        )}
      </div>

      <div className="select-page">
        <div className="prev btn disabled">prev</div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index.toString()}
            className="btn currentPage"
            onClick={() => {
              pageChange(index + 1);
            }}
          >
            {index + 1}
          </div>
        ))}
        <div className="next btn">Next</div>
      </div>

      <div className="of-total">{totalPatient}</div>
    </div>
  );
};

export default Pagination;
