// apps/mobile/App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from './src/screens/DashboardScreen'
import ProductionScreen from './src/screens/ProductionScreen'
import QrScannerScreen from './src/screens/QrScannerScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Production" component={ProductionScreen} />
        <Tab.Screen name="QR Scan" component={QrScannerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
