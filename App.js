/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PushNotification from 'react-native-push-notification';
import {requestUserPermission} from './src/helper/notificationService';
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const createChannels = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

const handleNotification = () => {
  console.log('1111');
  PushNotification.localNotification({
    channelId: 'channel-id',
    title: 'you click on this item',
    message: 'lalal',
  });
};

const App: () => Node = () => {
  useEffect(() => {
    createChannels();
    requestUserPermission();
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('test');
              handleNotification();
            }}>
            <Text>local notification</Text>
          </TouchableWithoutFeedback>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
