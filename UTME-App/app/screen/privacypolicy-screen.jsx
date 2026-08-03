import React from 'react';
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

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header Bar */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Privacy Policy</Text>
        </View>

        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">Updated 2026</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Intro Card */}
        <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-xl bg-green-50 justify-center items-center mr-3 border border-green-200">
              <Ionicons name="shield-checkmark-outline" size={20} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900">Your Privacy Matters</Text>
              <Text className="text-xs text-gray-500">Effective Date: August 2026</Text>
            </View>
          </View>
          <Text className="text-xs leading-relaxed text-gray-600">
            Welcome to our CBT Exam Practice App. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, please feel free to reach out to our support team.
          </Text>
        </View>

        {/* Section 1 */}
        <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
          <Text className="text-sm font-extrabold text-gray-900 mb-2">1. Information We Collect</Text>
          <Text className="text-xs leading-relaxed text-gray-600">
            We collect personal information that you voluntarily provide to us when registering for an account, such as your name, email address, and phone number. We also collect exam performance history, scores, and test logs when you use our practice test environments.
          </Text>
        </View>

        {/* Section 2 */}
        <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
          <Text className="text-sm font-extrabold text-gray-900 mb-2">2. Payment & Subscription Data</Text>
          <Text className="text-xs leading-relaxed text-gray-600">
            For premium plan upgrades via direct bank transfers, we process payment confirmations and screenshots sent through secure channels like WhatsApp. We do not store sensitive banking passwords or direct debit keys on our local database.
          </Text>
        </View>

        {/* Section 3 */}
        <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
          <Text className="text-sm font-extrabold text-gray-900 mb-2">3. How We Use Your Information</Text>
          <Text className="text-xs leading-relaxed text-gray-600">
            We use the information we collect to maintain your CBT exam history, display performance analytics, verify paid subscriptions, and improve overall app functionality and user experience.
          </Text>
        </View>

        {/* Section 4 */}
        <View className="bg-white rounded-3xl p-6 mb-6 border border-gray-200 shadow-sm">
          <Text className="text-sm font-extrabold text-gray-900 mb-2">4. Data Security</Text>
          <Text className="text-xs leading-relaxed text-gray-600">
            We implement standard administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure your data, please be aware that no security system is impenetrable.
          </Text>
        </View>

        {/* Contact Support Banner */}
        <View className="bg-green-50 border border-green-200 rounded-3xl p-5 shadow-sm">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-xl bg-green-100 justify-center items-center mr-3.5 border border-green-200">
              <Ionicons name="chatbubbles-outline" size={20} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-green-900 mb-0.5">
                Questions or Concerns?
              </Text>
              <Text className="text-xs text-green-800">
                Contact our support team anytime via WhatsApp for privacy-related inquiries.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}