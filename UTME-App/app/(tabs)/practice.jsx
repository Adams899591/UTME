import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserContext } from '../../context/UserContext';
import { UsePracticeStore } from '../../zustand/StorePraticalQuestions';

export default function CourseSelectionScreen({ onStartPractice }) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const setPracticeData = UsePracticeStore((state) => state.setPracticeData);

  // States for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const availableCourses = [
  { id: 'bio', name: 'Biology', icon: 'leaf-outline', description: 'Cellular biology, genetics, and ecology' },
  { id: 'chem', name: 'Chemistry', icon: 'flask-outline', description: 'Organic, inorganic, and physical chemistry' },
  { id: 'phys', name: 'Physics', icon: 'magnet-outline', description: 'Mechanics, thermodynamics, and optics' },
  { id: 'math', name: 'Mathematics', icon: 'calculator-outline', description: 'Algebra, calculus, and trigonometry' },
  { id: 'eng', name: 'English Language', icon: 'book-outline', description: 'Grammar, comprehension, and vocabulary' },
  { id: 'gov', name: 'Government', icon: 'people-outline', description: 'Political systems, democracy, and laws' },
  { id: 'lit', name: 'Literature in English', icon: 'library-outline', description: 'Prose, poetry, and drama analysis' },
  { id: 'econ', name: 'Economics', icon: 'trending-up-outline', description: 'Microeconomics, macroeconomics, and trade' },
  { id: 'acct', name: 'Accounting', icon: 'receipt-outline', description: 'Financial reporting, bookkeeping, and ledgers' },
  { id: 'comm', name: 'Commerce', icon: 'briefcase-outline', description: 'Trade, business organizations, and marketing' },
  { id: 'geog', name: 'Geography', icon: 'earth-outline', description: 'Physical, human, and regional geography' },
  { id: 'insur', name: 'Insurance', icon: 'shield-checkmark-outline', description: 'Risk management, policies, and claims' },
  { id: 'crk', name: 'Christian Religious Knowledge', icon: 'book-half-outline', description: 'Biblical history, teachings, and doctrines' },
  { id: 'irk', name: 'Islamic Religious Knowledge', icon: 'moon-outline', description: 'Islamic history, Quranic teachings, and Hadith' },
  { id: 'civic', name: 'Civic Education', icon: 'ribbon-outline', description: 'Citizenship, human rights, and national values' },
  { id: 'curr', name: 'Current Affairs', icon: 'newspaper-outline', description: 'National and international news, politics, and events' }
  ];
  
  const [selectedCourses, setSelectedCourses] = useState([]); 

  // Function to handle course selection and deselection 
  const handleCourseSelection = (courseName) => {
    // Clear error message when user makes changes
    if (errorMessage) setErrorMessage('');

    if (selectedCourses.includes(courseName)) {
      console.log("Deselecting course:", courseName);
      setSelectedCourses(selectedCourses.filter(c => c !== courseName));
    } else {
      if (selectedCourses.length < 4) {
        console.log("Selecting course:", courseName);
        setSelectedCourses([...selectedCourses, courseName]);
      }
    }
  };

  // This function sends request to laravel backend to fetch practical questions
  const fetchPraticalQuestions = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user/practice/${user.id}`, {
        selectedCourses: selectedCourses
      });

      const res = response.data;

      if (res.status === 'success') {
        console.log(JSON.stringify(res.data, null, 2));
        setPracticeData(res.data, selectedCourses);
        router.push('/screen/overview-screen');
      }
    } catch (error) { 
      if (error.request && !error.response) {
        setErrorMessage(
          'Network Error: Could not connect to the server. Please check your internet connection.'
        );
      } else if (error.response) {
        const apiError = error.response.data?.message || 'Invalid request configuration.';
        setErrorMessage(apiError);
      } else {
        setErrorMessage('An unexpected error occurred during practice setup.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonEnabled = selectedCourses.length > 0 && !isLoading;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Main Container */}
      <ScrollView 
        className="flex-1 pt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
      >
        
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            CBT Simulation
          </Text>
          <Text className="text-2xl font-bold text-gray-900 mt-0.5">
            Select Practice Courses
          </Text>
          <Text className="text-xs text-gray-500 mt-1 leading-[18px]">
            Choose up to 4 subjects you want to practice for your upcoming examination.
          </Text>
        </View>

        {/* Error Message Banner Section */}
        {errorMessage ? (
          <View className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3.5 flex-row items-center">
            <Ionicons name="alert-circle-outline" size={20} color="#dc2626" style={{ marginRight: 8 }} />
            <Text className="text-xs text-red-700 flex-1 font-medium leading-relaxed">
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* Counter Badge */}
        <View className="mb-4 flex-row justify-between items-center">
          <Text className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Available Subjects
          </Text>
          <View className="bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
            <Text className="text-xs font-bold text-green-600">
              {selectedCourses.length} of 4 Selected
            </Text>
          </View>
        </View>
        
        {/* Course Cards List */}
        <View>
          {availableCourses.map((course) => {
            const isSelected = selectedCourses.includes(course.name);
            return (
              <TouchableOpacity
                key={course.id}
                activeOpacity={0.8}
                onPress={() => handleCourseSelection(course.name)}
                className={`flex-row items-center justify-between p-4 rounded-2xl border-[1.5px] mb-3 ${
                  isSelected 
                    ? 'bg-green-50 border-green-600' 
                    : 'bg-stone-50 border-stone-200/60'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  <View 
                    className={`w-11 h-11 rounded-xl justify-center items-center mr-3.5 ${
                      isSelected ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <Ionicons 
                      name={course.icon} 
                      size={22} 
                      color={isSelected ? '#ffffff' : '#4b5563'} 
                    />
                  </View>
                  <View className="flex-1">
                    <Text 
                      className={`text-base font-bold ${
                        isSelected ? 'text-green-900' : 'text-gray-800'
                      }`}
                    >
                      {course.name}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
                      {course.description}
                    </Text>
                  </View>
                </View>
                
                {/* Selection Checkbox Ring */}
                <View 
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    isSelected 
                      ? 'bg-green-600 border-green-600' 
                      : 'bg-transparent border-gray-300'
                  }`}
                >
                  {isSelected && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <TouchableOpacity
          activeOpacity={isButtonEnabled ? 0.8 : 1}
          disabled={!isButtonEnabled}
          onPress={() => {
            if (isButtonEnabled) {
              if (onStartPractice) {
                onStartPractice(selectedCourses);
              } else {
                fetchPraticalQuestions();
              }
            }
          }}
          className={`w-full h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-green-600/20 ${
            isButtonEnabled ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Ionicons 
                name="play-circle-outline" 
                size={20} 
                color="#ffffff" 
                style={{ marginRight: 8, opacity: isButtonEnabled ? 1 : 0.7 }} 
              />
              <Text className="text-base font-bold text-white">
                {selectedCourses.length > 0
                  ? `Start Practice (${selectedCourses.length} Subject${selectedCourses.length > 1 ? 's' : ''})` 
                  : 'Select at least 1 course to start'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
