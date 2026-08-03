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

export default function CBTReviewAnswersScreen() {
  const router = useRouter();

  // Mock API response structure based on your format
  const reviewedQuestions = [
    {
      id: 1,
      question: '25cm3 of a gas X contains Z molecules at 150C and 75mmHg. How many molecules will 25cm3 of another gas Y contain at the same temperature and pressure?',
      option: {
        a: '2Y',
        b: '2Z',
        c: 'Z',
        d: 'Y'
      },
      answer: 'c', // Correct option key
      userSelected: 'c', // Option selected by the user
    },
    {
      id: 2,
      question: 'Which of the following cellular organelles is primarily responsible for the production of ATP through cellular respiration?',
      option: {
        a: 'Ribosome',
        b: 'Mitochondrion',
        c: 'Endoplasmic Reticulum',
        d: 'Golgi Apparatus'
      },
      answer: 'b',
      userSelected: 'a', // Incorrectly picked 'a'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-9 h-9 rounded-xl bg-gray-100 justify-center items-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Review Answers</Text>
        </View>

        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">
            {reviewedQuestions.length} Questions
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {reviewedQuestions.map((item, index) => {
          const isCorrect = item.userSelected === item.answer;

          return (
            <View 
              key={item.id}
              className="bg-stone-50 border border-stone-200 rounded-3xl p-5 mb-5 shadow-sm"
            >
              {/* Question Header Status */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Question {index + 1}
                </Text>
                <View className={`flex-row items-center px-2.5 py-1 rounded-full border ${
                  isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <Ionicons 
                    name={isCorrect ? 'checkmark-circle' : 'close-circle'} 
                    size={14} 
                    color={isCorrect ? '#16a34a' : '#dc2626'} 
                    style={{ marginRight: 4 }}
                  />
                  <Text className={`text-xs font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </Text>
                </View>
              </View>

              {/* Question Text */}
              <Text className="text-base font-bold text-gray-900 leading-relaxed mb-4">
                {item.question}
              </Text>

              {/* Options Breakdown */}
              <View className="space-y-2 mb-4">
                {Object.entries(item.option).map(([key, text]) => {
                  const optionKeyLower = key.toLowerCase();
                  const isUserPick = item.userSelected === optionKeyLower;
                  const isCorrectAnswer = item.answer === optionKeyLower;

                  let optionStyle = 'bg-white border-stone-200';
                  let badgeStyle = 'bg-gray-200 text-gray-700';
                  let textStyle = 'text-gray-800';

                  if (isCorrectAnswer) {
                    optionStyle = 'bg-green-50 border-green-500';
                    badgeStyle = 'bg-green-600 text-white';
                    textStyle = 'text-green-900 font-semibold';
                  } else if (isUserPick && !isCorrectAnswer) {
                    optionStyle = 'bg-red-50 border-red-400';
                    badgeStyle = 'bg-red-500 text-white';
                    textStyle = 'text-red-900 font-semibold';
                  }

                  return (
                    <View
                      key={key}
                      className={`flex-row items-center p-3.5 rounded-2xl border mb-2 ${optionStyle}`}
                    >
                      <View className={`w-7 h-7 rounded-lg justify-center items-center mr-3 ${badgeStyle}`}>
                        <Text className="text-xs font-bold">{key.toUpperCase()}</Text>
                      </View>
                      <Text className={`text-sm flex-1 font-medium ${textStyle}`}>
                        {text}
                      </Text>
                      
                      {isCorrectAnswer && (
                        <Ionicons name="checkmark-sharp" size={16} color="#16a34a" />
                      )}
                      {isUserPick && !isCorrectAnswer && (
                        <Ionicons name="close-sharp" size={16} color="#dc2626" />
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Feedback Summary Footer */}
              <View className="pt-3 border-t border-stone-200 flex-row justify-between items-center">
                <Text className="text-xs font-medium text-gray-500">
                  Your Answer: <Text className="font-bold uppercase text-gray-800">{item.userSelected || 'None'}</Text>
                </Text>
                <Text className="text-xs font-medium text-gray-500">
                  Correct Answer: <Text className="font-bold uppercase text-green-600">{item.answer}</Text>
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}