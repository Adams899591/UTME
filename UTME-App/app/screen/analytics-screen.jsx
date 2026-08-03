import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-gifted-charts';

export default function AnalysisScreen() {
  const router = useRouter();
    // TOGGLE STATE: Change this to true to see the unlocked history view, or false to see the paywall banner
    const [isSubscribed, setIsSubscribed] = useState(true);

  // Screen width calculation for responsive chart sizing
  const screenWidth = Dimensions.get('window').width;

  // Data for the Bar Chart
  // value: height of the bar, frontColor: bar color, label: text under the bar
  const barData = [
    {
      value: 14,
      label: 'Passed Courses',
      frontColor: '#16a34a', // Green
      topLabelComponent: () => (
        <Text style={{ color: '#16a34a', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>14</Text>
      ),
    },
    {
      value: 22,
      label: 'Passed Exams',
      frontColor: '#2563eb', // Blue
      topLabelComponent: () => (
        <Text style={{ color: '#2563eb', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>22</Text>
      ),
    },
    {
      value: 6,
      label: 'Failed Exams',
      frontColor: '#dc2626', // Red
      topLabelComponent: () => (
        <Text style={{ color: '#dc2626', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>6</Text>
      ),
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
          <Text className="text-lg font-bold text-gray-900">Performance Analysis</Text>
        </View>

        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">Analytics</Text>
        </View>
      </View>



      {/* Main Content Area */}
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
                   You need to upgrade to the paid plan to access in-depth performance analysis, charts, and detailed statistics on your passed and failed exams.     
               </Text>
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/subscription')}
              className="w-full h-12 rounded-2xl bg-amber-600 flex-row justify-center items-center mt-2 shadow-sm"
            >
              <Ionicons name="star-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text className="text-xs font-bold text-white uppercase tracking-wider">
                Upgrade to Premium Plan
              </Text>
            </TouchableOpacity>
          </View>
      ):(
        /* UNLOCKED HISTORY LIST (Shown when user IS subscribed) */
        <>

          {/* Top Summary Cards Grid */}
          <View className="flex-row justify-between mb-6">
            {/* Passed Courses Card */}
            <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-200 mr-2 shadow-sm">
              <View className="w-8 h-8 rounded-xl bg-green-50 justify-center items-center mb-2 border border-green-100">
                <Ionicons name="book-outline" size={16} color="#16a34a" />
              </View>
              <Text className="text-2xl font-extrabold text-gray-900">14</Text>
              <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Passed Courses</Text>
            </View>

            {/* Passed Sessions Card */}
            <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-200 mx-1 shadow-sm">
              <View className="w-8 h-8 rounded-xl bg-blue-50 justify-center items-center mb-2 border border-blue-100">
                <Ionicons name="checkmark-circle-outline" size={16} color="#2563eb" />
              </View>
              <Text className="text-2xl font-extrabold text-gray-900">22</Text>
              <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Passed Exams</Text>
            </View>

            {/* Failed Sessions Card */}
            <View className="flex-1 bg-white p-4 rounded-3xl border border-gray-200 ml-2 shadow-sm">
              <View className="w-8 h-8 rounded-xl bg-red-50 justify-center items-center mb-2 border border-red-100">
                <Ionicons name="close-circle-outline" size={16} color="#dc2626" />
              </View>
              <Text className="text-2xl font-extrabold text-gray-900">6</Text>
              <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Failed Exams</Text>
            </View>
          </View>

          {/* BARCHART CONTAINER CARD */}
          <View className="bg-white rounded-3xl p-5 mb-6 border border-gray-200 shadow-sm">
            <View className="mb-6">
              <Text className="text-base font-bold text-gray-900 mb-1">
                Overview Statistics Bar Chart
              </Text>
              <Text className="text-xs text-gray-500">
                Visual comparison between total passed courses, passed test attempts, and failed logs.
              </Text>
            </View>

            {/* Bar Chart Component */}
            <View className="items-center py-2">
              <BarChart
                data={barData}
                barWidth={45}
                noOfSections={4}
                spacing={35}
                roundedTop
                roundedBottom={false}
                hideRules={false}
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisTextStyle={{ color: '#6b7280', fontSize: 10 }}
                xAxisLabelTextStyle={{ color: '#374151', fontSize: 10, fontWeight: '600' }}
                stepValue={6}
                maxValue={24}
                initialSpacing={20}
                isAnimated
              />
            </View>
          </View>

          {/* Detailed Insights Breakdown Box */}
          <View className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-sm">
            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-xl bg-amber-100 justify-center items-center mr-3 mt-0.5">
                <Ionicons name="analytics-outline" size={18} color="#d97706" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-amber-900 mb-1">
                  Performance Summary Tip
                </Text>
                <Text className="text-xs leading-relaxed text-amber-800">
                  You have an overall pass rate of approximately 78.5% across all recorded CBT tests. Keep practicing your weak subjects to improve further!
                </Text>
              </View>
            </View>
          </View>

        </>
      )}
      </ScrollView>



    </SafeAreaView>
  );
}