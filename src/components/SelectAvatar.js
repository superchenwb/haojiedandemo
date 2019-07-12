import React, { PureComponent } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

class SelectAvatar extends PureComponent {

  onPress = () => {
    const { value, onPress } = this.props;
    if(onPress) {
      onPress(value);
    }
  }

  render() {
    const { selected, show, value, title, icon } = this.props;
    if(selected !== value && !show) return null;
    const color = selected && selected === value ? '#817936' : '#ccc'; 
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress} >
        <View style={[styles.imageView, { borderColor: color }]}>
          <Image source={icon} style={styles.image} />
          {
            !show && <View style={styles.changeView}><Text style={styles.changeText}>点击切换</Text></View>
          }
        </View>
        <Text style={{ color }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  imageView: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {

  },
  changeView: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    bottom: 0,
  },
  changeText: {
    color: '#fff',
    fontSize: 12,
  }
});

export default SelectAvatar;