import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    Text,
    ScrollView,
    View,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../assets/colors'
import dimension from '../../assets/dimensions'
import axios from 'axios'
import Loading from '../../components/Loading'
import SpecBound from '../../components/SpecBound'
import CardInfo from '../../components/CardInfo'
import { convertDate, convertTime, formatTime, capitalEachWord, weatherCondition } from '../../utils'
import ModalPopup from '../../components/ModalPopup'

const Home = ({ navigation, route }) => {
    const { data } = route.params
    const [alertVisible, setAlertVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [isActive, setIsActive] = useState(0)
    const [timeNow, setTimeNow] = useState('')
    const [dateNow, setDateNow] = useState('')
    const [greeting, setGreeting] = useState('')
    const [weather, setWeather] = useState([])
    const [weatherNow, setWeahterNow] = useState([])
    const getTime = () => {
        const date = new Date()
        const minutesNow = date.getHours() * 60 + date.getMinutes()
        setGreeting(
            minutesNow >= 240 && minutesNow < 600
                ? 'Selamat Pagi!'
                : minutesNow >= 600 && minutesNow < 840
                ? 'Selamat Siang!'
                : minutesNow >= 840 && minutesNow < 1110
                ? 'Selamat Sore!'
                : 'Selamat Malam!'
        )

        setTimeNow(convertTime(date))
        setDateNow(convertDate(date))
    }
    const onShowAlert = (message) => {
        setMessage(message)
        setRefresh(false)
        setAlertVisible(true)
    }

    useEffect(() => {
        const timing = setInterval(() => getTime(), 1000)
        const source = axios.CancelToken.source()
        const fetchData = () => {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&appid=13cc385614cba97bce7b168b58606da3`,
                    {
                        cancelToken: source.token,
                    }
                )
                .then((res) => {
                    console.log('fetch')

                    const date = new Date()
                    const tmp = []

                    for (let i = 0; i <= 5; i++) {
                        const x = `${date.getFullYear()}-${
                            date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1
                        }-${date.getDate() + i}`

                        tmp.push({
                            id: x,
                            data: res.data.list.filter((e) => e.dt_txt.indexOf(x) > -1),
                        })
                    }

                    setWeahterNow(tmp[0].data[0])
                    setWeather(tmp.splice(1))
                })
                .then(() => {
                    setIsLoading(false)
                    setRefresh(false)
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('cancel')
                    } else {
                        onShowAlert('Mohon maaf permintaan yang Anda ajukan tidak tersedia! Silakan periksa kembali konektivitas internet Anda.')
                    }
                })
        }
        fetchData()

        return () => {
            clearInterval(timing)
            source.cancel()
        }
    }, [refresh])

    return (
        <SafeAreaView style={styles.container}>
            <ModalPopup message={message} visibility={alertVisible} action={(val) => setAlertVisible(val)} />
            <StatusBar hidden />
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl onRefresh={() => setRefresh(true)} refreshing={refresh} />}
                >
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back-sharp" size={dimension.size42} color={colors.light} />
                        </TouchableOpacity>
                        <View>
                            <Text
                                style={{
                                    fontSize: dimension.size18,
                                    color: colors.light,
                                    textAlign: 'right',
                                    fontFamily: 'bold',
                                }}
                            >
                                {timeNow}
                            </Text>
                            <Text
                                style={{
                                    fontSize: dimension.size16,
                                    color: colors.light,
                                    textAlign: 'right',
                                    fontFamily: 'medium',
                                }}
                            >
                                {dateNow}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.greetingWrapper}>
                        <Text style={{ fontSize: dimension.size16, color: colors.light, fontFamily: 'medium' }}>
                            {greeting}
                        </Text>
                        <Text style={{ fontSize: dimension.size20, color: colors.light, fontFamily: 'bold' }}>
                            {capitalEachWord(data.name)}
                        </Text>
                    </View>
                    <View style={styles.mainInfoWrapper}>
                        <View
                            style={{
                                backgroundColor: colors.dim,
                                height: dimension.size120,
                                borderRadius: dimension.size28,
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <View
                                style={{
                                    width: dimension.size128,
                                    height: dimension.size120,
                                    alignItems: 'center',
                                    marginLeft: dimension.size16,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: `http://openweathermap.org/img/wn/${weatherNow.weather[0].icon}@4x.png`,
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: -dimension.size12,
                                        width: dimension.size120,
                                        height: dimension.size120,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: dimension.size14,
                                        fontFamily: 'bold',
                                        position: 'absolute',
                                        bottom: dimension.size16,
                                        color: colors.light,
                                    }}
                                >
                                    {weatherCondition[weatherNow.weather[0].main]}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: dimension.size200,
                                    marginLeft: dimension.size8,
                                    paddingRight: dimension.size20,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            fontSize: dimension.size42,
                                            fontFamily: 'bold',
                                            color: colors.light,
                                            textAlign: 'right',
                                        }}
                                    >
                                        {weatherNow.main.temp}
                                    </Text>
                                    <Text
                                        style={{ fontSize: dimension.size24, fontFamily: 'bold', color: colors.light }}
                                        numberOfLines={1}
                                    >
                                        °C
                                    </Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '100%', overflow: 'hidden' }}>
                                    <Ionicons
                                        name="location-sharp"
                                        size={dimension.size18}
                                        color={colors.light}
                                        style={{ marginRight: dimension.size8 }}
                                    />
                                    <Text
                                        style={{ fontSize: dimension.size12, color: colors.light, fontFamily: 'semi', flexShrink: 1 }}
                                        numberOfLines={1}
                                    >
                                        {`${capitalEachWord(data.city.split(' ').slice(1).join(' '))}, ${capitalEachWord(data.province)}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.specsWrapper}>
                        <SpecBound
                            specValue={weatherNow.main.humidity}
                            unit="%"
                            specTitle="Kelembapan"
                            iconName="water-sharp"
                        />
                        <SpecBound
                            specValue={weatherNow.main.pressure}
                            unit="hpa"
                            specTitle="Tekanan"
                            iconName="speedometer-sharp"
                        />
                        <SpecBound
                            specValue={weatherNow.clouds.all}
                            unit="%"
                            specTitle="Berawan"
                            iconName="cloud-sharp"
                        />
                        <SpecBound
                            specValue={weatherNow.wind.speed}
                            unit="m/s"
                            specTitle="Angin"
                            iconName="wind"
                            special={true}
                        />
                    </View>
                    <ScrollView horizontal={true} style={styles.menuWrapper} showsHorizontalScrollIndicator={false}>
                        {weather.map((e, i) => {
                            return (
                                <TouchableOpacity key={e.id} onPress={() => setIsActive(i)}>
                                    <Text
                                        style={[
                                            styles.menuButton,
                                            {
                                                marginRight:
                                                    i == weather.length - 1
                                                        ? dimension.size80 - dimension.size16
                                                        : dimension.size12,
                                            },
                                            isActive == i ? { backgroundColor: colors.secondary } : '',
                                        ]}
                                    >
                                        {convertDate(new Date(e.id), false)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <View style={styles.anotherInfoWrapper}>
                        {weather[isActive].data.map((e) => {
                            return (
                                <CardInfo
                                    key={e.dt.toString()}
                                    iconName={e.weather[0].icon}
                                    time={formatTime(e.dt_txt.split(' ')[1])}
                                    temp={e.main.temp}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: dimension.size32,
        paddingTop: dimension.size32,
        marginBottom: dimension.size36,
    },
    greetingWrapper: {
        paddingHorizontal: dimension.size42,
        marginBottom: dimension.size42,
    },
    mainInfoWrapper: {
        paddingHorizontal: dimension.size32,
        marginBottom: dimension.size18,
    },
    specsWrapper: {
        paddingHorizontal: dimension.size32,
        marginBottom: dimension.size18,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuWrapper: {
        paddingLeft: dimension.size32,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: dimension.size18,
    },
    anotherInfoWrapper: {
        paddingHorizontal: dimension.size32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    menuButton: {
        fontSize: dimension.size12,
        fontFamily: 'semi',
        paddingHorizontal: dimension.size12,
        paddingVertical: dimension.size6,
        color: colors.light,
        borderRadius: dimension.size24,
    },
})

export default Home
