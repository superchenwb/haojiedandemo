import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SelectInput extends PureComponent {

  onPress = () => {
    const { onChange, currentIndex } = this.props;
    if(onChange) {
      onChange(currentIndex);
    }
  }

  render() {
    const { placeholder, value } = this.props;
    const style = value ? styles.value : styles.placeholder
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={styles.right}>
          <Text style={style}>{value || placeholder}</Text>
        </View>
        <View style={styles.left}>
          {
            !value ? <Text style={styles.tips}>请选择</Text> : null
          }
          <Icon name="arrow-right" size={12} color="#ccc" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  right: {
    flex: 1,
  },
  value: {
    color: '#817936',
  },
  placeholder: {
    color: '#ccc',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    color: '#ccc',
  },
});

export default SelectInput;