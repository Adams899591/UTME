
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
//   StatusBar,
// } from 'react-native';
// import {  useRouter } from 'expo-router';


// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Form validation: true only when both fields have content
//   const isFormValid = email.trim() !== '' && password.trim() !== '';

//   const handleLogin = () => {
//     if (!isFormValid) return;

//     setLoading(true);

//     // Simulate network authentication request
//     setTimeout(() => {
//       setLoading(false);
//       router.push('/(drawer)/(tabs)/home'); // Navigate to home screen after successful login
//     }, 2000);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="light-content" backgroundColor="#16a34a" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1 bg-white justify-center items-center px-6"
//       >
//         {/* Centered Compact Card Container with Clear Black Box Shadow */}
//         <View className="w-full max-w-[340px] bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black">
          
//           {/* Logo & Header Section */}
//           <View className="items-center mb-8">
//             <Image 
//               source={require('../../assets/images/icon.png')} 
//               className="w-20 h-20 mb-4 rounded-xl"
//               resizeMode="contain"
//             />
//             <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
//               Welcome Back
//             </Text>
//             <Text className="text-sm text-gray-500 font-normal">
//               Sign into your account
//             </Text>
//           </View>

//           {/* Form Fields Section */}
//           <View className="mb-6">
            
//             {/* Email Field */}
//             <View className="mb-4">
//               <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                 Email Address
//               </Text>
//               <TextInput
//                 className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                 placeholder="name@example.com"
//                 placeholderTextColor="#9ca3af"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>

//             {/* Password Field */}
//             <View className="mb-6">
//               <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                 Password
//               </Text>
//               <TextInput
//                 className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9ca3af"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//             </View>

//             {/* Professional Sign In Button */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               disabled={!isFormValid || loading}
//               onPress={handleLogin}
//               className={`w-full h-14 rounded-xl flex-row justify-center items-center shadow-sm ${
//                 isFormValid ? 'bg-green-600 shadow-green-600/20' : 'bg-gray-200'
//               }`}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#ffffff" size="small" />
//               ) : (
//                 <Text className={`text-base font-semibold tracking-wide ${
//                   isFormValid ? 'text-white' : 'text-gray-400'
//                 }`}>
//                   Sign In
//                 </Text>
//               )}
//             </TouchableOpacity>

//           </View>

//           {/* Footer Link */}
//           <View className="flex-row justify-center items-center mt-2">
//             <Text className="text-sm text-gray-500">Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('/register')}>
//               <Text className="text-sm font-semibold text-green-600">Create account</Text>
//             </TouchableOpacity>
//           </View>

//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }







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
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';

// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Form validation: true only when both fields have content
//   const isFormValid = email.trim() !== '' && password.trim() !== '';

//   const handleLogin = () => {
//     if (!isFormValid) return;

//     setLoading(true);

//     // Simulate network authentication request
//     setTimeout(() => {
//       setLoading(false);
//       router.push('/home'); // Navigate to home screen after successful login
//     }, 2000);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="light-content" backgroundColor="#16a34a" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1 bg-white justify-center items-center px-6"
//       >
//         {/* Centered Compact Card Container with Clear Black Box Shadow */}
//         <View className="w-full max-w-[340px] bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black">
          
//           {/* Logo & Header Section */}
//           <View className="items-center mb-8">
//             <Image 
//               source={require('../assets/images/icon.png')} 
//               className="w-20 h-20 mb-4 rounded-xl"
//               resizeMode="contain"
//             />
//             <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
//               Welcome Back
//             </Text>
//             <Text className="text-sm text-gray-500 font-normal">
//               Sign into your account
//             </Text>
//           </View>

//           {/* Form Fields Section */}
//           <View className="mb-6">
            
//             {/* Email Field */}
//             <View className="mb-4">
//               <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                 Email Address
//               </Text>
//               <TextInput
//                 className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                 placeholder="name@example.com"
//                 placeholderTextColor="#9ca3af"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>

//             {/* Password Field */}
//             <View className="mb-6">
//               <Text className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//                 Password
//               </Text>
//               <TextInput
//                 className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-gray-50/40"
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9ca3af"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//             </View>

//             {/* Professional Sign In Button */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               disabled={!isFormValid || loading}
//               onPress={handleLogin}
//               className={`w-full h-14 rounded-xl flex-row justify-center items-center shadow-sm ${
//                 isFormValid ? 'bg-green-600 shadow-green-600/20' : 'bg-gray-200'
//               }`}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#ffffff" size="small" />
//               ) : (
//                 <Text className={`text-base font-semibold tracking-wide ${
//                   isFormValid ? 'text-white' : 'text-gray-400'
//                 }`}>
//                   Sign In
//                 </Text>
//               )}
//             </TouchableOpacity>

//           </View>

//           {/* Footer Link */}
//           <View className="flex-row justify-center items-center mt-2">
//             <Text className="text-sm text-gray-500">Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('/register')}>
//               <Text className="text-sm font-semibold text-green-600">Create account</Text>
//             </TouchableOpacity>
//           </View>

//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }







import React, { useState } from 'react';
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

// List of available JAMB/WAEC subjects
const AVAILABLE_SUBJECTS = [
  { id: 'english', name: 'Use of English', icon: 'book-outline', category: 'Compulsory' },
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator-outline', category: 'General' },
  { id: 'biology', name: 'Biology', icon: 'leaf-outline', category: 'Sciences' },
  { id: 'chemistry', name: 'Chemistry', icon: 'flask-outline', category: 'Sciences' },
  { id: 'physics', name: 'Physics', icon: 'hardware-chip-outline', category: 'Sciences' },
  { id: 'government', name: 'Government', icon: 'business-outline', category: 'Arts & Socials' },
  { id: 'economics', name: 'Economics', icon: 'stats-chart-outline', category: 'Arts & Socials' },
  { id: 'crk', name: 'Christian Religious Knowledge', icon: 'journal-outline', category: 'Arts & Socials' },
  { id: 'commerce', name: 'Commerce', icon: 'cart-outline', category: 'Commercial' },
  { id: 'accounting', name: 'Financial Accounting', icon: 'cash-outline', category: 'Commercial' },
  { id: 'literature', name: 'Literature in English', icon: 'library-outline', category: 'Arts & Socials' },
  { id: 'geography', name: 'Geography', icon: 'globe-outline', category: 'Sciences' },
];

export default function SelectSubjectsScreen() {
  const router = useRouter();
  
  // Default selected subject (e.g., English)
  const [selectedSubjects, setSelectedSubjects] = useState(['english']);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_SELECTION = 4;

  const toggleSubject = (id) => {
    setErrorMessage(''); // Clear error on interaction

    if (selectedSubjects.includes(id)) {
      // Unselect if already selected
      setSelectedSubjects(selectedSubjects.filter((subjectId) => subjectId !== id));
    } else {
      // Check if limit exceeded
      if (selectedSubjects.length >= MAX_SELECTION) {
        setErrorMessage(`You cannot select above ${MAX_SELECTION} subjects.`);
        return;
      }
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const handleProceed = () => {
    if (selectedSubjects.length === 0) {
      setErrorMessage('Please select at least 1 subject to practice.');
      return;
    }
    // Navigate to practice setup or question screen with selected IDs
    router.push({
      pathname: '/practice-setup',
      params: { subjects: JSON.stringify(selectedSubjects) },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Screen Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 justify-center items-center"
        >
          <Ionicons name="arrow-back" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Select Subjects</Text>
        <View className="w-10" />
      </View>

      <ScrollView 
        className="flex-1 px-6 pt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Info Banner & Selection Count */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Choose Your Courses
          </Text>
          <Text className="text-xs text-gray-500 mb-3">
            Select up to 4 subjects you want to practice for your exam.
          </Text>

          {/* Selection Badge */}
          <View className="flex-row items-center justify-between bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <Text className="text-xs font-semibold text-gray-700">
              Selected Courses:
            </Text>
            <View className="bg-green-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">
                {selectedSubjects.length} / {MAX_SELECTION}
              </Text>
            </View>
          </View>
        </View>

        {/* Warning/Error Message Notice */}
        {errorMessage ? (
          <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4 flex-row items-center">
            <Ionicons name="alert-circle-outline" size={18} color="#dc2626" className="mr-2" />
            <Text className="text-xs font-semibold text-red-600 flex-1 ml-2">
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* Subject Grid List */}
        <View className="flex-row flex-wrap justify-between">
          {AVAILABLE_SUBJECTS.map((subject) => {
            const isSelected = selectedSubjects.includes(subject.id);
            return (
              <TouchableOpacity
                key={subject.id}
                activeOpacity={0.8}
                onPress={() => toggleSubject(subject.id)}
                className={`w-[48%] p-4 rounded-2xl mb-4 border transition-all ${
                  isSelected
                    ? 'bg-green-50 border-green-600'
                    : 'bg-white border-gray-100'
                }`}
                style={{
                  elevation: isSelected ? 2 : 1,
                  shadowColor: isSelected ? '#16a34a' : '#000000',
                  shadowOpacity: isSelected ? 0.15 : 0.05,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className={`w-10 h-10 rounded-xl justify-center items-center ${
                    isSelected ? 'bg-green-600' : 'bg-gray-50'
                  }`}>
                    <Ionicons 
                      name={subject.icon} 
                      size={20} 
                      color={isSelected ? '#ffffff' : '#16a34a'} 
                    />
                  </View>

                  {/* Selection Checkbox Circle */}
                  <View className={`w-6 h-6 rounded-full border justify-center items-center ${
                    isSelected ? 'bg-green-600 border-green-600' : 'border-gray-300 bg-white'
                  }`}>
                    {isSelected && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                  </View>
                </View>

                <Text className="text-sm font-bold text-gray-900 mb-0.5">
                  {subject.name}
                </Text>
                <Text className="text-[10px] font-medium text-gray-400">
                  {subject.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Bottom Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleProceed}
          className={`w-full h-14 rounded-xl flex-row justify-center items-center ${
            selectedSubjects.length > 0 ? 'bg-green-600 shadow-green-600/20' : 'bg-gray-200'
          }`}
        >
          <Text className={`text-base font-semibold tracking-wide ${
            selectedSubjects.length > 0 ? 'text-white' : 'text-gray-400'
          }`}>
            Continue with {selectedSubjects.length} Subject{selectedSubjects.length !== 1 ? 's' : ''}
          </Text>
          <Ionicons 
            name="arrow-forward" 
            size={18} 
            color={selectedSubjects.length > 0 ? '#ffffff' : '#9ca3af'} 
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}