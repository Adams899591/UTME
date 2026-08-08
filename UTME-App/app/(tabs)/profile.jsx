import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {UserContext} from '../../context/UserContext';


export default function ProfileScreen() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  
  // State for preference toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSignOut = () => {
    // Navigate back to login screen
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        className="flex-1 pt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 24 }}
      >
        
        {/* Screen Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </Text>
            <Text className="text-2xl font-bold text-gray-900 tracking-tight">
              My Profile
            </Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
            className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 justify-center items-center shadow-sm"
          >
            <Ionicons name="settings-outline" size={22} color="#16a34a" />
          </TouchableOpacity>
        </View>

        {/* User Info Card Section */}
        <View className="bg-gray-50 border border-gray-100 rounded-3xl p-6 mb-6 items-center shadow-sm relative overflow-hidden">
          {/* Avatar container with User Icon instead of Image/Pencil */}
          <View className="relative mb-4">
            <View className="w-24 h-24 rounded-2xl border-2 border-white shadow-md bg-green-50 justify-center items-center">
              <Ionicons name="person" size={48} color="#16a34a" />
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-900 mb-1">
            {user.name}
          </Text>
          <Text className="text-xs text-gray-500 font-medium mb-3">
            {user.email}
          </Text>

         {user.payment_status === 'paid' ? (
            <View className="bg-green-100/60 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-green-700 tracking-wide">
                PRO ACCOUNT • CBT CANDIDATE
              </Text>
            </View>
          ) : (
            <View className="bg-amber-100/60 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-amber-700 tracking-wide">
                FREE ACCOUNT • UPGRADE
              </Text>
            </View>
          )} 


        </View>

        {/* Quick Stats Grid */}
        {/* <View className="flex-row justify-between mb-8">
          <View className="w-[31%] bg-gray-50 border border-gray-100 rounded-2xl p-4 items-center shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-0.5">48</Text>
            <Text className="text-[10px] uppercase font-semibold text-gray-400">Tests Done</Text>
          </View>
          <View className="w-[31%] bg-gray-50 border border-gray-100 rounded-2xl p-4 items-center shadow-sm">
            <Text className="text-lg font-bold text-green-600 mb-0.5">85%</Text>
            <Text className="text-[10px] uppercase font-semibold text-gray-400">Avg Score</Text>
          </View>
          <View className="w-[31%] bg-gray-50 border border-gray-100 rounded-2xl p-4 items-center shadow-sm">
            <Text className="text-lg font-bold text-gray-900 mb-0.5">14 Days</Text>
            <Text className="text-[10px] uppercase font-semibold text-gray-400">Streak</Text>
          </View>
        </View> */}

        {/* Preferences & Notifications */}
        {/* <View className="mb-6">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Preferences
          </Text>

          <View className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            Notifications Toggle
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-green-50 justify-center items-center mr-3">
                  <Ionicons name="notifications-outline" size={18} color="#16a34a" />
                </View>
                <Text className="text-sm font-semibold text-gray-800">Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={notificationsEnabled ? '#16a34a' : '#f4f3f4'}
              />
            </View>
          </View>
        </View> */}

        {/* Support & About List */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Support & App
          </Text>

          <View className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Help & FAQs */}
            {/* <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/help')}
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-green-50 justify-center items-center mr-3">
                  <Ionicons name="help-circle-outline" size={18} color="#16a34a" />
                </View>
                <Text className="text-sm font-semibold text-gray-800">Help Center</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity> */}

            {/* Privacy Policy */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/screen/privacypolicy-screen')}
              className="flex-row items-center justify-between p-4"
            >
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-green-50 justify-center items-center mr-3">
                  <Ionicons name="document-text-outline" size={18} color="#16a34a" />
                </View>
                <Text className="text-sm font-semibold text-gray-800">Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>

          </View>
        </View>

        {/* Sign Out Button */}
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignOut}
            className="w-full h-14 bg-red-50 border border-red-100 rounded-xl flex-row justify-center items-center shadow-sm"
          >
            <Ionicons name="log-out-outline" size={20} color="#dc2626" style={{ marginRight: 8 }} />
            <Text className="text-base font-semibold text-red-600 tracking-wide">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}