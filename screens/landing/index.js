import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'
import provinces from './data/provinces'
import cities from './data/cities'
import colors from '../../assets/colors'
import dimension from '../../assets/dimensions'
import SearchableDropdown from '../../components/SearchableDropdown'
import NetInfo from '@react-native-community/netinfo'
import ModalPopup from '../../components/ModalPopup'

const Landing = ({ navigation }) => {
    const [name, setName] = useState('')
    const [province, setProvince] = useState('')
    const [searchProvince, setSearchProvince] = useState(false)
    const [filteredProvinces, setFilteredProvinces] = useState(provinces)
    const [city, setCity] = useState('')
    const [newCities, setNewCities] = useState('')
    const [searchCity, setSearchCity] = useState(false)
    const [filteredCities, setFilteredCities] = useState(cities)
    const [alertVisible, setAlertVisible] = useState(false)
    const [message, setMessage] = useState('')
    const onSearchProvince = (text) => {
        setProvince(true)

        if (text) {
            const data = provinces.filter((item) => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
            })

            setFilteredProvinces(data)
            setProvince({ name: text })
        } else {
            setFilteredProvinces(provinces)
            setProvince('')
        }

        setCity('')
    }

    const onSearchCity = (text) => {
        setSearchCity(true)

        if (text) {
            const data = filteredCities.filter((item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1)

            setFilteredCities(data)
            setCity({ name: text })
        } else {
            setCity('')
            setFilteredCities(newCities)
        }
    }

    const onShowAlert = (message) => {
        setAlertVisible(true)
        setMessage(message)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ModalPopup message={message} visibility={alertVisible} action={(val) => setAlertVisible(val)} />
                <StatusBar hidden />
                <View>
                    <Text
                        style={{
                            fontSize: dimension.size36,
                            color: colors.light,
                            marginBottom: dimension.size48,
                            fontFamily: 'bold',
                        }}
                    >
                        Ramal Cuaca
                    </Text>
                </View>
                <View style={{ marginBottom: dimension.size20 }}>
                    <TextInput
                        placeholder="Nama Lengkap"
                        placeholderTextColor={colors.muted}
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                    />
                </View>
                <View style={{ marginBottom: dimension.size20 }}>
                    <TextInput
                        placeholder="Provinsi"
                        placeholderTextColor={colors.muted}
                        style={[
                            styles.input,
                            searchProvince && filteredProvinces.length != 0 ? styles.inputActive : '',
                        ]}
                        onChangeText={onSearchProvince}
                        value={province.name}
                        onFocus={() => {
                            setSearchProvince(true)
                            setSearchCity(false)
                        }}
                    />
                    {searchProvince && (
                        <SearchableDropdown
                            dataSource={filteredProvinces}
                            changeValue={(val1) => {
                                setProvince(val1)
                                const tmp = cities.filter((item) => item.province_id == val1.id)
                                setNewCities(tmp)
                                setFilteredCities(tmp)
                                setSearchProvince(false)
                            }}
                        />
                    )}
                </View>
                <View style={{ marginBottom: dimension.size36 }}>
                    <TextInput
                        placeholder="Kabupaten / Kota"
                        placeholderTextColor={colors.muted}
                        style={[
                            styles.input,
                            searchCity && province.id && filteredCities.length != 0 ? styles.inputActive : '',
                        ]}
                        onChangeText={onSearchCity}
                        value={city.name}
                        onFocus={() => setSearchCity(true)}
                        editable={province.id ? true : false}
                    />
                    {searchCity && province.id && (
                        <SearchableDropdown
                            dataSource={filteredCities}
                            changeValue={(val1) => {
                                setCity(val1)
                                setSearchCity(false)
                            }}
                        />
                    )}
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            if (city.id && province.id && name) {
                                NetInfo.fetch().then((state) => {
                                    if (state.isInternetReachable) {
                                        navigation.navigate('Home', {
                                            data: {
                                                name,
                                                province: province.name,
                                                city: city.name,
                                                lat: city.latitude,
                                                lon: city.longitude,
                                            },
                                        })
    
                                        setName('')
                                        setCity('')
                                        setProvince('')
                                        setFilteredProvinces(provinces)
                                        setFilteredCities(cities)
                                    } else {
                                        onShowAlert('Mohon periksa kembali konektivitas internet Anda!')
                                    }
                                })
                            } else {
                                onShowAlert('Mohon isi seluruh data dengan valid!')
                            }
                        }}
                    >
                        <Text
                            style={{
                                fontSize: dimension.size20,
                                color: colors.light,
                                paddingHorizontal: dimension.size48,
                                backgroundColor: colors.secondary,
                                paddingVertical: dimension.size12,
                                borderRadius: dimension.size12,
                                fontFamily: 'bold',
                            }}
                        >
                            Proses
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    input: {
        backgroundColor: colors.dim,
        color: colors.light,
        width: dimension.inputSize,
        height: dimension.size42,
        paddingHorizontal: dimension.size24,
        borderRadius: dimension.size12,
        fontFamily: 'semi',
        fontSize: dimension.size16,
    },
    inputActive: {
        borderBottomColor: colors.light,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
})

export default Landing
