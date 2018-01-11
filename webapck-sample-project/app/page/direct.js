import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
// 此内容讲解<Redirect /> ： 它只负责渲染时改变地址，历史信息也将使用新地址，它不负责渲染Component。

{/* <Redirect>
<Redirect> 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

to: string
重定向的 URL 字符串

to: object
重定向的 location 对象

push: bool
若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

from: string
需要匹配的将要被重定向路径。 */}


const Links = () => (
    <div>
        <h2>此内容讲解 Redirect:</h2> 
        <p> 它只负责渲染时改变地址，历史信息也将使用新地址，它不负责渲染Component。</p>
        <ul>
            <li><Link to='/direct/'> Home </Link></li>
            <li><Link to="/direct/old/123">Old</Link></li>
            <li><Link to="/direct/new/456">New</Link></li>
            <li><Link to="/direct/redirect/789">Redirect</Link></li>
        </ul>
    </div>
)

const logined = true;
const Direct = () => (
    <BrowserRouter>
        <div>
            <Links />
            <Route exact path='/direct/' render={() => <h2>welcome to 'redirect' !</h2>} />

            {/* 适用于需要传参的重定向需求 push(true):回将新地址加入历史记录，无法回退到以前页面*/ }
            <Route path="/direct/redirect/:str" 
                render={({match}) => (
                    <div>
                        <Redirect push to={`/direct/new/${match.params.str}`} />
                        { console.log( {match} ) }
                    </div>
                )}
            />
             {/* 需要被重定向的路径，可以结合 Switch ，这是适用于不需要传参的重定向需求*/}
             <Switch>
                <Route path="/direct/new/:str" render={({match}) => <h1>New: {match.params.str}</h1>} />
                <Redirect from="/direct/old/123" to="/direct/new/123" />
             </Switch>

        </div>
    </BrowserRouter>
)

export default Direct
