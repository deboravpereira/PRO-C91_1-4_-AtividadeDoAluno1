import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import axios from "axios";

export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        };
    }
}

render() {
    if (Object.keys(this.state.location).length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Carregando</Text>
            </View>
        )
    } else {
        return (
            
        );
    }
}
}

const styles = StyleSheet.create({
    
});