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



// import { create } from 'zustand';

// export const UsePracticeStore = create((set) => ({
//   // State
//   practiceQuestions: {},
//   currentCourses: [],
//   userAnswers: {}, // Stores user answers like { questionId: 'A' }
//   startTime: null, // <-- Add this


//   // Actions
//   setPracticeData: (data, courses) => set({ 
//     practiceQuestions: data, 
//     currentCourses: courses,
//     userAnswers: {} // Reset answers on new session
//     startTime: Date.now() // <-- Capture start time here
//   }),

//   // Action to save/update selected answer for a specific question ID
//   setUserAnswer: (questionId, optionKey) => set((state) => ({
//     userAnswers: {
//       ...state.userAnswers,
//       [questionId]: optionKey
//     }
//   })),

//   // Clear data when ending the practice session
//   clearPracticeData: () => set({ 
//     practiceQuestions: {}, 
//     currentCourses: [],
//     userAnswers: {} ,
//     startTime: null // Reset start time
//   }),
// }));






import { create } from 'zustand';

export const UsePracticeStore = create((set) => ({
  practiceQuestions: {},
  currentCourses: [],
  userAnswers: {},
  startTime: null,

  setPracticeData: (data, courses) => set({ 
    practiceQuestions: data, 
    currentCourses: courses,
    userAnswers: {},
    startTime: Date.now()
  }),

  setUserAnswer: (questionId, optionKey) => set((state) => ({
    userAnswers: {
      ...state.userAnswers,
      [questionId]: optionKey
    }
  })),

  clearPracticeData: () => set({ 
    practiceQuestions: {}, 
    currentCourses: [],
    userAnswers: {},
    startTime: null
  }),
}));