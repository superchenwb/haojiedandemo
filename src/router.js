/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from './pages/Header';
import Content from './pages/Content';
import Footer from './components/Footer';

export default class Router extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Content />
        <Footer onPressPrevious={() => {}} onPressNext={() => {}} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
