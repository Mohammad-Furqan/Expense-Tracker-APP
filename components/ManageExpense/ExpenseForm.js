import { useState } from "react";
import { StyleSheet, View,Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
function ExpenseForm({onCancel,submitLabelButton,onSubmit,defaultValues}){

    const [inputValues,setInputValues]=useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date:defaultValues ? getFormattedDate(defaultValues.date): '',
        description:defaultValues ? defaultValues.description : '' ,
    });

    function inputChangeHandler(inputIdentifier,enteredValue){
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]:enteredValue,
            };
        }); 
    }

    function sumbitHandler(){
            const expenseData = {
                amount: +inputValues.amount, //+ sign for converting str into number
                date: new Date(inputValues.date),
                description:inputValues.description,
            }
            const amountIsValid=  !isNaN(expenseData.amount) && expenseData.amount >0;
            const dateIsValid= expenseData.date.toString() !== 'Invalid Date';
            const descriptionIsValid= expenseData.description.trim().length >0;

            if (!amountIsValid || !dateIsValid || descriptionIsValid){
                Alert.alert("Invalid input",'please check your values');
                return;
            }
            onSubmit(expenseData);

    }
 

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expenses</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    textInputConfig={{
                        keyboardType:"decimal-pad",
                        onChangeText:inputChangeHandler.bind(this,'amount'), //this , 'amount' , (enteredValue will automatically passed by react native),
                        value:inputValues.amount
                    }} />
                <Input 
                    style={styles.rowInput}
                    label="Date" 
                    textInputConfig={{
                        keyboardType:'decimal-pad',
                        placeholder:"YYYY-MM-DD",
                        maxLength:10,
                        onChangeText:inputChangeHandler.bind(this,'date'),
                        value:inputValues.date
                    }} />
            </View>
            <Input 
                label="Description" 
                textInputConfig={{  
                    multiline:true,
                    autoCorrect:false,
                    autoCapitalize:"none",
                    onChangeText:inputChangeHandler.bind(this,'description'),
                    value:inputValues.description,
                    
                }} />

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

});