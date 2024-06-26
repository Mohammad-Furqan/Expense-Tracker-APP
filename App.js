import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense'
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {GlobalStyles} from './constants/styles'
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';



const Stack=createNativeStackNavigator();
const bottomTabs=createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <bottomTabs.Navigator
     screenOptions={({ navigation })=>({
      headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight:({tintColor})=>(
        <IconButton 
          icon="add"  
          size={24} 
          color={tintColor} 
          onPress={()=>{
            navigation.navigate('ManageExpense');
        }}
        />
        ),
     })}>
        <bottomTabs.Screen 
          name="RecentExpenses" 
          component={RecentExpenses}  
          options={{
            title:"Recent Expenses",
            tabBarLabel:'Recent',
            tabBarIcon:({color,size})=><Ionicons name='hourglass' size={size} color={color} />
          }}
          />
        <bottomTabs.Screen 
          name="AllExpenses" 
          component={AllExpenses}  
          options={{
            title:"All Expense",
            tabBarLabel:'All Expense',
            tabBarIcon:({color,size})=><Ionicons name='calendar' size={size} color={color} />
          }}
          />
    </bottomTabs.Navigator>
  );
}

export default function App() {
  return (
      <>
         <StatusBar style="light" />
         <ExpensesContextProvider>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                // headerShown:false,
                headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
                headerTintColor:'white'
              }}>
                  <Stack.Screen 
                    name='ExpenseOverview'  
                    component={ExpensesOverview} 
                    options={{
                      headerShown:false,
                    }}
                    />
                  <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
                    presentation:'modal',
                  }} />
              </Stack.Navigator>
          </NavigationContainer>
         </ExpensesContextProvider>

      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
