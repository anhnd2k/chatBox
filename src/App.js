import React, { useState } from "react";
import "./App.css";
import "./access/css/style.css";
import { Route, NavLink } from "react-router-dom";
import Home from "./container/Home";
import Intents from "./container/Intents";
import Entities from "./container/Entities";
import Utterances from "./container/Utterances";
import ChatView from "./container/ChatView";
import barChart from "./access/img/icon_bar_chart.png";
import robot from "./access/img/icon_robot.png";
import chat from "./access/img/icon_chat.png";

function App() {
  const [activePage, setActivePage] = useState("/");

  const renderSwith = (key) => {
    switch (key) {
      case "/":
        return <Home />;
      case "/Chatview":
        return <ChatView />;
      case "/intents":
        return <Intents />;
      case "/entities":
        return <Entities />;
      case "/stories":
        return <Utterances />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {/* header */}
      <div className="body">
        <div className="tabbar">
          <div
            style={
              activePage === "/"
                ? {
                    borderLeftWidth: 4,
                    borderLeftStyle: "solid",
                    borderLeftColor: "cornflowerblue",
                  }
                : {}
            }
            onClick={() => setActivePage("/")}
            to="/"
            className="understanding"
          >
            <div>
              <img
                src={robot}
                alt={"training"}
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 10,
                }}
              />
            </div>
            <div
              style={{
                paddingLeft: 10,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Huấn luyện
            </div>
          </div>
          <div
            style={
              activePage === "/Chatview"
                ? {
                    borderLeftWidth: 4,
                    borderLeftStyle: "solid",
                    borderLeftColor: "cornflowerblue",
                  }
                : {}
            }
            onClick={() => setActivePage("/Chatview")}
            to="/Chatview"
            // to="/"
            className="understanding"
          >
            <div>
              <img
                src={chat}
                alt={"test chat"}
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 10,
                }}
              />
            </div>
            <div
              style={{
                paddingLeft: 10,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Thử chat
            </div>
          </div>
          <div
            style={
              activePage !== "/" && activePage !== "/Chatview"
                ? {
                    borderLeftWidth: 4,
                    borderLeftStyle: "solid",
                    borderLeftColor: "cornflowerblue",
                  }
                : {}
            }
            className="managerment"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={barChart}
                alt={"management"}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 11,
                }}
              />
              <h4>Quản lý</h4>
            </div>
            <ul className="navMenu">
              <li className="navItem">
                <div
                  style={activePage === "/intents" ? { color: "blue" } : {}}
                  onClick={() => setActivePage("/intents")}
                  className="linkNav"
                  to="/intents"
                >
                  Ý định
                </div>
              </li>
              <li className="navItem">
                <div
                  style={activePage === "/entities" ? { color: "blue" } : {}}
                  onClick={() => setActivePage("/entities")}
                  className="linkNav"
                  to="/entities"
                >
                  Thực thể
                </div>
              </li>
              <li className="navItem">
                <div
                  style={activePage === "/stories" ? { color: "blue" } : {}}
                  onClick={() => setActivePage("/stories")}
                  className="linkNav"
                  to="/stories"
                >
                  Kịch bản
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="conten">{renderSwith(activePage)}</div>
      </div>
    </div>
  );
}

export default App;
