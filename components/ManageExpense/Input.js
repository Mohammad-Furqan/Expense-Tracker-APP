import { TextInput, View,Text ,StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label ,textInputConfig,invalid, style}){

    const inputStyles =[styles.input]
    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }
    if(invalid){
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer , style]}>
            <Text style={[styles.label,invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} ></TextInput>
        </View>
    );
}

export default Input;
const styles=StyleSheet.create({
    inputContainer:{
        // backgroundColor:"#dc8e8e",
        marginHorizontal:4,
        marginVertical:16, 
     
        
    },
    label:{
        color:GlobalStyles.colors.primary100,
        fontSize:12,
        marginBottom:4,
        
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:10,
        fontSize:18,

    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top',//from docs suggest, use textAlignVertical for the same behaviour in both platform
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
      },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
      }

});
