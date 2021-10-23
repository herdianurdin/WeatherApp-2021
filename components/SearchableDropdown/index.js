import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../assets/colors'
import dimension from '../../assets/dimensions'

const SearchableDropdown = (props) => {
    const { dataSource, changeValue } = props

    return (
        <SafeAreaView style={[styles.container, dataSource.length === 0 ? {display: 'none', height: 0} : '']}>
            <ScrollView>
                <View style={{paddingHorizontal: dimension.size12, paddingTop: dimension.size12}}>
                {dataSource.map((e) => {
                    return (
                        <TouchableOpacity key={e.id} onPress={() => changeValue(e)} style={styles.textOption}>
                            <Text style={{ color: colors.light, fontFamily: 'semi', fontSize: dimension.size14 }}>{e.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dim,
        width: dimension.inputSize,
        maxHeight: dimension.size200,
        borderBottomLeftRadius: dimension.size12,
        borderBottomRightRadius: dimension.size12,
        position: 'absolute',
        zIndex: 1,
        top: dimension.size42
    },
    textOption: {
        width: '100%',
        paddingHorizontal: dimension.size24,
        paddingVertical: dimension.size12,
        marginBottom: dimension.size12,
        backgroundColor: colors.secondary,
        borderRadius: dimension.size12
    },
})

export default SearchableDropdown
