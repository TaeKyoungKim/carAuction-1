import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import IconText from '../components/IconText';
import RoundButton from '../components/RoundButton';
import MyCarDetail from '../components/MyCarDetail';
import { connect } from 'react-redux';

class MyCarDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            }
        }
    }
    componentDidMount() {
        this.fetchCars().then(items => {
            this.setState({
                data: items
            })
        });
    }
    fetchCars() {
        const itemId = this.props.navigation.getParam('itemId');
        return fetch(`http://192.168.0.76:3000/api/Vehicle/${itemId}?access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    }
    registerCars() {
        this.props.navigation.navigate('RegisterAuction', { itemId: this.state.data.vin })
        this.props.dispatch({
            type: 'LISTING_ID'
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <MyCarDetail vin={this.state.data.vin} carManufacturer={this.state.data.carManufacturer}
                    carSpecies={this.state.data.carSpecies} carYear={this.state.data.carYear} carImage={this.state.data.carImage} />

                <View style={{ alignItems: 'center', paddingTop: 100 }}>
                    <Text style={{ color: '#333333' }}>진행 중인 경매가 없습니다.</Text>
                    <RoundButton style={{ fontSize: 17 }} title="이 차를 경매에 등록하기"
                        onPress={this.registerCars()} />
                </View>
            </View >

        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps)(MyCarDetailScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});