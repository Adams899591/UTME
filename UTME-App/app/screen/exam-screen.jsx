import React, { useState, useEffect } from 'react';
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

export default function CBTExamScreen() {
  const router = useRouter();
  
  // Expanded Mock questions featuring question 3 with an image and question 4 with a section
  const questions = [
    {
      id: 1,
      subject: 'Biology',
      question: 'Which of the following cellular organelles is primarily responsible for the production of ATP through cellular respiration?',
      options: [
        { key: 'A', text: 'Ribosome' },
        { key: 'B', text: 'Mitochondrion' },
        { key: 'C', text: 'Endoplasmic Reticulum' },
        { key: 'D', text: 'Golgi Apparatus' },
      ],
      correctAnswer: 'B',
      section: '',
      image: '',
    },
    {
      id: 2,
      subject: 'Biology',
      question: 'What is the primary pigment responsible for photosynthesis in green plants?',
      options: [
        { key: 'A', text: 'Carotenoid' },
        { key: 'B', text: 'Xanthophyll' },
        { key: 'C', text: 'Chlorophyll' },
        { key: 'D', text: 'Anthocyanin' },
      ],
      correctAnswer: 'C',
      section: '',
      image: '',
    },
    {
      id: 3,
      subject: 'Physics',
      question: 'Based on the experimental setup shown below, what is the reading on the spring balance?',
      options: [
        { key: 'A', text: '5.0 N' },
        { key: 'B', text: '10.5 N' },
        { key: 'C', text: '12.2 N' },
        { key: 'D', text: '15.0 N' },
      ],
      correctAnswer: 'B',
      section: 'Mechanics & Forces',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', // Example placeholder image URL returned from API
    },
    {
      id: 4,
      subject: 'Civic Education',
      question: 'One of the following is considered a formal social group in sociology.',
      options: [
        { key: 'a', text: 'Dangote group of companies' },
        { key: 'b', text: 'Rotary Club' },
        { key: 'c', text: 'Millian group' },
        { key: 'd', text: 'Human Right Africa' },
      ],
      correctAnswer: 'c',
      section: 'Citizenship & Human Relations',
      image: '',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour timer in seconds

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Attempting to navigate to results...");
      try {
        router.replace('/screen/result-screen');
      } catch (error) {
        console.log("Navigation error:", error);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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

        {/* Timer Counter */}
        <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
          <Ionicons name="time-outline" size={16} color="#16a34a" style={{ marginRight: 6 }} />
          <Text className="text-xs font-bold text-gray-800 tracking-wider">
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

          {/* Conditional Section Badge (Displayed if section exists) */}
          {currentQuestion.section ? (
            <View className="bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              <Text className="text-[10px] font-bold text-blue-700 uppercase">
                {currentQuestion.section}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Question Text */}
        <Text className="text-lg font-bold text-gray-900 leading-relaxed mb-4">
          {currentQuestion.question}
        </Text>

        {/* Conditional Question Image (Displayed if API returns an image URL) */}
        {currentQuestion.image ? (
          <View className="mb-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image 
              source={{ uri: currentQuestion.image }} 
              className="w-full h-48"
              resizeMode="contain"
            />
          </View>
        ) : null}

        {/* Options List (A, B, C, D) */}
        <View>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(option.key)}
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
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex-row justify-between items-center z-50">
        <TouchableOpacity
          activeOpacity={currentIndex > 0 ? 0.8 : 1}
          disabled={currentIndex === 0}
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
          onPress={handleNext}
          className="flex-1 ml-4 h-12 rounded-2xl bg-green-600 flex-row justify-center items-center"
        >
          <Text className="text-sm font-bold text-white mr-2">
            {currentIndex === questions.length - 1 ? 'Submit Exam' : 'Next Question'}
          </Text>
          <Ionicons 
            name={currentIndex === questions.length - 1 ? 'checkmark-circle-outline' : 'arrow-forward-outline'} 
            size={18} 
            color="#ffffff" 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

