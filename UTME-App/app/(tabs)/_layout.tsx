



import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // We need this for the 3D effect

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Subjects',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // Extra margin to push it up significantly
                marginBottom: 28, 
              }}
            >
              {/* The 3D Swelling Ball Container */}
              <LinearGradient
                // Gradient creates the 3D, rounded hemisphere effect
                colors={focused 
                  ? ['#4ade80', '#16a34a'] // Lighter green to darker green (swelling up)
                  : ['#ffffff', '#f3f4f6'] // White to light gray (inactive state)
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32, // Perfect circle
                  justifyContent: 'center',
                  alignItems: 'center',
                  // Thinner, subtle border for definition
                  borderWidth: 1,
                  borderColor: focused ? '#15803d' : '#e5e7eb',
                  // Heavy shadow to make it pop off the screen
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 10, // Android shadow
                }}
              >
                {/* 
                   Icon: Replaced with 'school-outline' for a professional academic look.
                   Color: White if active, subtle green if inactive.
                */}
                <Ionicons
                  name="school-outline" 
                  size={30} // Slightly larger icon to match the bigger button
                  color={focused ? '#ffffff' : '#16a34a'}
                />
              </LinearGradient>
            </View>
          ),
          // Adjusted label style to accommodate the larger floating button
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700', // Bolder font
            color: '#16a34a', // Keep label green even when not 'focused' on icon
            marginTop: -4,
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}