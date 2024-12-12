import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Text } from "@/components/ui/Text";
import { Divider } from "@/components/ui/Divider";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <SafeAreaView className="p-3 flex">
      <ScrollView style={{ padding: 10 }}>
        <Text variant={"title1"}>TERMS AND CONDITIONS</Text>
        <Text variant={"callout"}>Last updated on 20/11/2024</Text>
        <Divider />
        <View>
          <Text variant={"heading"}>Welcome to RescueTap!</Text>
          <Text variant={"body"}>
            These Terms and Conditions ("Terms") govern your access to and use
            of the RescueTap mobile application ("App") and any related services
            provided by RescueTap Ltd ("Company," "we," "our," or "us"). By
            using the App, you agree to comply with these Terms. If you disagree
            with any part, please do not use the App.
          </Text>
        </View>
        <View>
          <Text variant={"subhead"}>1. User Eligibility</Text>
          <View>
            <Text variant={"body"}>- Age Requirement: </Text>
            <Text variant={"body"}>
              You must be at least 18 years of age or the age of majority in
              your jurisdiction to use the App. Users under 18 may only use the
              App with parental or guardian consent.
            </Text>
          </View>
          <View>
            <Text>- Compliance with Laws:</Text>
            <Text>
              {" "}
              You agree to use the App in compliance with all applicable local,
              state, national, and international laws.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>2. Services Provided</Text>
          <Text variant={"body"}>
            - RescueTap provides emergency response services, including but not
            limited to access to ambulances, doctors, paramedics, first aid
            responders, and lab tests.
          </Text>
          <Text>
            {" "}
            - Limitations: RescueTap strives to provide timely access to
            emergency assistance; however, response times, availability, and
            service efficacy depend on several factors outside of our control,
            such as location, network coverage, and the availability of
            third-party responders.
          </Text>
        </View>
        <View>
          <Text variant={"subhead"}>3. Account Registration</Text>
          <View>
            <Text>- Accuracy of Information: </Text>
            <Text>
              You must provide accurate and complete information when creating
              an account on the App. You are responsible for all activities that
              occur under your account.
            </Text>
          </View>
          <View>
            <Text>- Security:</Text>
            <Text>
              The RescueTap App is designed to comply with the highest security
              protocols and standards. However, you are responsible for
              maintaining the confidentiality of your account information,
              including your username and password.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>4. Emergency Contact Feature</Text>
          <View>
            <Text>- Emergency Notifications:</Text>
            <Text>
              {" "}
              By using the emergency contact feature, you consent to share your
              location and other critical details with your designated emergency
              contacts in real-time.
            </Text>
          </View>
          <View>
            <Text>- Accuracy of Emergency Contact Information:</Text>
            <Text>
              {" "}
              Ensure that the contact information of individuals you designate
              is accurate and up-to-date.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>5. User Conduct</Text>
          <View>
            <Text>- Prohibited Uses:</Text>
            <Text>
              You agree not to misuse the App, including (but not limited to)
              interfering with the App’s functioning, attempting unauthorized
              access, or using the App to engage in illegal activities.
            </Text>
          </View>
          <View>
            <Text>- Community Standards: </Text>
            <Text>
              {" "}
              Users are expected to behave respectfully towards emergency
              responders and healthcare professionals they interact with via the
              App.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>6. Third-Party Services</Text>
          <View>
            <Text>- Service Providers: </Text>
            <Text>
              RescueTap may engage third-party service providers to offer
              emergency response and healthcare services. These third parties
              operate independently, and we are not liable for their actions or
              omissions.
            </Text>
          </View>
          <View>
            <Text>- Links to External Websites: </Text>
            <Text>
              {" "}
              Our App may contain links to other websites. We are not
              responsible for the content, privacy policies, or practices of
              such external websites.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>7. Intellectual Property Rights</Text>
          <View>
            <Text className="fw-bold">- Service Providers: </Text>
            <Text>
              RescueTap may engage third-party service providers to offer
              emergency response and healthcare services. These third parties
              operate independently, and we are not liable for their actions or
              omissions.
            </Text>
          </View>
          <View>
            <Text>- Links to External Websites: </Text>
            <Text>
              {" "}
              Our App may contain links to other websites. We are not
              responsible for the content, privacy policies, or practices of
              such external websites.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>8. Limitation of Liability</Text>
          <View>
            <Text className="fw-bold">- Disclaimer of Warranties:</Text>
            <Text>
              The App and its services are provided on an "as-is" and
              "as-available" basis without any warranties of any kind.
            </Text>
          </View>
          <View>
            <Text>- Limitation of Liability: </Text>
            <Text>
              RescueTap shall not be liable for any indirect, incidental,
              special, or consequential damages resulting from your use of the
              App or inability to access emergency services.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>9. Indemnification</Text>
          <Text>
            - You agree to indemnify and hold RescueTap harmless from any
            claims, losses, damages, or expenses arising from your breach of
            these Terms, your use of the App, or your violation of any
            third-party rights.
          </Text>
        </View>
        <View>
          <Text variant={"subhead"}>
            10. Modifications to Terms and Services
          </Text>
          <View>
            <Text className="font-bold">- Changes to Terms: </Text>
            <Text>
              RescueTap reserves the right to modify these Terms at any time.
              Continued use of the App after modifications constitutes your
              acceptance of the updated Terms.
            </Text>
          </View>
          <View>
            <Text>- Service Updates: </Text>
            <Text>
              We may add, modify, or discontinue App features without notice or
              liability.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>11. Termination</Text>
          <View>
            <Text>- Changes to Terms: </Text>
            <Text>
              RescueTap reserves the right to modify these Terms at any time.
              Continued use of the App after modifications constitutes your
              acceptance of the updated Terms.
            </Text>
          </View>
          <View>
            <Text>- Service Updates:</Text>
            <Text>
              We may add, modify, or discontinue App features without notice or
              liability.
            </Text>
          </View>
        </View>
        <View>
          <Text variant={"subhead"}>
            12. Governing Law and Dispute Resolution
          </Text>
          <Text>
            - These Terms shall be governed by and construed in accordance with
            the laws of [Insert Jurisdiction]. Any disputes arising from these
            Terms shall be resolved through arbitration in [Insert Location].
          </Text>
        </View>
        <View>
          <Text variant={"subhead"}>13. Contact Information</Text>
          <Text>
            - For any questions or concerns about these Terms, please contact us
            at [Insert Contact Information].
          </Text>
        </View>
        <View className="px-5">
          <Checkbox checked={true} onPress={() => {}} />
          <Button variant={"destructive"} onPress={() => {}} size="lg">
            {" "}
            Accept & Continue{" "}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
