import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


class Footer extends PureComponent {
  render() {
    const { previousText = '上一步', onPressPrevious, nextText = '下一步', onPressNext } = this.props;
    return (
      <View style={styles.container}>
        {
          Boolean(onPressPrevious) && (
            <TouchableOpacity style={styles.previous} onPress={onPressPrevious}>
              <Text style={styles.previousText}>{previousText}</Text>
            </TouchableOpacity>
          )
        }
        {
          Boolean(onPressNext) && (
            <TouchableOpacity style={styles.next} onPress={onPressNext}>
              <Text style={styles.nextText}>{nextText}</Text>
            </TouchableOpacity>
          )
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 45,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#817936',
  },
  previous: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousText: {
    color: '#817936',
  },
  next: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#817936',
  },
  nextText: {
    color: '#ffffff',
  }
});

export default Footer;