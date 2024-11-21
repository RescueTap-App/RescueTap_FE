import { View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Text } from "@/components/ui/Text";
import { Divider } from "@/components/ui/Divider";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

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
          <View>
            <Text variant={'subhead'}>3. How We Protect Your Information</Text>
            <Text variant={'body'}>
            Data Encryption: We use encryption to protect sensitive data, including personal information, health
            data, and location information.
            - Access Control: Only authorized personnel and third-party service providers have access to sensitive
            information.
            - Secure Storage: All data is stored on secure servers in compliance with industry standards and relevant
            regulations.</Text>
          </View>
          <View>
            <Text variant={'subhead'}>4. Sharing of Information</Text>
            <Text variant={'body'}>
            - Emergency Responders and Healthcare Providers: When needed, we share necessary information with
            healthcare professionals and emergency responders.
            - Third-Party Service Providers: We may share information with trusted partners who perform services on
            our behalf, such as data hosting and analytics. These providers are contractually bound to confidentiality
            and data protection standards.
            - Legal Requirements: We may disclose information if required by law or to protect the rights, property, or
            safety of our users and RescueTap.</Text>
          </View>
          <View>
            <Text variant={'subhead'}>5. User Rights and Choices</Text>
            <Text variant={'body'}>
            - Access and Correction: You may access and update your personal information through the App.
            - Data Retention: We retain personal data as long as necessary to fulfill the purposes outlined in this policy
            or as required by law.
            - Deletion: You may request deletion of your account and personal data. We will comply unless retention is
            required for legal or business purposes.</Text>
          </View>
          <View>
            <Text variant={'subhead'}>   6. Children’s Privacy</Text>
            <Text variant={'body'}>
            - RescueTap is not intended for users under the age of 18. We do not knowingly collect personal
              information from children.</Text>
          </View>
          <View>
            <Text variant={'subhead'}>7. Cookies and Tracking 
            Technologies</Text>
            <Text variant={'body'}>
            - We use cookies and similar technologies to enhance user experience, track usage patterns, and optimize
            functionality. You can manage cookie preferences through your device settings.</Text>
          </View>
          <View>
            <Text variant={'subhead'}>8. Contact Us</Text>
            <Text variant={'body'}>
            - For questions or concerns about this Privacy Policy, please contact us at [Insert Contact Information].
            By using the RescueTap App, you agree to these policies and our commitment to safeguarding your data.</Text>
          </View>
          <View className="px-5">
          <Checkbox checked={true} onPress={()=>{}}/><Button variant={'destructive'} onPress={()=>{}} size='lg'> Accept & Continue </Button>
        </View>
    </ScrollView>
    </View>
  );
}
