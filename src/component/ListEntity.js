import React from "react";
import "./ListEntity.css";
import EntityItem from "./EntityItem";

function ListEntity({ data, setData }) {
  return (
    <div className="box_show_data">
      <div className="title">
        <div className="item_title">
          Thực thể
        </div>
        <div className="item_title">Giá trị tương ứng</div>
      </div>
      {data &&
        data.map((item, idx) => (
          <EntityItem key={item.name} name={item.name} entity={item.entity} deleteItem={() => {
            setData(idx)
          }} />
        ))}
    </div>
  );
}

export default ListEntity;
