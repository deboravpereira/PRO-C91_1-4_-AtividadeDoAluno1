import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    ImageBackground,
    Alert,
    Image,
    Touchable
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";

import { TouchableOpacity } from "react-native-gesture-handler";

export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            isRefresh: false
        };
    }

    componentDidMount() {
        this.getIssLocation()
        try{
            setInterval(() => this.getIssLocation(), 5000);
        }catch(e){
            console.log(e)
        }
    }

    getIssLocation = () => {
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({ location: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
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
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Localização da EEI</Text>
                        </View>
                        <View style={styles.refeshContainer}>
                            <TouchableOpacity style={{ width: 100, height: "100%", alignItems: "center" }} onPress={() =>
                                this.setState({})
                            }>
                                <Image source={require("../assets/refresh_icon.png")} style={{ width: 50, height: 50 }}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: this.state.location.latitude,
                                    longitude: this.state.location.longitude,
                                    latitudeDelta: 100,
                                    longitudeDelta: 100
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
                                >
                                    <Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
                                </Marker>
                            </MapView>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Valocidade (KM/H): {this.state.location.velocity}</Text>
                        </View>
                       
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    refeshContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
});
