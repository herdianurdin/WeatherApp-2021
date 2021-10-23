import NetInfo from '@react-native-community/netinfo'

const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']

const weatherCondition = {
    Thunderstorm: 'Hujan Badai',
    Drizzle: 'Gerimis',
    Rain: 'Hujan',
    Snow: 'Salju',
    Mist: 'Berkabut',
    Clear: 'Cerah',
    Clouds: 'Berawan',
}

const convertTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let timePeriod = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${minutes} ${timePeriod}`
}

const convertDate = (date, state = true) => {
    return state
        ? `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        : `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
}

const formatTime = (time) => {
    time = time.split(':')

    let hours = Number(time[0])
    let minutes = Number(time[1])
    let timePeriod = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${minutes} ${timePeriod}`
}

const capitalEachWord = (str) => {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
}

export { convertTime, convertDate, formatTime, capitalEachWord, weatherCondition }
