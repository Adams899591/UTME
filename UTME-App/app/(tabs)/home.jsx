import React, { useRef, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; 
const SNAP_OFFSET = CARD_WIDTH + 16; // Card width + margin offset

// Quick action items configuration
const QUICK_ACTIONS = [
  { id: '1', title: 'Practice', icon: 'book-open-outline', library: Ionicons, route: '/practice' },
  { id: '2', title: 'Mock Exam', icon: 'file-text-outline', library: Ionicons, route: '/mock' },
  { id: '3', title: 'Subjects', icon: 'grid-outline', library: Ionicons, route: '/subjects' },
  { id: '4', title: 'Analytics', icon: 'stats-chart-outline', library: Ionicons, route: '/analytics' },
  { id: '5', title: 'Bookmarks', icon: 'bookmark-outline', library: Ionicons, route: '/bookmarks' },
  { id: '6', title: 'Leaderboard', icon: 'trophy-outline', library: Ionicons, route: '/leaderboard' },
  { id: '7', title: 'AI Tutor', icon: 'chatbubbles-outline', library: Ionicons, route: '/ai-tutor' },
  { id: '8', title: 'Settings', icon: 'settings-outline', library: Ionicons, route: '/settings' },
];

// Horizontal bottom promo cards using local assets
const PROMO_CARDS = [
  { id: '1', image: require('../../assets/images/jamb.png') },
  { id: '2', image: require('../../assets/images/waec.png') },
  { id: '3', image: require('../../assets/images/neco.png') },
];

export default function HomeScreen() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  // Smooth Auto-Scroll Timer
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndexRef.current >= PROMO_CARDS.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: false,
        });
        currentIndexRef.current = 0;
      } else {
        currentIndexRef.current += 1;
        flatListRef.current?.scrollToIndex({
          index: currentIndexRef.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  // Render individual promo image card
  const renderPromoCard = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={{ width: CARD_WIDTH }} 
      className="mx-2 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm justify-center items-center"
    >
      <Image
        source={item.image}
        className="w-full h-48"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        className="flex-1 pt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        
        {/* Header: Welcome & Notification Icon */}
        <View className="flex-row justify-between items-center mb-6 px-6">
          <View>
            <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Dashboard
            </Text>
            <Text className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back, Student! 👋
            </Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/notifications')}
            className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 justify-center items-center shadow-sm"
          >
            <Ionicons name="notifications-outline" size={22} color="#16a34a" />
            <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>

        {/* Compact Green Practice Feature Banner Card */}
        <View className="mx-6 bg-green-600 rounded-2xl p-4 mb-6 shadow-lg shadow-green-600/20 relative overflow-hidden">
          <View className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-500/40 rounded-full" />
          
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-3">
              <View className="bg-green-500/60 self-start px-2.5 py-0.5 rounded-full mb-1.5">
                <Text className="text-[10px] font-semibold text-white tracking-wide">
                  CBT READY
                </Text>
              </View>
              <Text className="text-base font-bold text-white mb-0.5">
                Ready to crush your exams?
              </Text>
              <Text className="text-xs text-green-100 mb-3 leading-tight">
                Practice past questions topic by topic or take a full timed mock.
              </Text>
              
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => router.push('/practice')}
                className="bg-white px-4 py-2 rounded-lg self-start shadow-sm"
              >
                <Text className="text-xs font-semibold text-green-700">
                  Start Practice Now
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-14 h-14 bg-green-500/50 rounded-xl justify-center items-center border border-green-400/30">
              <Ionicons name="school-outline" size={28} color="#ffffff" />
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View className="mb-8 px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900 tracking-tight">
              Quick Actions
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {QUICK_ACTIONS.map((item) => {
              const IconComponent = item.library;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => router.push(item.route)}
                  className="w-[22%] items-center mb-5"
                >
                  <View className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 justify-center items-center mb-2 shadow-sm">
                    <IconComponent name={item.icon} size={24} color="#16a34a" />
                  </View>
                  <Text 
                    className="text-xs font-medium text-gray-700 text-center" 
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Dynamic Image Carousel Slider */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-lg font-bold text-gray-900 tracking-tight">
              Tips & Highlights
            </Text>
            <TouchableOpacity>
              <Text className="text-xs font-semibold text-green-600">See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={PROMO_CARDS}
            renderItem={renderPromoCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_OFFSET}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2 - 8,
            }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


