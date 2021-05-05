import React from 'react'
import '../App.css';
import '../access/css/style.css'
import { useCallback, useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import search from '../access/img/icon_search.png';

function Utterances({location}) {
    useEffect(() => {
            axios.get(window.location.hostname + ':5000' + '/story')
                .then(({
                    data
                }) => {
                    setStories(data)
                })
                .catch(console.log)
    }, [location])
    const [stories, setStories] = useState([])
    const deleteStory = useCallback((idx) => {
        axios.delete(window.location.hostname + ':5000' + '/story/' + idx).then(({data}) => setStories(data))
    }, [])
    return (
         <div className="table_conten">
            <div className="header_tab">
                <div className="text_01">Kịch bản</div>

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
                        <td>Ý định</td>
                        <td>Phản hồi</td>
                        <td></td>
                    </tr>
                    {stories.map((s, idx) => (
                        <tr className="tr_hover" key={s.story}>
                            <td className="col_name">{s.story}</td>
                            <td className="clo_entitis">{s.steps[0].intent}</td>
                            <td className="clo_entitis">{s.steps[1].action}</td>
                            <td className="select_dot" onClick={() => deleteStory(idx)}>Xoá</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Utterances
