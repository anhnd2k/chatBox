import React, { useState } from "react";
import "./ListEntity.css";

function EntityItem({ name, entity, deleteItem }) {
  const [indexPopUpActive, setIndexPopUpActive] = useState(null);

  const onPopUp = (key) => {
    if (indexPopUpActive !== key) {
      setIndexPopUpActive(key);
    }
  };

  return (
    <div className="item">
      <div className="best_item name_item">{name}</div>
      <div className="best_item">
        <div
          style={{ marginLeft: "10px" }}
          onClick={() => onPopUp(2)}
          className="role"
        >
          <div style={{ fontSize: "12px" }}>{entity}</div>
        </div>
      </div>
      {/* <div className="best_item">
        <div
          className="role2"
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <div>N/A</div>
        </div>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          cursor: "pointer",
          color: "rgb(138, 132, 132)",
        }}
        onClick={deleteItem}
      >
        X
      </div>
    </div>
  );
}

export default EntityItem;
