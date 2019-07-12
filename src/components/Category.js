import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

class Category extends PureComponent {

  onPress = () => {
    const { onPress, value, title, checked = false, disabled, type } = this.props;
    if(onPress && !disabled) {
      onPress(value, Boolean(checked), title, type);
    }
  }

  render() {
    const { checked, title, disabled } = this.props;
    let color = '#666';
    let textColor = '#666';
    let containerStyle = {};
    let tipStyle = {}
    if(disabled) {
      color = '#666';
      textColor = '#fff';
      containerStyle = {
        borderColor: color,
        backgroundColor: color,
      };
      tipStyle = {
        backgroundColor: '#ccc',
      }
    } else {
      if(checked) {
        color = '#817936'
        containerStyle = {
          borderColor: color,
        };
      }
    }
    return (
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={this.onPress}>
        <Text style={[styles.categoryText, { color: textColor }]}>{title}</Text>
        {
          checked && (
            <View style={[styles.tipView, tipStyle]}>
              <Icon style={styles.tipIcon} name="check" size={12} color="#fff" />
            </View>
          )
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: (width - 10)/4 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#666',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    margin: 5,
    overflow: 'hidden',
  },
  categoryText: {
    color: '#666',
  },
  tipView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -10,
    bottom: 0,
    width: 30,
    backgroundColor: '#817936',
    transform: [{rotate:'-45deg'}]
  },
  tipIcon: {
    transform: [{rotate:'35deg'}]
  }
});

export default Category;