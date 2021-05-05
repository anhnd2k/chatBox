import React from "react";
import "./popUp.css";
import useOutsideAlerter from "../hook/useOutsideAlerter";
import { useCallback, useEffect, useMemo, useState } from "react/cjs/react.development";
import axios from "axios";

function PopUpCreateIntent(props) {
  const popupRef = React.useRef(null);
  useOutsideAlerter(popupRef, props.onClickOutside);
  const [dataInput, setDataInput] = useState("");

  useEffect(() => {
    if (props.show) {
      console.log('load intent')
      axios.get(window.location.hostname + ':5000' + '/intent')
          .then(({
              data
          }) => {
              const i = data.map((item) => ({name: item.intent})).flat()
              setIntents(i)
          })
          .catch(console.log)
    } else {
      setDataInput('')
    }
  }, [props.show])
  const [intents, setIntents] = useState([]);
  const displayIntents = useMemo(() => {
    return intents.filter(i => i.name.trim().toLowerCase().includes(dataInput.trim().toLowerCase()))
  }, [dataInput, intents])

  const createNewIntent = useCallback(() => {
    if (dataInput) {
      axios.post(window.location.hostname + ':5000' + '/intent', {name: dataInput, example: ''})
            .then(({
                data
            }) => {
                const i = data.map((item) => ({name: item.intent})).flat()
                setIntents(i)
                props.onSelect(dataInput)
                props.onClickOutside()
            })
            .catch(console.log)
            .finally(() => setDataInput(''))
    } else {
      alert('Ý định không được rỗng')
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
            value={dataInput}
            onChange={e => {
              setDataInput(e.target.value)
            }}
          />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={createNewIntent}
          className="btn_create"
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
        {displayIntents &&
          displayIntents.map((item) => {
            return (
              <div key={item.name} className="suggestions_item" onClick={() => {
                  props.onSelect(item.name)
                  props.onClickOutside()
                }}>
                <div className="text1_suggestions_item">{item.name}</div>
              </div>
            );
          })}
        {/* item
        <div className="suggestions_item">
          <div className="text1_suggestions_item">sdafasdfasd</div>
          <div className="text2_suggestions_item">
            dfsadfsdakfjsadkfjsdakjjaksd
          </div>
        </div>
        {/* item */}
      </div>
    </div>
  );
}

export default PopUpCreateIntent;
