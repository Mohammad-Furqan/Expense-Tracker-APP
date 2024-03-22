import axios from 'axios';

const BACKEND_URL = 'https://react-native-expense-app-1c8c7-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json',expenseData);
  const id = response.data.name; //this name property holds the auto-generated id.
  return id;
}

export async function fetchExpense(){
  const response = await axios.get(BACKEND_URL + '/expenses.json',);

  const expenses=[];

  console.log(response);
  for(const key in response.data){
    const expenseObj={
      id:key,
      amount: response.data[key].amount,
      date : new Date(response.data[key].date),
      description : response.data[key].description,
    }
    expenses.push(expenseObj);
  }

  return expenses;

}