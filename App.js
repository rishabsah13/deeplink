import React, { useState, useEffect } from 'react';
import { View, Button, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [showWebView, setShowWebView] = useState(false);

  const handleButtonClick = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigation = (event) => {
    const { url } = event;

    if (url.includes('myapp://redirect')) {
      Alert.alert('Redirect', 'Returning to the app!');
      setShowWebView(false);
    }
  };

  const handleRedirectButtonClick = () => {
    // Open the website in the device's default browser
    Linking.openURL('https://www.dmifinance.in');
  };

  useEffect(() => {
    // Add event listener to handle deep links from the website
    Linking.addEventListener('url', handleDeepLink);

    // Clean up the event listener on component unmount
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handleDeepLink = (event) => {
    const { url } = event;

    if (url.includes('myapp://redirect')) {
      Alert.alert('Redirect', 'Returning to the app!');
      setShowWebView(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? (
        <WebView
        source={require('./assets/index.html')}
        onNavigationStateChange={handleWebViewNavigation}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Open My Website" onPress={handleButtonClick} />
        </View>
      )}
    </View>
  );
}
