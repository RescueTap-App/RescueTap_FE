import { TextInput, View, Text, StyleSheet,Pressable } from "react-native"

function InputElement(
    {
        rightIcon,
        placeholder,
        label
    }
)
{
    return(<>
        <View style={{padding: 10}}>
            <Text>{label}</Text>
            <View>
                <TextInput placeholder={placeholder}></TextInput>
            </View>
        </View>
        
    </>)
}
const Styles = StyleSheet.create({
    container: {

    }
})

export default InputElement