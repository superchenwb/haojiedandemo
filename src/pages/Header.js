import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';


class Header extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.step}>
          <Text>实名认证</Text>
        </View>
        <View style={styles.step}>
          <Text>选择服务</Text>
        </View>
        <View style={styles.step}>
          <Text>入驻成功</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 100,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 10,
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },  
});

export default Header;