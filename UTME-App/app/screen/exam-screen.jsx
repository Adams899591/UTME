import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UsePracticeStore } from '../../zustand/StorePraticalQuestions'; // Adjust path if needed
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function CBTExamScreen() {
  const { user, setUser } = useContext(UserContext);
   const insets = useSafeAreaInsets();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  // Pull data and actions from Zustand store
  const { practiceQuestions, currentCourses, userAnswers, setUserAnswer, startTime } = UsePracticeStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.payment_status === 'paid') {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [user]);


  // Helper function to unescape unicode characters and format HTML tags safely
  const cleanHtmlContent = (htmlString) => {
    if (!htmlString) return '';
    return htmlString
      .replace(/\\u003C/g, '<')
      .replace(/\\u003E/g, '>')
      .replace(/\\u0026/g, '&')
      .replace(/\\n/g, '<br/>');
  };

  // 1. Flatten questions from the grouped Zustand object into a single array for pagination
  const questions = React.useMemo(() => {
    let allQs = [];
    currentCourses.forEach((course) => {
      const courseQuestions = practiceQuestions[course] || [];
      // Attach the course name to each question so we know its subject badge
      const formatted = courseQuestions.map((q) => ({
        ...q,
        subject: course,
      }));
      allQs = [...allQs, ...formatted];
    });
    return allQs;
  }, [practiceQuestions, currentCourses]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question dynamically

  // Core submission function that can be triggered by user action or auto-timeout
  const submitExam = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    console.log("Submitting exam and navigating to results...");
    try {
      // Calculate duration and compile exam data payload for Laravel
      const timeSpentSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      
      // Compute metrics required for Laravel history log
      let totalScore = 0;
      let totalQuestionsCount = questions.length;
      const subjectsMap = {};

      currentCourses.forEach((course) => {
        subjectsMap[course] = { name: course, score: 0, total: 0 };
      });

      questions.forEach((q) => {
        if (!subjectsMap[q.subject]) {
          subjectsMap[q.subject] = { name: q.subject, score: 0, total: 0 };
        }
        subjectsMap[q.subject].total += 1;

        const userAnswer = userAnswers[q.id];
        const correctAnswer = (q.answer || q.correctAnswer || q.correct || '').trim().toLowerCase();
        const formattedUserAnswer = (userAnswer || '').trim().toLowerCase();

        if (formattedUserAnswer && formattedUserAnswer === correctAnswer) {
          totalScore += 1;
          subjectsMap[q.subject].score += 1;
        }
      });

      const totalPercentage = totalQuestionsCount > 0 ? Math.round((totalScore / totalQuestionsCount) * 100) : 0;
 
      if (isSubscribed) {  // only send response to laravel only if the user has paid

          await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user/save-exam-history/${user.id}`, {
            totalScore: totalScore,
            maxScore: totalQuestionsCount,
            percentage: totalPercentage,
            passed: totalPercentage >= 50,
            timeSpentSeconds,
            subjects: Object.values(subjectsMap),
            userAnswers: userAnswers,
          });

      }
      
      router.replace('/screen/result-screen');
    } catch (error) {
      console.log("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  // Safety check if questions array is empty
  if (questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={48} color="#dc2626" />
        <Text className="text-lg font-bold text-gray-800 mt-3 text-center">No Questions Found</Text>
        <Text className="text-xs text-gray-500 mt-1 text-center mb-6">
          Please go back and select your courses to begin practice.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-green-600 px-6 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentQuestion.id];

  // Format options object from Laravel (e.g. { a: '...', b: '...' }) into an array for mapping
  const formattedOptions = currentQuestion.option 
    ? Object.entries(currentQuestion.option).map(([key, text]) => ({
        key: key.toUpperCase(),
        originalKey: key,
        text: text
      }))
    : [];

  // Countdown Timer Effect & Auto-Submit on Timeout
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionKey) => {
    // Save directly to Zustand store state
    setUserAnswer(currentQuestion.id, optionKey);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await submitExam();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Check if timer is below 5 minutes (300 seconds)
  const isTimeLow = timeLeft < 300;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header Bar with Subject & Timer */}
      <View className="px-6 py-3 flex-row justify-between items-center border-b border-gray-100">
        <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Text className="text-xs font-bold text-green-700">
            {currentQuestion.subject}
          </Text>
        </View>

        {/* Timer Counter (Turns red when under 5 minutes) */}
        <View className={`flex-row items-center px-3 py-1.5 rounded-xl border ${
          isTimeLow ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
        }`}>
          <Ionicons 
            name="time-outline" 
            size={16} 
            color={isTimeLow ? "#dc2626" : "#16a34a"} 
            style={{ marginRight: 6 }} 
          />
          <Text className={`text-xs font-bold tracking-wider ${
            isTimeLow ? 'text-red-600' : 'text-gray-800'
          }`}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Question Counter & Section Header */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Question {currentIndex + 1} of {questions.length}
          </Text>

          {/* Conditional Section Badge */}
          {currentQuestion.section ? (
            <View className="bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              <Text className="text-[10px] font-bold text-blue-700 uppercase">
                {currentQuestion.section}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Question Text (Rendered cleanly with HTML & Bold Support) */}
        <View className="mb-4">
          <RenderHtml
            contentWidth={width}
            source={{ html: cleanHtmlContent(currentQuestion.question) }}
            tagsStyles={{
              body: {
                fontSize: 18,
                color: '#111827',
                lineHeight: 28,
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
        {currentQuestion.image ? (
          <View className="mb-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image 
              source={{ 
                uri: currentQuestion.image.replace('https=>//', 'https://').replace('http=>//', 'http://') 
              }} 
              className="w-full h-48"
              resizeMode="contain"
            />
          </View>
        ) : null}

        {/* Options List */}
        <View>
          {formattedOptions.map((option) => {
            const isSelected = selectedOption === option.originalKey;
            return (
              <TouchableOpacity
                key={option.originalKey}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(option.originalKey)}
                className={`flex-row items-center p-4 rounded-2xl border mb-3 ${
                  isSelected 
                    ? 'bg-green-50 border-green-600' 
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                {/* Option Badge (A, B, C, D) */}
                <View 
                  className={`w-9 h-9 rounded-xl justify-center items-center mr-3.5 ${
                    isSelected ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <Text 
                    className={`text-sm font-bold uppercase ${
                      isSelected ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {option.key}
                  </Text>
                </View>

                {/* Option Text */}
                <Text 
                  className={`text-sm font-medium flex-1 ${
                    isSelected ? 'text-green-900 font-semibold' : 'text-gray-800'
                  }`}
                >
                  {option.text}
                </Text>

                {/* Selection Check Ring */}
                <View 
                  className={`w-5 h-5 rounded-full border items-center justify-center ml-2 ${
                    isSelected 
                      ? 'bg-green-600 border-green-600' 
                      : 'bg-transparent border-gray-300'
                  }`}
                >
                  {isSelected && <Ionicons name="checkmark" size={12} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View 
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
       className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex-row justify-between items-center z-50">
        <TouchableOpacity
          activeOpacity={currentIndex > 0 ? 0.8 : 1}
          disabled={currentIndex === 0 || isSubmitting}
          onPress={handlePrevious}
          className={`px-5 h-12 rounded-2xl flex-row items-center border border-gray-200 ${
            currentIndex === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <Ionicons name="arrow-back-outline" size={18} color={currentIndex === 0 ? "#9ca3af" : "#374151"} style={{ marginRight: 6 }} />
          <Text className={`text-sm font-semibold ${currentIndex === 0 ? 'text-gray-400' : 'text-gray-700'}`}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isSubmitting}
          onPress={handleNext}
          className="flex-1 ml-4 h-12 rounded-2xl bg-green-600 flex-row justify-center items-center"
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Text className="text-sm font-bold text-white mr-2">
                {currentIndex === questions.length - 1 ? 'Submit Exam' : 'Next Question'}
              </Text>
              <Ionicons 
                name={currentIndex === questions.length - 1 ? 'checkmark-circle-outline' : 'arrow-forward-outline'} 
                size={18} 
                color="#ffffff" 
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}








