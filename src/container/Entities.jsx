import React from 'react'
import '../App.css';
import '../access/css/style.css'
import { useCallback, useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import search from '../access/img/icon_search.png';

function Entities({location}) {
    useEffect(() => {
            axios.get(window.location.hostname + ':5000' + '/entity')
                .then(({
                    data
                }) => {
                    setEntities(data)
                })
                .catch(console.log)
    }, [location])
    const [entities, setEntities] = useState([])
    const deleteEntity = useCallback((idx) => {
        axios.delete(window.location.hostname + ':5000' + '/entity/' + idx).then(({data}) => setEntities(data))
    }, [])
    return (
         <div className="table_conten">
            <div className="header_tab">
                <div className="text_01">Thực thể</div>

                {/* <div className="btn">
                    <div style={{ color: "#fff", fontWeight:"bold" }}>Train</div>
                </div> */}
            </div>
            <div className="__search_input">
                <img alt={"search"} style={{ width: 15, height: 15, marginLeft:10, marginRight:10}} src={search}/>
                <input
                    style={{outlineWidth: 0,width:"100%", border:0, height:"100%", fontSize: 16}}
                />
            </div>
            <div className="__table">
                <table>
                    <tr className="host">
                        <td>Tên</td>
                        <td></td>
                    </tr>
                    {entities.map((e, idx) => (
                        <tr className="tr_hover" key={e}>
                            <td className="col_name">{e}</td>
                            <td className="select_dot" onClick={() => deleteEntity(idx)}>Xoá</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Entities
