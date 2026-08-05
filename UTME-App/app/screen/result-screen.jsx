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

// export default function CBTResultScreen({ route }) {
//   const router = useRouter();

//   // Mock results data (In production, pass this via route.params or state management)
//   const examResult = {
//     totalScore: 54,
//     maxScore: 60,
//     percentage: 90,
//     passed: true,
//     timeSpent: '45m 12s',
//     subjects: [
//       { name: 'Biology', score: 18, total: 20, percentage: 90 },
//       { name: 'Physics', score: 19, total: 20, percentage: 95 },
//       { name: 'Chemistry', score: 17, total: 20, percentage: 85 },
//     ],
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

//       {/* Header */}
//       <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
//         <View className="flex-row items-center">
//           <View className="w-9 h-9 rounded-xl bg-green-50 justify-center items-center mr-3 border border-green-200">
//             <Ionicons name="trophy-outline" size={20} color="#16a34a" />
//           </View>
//           <Text className="text-lg font-bold text-gray-900">Exam Results</Text>
//         </View>

//         <TouchableOpacity 
//           onPress={() => router.replace('/(tabs)/home')}
//           className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center"
//         >
//           <Ionicons name="close-outline" size={20} color="#374151" />
//         </TouchableOpacity>
//       </View>

//       {/* Scrollable Content */}
//       <ScrollView 
//         className="flex-1 px-6 pt-6" 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         {/* Score Card Banner */}
//         <View className="bg-green-600 rounded-3xl p-6 mb-6 shadow-sm overflow-hidden relative">
//           {/* Decorative Background Icon Ring */}
//           <View className="absolute -right-6 -bottom-6 opacity-10">
//             <Ionicons name="ribbon" size={160} color="#ffffff" />
//           </View>

//           <View className="flex-row justify-between items-start mb-4">
//             <View className="bg-green-500/40 px-3 py-1 rounded-full border border-green-400/30">
//               <Text className="text-xs font-bold text-white uppercase tracking-wider">
//                 {examResult.passed ? '🎉 Excellent Performance' : 'Keep Practicing'}
//               </Text>
//             </View>
//             <Text className="text-xs font-medium text-green-100">
//               Time Spent: {examResult.timeSpent}
//             </Text>
//           </View>

//           <View className="items-center my-2">
//             <Text className="text-4xl font-extrabold text-white tracking-tight mb-1">
//               {examResult.percentage}%
//             </Text>
//             <Text className="text-sm font-medium text-green-100">
//               Total Score: {examResult.totalScore} / {examResult.maxScore}
//             </Text>
//           </View>
//         </View>

//         {/* Breakdown Section Title */}
//         <View className="mb-4">
//           <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
//             Subject Breakdown
//           </Text>
//         </View>

//         {/* Subject Performance Cards */}
//         <View className="space-y-3 mb-8">
//           {examResult.subjects.map((subj, index) => (
//             <View 
//               key={index}
//               className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex-row items-center justify-between mb-3"
//             >
//               <View className="flex-row items-center">
//                 <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3.5">
//                   <Ionicons 
//                     name={
//                       subj.name === 'Biology' ? 'leaf-outline' :
//                       subj.name === 'Physics' ? 'flash-outline' : 'flask-outline'
//                     } 
//                     size={20} 
//                     color="#16a34a" 
//                   />
//                 </View>
//                 <View>
//                   <Text className="text-base font-bold text-gray-900 mb-0.5">
//                     {subj.name}
//                   </Text>
//                   <Text className="text-xs font-medium text-gray-500">
//                     Score: {subj.score} of {subj.total} questions
//                   </Text>
//                 </View>
//               </View>

//               <View className="items-end">
//                 <Text className="text-base font-extrabold text-green-600 mb-0.5">
//                   {subj.percentage}%
//                 </Text>
//                 <View className="bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
//                   <Text className="text-[10px] font-bold text-green-700">Passed</Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Action Buttons */}
//         <View className="space-y-3">
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => router.push('/screen/review-answers-screen')}
//             className="w-full h-14 rounded-2xl bg-white border border-gray-200 flex-row justify-center items-center shadow-sm mb-3"
//           >
//             <Ionicons name="eye-outline" size={18} color="#374151" style={{ marginRight: 8 }} />
//             <Text className="text-sm font-bold text-gray-700">
//               Review Detailed Answers
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => router.replace('/home')}
//             className="w-full h-14 rounded-2xl bg-green-600 flex-row justify-center items-center shadow-sm"
//           >
//             <Text className="text-sm font-bold text-white mr-2">
//               Back to Dashboard
//             </Text>
//             <Ionicons name="arrow-forward-outline" size={18} color="#ffffff" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }















import React, { useMemo } from 'react';
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

export default function CBTResultScreen() {
  const router = useRouter();

  // Pull practice questions, current courses, and user answers from Zustand
  const { practiceQuestions, currentCourses, userAnswers } = UsePracticeStore();

 

  // Calculate scores and subject breakdown dynamically
  const examResult = useMemo(() => {
    let totalScore = 0;
    let totalQuestionsCount = 0;
    const subjectsMap = {};

    currentCourses.forEach((course) => {
      subjectsMap[course] = {
        name: course,
        score: 0,
        total: 0,
        percentage: 0,
      };
    });

    currentCourses.forEach((course) => {
      const courseQuestions = practiceQuestions[course] || [];
      subjectsMap[course].total = courseQuestions.length;
      totalQuestionsCount += courseQuestions.length;

      courseQuestions.forEach((q) => {
        const userAnswer = userAnswers[q.id]; // e.g., 'a', 'b', 'c', 'd' from Zustand
        
        // FIX: Your Laravel API uses "answer" (e.g., "b")
        const correctAnswer = (q.answer || q.correctAnswer || q.correct || '').trim().toLowerCase();
        const formattedUserAnswer = (userAnswer || '').trim().toLowerCase();

        // Compare user's picked option against Laravel's "answer" key
        if (formattedUserAnswer && formattedUserAnswer === correctAnswer) {
          totalScore += 1;
          subjectsMap[course].score += 1;
        }
      });

      const subTotal = subjectsMap[course].total;
      subjectsMap[course].percentage = subTotal > 0 
        ? Math.round((subjectsMap[course].score / subTotal) * 100) 
        : 0;
    });

    const totalPercentage = totalQuestionsCount > 0 
      ? Math.round((totalScore / totalQuestionsCount) * 100) 
      : 0;

    return {
      totalScore,
      maxScore: totalQuestionsCount,
      percentage: totalPercentage,
      passed: totalPercentage >= 50,
      subjects: Object.values(subjectsMap),
    };
  }, [practiceQuestions, currentCourses, userAnswers]);




  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-xl bg-green-50 justify-center items-center mr-3 border border-green-200">
            <Ionicons name="trophy-outline" size={20} color="#16a34a" />
          </View>
          <Text className="text-lg font-bold text-gray-900">Exam Results</Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/home')}
          className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center"
        >
          <Ionicons name="close-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Score Card Banner */}
        <View className={`rounded-3xl p-6 mb-6 shadow-sm overflow-hidden relative ${examResult.passed ? 'bg-green-600' : 'bg-amber-600'}`}>
          {/* Decorative Background Icon Ring */}
          <View className="absolute -right-6 -bottom-6 opacity-10">
            <Ionicons name="ribbon" size={160} color="#ffffff" />
          </View>

          <View className="flex-row justify-between items-start mb-4">
            <View className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
              <Text className="text-xs font-bold text-white uppercase tracking-wider">
                {examResult.passed ? '🎉 Excellent Performance' : 'Keep Practicing'}
              </Text>
            </View>
          </View>

          <View className="items-center my-2">
            <Text className="text-4xl font-extrabold text-white tracking-tight mb-1">
              {examResult.percentage}%
            </Text>
            <Text className="text-sm font-medium text-white/90">
              Total Score: {examResult.totalScore} / {examResult.maxScore}
            </Text>
          </View>
        </View>

        {/* Breakdown Section Title */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Subject Breakdown
          </Text>
        </View>

        {/* Subject Performance Cards */}
        <View className="mb-8">
          {examResult.subjects.map((subj, index) => (
            <View 
              key={index}
              className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex-row items-center justify-between mb-3"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-gray-100 justify-center items-center mr-3.5">
                  <Ionicons 
                    name="book-outline" 
                    size={20} 
                    color="#16a34a" 
                  />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-900 mb-0.5">
                    {subj.name}
                  </Text>
                  <Text className="text-xs font-medium text-gray-500">
                    Score: {subj.score} of {subj.total} questions
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-base font-extrabold text-green-600 mb-0.5">
                  {subj.percentage}%
                </Text>
                <View className="bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                  <Text className="text-[10px] font-bold text-green-700">Completed</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/screen/review-answers-screen')}
            className="w-full h-14 rounded-2xl bg-white border border-gray-200 flex-row justify-center items-center shadow-sm mb-3"
          >
            <Ionicons name="eye-outline" size={18} color="#374151" style={{ marginRight: 8 }} />
            <Text className="text-sm font-bold text-gray-700">
              Review Detailed Answers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/home')}
            className="w-full h-14 rounded-2xl bg-green-600 flex-row justify-center items-center shadow-sm"
          >
            <Text className="text-sm font-bold text-white mr-2">
              Back to Dashboard
            </Text>
            <Ionicons name="arrow-forward-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}