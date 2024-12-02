import React from "react";
import { View, Image, Dimensions, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { cn } from "@/lib/cn";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Instant Help at Your Fingertips",
    description:
      "Send emergency messages with a single tap to your trusted contacts. Help is just one button away!",
    image: require("@/assets/images/onboarding/img00.png"),
  },
  {
    title: "Scan & Verify for Safe Rides",
    description:
      "Quickly scan a car's QR code to check the driver's details and vehicle information for your safety.",
    image: require("@/assets/images/onboarding/img01.png"),
  },
  {
    title: "Your Safety is Our Priority",
    description:
      "Stay connected to your loved ones and feel confident when traveling with real-time emergency support",
    image: require("@/assets/images/onboarding/img02.png"),
  },
];

export default function Onboarding() {
  const router = useRouter();
  const { setHasSeenOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const handlePickIndex = (index: number) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollRef.current?.scrollTo({
        x: width * (currentIndex - 1),
        animated: true,
      });
    }
  };

  const handleGetStarted = async () => {
    await setHasSeenOnboarding(true);
    router.replace("/(auth)/signup");
  };

  if (showSplash) {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className="flex-1 bg-white items-center justify-center"
      >
        <Image
          source={require("@/assets/images/rescue-tap-logo.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        className="flex-1"
      >
        {onboardingData.map((item, index) => (
          <Animated.View
            key={index}
            entering={SlideInRight}
            exiting={SlideOutLeft}
            className="w-screen flex-1"
          >
            <View className="flex-1 flex items-center justify-center px-6">
              <Pressable onPress={handleGetStarted} className="w-full mb-8">
                <Text className="font-bold text-right">Skip</Text>
              </Pressable>
              <Image
                source={item.image}
                className="w-[96%] aspect-square mb-8 bg-gray-200 rounded-lg overflow-hidden"
                resizeMode="cover"
              />
              <Text className="text-4xl font-black text-center mb-4">
                {item.title}
              </Text>
              <Text className="text-neutral-600 text-xl text-center mb-8">
                {item.description}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center items-center space-x-2 gap-3 mb-8">
        {onboardingData.map((_, index) => (
          <Pressable
            onPress={() => handlePickIndex(index)}
            key={index}
            className={cn(
              "w-3 h-3 rounded-full",
              currentIndex === index ? "bg-primary-base w-6" : "bg-neutral-200"
            )}
          />
        ))}
      </View>

      <View className="px-6 pb-8">
        {currentIndex === onboardingData.length - 1 ? (
          <Button
            className="text-lg"
            variant="default"
            size="lg"
            onPress={handleGetStarted}
          >
            Get Started
          </Button>
        ) : (
          <View className="flex-row justify-between">
            {currentIndex > 0 ? (
              <Button
                variant="outline"
                size="lg"
                onPress={handleBack}
                className="flex-1 mr-2 text-lg"
              >
                Back
              </Button>
            ) : (
              <View className="flex-1 mr-2" />
            )}
            <Button
              variant="default"
              size="lg"
              onPress={handleNext}
              className="flex-1 ml-2 text-lg"
            >
              Next
            </Button>
          </View>
        )}
        <Link href="/(auth)/login" asChild>
          <Pressable className="mt-4">
            <Text className="text-center">
              Already have an account?{" "}
              <Text className="text-blue-300 font-semibold">Sign in</Text>
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
