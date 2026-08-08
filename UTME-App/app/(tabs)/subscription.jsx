import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/UserContext';

export default function SubscriptionScreen() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(false);


    useEffect(() => {
      if (user?.payment_status === 'paid') {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }, [user]);

  const handleUpgrade = () => {
    router.push('screen/payment-screen');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Upgrade Plan</Text>
        </View>

        {/* Changed to Green */}
        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">Go Premium</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

      {isSubscribed ? (
          <View className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 mb-6 shadow-sm">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-2xl bg-emerald-100 justify-center items-center mr-4 border border-emerald-300">
                <Ionicons name="shield-checkmark" size={24} color="#059669" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-0.5">
                  <Text className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Active Status
                  </Text>
                  <View className="ml-2 bg-emerald-200 px-2 py-0.5 rounded-full">
                    <Text className="text-[10px] font-bold text-emerald-800">Verified</Text>
                  </View>
                </View>
                <Text className="text-base font-extrabold text-emerald-900">
                  Premium Plan Unlocked
                </Text>
                <Text className="text-xs text-emerald-700 mt-0.5">
                  You have full access to your exam history, performance charts, and question banks.
                </Text>
              </View>
            </View>
          </View>
      ) : (

        <>
            {/* Banner Header */}
            <View className="items-center mb-8">
              {/* Changed Icon Box & Star to Green */}
              <View className="w-14 h-14 rounded-2xl bg-green-50 justify-center items-center mb-3 border border-green-200">
                <Ionicons name="star" size={28} color="#16a34a" />
              </View>
              <Text className="text-2xl font-extrabold text-gray-900 text-center mb-1">
                Unlock Your Full Potential
              </Text>
              <Text className="text-sm font-medium text-gray-500 text-center px-4">
                Compare plans and choose what works best for your exam preparation journey.
              </Text>
            </View>

            {/* FREE PLAN CARD */}
            <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">Basic Access</Text>
                  <Text className="text-xl font-extrabold text-gray-900">Free Plan</Text>
                </View>
                <View className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-xs font-bold text-gray-700">Current Plan</Text>
                </View>
              </View>

              <View className="space-y-3 mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-medium text-gray-700">Limited access to standard CBT questions</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-medium text-gray-700">Basic timer & practice environment</Text>
                </View>
                <View className="flex-row items-center opacity-40">
                  <Ionicons name="close-circle" size={18} color="#dc2626" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-medium text-gray-400 line-through">Full access to all courses & question banks</Text>
                </View>
                <View className="flex-row items-center opacity-40">
                  <Ionicons name="close-circle" size={18} color="#dc2626" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-medium text-gray-400 line-through">Permanent exam history tracking</Text>
                </View>
                <View className="flex-row items-center opacity-40">
                  <Ionicons name="close-circle" size={18} color="#dc2626" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-medium text-gray-400 line-through">Access to performance analysis & charts</Text>
                </View>
              </View>
            </View>

            {/* PREMIUM PAID PLAN CARD */}
            <View className="bg-white rounded-3xl p-6 mb-8 border-2 border-amber-500 shadow-sm relative overflow-hidden">
              {/* Popular Tag */}
              <View className="absolute top-0 right-0 bg-amber-500 px-4 py-1 rounded-bl-2xl">
                <Text className="text-[10px] font-bold text-white uppercase tracking-wider">Recommended</Text>
              </View>

              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xs font-bold text-amber-600 uppercase tracking-widest">Full Access</Text>
                  <Text className="text-xl font-extrabold text-gray-900">Premium Plan</Text>
                </View>
                <View>
                  <Text className="text-2xl font-extrabold text-amber-600">₦2,500</Text>
                  <Text className="text-[10px] text-gray-400 text-right">/ semester</Text>
                </View>
              </View>

              <View className="space-y-3 mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-semibold text-gray-800">Unlimited access to all CBT question banks</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-semibold text-gray-800">Full access to the whole courses list</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-semibold text-gray-800">Permanent tracking of past exam history</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-semibold text-gray-800">Access to performance analysis and charts</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#16a34a" style={{ marginRight: 10 }} />
                  <Text className="text-sm font-semibold text-gray-800">Detailed answer reviews with step explanations</Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleUpgrade}
                className="w-full h-14 rounded-2xl bg-amber-600 flex-row justify-center items-center shadow-sm"
              >
                <Ionicons name="flash-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text className="text-sm font-bold text-white uppercase tracking-wider">
                  Upgrade Now
                </Text>
              </TouchableOpacity>
            </View>
        </>

      )}

      </ScrollView>
    </SafeAreaView>
  );
}