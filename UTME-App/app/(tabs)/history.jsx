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

export default function CBTHistoryScreen() {
  const router = useRouter();

  // TOGGLE STATE: Change this to true to see the unlocked history view, or false to see the paywall banner
  const [isSubscribed, setIsSubscribed] = useState(true);

  // Expanded mock history logs: 2 passing attempts, 1 failing attempt
  const examHistoryList = [
    {
      id: '1',
      date: 'Aug 3, 2026',
      timeSpent: '45m 12s',
      totalScore: 54,
      maxScore: 60,
      percentage: 90,
      passed: true,
      subjects: [
        { name: 'Biology', score: 18, total: 20 },
        { name: 'Physics', score: 19, total: 20 },
        { name: 'Chemistry', score: 17, total: 20 },
      ],
    },
    {
      id: '2',
      date: 'July 28, 2026',
      timeSpent: '50m 30s',
      totalScore: 45,
      maxScore: 60,
      percentage: 75,
      passed: true,
      subjects: [
        { name: 'Biology', score: 15, total: 20 },
        { name: 'Physics', score: 16, total: 20 },
        { name: 'Chemistry', score: 14, total: 20 },
      ],
    },
    {
      id: '3',
      date: 'July 20, 2026',
      timeSpent: '59m 50s',
      totalScore: 28,
      maxScore: 60,
      percentage: 46,
      passed: false,
      subjects: [
        { name: 'Biology', score: 10, total: 20 },
        { name: 'Physics', score: 9, total: 20 },
        { name: 'Chemistry', score: 9, total: 20 },
      ],
    },
  ];

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
          <Text className="text-lg font-bold text-gray-900">Exam History</Text>
        </View>

        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">
            {isSubscribed ? `${examHistoryList.length} Sessions Logged` : 'Free Plan'}
          </Text>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        
        {/* CONDITIONAL RENDERING BASED ON SUBSCRIPTION STATE */}
        {!isSubscribed ? (
          /* PAYWALL BANNER (Shown when user has NOT paid) */
          <View className="bg-amber-50 border border-amber-200 rounded-3xl p-5 mb-6 shadow-sm">
            <View className="flex-row items-start mb-3">
              <View className="w-10 h-10 rounded-xl bg-amber-100 justify-center items-center mr-3.5">
                <Ionicons name="lock-closed-outline" size={20} color="#d97706" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-amber-900 mb-1">
                  Unlock Full Exam History
                </Text>
                <Text className="text-xs leading-relaxed text-amber-800">
                  You need to upgrade to the paid plan to track, analyze, and keep permanent records of your past test performances.
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => router.push('/screen/subscription-screen')}
              className="w-full h-12 rounded-2xl bg-amber-600 flex-row justify-center items-center mt-2 shadow-sm"
            >
              <Ionicons name="star-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text className="text-xs font-bold text-white uppercase tracking-wider">
                Upgrade to Premium Plan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* UNLOCKED HISTORY LIST (Shown when user IS subscribed) */
          <>
            <View className="mb-4">
              <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Previous Attempts & Breakdown
              </Text>
            </View>

            {examHistoryList.map((record) => (
              <View 
                key={record.id}
                className="bg-white rounded-3xl p-5 mb-5 border border-gray-200 shadow-sm"
              >
                <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-lg bg-gray-100 justify-center items-center mr-2.5">
                      <Ionicons name="calendar-outline" size={16} color="#4b5563" />
                    </View>
                    <View>
                      <Text className="text-xs font-bold text-gray-800">{record.date}</Text>
                      <Text className="text-[10px] text-gray-400">Duration: {record.timeSpent}</Text>
                    </View>
                  </View>

                  <View className={`px-2.5 py-1 rounded-full border ${
                    record.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <Text className={`text-[10px] font-bold ${record.passed ? 'text-green-700' : 'text-red-700'}`}>
                      {record.passed ? 'Passed' : 'Failed'}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 rounded-2xl p-3.5 mb-4 flex-row justify-between items-center border border-gray-100">
                  <View>
                    <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overall Aggregate</Text>
                    <Text className="text-lg font-extrabold text-gray-900">
                      {record.totalScore} / {record.maxScore}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-base font-extrabold text-green-600">
                      {record.percentage}%
                    </Text>
                  </View>
                </View>

                <View className="space-y-2">
                  {record.subjects.map((subj, index) => (
                    <View 
                      key={index}
                      className="flex-row justify-between items-center bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-200 mb-2"
                    >
                      <View className="flex-row items-center">
                        <Ionicons 
                          name={
                            subj.name === 'Biology' ? 'leaf-outline' :
                            subj.name === 'Physics' ? 'flash-outline' : 'flask-outline'
                          } 
                          size={14} 
                          color="#16a34a" 
                          style={{ marginRight: 8 }}
                        />
                        <Text className="text-xs font-semibold text-gray-800">{subj.name}</Text>
                      </View>
                      <Text className="text-xs font-bold text-gray-700">
                        {subj.score} <Text className="text-gray-400 font-normal">/ {subj.total}</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}