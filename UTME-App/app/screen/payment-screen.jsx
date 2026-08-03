import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Clipboard,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Bank & Account Details
  const bankName = 'OPay Digital Services';
  const accountNumber = '79018827571';
  const accountName = 'CBT Exam Prep Official';
  const amount = '₦2,500';
  const whatsappNumber = '+23479018827571'; // WhatsApp contact format

  const handleCopyAccount = () => {
    Clipboard.setString(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    // Clean format for WhatsApp link
    const message = encodeURIComponent(
      'Hello, I have made a bank transfer of ₦2,500 for the CBT Premium Plan. Here is my payment receipt:'
    );
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert(
        'Error', 
        'Unable to open WhatsApp. Please ensure WhatsApp is installed on your device.'
      );
    });
  };

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
          <Text className="text-lg font-bold text-gray-900">Bank Transfer Payment</Text>
        </View>

        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">Secure Transfer</Text>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Instruction Banner */}
        <View className="items-center mb-6">
          <View className="w-14 h-14 rounded-2xl bg-green-50 justify-center items-center mb-3 border border-green-200">
            <Ionicons name="wallet-outline" size={28} color="#16a34a" />
          </View>
          <Text className="text-2xl font-extrabold text-gray-900 text-center mb-1">
            Complete Your Payment
          </Text>
          <Text className="text-sm font-medium text-gray-500 text-center px-4">
            Transfer the exact plan amount to the account below, then send your receipt via WhatsApp for activation.
          </Text>
        </View>

        {/* PAYMENT DETAILS CARD */}
        <View className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
          <View className="flex-row justify-between items-center pb-4 mb-4 border-b border-gray-100">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amount to Pay</Text>
            <Text className="text-xl font-extrabold text-green-600">{amount}</Text>
          </View>

          <View className="space-y-4 mb-2">
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bank Name</Text>
              <Text className="text-base font-bold text-gray-800">{bankName}</Text>
            </View>

            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Account Number</Text>
              <View className="flex-row justify-between items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200">
                <Text className="text-lg font-extrabold text-gray-900 tracking-wider">{accountNumber}</Text>
                <TouchableOpacity 
                  onPress={handleCopyAccount}
                  className="bg-green-50 px-3 py-1.5 rounded-xl border border-green-200 flex-row items-center"
                >
                  <Ionicons name={copied ? "checkmark" : "copy-outline"} size={14} color="#16a34a" style={{ marginRight: 4 }} />
                  <Text className="text-xs font-bold text-green-700">{copied ? 'Copied' : 'Copy'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Account Name</Text>
              <Text className="text-base font-bold text-gray-800">{accountName}</Text>
            </View>
          </View>
        </View>

        {/* STEP-BY-STEP VERIFICATION NOTICE */}
        <View className="bg-amber-50 border border-amber-200 rounded-3xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-start mb-2">
            <View className="w-8 h-8 rounded-xl bg-amber-100 justify-center items-center mr-3 mt-0.5">
              <Ionicons name="information-circle-outline" size={18} color="#d97706" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-amber-900 mb-1">
                Important Activation Process
              </Text>
              <Text className="text-xs leading-relaxed text-amber-800">
                1. Make the bank transfer using your banking app.{'\n'}
                2. Take a screenshot or save your payment receipt.{'\n'}
                3. Click the button below to send your receipt to our WhatsApp support line.{'\n'}
                4. Once manual confirmation is completed on our end, your premium version will be enabled instantly.
              </Text>
            </View>
          </View>
        </View>

        {/* WHATSAPP ACTION BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenWhatsApp}
          className="w-full h-14 rounded-2xl bg-green-600 flex-row justify-center items-center shadow-sm mb-4"
        >
          <Ionicons name="logo-whatsapp" size={20} color="#ffffff" style={{ marginRight: 8 }} />
          <Text className="text-sm font-bold text-white uppercase tracking-wider">
            Send Receipt on WhatsApp
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}