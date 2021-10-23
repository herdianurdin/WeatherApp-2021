import React from 'react'
import { Text, View, Image } from 'react-native'
import colors from '../../assets/colors'
import dimension from '../../assets/dimensions'

const CardInfo = (props) => {
    const { iconName, time, temp } = props

    return (
        <View
            style={{
                backgroundColor: colors.dim,
                width: dimension.cardSize,
                height: dimension.cardSize,
                marginBottom: dimension.size28,
                borderRadius: dimension.size28,
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: dimension.size16,
                    fontFamily: 'bold',
                    color: colors.light,
                    position: 'absolute',
                    top: dimension.size16,
                }}
            >
                {time}
            </Text>
            <Image
                source={{ uri: `http://openweathermap.org/img/wn/${iconName}@4x.png` }}
                style={{
                    width: dimension.size120,
                    height: dimension.size120,
                    position: 'absolute',
                    top: dimension.size16,
                }}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: dimension.size16,
                }}
            >
                <Text
                    style={{
                        fontSize: dimension.size28,
                        fontFamily: 'bold',
                        color: colors.light,
                        textAlign: 'right',
                    }}
                >
                    {temp}
                </Text>
                <Text
                    style={{
                        fontSize: dimension.size24,
                        fontFamily: 'bold',
                        color: colors.light,
                    }}
                >
                    °C
                </Text>
            </View>
        </View>
    )
}

export default CardInfo
