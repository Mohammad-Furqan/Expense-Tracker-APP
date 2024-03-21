import { useState } from "react";
import { StyleSheet, View,Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
function ExpenseForm({onCancel,submitLabelButton,onSubmit,defaultValues}){

    const [inputs,setInputs]=useState({
        amount: {
            value :defaultValues ? defaultValues.amount.toString() : '',
            isValid:true  
        },
        date:{
            value :defaultValues ? getFormattedDate(defaultValues.date): '',
            isValid : true
        },
        description:{
            value :defaultValues ? defaultValues.description : '' ,
            isValid:true 
        },
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputs((curInputs)=>{
            return {
                ...curInputs,
                [inputIdentifier]:{vlaue : enteredValue ,isValid:true},
            };
        }); 
    }

    function sumbitHandler(){
            const expenseData = {
                amount: +inputs.amount.value, //+ sign for converting str into number
                date: new Date(inputs.date.value),
                description:inputs.description.value,
            }
            const amountIsValid=  !isNaN(expenseData.amount) && expenseData.amount >0;
            const dateIsValid= expenseData.date.toString() !== 'Invalid Date';
            const descriptionIsValid= expenseData.description.trim().length >0;

            if (!amountIsValid || !dateIsValid || !descriptionIsValid){
                // Alert.alert("Invalid input",'please check your values');
                setInputs((curInputs)=>{
                    return {
                        amount:{value : curInputs.amount.value , isValid:amountIsValid},
                        date:{value : curInputs.date .value , isValid:dateIsValid},
                        description:{value : curInputs.description.value , isValid:descriptionIsValid},
                    };
                });
                return;
            }
            onSubmit(expenseData);

    }
    const formIsInvalid=!inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expenses</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType:"decimal-pad",
                        onChangeText:inputChangeHandler.bind(this,'amount'), //this , 'amount' , (enteredValue will automatically passed by react native),
                        value:inputs.amount.value
                    }} />
                <Input 
                    style={styles.rowInput}
                    label="Date" 
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        keyboardType:'decimal-pad',
                        placeholder:"YYYY-MM-DD",
                        maxLength:10,
                        onChangeText:inputChangeHandler.bind(this,'date'),
                        value:inputs.date.value
                    }} />
            </View>
            <Input 
                label="Description" 
                    invalid={!inputs.description.isValid}
                    textInputConfig={{  
                    multiline:true,
                    autoCorrect:false,
                    autoCapitalize:"none",
                    onChangeText:inputChangeHandler.bind(this,'description'),
                    value:inputs.description.value,
                    
                }} />

                {formIsInvalid && (<Text style={styles.errorText}>Invalid input - check your Values</Text>)}

                <View style={styles.buttons}>
                    <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                    </Button>
                    <Button style={styles.button} onPress={sumbitHandler}>
                    {submitLabelButton}
                    </Button>
                </View>
        </View>
    );
}

export default ExpenseForm;
const styles=StyleSheet.create({
    form:{
        marginTop:40
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1,
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:24,

    },
buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    button: {
    minWidth: 120,
    marginHorizontal: 8,
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8,
    },


});