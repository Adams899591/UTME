import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(100);

  // 1. CHANGE TOTAL TIME HERE:
  // Total time in milliseconds (e.g., 5000ms = 5 seconds)
  const totalLoadingTimeMs = 10000; 
  
  // Total percentage steps (100 down to 0)
  const totalSteps = 100;
  
  // Interval speed calculated dynamically based on total time
  const intervalSpeed = totalLoadingTimeMs / totalSteps;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, intervalSpeed);

    return () => clearInterval(timer);
  }, [intervalSpeed]);

  // Handle navigation safely in a separate effect when countdown hits 0
  useEffect(() => {
    if (countdown === 0) {
      const timeout = setTimeout(() => {
        // router.replace('/login');
        router.replace('/home');
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [countdown, router]);

  return (
    <View className="flex-1 bg-black">
    
      {/* Background Image Asset */}
      <ImageBackground
        source={require('../assets/images/background.png')}
        className="flex-1 justify-center items-center"
        resizeMode="cover"
      >
        {/* Dark Linear Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.65)', 'rgba(0,0,0,0.85)']}
          className="absolute inset-0"
        />

        {/* Minimalist Loading Container */}
        <View className="items-center justify-center p-6">
          
          {/* Circular Loading Indicator with Percentage in Center */}
          <View className="relative w-28 h-28 rounded-full border-4 border-zinc-800 flex items-center justify-center mb-6 shadow-2xl bg-black/40">
            {/* Emerald Progress Ring Effect */}
            <View className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
            
            {/* Percentage Display */}
            <Text className="text-white text-2xl font-extrabold tracking-tighter">
              {countdown}%
            </Text>
          </View>

          {/* Simple Status Text */}
          <Text className="text-zinc-300 text-xs font-semibold tracking-widest uppercase">
            Loading Past Questions...
          </Text>

          {/* Clean Linear Progress Bar */}
          <View className="w-48 h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <View 
              className="h-full bg-emerald-500" 
              style={{ width: `${countdown}%` }} 
            />
          </View>

        </View>
      </ImageBackground>
    </View>
  );
}