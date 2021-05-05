import React from 'react'
import '../App.css';
import '../access/css/style.css'
import { useCallback, useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import search from '../access/img/icon_search.png';

function Intents({location, history}) {
    useEffect(() => {
            console.log('load data', location)
            axios.get(window.location.hostname + ':5000' + '/intent')
                .then(({
                    data
                }) => {
                    setIntents(prev => {
                        return data.map((item, parentIdx) => {
                            return item.examples.split('\n').filter(i => i).map((text, childIdx) => ({
                                text: text.substr(2),
                                intent: item.intent,
                                parent: parentIdx,
                                child: childIdx
                            }))
                        }).flat()
                    })
                })
                .catch(console.log)
    }, [location])
    const [intents, setIntents] = useState([])

    const deleteIntent = useCallback((parent, child) => {
        const examples = intents.filter(i => i.parent === parent && i.child !== child).reduce((ex, i) => ex + `- ${i.text}\n`, '')
        if (examples) {
            axios.put(window.location.hostname + ':5000' + '/intent/' + parent, {examples}).then(({data}) => setIntents(data.map((item, parentIdx) => {
                                return item.examples.split('\n').filter(t => t).map((text, childIdx) => ({
                                    text: text.substr(2),
                                    intent: item.intent,
                                    path: `${parentIdx}.${childIdx}`
                                }))
                            }).flat()))
        } else {
            axios.delete(window.location.hostname + ':5000' + '/intent/' + parent).then(({data}) => setIntents(data.map((item, parentIdx) => {
                                return item.examples.split('\n').filter(t => t).map((text, childIdx) => ({
                                    text: text.substr(2),
                                    intent: item.intent,
                                    path: `${parentIdx}.${childIdx}`
                                }))
                            }).flat()))
        }
    }, [intents])
    return (
         <div className="table_conten">
            <div className="header_tab">
                <div className="text_01">Ý định</div>
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
                        <td>Ý định</td>
                        <td>Nội dung</td>
                        <td></td>
                    </tr>
                    {intents.map(i => (
                        <tr className="tr_hover" key={i.text + i.intent}>
                            <td className="col_name">{i.intent}</td>
                            <td className="clo_entitis">{i.text}</td>
                            <td className="select_dot" onClick={() => deleteIntent(i.parent, i.child)}>Xoá</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Intents
