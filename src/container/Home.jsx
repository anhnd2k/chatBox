import React, {useState, Fragment} from "react";
import "../App.css";
import ListEntity from "../component/ListEntity";
import PopUpCreateEntity from "../base/PopUpCreateEntity";
import axios from "axios";
import PopUpCreateIntent from "../base/PopUpCreateIntent";
import dropdown from '../access/img/icon_down.png';
import Loader from 'react-loader-spinner';
import robot from "../access/img/icon_robot.png";
import edit from '../access/img/icon_edit_text.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

function Card({ card, onChangeCard, indexSelect, onDeleteCard }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false)
  const [valueUrl, setValueUrl] = React.useState("")
  const [valueNameKnot, setNameKnot] = React.useState("")
  const [valiDateUrlInput, setValiDateUrlInput] = React.useState(false)
  const { title, subtitle, image, buttons } = card
  const [text,setText] = React.useState(null)
   // model
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal2 = () => {
    setIsOpen2(true)
  }

  const closeModal2 = () => {
    setIsOpen2(false)
  }

  const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:20
    }
  };
  const removeCard = (key) => {
    onDeleteCard(key)
  }
  const onChangeUrlImg = (url) => {
    if (!url) {
      setValiDateUrlInput(true)
      return
    }
    onChangeCard({ ...card, image: url })
    closeModal()
    setValiDateUrlInput(false)
    setValueUrl("")
  }

  const onchangeText = (nameKnot) => {

  }
  return (
    <div style={{
      borderRadius: '8px',
      backgroundColor: '#ccc',
      padding: '16px',
      border: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      marginRight: '24px',
      position:"relative"
    }}>
      <input value={title} placeholder='Nhập tiêu đề' style={{marginBottom: '8px'}} onChange={e => onChangeCard({...card, title: e.target.value})} />
      <input value={subtitle} placeholder='Nhập mô tả' style={{marginBottom: '8px'}} onChange={e => onChangeCard({...card, subtitle: e.target.value})} />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px'}}>
        <img src={image || 'https://via.placeholder.com/200/200'} alt={'ảnh thẻ'}
        onClick={() => {
          // const url = prompt("Nhập url ảnh", image)
          openModal()
          // if (url) {
          //   onChangeCard({...card, image: url})
          // }
        }}
        style={{
          width: '150px', height: '150px',
          objectFit: 'cover'
        }} />
      </div>
      {buttons && buttons.map((b, idx) => (
        <button key={idx} onClick={() => {
          // openModal2()
          const text = prompt("Nhập tên nút", b.text) 
          // const payload = prompt("Nhập payload", b.payload) 
          if (text) {
            const btns = Array.from(card.buttons)
            btns[idx] = {text}
            onChangeCard({
              ...card,
              buttons: btns
            })
          }
        }}>{b.text}</button>
      ))}
      <button onClick={() => onChangeCard({ ...card, buttons: [...card.buttons, { text: '<rỗng>', payload: '' }] })}>+</button>
      <div style={{
        position: "absolute",
        width: 30,
        height: 30,
        backgroundColor: "#9d89da",
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ccc  ",
        top: -10,
        right: -10,
        cursor: "pointer",
      }}
      onClick={() => removeCard(indexSelect)}
      >
        x
      </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
        <div style={{marginBottom:20}}>Nhập url ảnh</div>
        <input value={valueUrl} onChange={(event) => [setValueUrl(event.target.value), setValiDateUrlInput(false)]} style={{ width: 300, fontSize: 16 }} />
          {valiDateUrlInput && <div style={{fontSize: 10, color:"#e26060"}}>Vui lòng nhập url</div>}
            <div style={{ display: "flex", justifyContent: "space-around", marginTop:20}}>
              <button onClick={() => closeModal()} style={{backgroundColor:"#ccc", color:"#e26060", fontWeight:"700"}} className={"btnToggleUtter"}>Thoát</button>
              <button onClick={() => onChangeUrlImg(valueUrl)} style={{fontWeight:"700"}} className={"btnToggleUtter"}>Chọn</button>
              </div>
      </Modal>
      <Modal
          isOpen={modalIsOpen2}
          onRequestClose={closeModal2}
          style={customStyles}
        >
        <div style={{marginBottom:20}}>Nhập tên nút</div>
        <input value={valueNameKnot} onChange={(event) => [setNameKnot(event.target.value)]} style={{ width: 300, fontSize: 16 }} />
          {valiDateUrlInput && <div style={{fontSize: 10, color:"#e26060"}}>Vui lòng nhập tên nút</div>}
            <div style={{ display: "flex", justifyContent: "space-around", marginTop:20}}>
              <button onClick={() => closeModal2()} style={{backgroundColor:"#ccc", color:"#e26060", fontWeight:"700"}} className={"btnToggleUtter"}>Thoát</button>
              <button onClick={() => onchangeText(valueNameKnot)} style={{fontWeight:"700"}} className={"btnToggleUtter"}>Chọn</button>
              </div>
        </Modal>
    </div>
  );
}

function Home() {
  const [showPopup, setShowpopup] = useState(false);
  const [popupIntent, setPopupIntent] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [utter, setUtter] = useState("");
  const [title, setTitle] = useState("");
  const [entitySelect, setEntitySelect] = useState("");
  const [editing, setEditing] = useState(false);
  const [listDataEntity, setListDataEntity] = useState([]);
  const [textInputEnity, setTextInputEnity] = useState("");
  const [example, setExample] = useState("");
  const [training, setTraining] = useState(false);
  const [utterMode, setUtterMode] = useState('basic'); // basic, advanced
  const [additionalCards, setAdditionalCards] = useState([]);
  const train = async () => {
    try {
      setTraining(true)
      await axios.get(window.location.hostname + ':5000' + '/train')
      setTraining(false)
    } catch (e) {
      console.log(e)
    }
  }

  const [selectedIntent, setSelectedIntent] = useState('');
  const onSelectEntity = entity => {
    setExample(prev => {
      if (prev) return prev.replace(entitySelect, `[${entitySelect}]{"entity": "${entity}"}`)
      else return textInput.replace(entitySelect, `[${entitySelect}]{"entity": "${entity}"}`)
    })
    setListDataEntity(prev => ([
      ...prev,
      { name: entitySelect, entity: entity},
    ]));
  }
  const onRemoveEntity = idx => {
    console.log(idx)
    const { name, entity }= listDataEntity[idx]
    setExample(prev => {
      return prev.replace(`[${name}]{"entity": "${entity}"}`, name)
    })
    setListDataEntity(prev => {
      return prev.filter((it, currIdx) => currIdx !== idx)
    })
  }

  const handleMouseUp = () => {
    var res = window.getSelection().toString();
    if (res) {
      setShowpopup(true)
    } else {
      setShowpopup(false)
    }
    setEntitySelect(res)
  };

  const onClickPopUpCreate = () => {
    setShowpopup(false);
  };
  const openPopup = () => {
    !checkSame && setPopupIntent(true);
    setCheckSame(false);
  };

  const onClickOutside = () => {
    setPopupIntent(false);
    setCheckSame(true);
    setTimeout(() => {
      setCheckSame(false);
    }, 100);
  };

  const onClickBtn = () => {
    setListDataEntity([
      ...listDataEntity,
      { entity: textInputEnity, valueSelect: entitySelect },
    ]);
    setShowpopup(false);
  };
  const handlerEditing = () => {
    setEditing(!editing);
  };
  const onChangeText = (text) => {
    console.log(text);
    setTextInputEnity(text);
  };

  const saveStory = async () => {
    console.log(example);
    try {
      await axios.post(window.location.hostname + ':5000' + '/intent', {
        name: selectedIntent, example: example ? example : textInput
      })
      let utterObj;
      if (utterMode === 'advanced') {
        utterObj = {name: `utter_${new Date().getTime()}`, text: utter}
        utterObj.elements = additionalCards.map(c => ({
          title: c.title,
          subtitle: c.subtitle,
          image_url: c.image,
          buttons: c.buttons.map(b => ({
            title: b.text,
            payload: b.payload
          }))
        }))
      } else {
        utterObj = {name: `utter_${new Date().getTime()}`, text: utter}
      }
      await axios.post(window.location.hostname + ':5000' + '/story', {name: title, intent: selectedIntent, utter: utterObj})
      setTitle('')
      setTextInput('')
      setUtter('')
      setListDataEntity([])
      setSelectedIntent('')
      setAdditionalCards([])
      setUtterMode('basic')
      notify()
    } catch (e) {
      notifyErr()
    }
  }

  const notify = () => toast("Thành công!", { position: "top-center", autoClose: 2000, })
  const notifyErr = () => toast.error("Thất bại!",{position:"top-center", autoClose: 1500,})

  return (
    <div className="table_conten">
      {training && <div
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          position: "absolute",
          backgroundColor: 'rgba(0,0,0, 0.2)',
          zIndex: 9999
        }}
      >
          <Loader type="ThreeDots" color="#5c3bbf" height="100" width="100" />
      </div>}
      <div>
        <h2>Huấn luyện bot</h2>
        <div className="textDescribe">
          Nhập mẫu câu ý định và câu trả lời. Bạn cũng có thể đánh dấu các thực thể trong câu.
        </div>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}} />
          <button onClick={train} className="btnTrain" disabled={training} style={{backgroundColor: training ? 'rgba(92, 59, 191, 0.2)' : '#5c3bbf'}}>
              Tiến hành học
          </button>
        </div>
        {/* input */}
        <div className="inputBox">
          <input
            placeholder="Tiêu đề"
            className="inputTag"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputBox">
          {editing ? (
            <Fragment>
              <div
                onMouseUp={handleMouseUp}
                id="editor"
                style={{ fontSize: 18, marginLeft: 10 }}
                className="input"
              >
                {!!textInput ? Array.from(textInput).map((char, index) => (
                  <span key={index}>{char}</span>
                )) : "Ý định"}
              </div>
              <div style={{display:"flex"}}>
                <button className="btnSave" onClick={handlerEditing}>
                  Sửa
                   <img
                    alt={"edit"}
                    style={{ width: 15, height: 15, marginLeft: 10 }}
                    src={edit}
                  />
                </button>
                
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <input
                placeholder="Ý định"
                className="inputTag"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <button className="btnSave" onClick={handlerEditing}>
                Nhập xong
              </button>
            </Fragment>
          )}
        </div>
        <div className="inputArea">
          <textarea
            placeholder="Phản hồi"
            className="textareaTag"
            value={utter}
            rows={1}
            onChange={(e) => setUtter(e.target.value)}
          />
          <button className="btnToggleUtter" onClick={() => {
            if (utterMode === 'advanced') {
              setAdditionalCards([])
            }
            setUtterMode(prev => prev === 'basic' ? 'advanced' : 'basic')
          }}>
            {utterMode === 'basic' ? "Cơ bản" : "Nâng cao"}  
          </button>
        </div>
        {utterMode === 'advanced' && <div className="advanced-utter">
          {additionalCards.map((c, idx) => {
            return <Card indexSelect={idx} key={idx} card={c} onChangeCard={(card) => {
              setAdditionalCards(prev => {
                const next = Array.from(prev)
                next[idx] = card
                return next
              })
            }}
              onDeleteCard={(index) => {
                var arryCard = [...additionalCards]
                arryCard.splice(index, 1)
                setAdditionalCards(arryCard)
            }}
            />
          })}
          <div>
            <button
            onClick={() => {
              setAdditionalCards(prev => [...prev, {
                title: '', subtitle: '', image: '', buttons: []
              }])
              }}
            
              style={additionalCards.length >=5 ? {display:"none"} : {
                width: '64px',
                height: '64px',
                borderRadius: '32px',
                backgroundColor: '#2196f3',
                fontSize: '24pt',
                color: 'white',
                border: '1px solid #2196f3'
              }}>
            +
          </button>
          </div>
        </div>}
        {showPopup && (
          <PopUpCreateEntity
            width={"60%"}
            show={showPopup}
            placeholderInput={textInputEnity}
            btnText={"Tạo thực thể"}
            onClickOutside={onClickPopUpCreate}
            onChangeText={onChangeText}
            onSelect={onSelectEntity}
          />
        )}
        <div className="choose_intent">
          <div className="conten_1">
            <div>Ý định</div>
            <div onClick={openPopup} className="conten_2">
              <div style={{ fontSize: 14, marginLeft: 10 }}>
                {selectedIntent ? selectedIntent : 'Chọn hoặc thêm ý định'}
              </div>
              <img
                alt={"dropdown"}
                style={{ width: 10, height: 10, marginRight: 15 }}
                src={dropdown}
              />
            </div>
            {popupIntent && (
              <PopUpCreateIntent
                width={"60%"}
                top={"42px"}
                left={"53px"}
                btnText={"Tạo ý định"}
                show={popupIntent}
                onClickOutside={onClickOutside}
                onSelect={setSelectedIntent}
                // placeholderInput={entitySelect}
                onClickBtn={onClickBtn}
                // onChangeText={onChangeText}
              />
            )}
          </div>
        </div>
        <ListEntity data={listDataEntity} setData={onRemoveEntity} />
        <button onClick={saveStory} className="noti" style={{marginTop: '36px', marginBottom: '36px', fontSize: '18px', width: '200px', height: 40}}>
          Thêm kịch bản
        </button>
      </div>
      <div>
        <ToastContainer position="top-center" autoClose={2000}/>
      </div>

    </div>
  )
}

export default Home;
