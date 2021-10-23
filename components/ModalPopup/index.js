import React from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dimension from '../../assets/dimensions'
import colors from '../../assets/colors'

const ModalPopup = (props) => {
    const { message, visibility, action } = props

    return (
        <Modal
            animationType="fade"
            visible={visibility}
            transparent
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <View
                    style={{
                        width: dimension.size200 + dimension.size100,
                        backgroundColor: colors.secondary,
                        borderRadius: dimension.size18,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: colors.primary,
                            borderTopLeftRadius: dimension.size18,
                            borderTopRightRadius: dimension.size18,
                            padding: dimension.size18,
                        }}
                    >
                        <View style={{ alignSelf: 'center', marginBottom: dimension.size12 }}>
                            <Ionicons name="warning" size={dimension.size80} color={colors.light} />
                        </View>
                        <Text style={{ color: colors.light, fontFamily: 'medium', fontSize: dimension.size14, textAlign: 'center' }}>
                            {message}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => action(false)}>
                        <Text
                            style={{
                                fontSize: dimension.size16,
                                fontFamily: 'bold',
                                paddingVertical: dimension.size12,
                                color: colors.light,
                                textAlign: 'center',
                            }}
                        >
                            Tutup
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalPopup
