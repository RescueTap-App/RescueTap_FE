import { View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Text } from "@/components/ui/Text";
import { Divider } from "@/components/ui/Divider";

export default function Page() {
  return (
    <View>
      <ScrollView style={{padding: 10}}>
      <View><Text variant={"title1"}>Privacy Policy for
      RescueTap App</Text></View>
      <View><Text variant={"callout"}>Last updated on 20/11/2024</Text></View>
      <Divider></Divider>
      <View>
        <View>
          <Text>RescueTap Ltd is committed to protecting your personal information. This Privacy Policy explains how we
          collect, use, and safeguard information on the RescueTap App.</Text>
        </View>
          <View><Text variant={'heading'}>Welcome to RescueTap!</Text></View>
          <View><Text variant={'body'}>These Terms and Conditions ("Terms") govern your access to and use of the RescueTap mobile application
            ("App") and any related services provided by RescueTap Ltd ("Company," "we," "our," or "us"). By using the
            App, you agree to comply with these Terms. If you disagree with any part, please do not use the App.</Text></View>
          </View>
          <View>
            <Text variant={'subhead'}>1. Information We Collect</Text>
            <Text variant={'body'}>
            Personal Information: This includes your name, phone number, email address, emergency contact details,
              and payment information when you register for and use the App.
              - Location Data: To facilitate emergency response, we collect real-time location information when the App
              is in use.
              - Health Information: In certain cases, we may collect health-related information to facilitate the provision
              of medical services.
            </Text>
          </View>
          <View>
            <Text variant={'subhead'}>2. How We Use Your Information</Text>
            <Text variant={'body'}>
            - To Provide Services: We use your information to enable emergency response services, communicate with
            emergency contacts, and share necessary details with healthcare providers.
            - To Improve App Functionality: We may use anonymized and aggregated data to improve and optimize
            the App.
            - For Communication: With your permission, we may send you alerts, notifications, or marketing
            messages. You can opt out of these communications at any time.</Text>
          </View>

    </ScrollView>
    </View>
  );
}
