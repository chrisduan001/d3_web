import React, { Component } from "react";
import LandingContainer from "./landing/landingContainer";
import ChattingContainer from "./chattingRoom/chattingContainer";
import { Switch, Route } from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={LandingContainer} />
                    <Route path="/room" component={ChattingContainer}/>
                </Switch>
            </div>
        );
    }
}
