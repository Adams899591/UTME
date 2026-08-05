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

// export default function CBTOverviewScreen({ selectedCourses = ['Biology', 'Chemistry', 'Physics', 'Mathematics'], onBack, onBeginCBT }) {
  
//   const totalMinutes = selectedCourses.length * 20;
//   const totalQuestions = selectedCourses.length * 15;
//   const router = useRouter();

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
//       {/* Top Header Navigation */}
//       <View className="flex-row items-center px-6 py-3 border-b border-gray-100">
//         <TouchableOpacity 
//           onPress={onBack}
//           className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center mr-3"
//         >
//           <Ionicons name="arrow-back" size={18} color="#111827" />
//         </TouchableOpacity>
//         <Text className="text-base font-bold text-gray-900">
//           Examination Overview
//         </Text>
//       </View>

//       <ScrollView 
//         className="flex-1 pt-5" 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
//       >
        
//         {/* Intro Badge & Title */}
//         <View className="mb-5">
//           <Text className="text-[11px] font-semibold text-green-600 uppercase tracking-widest">
//             CBT Simulation Ready
//           </Text>
//           <Text className="text-2xl font-bold text-gray-900 mt-0.5">
//             Review Your Session
//           </Text>
//           <Text className="text-xs text-gray-500 mt-1 leading-[18px]">
//             You have selected your target subjects. Review the configuration and instructions below before commencing your timed test.
//           </Text>
//         </View>

//         {/* Quick Stats Grid (Duration, Subjects, Total Questions) */}
//         <View className="flex-row justify-between mb-6">
//           {/* Duration Card */}
//           <View className="flex-1 bg-green-50 rounded-2xl border border-green-200 p-3.5 mr-2">
//             <View className="w-8 h-8 rounded-xl bg-green-100 justify-center items-center mb-2">
//               <Ionicons name="time-outline" size={18} color="#16a34a" />
//             </View>
//             <Text className="text-lg font-bold text-green-900">
//               {totalMinutes} mins
//             </Text>
//             <Text className="text-[11px] text-green-500 font-semibold mt-0.5">
//               Total Duration
//             </Text>
//           </View>

//           {/* Subjects Count Card */}
//           <View className="flex-1 bg-blue-50 rounded-2xl border border-blue-200 p-3.5 mx-1">
//             <View className="w-8 h-8 rounded-xl bg-blue-100 justify-center items-center mb-2">
//               <Ionicons name="book-outline" size={18} color="#2563eb" />
//             </View>
//             <Text className="text-lg font-bold text-blue-900">
//               {selectedCourses.length} Subjects
//             </Text>
//             <Text className="text-[11px] text-blue-400 font-semibold mt-0.5">
//               Selected Mix
//             </Text>
//           </View>

//           {/* Questions Card */}
//           <View className="flex-1 bg-purple-50 rounded-2xl border border-purple-200 p-3.5 ml-2">
//             <View className="w-8 h-8 rounded-xl bg-purple-100 justify-center items-center mb-2">
//               <Ionicons name="help-circle-outline" size={18} color="#9333ea" />
//             </View>
//             <Text className="text-lg font-bold text-purple-950">
//               {totalQuestions} Qs
//             </Text>
//             <Text className="text-[11px] text-purple-400 font-semibold mt-0.5">
//               Total Questions
//             </Text>
//           </View>
//         </View>

//         {/* Selected Courses Card List */}
//         <View className="mb-6">
//           <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
//             Included Subjects
//           </Text>
          
//           <View className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
//             {selectedCourses.map((courseName, index) => (
//               <View 
//                 key={index} 
//                 className={`flex-row items-center justify-between py-2.5 ${
//                   index === selectedCourses.length - 1 ? '' : 'border-b border-gray-200/60'
//                 }`}
//               >
//                 <View className="flex-row items-center">
//                   <View className="w-7 h-7 rounded-lg bg-gray-200 justify-center items-center mr-2.5">
//                     <Text className="text-xs font-bold text-gray-700">
//                       {index + 1}
//                     </Text>
//                   </View>
//                   <Text className="text-sm font-semibold text-gray-800">
//                     {courseName}
//                   </Text>
//                 </View>
//                 <Text className="text-xs text-gray-500 font-medium">
//                   15 Questions
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Insight & Guidelines Card */}
//         <View className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-5">
//           <View className="flex-row items-center mb-2">
//             <Ionicons name="information-circle-outline" size={20} color="#d97706" style={{ marginRight: 6 }} />
//             <Text className="text-sm font-bold text-amber-700">
//               Important Instructions
//             </Text>
//           </View>
//           <Text className="text-xs text-amber-900 leading-[18px] mb-1.5">
//             • Once started, the countdown timer will continue running even if you switch sections.
//           </Text>
//           <Text className="text-xs text-amber-900 leading-[18px] mb-1.5">
//             • You can navigate back and forth between questions before final submission.
//           </Text>
//           <Text className="text-xs text-amber-900 leading-[18px]">
//             • Ensure you have a stable connection and comfortable environment before starting.
//           </Text>
//         </View>

//       </ScrollView>

//       {/* Bottom Fixed Action Button */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => router.push("/screen/exam-screen")}
//           className="w-full h-14 bg-green-600 rounded-2xl flex-row justify-center items-center shadow-lg shadow-green-600/20"
//         >
//           <Ionicons name="play" size={18} color="#ffffff" style={{ marginRight: 8 }} />
//           <Text className="text-base font-bold text-white">
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
import { UsePracticeStore } from '../../zustand/StorePraticalQuestions'; // Adjust path if needed

export default function CBTOverviewScreen() {
  const router = useRouter();

  // Pull currentCourses and practiceQuestions directly from Zustand store!
  const { currentCourses, practiceQuestions } = UsePracticeStore();

  // Calculate totals dynamically based on what's in Zustand
  const totalSubjects = currentCourses.length;
  
  // Count total questions fetched across all selected courses
  const totalQuestions = Object.values(practiceQuestions).reduce(
    (sum, questionsArray) => sum + (Array.isArray(questionsArray) ? questionsArray.length : 0),
    0
  );

  // Allocate 1 minute per question for realistic CBT timing (or default to minimum 20 mins)
  const totalMinutes = totalQuestions > 0 ? totalQuestions : totalSubjects * 20;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header Navigation */}
      <View className="flex-row items-center px-6 py-3 border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
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
              {totalSubjects} Subjects
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

        {/* Selected Courses Card List dynamically from Zustand */}
        <View className="mb-6">
          <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Included Subjects
          </Text>
          
          <View className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
            {currentCourses.length > 0 ? (
              currentCourses.map((courseName, index) => {
                const questionCount = practiceQuestions[courseName]?.length || 0;
                return (
                  <View 
                    key={index} 
                    className={`flex-row items-center justify-between py-2.5 ${
                      index === currentCourses.length - 1 ? '' : 'border-b border-gray-200/60'
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
                      {questionCount} Questions
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text className="text-xs text-gray-500 text-center py-2">
                No courses selected. Please go back and select courses.
              </Text>
            )}
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