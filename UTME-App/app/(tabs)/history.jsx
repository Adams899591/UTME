import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export default function CBTHistoryScreen() {  
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [examHistoryList, setExamHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.payment_status === 'paid') {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [user]);

  // Helper function to format seconds into mm:ss or readable format
  const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return '0m 0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Helper function to format date string
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Fetch history from Laravel backend
  useEffect(() => {
    const fetchExamHistory = async () => {
      try { 
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user/exam-history/${user.id}`);
        
        if (response.data.status === 'success') {
          setExamHistoryList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching exam history:', error);
      } finally {
        setIsLoading(false);
      }
    };   

    fetchExamHistory();
  }, []);

  // EARLY RETURN FOR LOADING: This runs completely on its own before rendering the screen layout
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="text-xs text-gray-500 mt-3 font-medium">Loading exam history...</Text>
      </SafeAreaView>
    );
  }

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
        {!isSubscribed ? (
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
                  You need to upgrade to the paid plan to track, view, and analyze your full exam history and past course attempts.
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
       
        ) : (
          <>
            <View className="mb-4">
              <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Previous Attempts & Breakdown
              </Text>
            </View>

            {examHistoryList.length === 0 ? (
              <View className="bg-white rounded-3xl p-6 items-center border border-gray-200 shadow-sm">
                <Text className="text-sm text-gray-500">No exam history recorded yet.</Text>
              </View>
            ) : (
              examHistoryList.map((record) => (
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
                        <Text className="text-xs font-bold text-gray-800">{formatDate(record.created_at)}</Text>
                        <Text className="text-[10px] text-gray-400">Duration: {formatDuration(record.time_spent_seconds)}</Text>
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
                        {record.total_score} / {record.max_score}
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
                            name="book-outline" 
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
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}