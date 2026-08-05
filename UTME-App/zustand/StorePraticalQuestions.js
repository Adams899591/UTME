// import { create } from 'zustand';

// export const UsePracticeStore = create((set) => ({
//   // State
//   practiceQuestions: {},
//   currentCourses: [],

//   // Actions
//   setPracticeData: (data, courses) => set({ 
//     practiceQuestions: data, 
//     currentCourses: courses 
//   }),

//   // Optional: Clear data when ending the practice session
//   clearPracticeData: () => set({ 
//     practiceQuestions: {}, 
//     currentCourses: [] 
//   }),
// }));



import { create } from 'zustand';

export const UsePracticeStore = create((set) => ({
  // State
  practiceQuestions: {},
  currentCourses: [],
  userAnswers: {}, // Stores user answers like { questionId: 'A' }

  // Actions
  setPracticeData: (data, courses) => set({ 
    practiceQuestions: data, 
    currentCourses: courses,
    userAnswers: {} // Reset answers on new session
  }),

  // Action to save/update selected answer for a specific question ID
  setUserAnswer: (questionId, optionKey) => set((state) => ({
    userAnswers: {
      ...state.userAnswers,
      [questionId]: optionKey
    }
  })),

  // Clear data when ending the practice session
  clearPracticeData: () => set({ 
    practiceQuestions: {}, 
    currentCourses: [],
    userAnswers: {} 
  }),
}));