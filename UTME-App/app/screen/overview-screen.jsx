// import React from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// // import { router } from 'expo-router';

// export default function CBTOverviewScreen({ selectedCourses = ['Biology', 'Chemistry', 'Physics', 'Mathematics'], onBack, onBeginCBT }) {
//   // Calculate dynamic timing based on number of selected courses (e.g., 20 mins per subject)
//   const totalMinutes = selectedCourses.length * 20;
//   const totalQuestions = selectedCourses.length * 15; // 15 questions per course as an example
//   const router = useRouter();
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
//       {/* Top Header Navigation */}
//       <View style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 24,
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f3f4f6',
//       }}>
//         <TouchableOpacity 
//           onPress={onBack}
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: 12,
//             backgroundColor: '#f3f4f6',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 12,
//           }}
//         >
//           <Ionicons name="arrow-back" size={18} color="#111827" />
//         </TouchableOpacity>
//         <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111827' }}>
//           Examination Overview
//         </Text>
//       </View>

//       <ScrollView 
//         style={{ flex: 1, paddingTop: 20 }} 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
//       >
        
//         {/* Intro Badge & Title */}
//         <View style={{ marginBottom: 20 }}>
//           <Text style={{ fontSize: 11, fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1 }}>
//             CBT Simulation Ready
//           </Text>
//           <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 2 }}>
//             Review Your Session
//           </Text>
//           <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 4, lineHeight: 18 }}>
//             You have selected your target subjects. Review the configuration and instructions below before commencing your timed test.
//           </Text>
//         </View>

//         {/* Quick Stats Grid (Duration, Subjects, Total Questions) */}
//         <View style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginBottom: 24,
//         }}>
//           {/* Duration Card */}
//           <View style={{
//             flex: 1,
//             backgroundColor: '#f0fdf4',
//             borderRadius: 16,
//             borderWidth: 1,
//             borderColor: '#bbf7d0',
//             padding: 14,
//             marginRight: 8,
//           }}>
//             <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#dcfce7', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
//               <Ionicons name="time-outline" size={18} color="#16a34a" />
//             </View>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#14532d' }}>
//               {totalMinutes} mins
//             </Text>
//             <Text style={{ fontSize: 11, color: '#4ade80', fontWeight: '600', marginTop: 2 }}>
//               Total Duration
//             </Text>
//           </View>

//           {/* Subjects Count Card */}
//           <View style={{
//             flex: 1,
//             backgroundColor: '#eff6ff',
//             borderRadius: 16,
//             borderWidth: 1,
//             borderColor: '#bfdbfe',
//             padding: 14,
//             marginHorizontal: 4,
//           }}>
//             <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
//               <Ionicons name="book-outline" size={18} color="#2563eb" />
//             </View>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e3a8a' }}>
//               {selectedCourses.length} Subjects
//             </Text>
//             <Text style={{ fontSize: 11, color: '#60a5fa', fontWeight: '600', marginTop: 2 }}>
//               Selected Mix
//             </Text>
//           </View>

//           {/* Questions Card */}
//           <View style={{
//             flex: 1,
//             backgroundColor: '#faf5ff',
//             borderRadius: 16,
//             borderWidth: 1,
//             borderColor: '#f3e8ff',
//             padding: 14,
//             marginLeft: 8,
//           }}>
//             <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#f3e8ff', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
//               <Ionicons name="help-circle-outline" size={18} color="#9333ea" />
//             </View>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#581c87' }}>
//               {totalQuestions} Qs
//             </Text>
//             <Text style={{ fontSize: 11, color: '#c084fc', fontWeight: '600', marginTop: 2 }}>
//               Total Questions
//             </Text>
//           </View>
//         </View>

//         {/* Selected Courses Card List */}
//         <View style={{ marginBottom: 24 }}>
//           <Text style={{ fontSize: 11, fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
//             Included Subjects
//           </Text>
          
//           <View style={{
//             backgroundColor: '#f9fafb',
//             borderRadius: 20,
//             borderWidth: 1,
//             borderColor: '#f3f4f6',
//             padding: 16,
//           }}>
//             {selectedCourses.map((courseName, index) => (
//               <View 
//                 key={index} 
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   paddingVertical: 10,
//                   borderBottomWidth: index === selectedCourses.length - 1 ? 0 : 1,
//                   borderBottomColor: '#f0f0f0',
//                 }}
//               >
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <View style={{
//                     width: 28,
//                     height: 28,
//                     borderRadius: 8,
//                     backgroundColor: '#e5e7eb',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                     <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4b5563' }}>
//                       {index + 1}
//                     </Text>
//                   </View>
//                   <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
//                     {courseName}
//                   </Text>
//                 </View>
//                 <Text style={{ fontSize: 12, color: '#6b7280', fontWeight: '500' }}>
//                   15 Questions
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Insight & Guidelines Card */}
//         <View style={{
//           backgroundColor: '#fffbeb',
//           borderRadius: 20,
//           borderWidth: 1,
//           borderColor: '#fef3c7',
//           padding: 16,
//           marginBottom: 20,
//         }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//             <Ionicons name="information-circle-outline" size={20} color="#d97706" style={{ marginRight: 6 }} />
//             <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#b45309' }}>
//               Important Instructions
//             </Text>
//           </View>
//           <Text style={{ fontSize: 12, color: '#78350f', lineHeight: 18, marginBottom: 6 }}>
//             • Once started, the countdown timer will continue running even if you switch sections.
//           </Text>
//           <Text style={{ fontSize: 12, color: '#78350f', lineHeight: 18, marginBottom: 6 }}>
//             • You can navigate back and forth between questions before final submission.
//           </Text>
//           <Text style={{ fontSize: 12, color: '#78350f', lineHeight: 18 }}>
//             • Ensure you have a stable connection and comfortable environment before starting.
//           </Text>
//         </View>

//       </ScrollView>

//       {/* Bottom Fixed Action Button */}
//       <View style={{
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: '#ffffff',
//         borderTopWidth: 1,
//         borderTopColor: '#f3f4f6',
//         paddingHorizontal: 24,
//         paddingVertical: 16,
//       }}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => router.push("/screen/exam-screen")}
//           style={{
//             width: '100%',
//             height: 56,
//             backgroundColor: '#16a34a',
//             borderRadius: 16,
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//             shadowColor: '#16a34a',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 6,
//             elevation: 4,
//           }}
//         >
//           <Ionicons name="play" size={18} color="#ffffff" style={{ marginRight: 8 }} />
//           <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>
//             Start CBT Simulation Now
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }



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

export default function CBTOverviewScreen({ selectedCourses = ['Biology', 'Chemistry', 'Physics', 'Mathematics'], onBack, onBeginCBT }) {
  const totalMinutes = selectedCourses.length * 20;
  const totalQuestions = selectedCourses.length * 15;
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header Navigation */}
      <View className="flex-row items-center px-6 py-3 border-b border-gray-100">
        <TouchableOpacity 
          onPress={onBack}
          className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center mr-3"
        >
          <Ionicons name="arrow-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-gray-900">
          Examination Overview
        </Text>
      </View>

      <ScrollView 
        className="flex-1 pt-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
      >
        
        {/* Intro Badge & Title */}
        <View className="mb-5">
          <Text className="text-[11px] font-semibold text-green-600 uppercase tracking-widest">
            CBT Simulation Ready
          </Text>
          <Text className="text-2xl font-bold text-gray-900 mt-0.5">
            Review Your Session
          </Text>
          <Text className="text-xs text-gray-500 mt-1 leading-[18px]">
            You have selected your target subjects. Review the configuration and instructions below before commencing your timed test.
          </Text>
        </View>

        {/* Quick Stats Grid (Duration, Subjects, Total Questions) */}
        <View className="flex-row justify-between mb-6">
          {/* Duration Card */}
          <View className="flex-1 bg-green-50 rounded-2xl border border-green-200 p-3.5 mr-2">
            <View className="w-8 h-8 rounded-xl bg-green-100 justify-center items-center mb-2">
              <Ionicons name="time-outline" size={18} color="#16a34a" />
            </View>
            <Text className="text-lg font-bold text-green-900">
              {totalMinutes} mins
            </Text>
            <Text className="text-[11px] text-green-500 font-semibold mt-0.5">
              Total Duration
            </Text>
          </View>

          {/* Subjects Count Card */}
          <View className="flex-1 bg-blue-50 rounded-2xl border border-blue-200 p-3.5 mx-1">
            <View className="w-8 h-8 rounded-xl bg-blue-100 justify-center items-center mb-2">
              <Ionicons name="book-outline" size={18} color="#2563eb" />
            </View>
            <Text className="text-lg font-bold text-blue-900">
              {selectedCourses.length} Subjects
            </Text>
            <Text className="text-[11px] text-blue-400 font-semibold mt-0.5">
              Selected Mix
            </Text>
          </View>

          {/* Questions Card */}
          <View className="flex-1 bg-purple-50 rounded-2xl border border-purple-200 p-3.5 ml-2">
            <View className="w-8 h-8 rounded-xl bg-purple-100 justify-center items-center mb-2">
              <Ionicons name="help-circle-outline" size={18} color="#9333ea" />
            </View>
            <Text className="text-lg font-bold text-purple-950">
              {totalQuestions} Qs
            </Text>
            <Text className="text-[11px] text-purple-400 font-semibold mt-0.5">
              Total Questions
            </Text>
          </View>
        </View>

        {/* Selected Courses Card List */}
        <View className="mb-6">
          <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Included Subjects
          </Text>
          
          <View className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
            {selectedCourses.map((courseName, index) => (
              <View 
                key={index} 
                className={`flex-row items-center justify-between py-2.5 ${
                  index === selectedCourses.length - 1 ? '' : 'border-b border-gray-200/60'
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-7 h-7 rounded-lg bg-gray-200 justify-center items-center mr-2.5">
                    <Text className="text-xs font-bold text-gray-700">
                      {index + 1}
                    </Text>
                  </View>
                  <Text className="text-sm font-semibold text-gray-800">
                    {courseName}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500 font-medium">
                  15 Questions
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insight & Guidelines Card */}
        <View className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-5">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle-outline" size={20} color="#d97706" style={{ marginRight: 6 }} />
            <Text className="text-sm font-bold text-amber-700">
              Important Instructions
            </Text>
          </View>
          <Text className="text-xs text-amber-900 leading-[18px] mb-1.5">
            • Once started, the countdown timer will continue running even if you switch sections.
          </Text>
          <Text className="text-xs text-amber-900 leading-[18px] mb-1.5">
            • You can navigate back and forth between questions before final submission.
          </Text>
          <Text className="text-xs text-amber-900 leading-[18px]">
            • Ensure you have a stable connection and comfortable environment before starting.
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Fixed Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/screen/exam-screen")}
          className="w-full h-14 bg-green-600 rounded-2xl flex-row justify-center items-center shadow-lg shadow-green-600/20"
        >
          <Ionicons name="play" size={18} color="#ffffff" style={{ marginRight: 8 }} />
          <Text className="text-base font-bold text-white">
            Start CBT Simulation Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}