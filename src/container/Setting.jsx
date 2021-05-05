import React from 'react'
import '../App.css';
import '../access/css/style.css'
import search from '../access/img/icon_search.png';

function Setting() {
    return (
         <div className="table_conten">
            <div className="header_tab">
                <div className="text_01">Intents</div>
                <div className="btn">
                    <div style={{ color: "#fff", fontWeight:"bold" }}>Intent</div>
                </div>
            </div>
            <div className="__search_input">
                <img
                    alt="search"
                    style={{ width: 15, height: 15, marginLeft:10, marginRight:10}}
                    src={search}
                />
                <input
                    style={{outlineWidth: 0,width:"100%", border:0, height:"100%", fontSize: 16}}
                />
            </div>
            <div className="__table">
                <table>
                    <tr className="host">
                        <td>Name</td>
                        <td>Entities</td>
                        <td></td>
                    </tr>
                    <tr className="tr_hover">
                        <td className="col_name">Name</td>
                        <td className="clo_entitis">Entities</td>
                        <td className="select_dot"> Delete</td>
                    </tr>
                    <tr className="tr_hover">
                        <td className="col_name">Name</td>
                        <td className="clo_entitis">Entities</td>
                        <td className="select_dot">Delete</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Setting
