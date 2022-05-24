import React from "react";
import { Button } from '@chakra-ui/react';

const Table = ({ children, title, add, handleReload}) => {
  return (
    <section className="table-section">
      <div className="table">
        <div className="table-header row m-0">
          <span className="col-12 col-lg-3 col-xl-5 title">{title}</span>
          <section className="d-flex align-items-center justify-content-end row col-12 col-lg-9 col-xl-7 ms-lg-2">
            <div className="col-md-12 col-lg-3 d-flex">
              <li style={{ listStyle: "none" }}>
                <Button colorScheme="teal" variant="solid" onClick={add}>
                  <i className="uil uil-plus-circle"></i>
                </Button>
                <Button colorScheme="purple" variant="solid" className="ms-3" onClick={handleReload}>
                  <i className="uil uil-redo"></i>
                </Button>
              </li>
            </div>
          </section>
        </div>
        <div className="table-section">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Table;
