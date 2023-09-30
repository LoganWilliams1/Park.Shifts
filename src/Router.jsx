import {BrowserRouter, Switch, Route } from "react-router-dom";
import {App} from "./App";


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router