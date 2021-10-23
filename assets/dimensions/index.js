import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const size6 = (width / 68.5) | 0
const size8 = (width / 51.375) | 0
const size10 = (width / 41.1) | 0
const size12 = (width / 34.25) | 0
const size14 = (width / 29.3571) | 0
const size16 = (width / 25.6875) | 0
const size18 = (width / 22.83) | 0
const size20 = (width / 20.55) | 0
const size24 = (width / 17.125) | 0
const size28 = (width / 14.6785) | 0
const size32 = (width / 12.84375) | 0
const size36 = (width / 11.4167) | 0
const size42 = (width / 9.785) | 0
const size48 = (width / 8.5625) | 0
const size80 = (width / 5.1375) | 0
const size100 = (width / 4.11) | 0
const size120 = (width / 3.425) | 0
const size128 = (width / 3.2109375) | 0
const size200 = (width / 2.055) | 0
const cardSize = (width - size32 * 8) | 0
const inputSize = (width - size36 * 2) | 0

const dimension = {
    width,
    size6,
    size8,
    size10,
    size12,
    size14,
    size16,
    size18,
    size20,
    size24,
    size28,
    size32,
    size36,
    size42,
    size48,
    size80,
    size100,
    size120,
    size128,
    size200,
    cardSize,
    inputSize,
}

export default dimension
