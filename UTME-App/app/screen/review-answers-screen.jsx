import React, { useMemo } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UsePracticeStore } from '../../zustand/StorePraticalQuestions'; // Adjust path if needed
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function CBTReviewAnswersScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Pull real data from Zustand
  const { practiceQuestions, currentCourses, userAnswers } = UsePracticeStore();

  // Helper function to unescape unicode characters and format HTML tags safely
  const cleanHtmlContent = (htmlString) => {
    if (!htmlString) return '';
    return htmlString
      .replace(/\\u003C/g, '<')
      .replace(/\\u003E/g, '>')
      .replace(/\\u0026/g, '&')
      .replace(/\\n/g, '<br/>');
  };

  // Flatten all questions from current courses just like you did in the exam screen
  const questions = useMemo(() => {
    let allQs = [];
    currentCourses.forEach((course) => {
      const courseQuestions = practiceQuestions[course] || [];
      const formatted = courseQuestions.map((q) => ({
        ...q,
        subject: course,
      }));
      allQs = [...allQs, ...formatted];
    });
    return allQs;
  }, [practiceQuestions, currentCourses]);

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
            {questions.length} Questions
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {questions.map((item, index) => {
          const userAnswer = (userAnswers[item.id] || '').trim().toLowerCase();
          const correctAnswer = (item.answer || '').trim().toLowerCase();
          const isCorrect = userAnswer && userAnswer === correctAnswer;

          // Format options from Laravel object { a: '...', b: '...' }
          const formattedOptions = item.option 
            ? Object.entries(item.option).map(([key, text]) => ({
                key: key.toUpperCase(),
                originalKey: key.toLowerCase(),
                text: text
              }))
            : [];

          return (
            <View 
              key={item.id || index}
              className="bg-stone-50 border border-stone-200 rounded-3xl p-5 mb-5 shadow-sm"
            >
              {/* Question Header & Subject Badge */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="bg-green-50 px-2.5 py-0.5 rounded-md border border-green-200">
                  <Text className="text-[10px] font-bold text-green-700 uppercase">
                    {item.subject}
                  </Text>
                </View>

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
                    {isCorrect ? 'Correct' : userAnswer ? 'Incorrect' : 'Unanswered'}
                  </Text>
                </View>
              </View>

              {/* Question Text (Rendered cleanly with HTML & Bold Support) */}
              <View className="mb-4">
                <RenderHtml
                  contentWidth={width}
                  source={{ html: cleanHtmlContent(item.question) }}
                  tagsStyles={{
                    body: {
                      fontSize: 16,
                      color: '#111827',
                      lineHeight: 24,
                    },
                    b: {
                      fontWeight: 'bold',
                      color: '#111827',
                    },
                    strong: {
                      fontWeight: 'bold',
                      color: '#111827',
                    }
                  }}
                />
              </View>

              {/* Conditional Question Image (Cleaned for malformed HTTPS URLs) */}
              {item.image ? (
                <View className="mb-4 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <Image 
                    source={{ 
                      uri: item.image.replace('https=>//', 'https://').replace('http=>//', 'http://') 
                    }} 
                    className="w-full h-40"
                    resizeMode="contain"
                  />
                </View>
              ) : null}

              {/* Options Breakdown */}
              <View className="mb-4">
                {formattedOptions.map((opt) => {
                  const isUserPick = userAnswer === opt.originalKey;
                  const isCorrectAnswer = correctAnswer === opt.originalKey;

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
                      key={opt.originalKey}
                      className={`flex-row items-center p-3.5 rounded-2xl border mb-2 ${optionStyle}`}
                    >
                      <View className={`w-7 h-7 rounded-lg justify-center items-center mr-3 ${badgeStyle}`}>
                        <Text className="text-xs font-bold">{opt.key}</Text>
                      </View>
                      <Text className={`text-sm flex-1 font-medium ${textStyle}`}>
                        {opt.text}
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

              {/* Explanation / Solution Box (if available from Laravel) */}
              {item.solution ? (
                <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="bulb-outline" size={16} color="#1d4ed8" style={{ marginRight: 6 }} />
                    <Text className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                      Explanation
                    </Text>
                  </View>
                  <Text className="text-xs text-blue-900 leading-relaxed font-medium">
                    {item.solution}
                  </Text>
                </View>
              ) : null}

              {/* Feedback Summary Footer */}
              <View className="pt-3 border-t border-stone-200 flex-row justify-between items-center">
                <Text className="text-xs font-medium text-gray-500">
                  Your Answer: <Text className="font-bold uppercase text-gray-800">{userAnswer || 'None'}</Text>
                </Text>
                <Text className="text-xs font-medium text-gray-500">
                  Correct Answer: <Text className="font-bold uppercase text-green-600">{item.answer || 'N/A'}</Text>
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}