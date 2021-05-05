import React from "react";
import "./popUp.css";
import useOutsideAlerter from "../hook/useOutsideAlerter";
import { useCallback, useEffect, useMemo, useState } from "react/cjs/react.development";
import axios from "axios";

function PopUpCreateEntity(props) {
  const {textInputEntity} = props;
  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef, props.onClickOutside);
  const [dataInput, setDataInput] = useState(textInputEntity || "");

  useEffect(() => {
    if (props.show) {
      axios.get(window.location.hostname + ':5000' + '/entity')
          .then(({
              data
          }) => {
              setEntities(data)
          })
          .catch(console.log)
    } else {
      setDataInput('')
    }
  }, [props.show])
  const [entities, setEntities] = useState([]);
  const displayEntities = useMemo(() => {
    return entities.filter(e => e.trim().toLowerCase().includes(dataInput.trim().toLowerCase()))
  }, [dataInput, entities])

  const createNewEntity = useCallback(() => {
    if (dataInput) {
      axios.post(window.location.hostname + ':5000' + '/entity', {name: dataInput})
            .then(({
                data
            }) => {
                setEntities(data)
                props.onSelect(dataInput)
                props.onClickOutside()
            })
            .catch(console.log)
            .finally(() => setDataInput(''))
    } else {
      alert('Thực thể không được rỗng')
    }
  }, [dataInput, props])

  return (
    <div
      style={{
        width: props.width,
        minHeight: props.height ? props.height : "250px",
        top: props.top ? props.top : "",
        left: props.left ? props.left : "",
        right: props.right ? props.right : "",
        bottom: props.bottom ? props.bottom : "",
      }}
      className="pop_up_input"
      ref={popupRef}
    >
      <div className="create_entity">
        <div className="input_create">
          <input
            style={{
              width: "100%",
              fontSize: 15,
              paddingLeft: 10,
              border: "none",
              boxShadow: "none",
              borderWidth: 0,
              outlineWidth: 0,
            }}
            placeholder={`Thực thể cho "${props.placeholderInput}"`}
            value={dataInput}
            onChange={(e) => {
              setDataInput(e.target.value)
            }}
          />
        </div>
        <div
          style={{ cursor: "pointer" }}
          className="btn_create"
          onClick={createNewEntity}
        >
          <div style={{ color: "#fff" }}>{props.btnText}</div>
        </div>
      </div>
      <div
        style={{
          height: props.heightSuggestions ? props.heightSuggestions : "250px",
        }}
        className="suggestions"
      >
        {displayEntities &&
          displayEntities.map((item) => {
            return (
              <div key={item} className="suggestions_item" onClick={() => {
                props.onSelect(item)
                props.onClickOutside()
              }}>
                <div className="text1_suggestions_item">{item}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PopUpCreateEntity;
