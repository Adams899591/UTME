// import React, { useState } from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export default function SignUpScreen() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Form validation: true only when all fields have content
//   const isFormValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

//   const handleSignUp = () => {
//     if (!isFormValid) return;

//     setLoading(true);

//     // Simulate network registration request
//     setTimeout(() => {
//       setLoading(false);
//       alert('Account created successfully!');
//     }, 2000);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
//       <StatusBar barStyle="light-content" backgroundColor="#16a34a" />
      
//       {/* Top Header with Increased Bottom Corner Roundness */}
//       <View className="flex-row items-center justify-between px-6 py-4 bg-green-600 rounded-b-[40px] shadow-md">
//         <TouchableOpacity 
//           onPress={() => router.back()}
//           className="w-10 h-10 rounded-full border border-white justify-center items-center shadow-sm"
//         >
//           <Text className="text-lg font-bold text-white">←</Text>
//         </TouchableOpacity>
        
//         <Text className="text-lg font-bold text-white tracking-tight">
//           Create Account
//         </Text>

//         {/* Empty view for balanced spacing */}
//         <View className="w-10" />
//       </View>

//       {/* ScrollView added so it looks perfect and scrolls gracefully on smaller mobile screens */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1 bg-white"
//       >
//         <ScrollView 
//           contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Centered Compact Card Container with Clear Black Box Shadow */}
//           <View className="w-full max-w-[340px] bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black">
            
//             {/* Logo & Header Section */}
//             <View className="items-center mb-6">
//               <Image 
//                 source={require('../assets/images/icon.png')} 
//                 className="w-16 h-16 mb-3 rounded-xl"
//                 resizeMode="contain"
//               />
//               <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
//                 Get Started
//               </Text>
//               <Text className="text-sm text-gray-500 font-normal">
//                 Create a new account
//               </Text>
//             </View>

//             {/* Form Fields Section */}
//             <View className="mb-5">
              
//               {/* Full Name Field */}
//               <View className="mb-4">
//                 <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                   Full Name
//                 </Text>
//                 <TextInput
//                   className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                   placeholder="John Doe"
//                   placeholderTextColor="#9ca3af"
//                   autoCapitalize="words"
//                   value={name}
//                   onChangeText={setName}
//                 />
//               </View>

//               {/* Email Field */}
//               <View className="mb-4">
//                 <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                   Email Address
//                 </Text>
//                 <TextInput
//                   className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                   placeholder="name@example.com"
//                   placeholderTextColor="#9ca3af"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//               </View>

//               {/* Password Field */}
//               <View className="mb-5">
//                 <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                   Password
//                 </Text>
//                 <TextInput
//                   className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                   placeholder="Create a password"
//                   placeholderTextColor="#9ca3af"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//               </View>

//               {/* Professional Sign Up Button */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 disabled={!isFormValid || loading}
//                 onPress={handleSignUp}
//                 className={`w-full h-14 rounded-xl flex-row justify-center items-center shadow-sm ${
//                   isFormValid ? 'bg-green-600 shadow-green-600/20' : 'bg-gray-200'
//                 }`}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#ffffff" size="small" />
//                 ) : (
//                   <Text className={`text-base font-semibold tracking-wide ${
//                     isFormValid ? 'text-white' : 'text-gray-400'
//                   }`}>
//                     Sign Up
//                   </Text>
//                 )}
//               </TouchableOpacity>

//             </View>

//             {/* Footer Link */}
//             <View className="flex-row justify-center items-center mt-2">
//               <Text className="text-sm text-gray-500">Already have an account? </Text>
//               <TouchableOpacity onPress={() => router.push('/login')}>
//                 <Text className="text-sm font-semibold text-green-600">Sign in</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }







import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Form validation: true only when all fields have content
  const isFormValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  const handleSignUp = () => {
    if (!isFormValid) return;

    setLoading(true);

    // Simulate network registration request
    setTimeout(() => {
      setLoading(false);
      alert('Account created successfully!');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />
      
      {/* Top Header with Increased Bottom Corner Roundness */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-green-600 rounded-b-[40px] shadow-md z-10">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-white justify-center items-center shadow-sm"
        >
          <Text className="text-lg font-bold text-white">←</Text>
        </TouchableOpacity>
        
        <Text className="text-lg font-bold text-white tracking-tight">
          Create Account
        </Text>

        {/* Empty view for balanced spacing */}
        <View className="w-10" />
      </View>

      {/* KeyboardAvoidingView wrapped around the entire screen container so ScrollView correctly shifts up */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Centered Compact Card Container with Clear Black Box Shadow */}
          <View className="w-full max-w-[340px] bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black">
            
            {/* Logo & Header Section */}
            <View className="items-center mb-6">
              <Image 
                source={require('../assets/images/icon.png')} 
                className="w-16 h-16 mb-3 rounded-xl"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                Get Started
              </Text>
              <Text className="text-sm text-gray-500 font-normal">
                Create a new account
              </Text>
            </View>

            {/* Form Fields Section */}
            <View className="mb-5">
              
              {/* Full Name Field */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
                  placeholder="John Doe"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>

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
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Professional Sign Up Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={!isFormValid || loading}
                onPress={handleSignUp}
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
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>

            </View>

            {/* Footer Link */}
            <View className="flex-row justify-center items-center mt-2">
              <Text className="text-sm text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-sm font-semibold text-green-600">Sign in</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}