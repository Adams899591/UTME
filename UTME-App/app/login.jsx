import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar, 
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../context/UserContext';

export default function LoginScreen() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 // this help us to keep track of the user keyboard if it is active or not  
 useEffect(() => {
    // Show events differ slightly between iOS and Android for best responsiveness
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    // Clean up listeners on unmount
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  // Form validation: true only when both fields have content
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        email: email,
        password: password.trim(),
      });

      const res = response.data;

      if (res.status === 'success' || response.status === 200) {
        // Empty form fields
        setEmail('');
        setPassword('');

        // Set success message
        setSuccessMessage(res.message || 'Login successful!');

        // Save user data to AsyncStorage for persistence
        if (res.user) {
          console.log(JSON.stringify(res.user, null, 2)); // Log the user data for debugging
          await AsyncStorage.setItem('user', JSON.stringify(res.user));
          setUser(res.user); // Update the user context with the new user data
        }

        // Redirect to home page after a short delay
        setTimeout(() => {
          setErrorMessage('');
          setSuccessMessage('');
          router.push('/(tabs)/home');
        }, 1500);
      }
    } catch (error) {
      if (error.request && !error.response) {
        setErrorMessage(
          'Network Error: Could not connect to the server. Please check your internet connection.'
        );
      } else if (error.response) {
        const apiError = error.response.data?.message || 'Invalid email or password.';
        setErrorMessage(apiError);
      } else {
        setErrorMessage('An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Changed status bar to dark content for white background */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* White Header with Border/Shadow (Placed outside ScrollView to stay fixed at top) */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white rounded-b-[40px] border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 justify-center items-center bg-gray-50"
        >
          <Text className="text-lg font-bold text-gray-800">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-900 tracking-tight">
          Sign In
        </Text>

        {/* Empty view for balanced spacing */}
        <View className="w-10" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* ScrollView now scrolls smoothly underneath the fixed header */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            paddingTop: 32,
            // paddingBottom: 60 + insets.bottom,
            paddingBottom: 60 + insets.bottom + (isKeyboardVisible ? 200 : 0),
          }}

          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Notifications rendered OUTSIDE of the form card */}
          <View className="w-full max-w-[340px] mb-4">
            {!!errorMessage && (
              <View className="bg-red-50 border border-red-200 p-4 rounded-xl flex-row items-center mb-2">
                <Text className="text-red-700 text-sm flex-1 font-medium">
                  {errorMessage}
                </Text>
              </View>
            )}

            {!!successMessage && (
              <View className="bg-green-50 border border-green-200 p-4 rounded-xl flex-row items-center mb-2">
                <Text className="text-green-700 text-sm flex-1 font-medium">
                  {successMessage}
                </Text>
              </View>
            )}
          </View>

          {/* Centered Card Container */}
          <View className="w-full max-w-[340px] bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black">
            
            {/* Logo & Header Section */}
            <View className="items-center mb-6">
              <Image 
                source={require('../assets/images/icon.png')} 
                className="w-16 h-16 mb-3 rounded-xl"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                Welcome Back
              </Text>
              <Text className="text-sm text-gray-500 font-normal">
                Sign into your account
              </Text>
            </View>

            {/* Form Fields Section */}
            <View className="mb-5">
              
              {/* Email Field */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </Text>
                <TextInput
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
                  placeholder="name@example.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Field */}
              <View className="mb-5">
                <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Password
                </Text>
                <TextInput
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!isFormValid || loading}
                onPress={handleLogin}
                className={`w-full h-14 rounded-xl flex-row justify-center items-center shadow-sm ${
                  isFormValid ? 'bg-green-600 shadow-green-600/20' : 'bg-gray-200'
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text className={`text-base font-semibold tracking-wide ${
                    isFormValid ? 'text-white' : 'text-gray-400'
                  }`}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

            </View>

            {/* Footer Link */}
            <View className="flex-row justify-center items-center mt-2">
              <Text className="text-sm text-gray-500">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-sm font-semibold text-green-600">Create account</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}




