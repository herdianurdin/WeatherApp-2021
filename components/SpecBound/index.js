import React from 'react'
import { Text, View } from 'react-native'
import colors from '../../assets/colors'
import dimension from '../../assets/dimensions'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

const SpecBound = (props) => {
    const { specValue, unit, specTitle, iconName, special } = props

    return (
        <View
            style={{
                width: dimension.size80,
                height: dimension.size80,
                backgroundColor: colors.secondary,
                borderRadius: dimension.size28,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {special ? (
                <FontAwesome5 name={iconName} size={dimension.size20} color={colors.light} />
            ) : (
                <Ionicons name={iconName} size={dimension.size20} color={colors.light} />
            )}
            <Text style={{ fontSize: dimension.size10, color: colors.light, fontFamily: 'bold' }}>{specValue} {unit}</Text>
            <Text style={{ fontSize: dimension.size10, color: colors.light, fontFamily: 'medium' }}>{specTitle}</Text>
        </View>
    )
}

export default SpecBound
