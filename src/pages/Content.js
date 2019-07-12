import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import SelectAvatar from '../components/SelectAvatar';
import SelectCategory from './SelectCategory';


class Content extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selected: '0',
      show: true,
    }
  }

  // 切换角色
  onChangeRole = (value) => {
    const { dispatch, currentRole, selectedTypes, selectedPointArea, yuanchengFeiYong } = this.props;
    if(currentRole !== value && ((JSON.stringify(selectedTypes) !== "{}" && JSON.stringify(selectedTypes) !== '{"0":[]}') || (selectedPointArea && selectedPointArea.length > 0) || yuanchengFeiYong)) {
      Alert.alert(
        '切换服务身份', 
        '切换服务身份需要重新填写类目信息，师傅确认切换', 
        [
          {text: '不切换', onPress: () => {}, style: 'cancel'},
          {text: '切换', onPress: () => {
            this.setState({
              show: !this.state.show,
              selected: value,
            })
            dispatch({
              type: `service/saveCurrentRole`,
              payload: {
                currentRole: value,
              }
            });
          }},
        ],
      );
      return;
    }
    this.setState({
      show: !this.state.show,
      selected: value,
    })
    dispatch({
      type: `service/saveCurrentRole`,
      payload: {
        currentRole: value,
      }
    });
  }

  

  renderRoles = role => {
    const { selected, show } = this.state;
    return (
      <SelectAvatar 
        key={role.id} 
        selected={selected} 
        value={role.id} 
        title={role.title} 
        icon={role.icon}
        show={show}
        onPress={this.onChangeRole} 
      />
    )
  }

  renderForm = () => {
    const { show } = this.state;
    if(show) return  null;
    return (
      <View>
        <SelectCategory />
      </View>
    )
  }

  render() {
    const { roles } = this.props;
    return (
      <ScrollView style={styles.scroll}>
        <View>
          <Text>请选择擅长的服务<Text style={styles.tips}>(最多1个)</Text></Text>
        </View>
        <View style={styles.selectRole}>
          {
            roles.map(this.renderRoles)
          }
        </View>
        {this.renderForm()}
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  selectRole: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  tips: {
    color: '#ccc',
    marginTop: 5,
  },
  
});
const mapStateToProps = ({ service }) => ({
  roles: service.roles,
  currentRole: service.currentRole,
  selectedTypes: service.selectedTypes,
  selectedPointArea: service.selectedPointArea,
  yuanchengFeiYong: service.yuanchengFeiYong,
})

export default connect(mapStateToProps)(Content);