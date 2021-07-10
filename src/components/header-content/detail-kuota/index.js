import React from "react";

const Index = ({ data }) => {
  return (
    <>
      <div className="row m-3 justify-content-between">
        {data &&
          data.map((item, index) => (
            <div
              className={`col p-3 ${index < data.length - 1 && "border-right"}`}
            >
              <span className="font-weight-bold">
                Kuota Angkatan {item.angkatan}
              </span>
              <div className="pt-2">
                <span>{item.kuota ? item.kuota : "-"}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Index;
