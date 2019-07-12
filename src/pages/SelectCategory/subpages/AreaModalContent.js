import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Category from '../../../components/Category';
import Footer from '../../../components/Footer';

// 用于多选框选中，取消功能，返回一个新的对象
const checkedConversion = (array, checkedId, title) => {
  let newArray = [ ...array ];
  let deleteIndex;
  let exist = newArray.some((item, index) => {
    if(item.id === checkedId) {
      deleteIndex = index;
    }
    return item.id === checkedId;
  });
  if(exist) {
    newArray.splice(deleteIndex, 1);
  } else {
    newArray.push({ id: checkedId, title })
  }
  return newArray;
}

/**
 * 服务区域选择组件
 */
class AreaModalContent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: '',
      selectedPointArea: props.selectedPointArea,
      selectedOtherArea: props.selectedOtherArea,
    }
  }

  finishedAndClose = () => {
    const finished = this.finished();
    if(finished) {
      this.closeModal();
    }
  }

  // 完成
  finished = () => {
    const { selectedPointArea, selectedOtherArea } = this.state;
    const { dispatch } = this.props;
    if(!(selectedPointArea && selectedPointArea.length > 0)) {
      Alert.alert('提示', '请选择重点服务区域')
      return;
    }
    
    dispatch({
      type: `service/saveSelectedArea`,
      payload: {
        selectedPointArea,
        selectedOtherArea,
      }
    });
    
    return true;
  }

  // 选择服务类型
  onChange = (value, checked, title, type) => {
    const { dispatch } = this.props;
    const { selectedPointArea, selectedOtherArea } = this.state;
    if(type === 'point') {
      const newSlectedPointArea = checkedConversion(selectedPointArea, value, title);
      // 不能超过三个,超过则删除第一个
      if(newSlectedPointArea.length > 3) {
        newSlectedPointArea.shift();
      }
      let newSlectedOtherArea = [];
      // 选中时需要清除在其他服务区域选中的数据
      selectedOtherArea.forEach(otherArea => {
        if(!newSlectedPointArea.some(pointArea => otherArea.id === pointArea.id)) {
          newSlectedOtherArea.push(otherArea);
        }
      })
      this.setState({
        selectedPointArea: newSlectedPointArea,
        selectedOtherArea: newSlectedOtherArea,
      })
    } else {
      const newSlectedOtherArea = checkedConversion(selectedOtherArea, value, title);
      this.setState({
        selectedOtherArea: newSlectedOtherArea,
      })
    }
  }

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  renderArea = (category, type) => {
    const { selectedPointArea, selectedOtherArea } = this.state;
    const selectedList = type === 'point' ? selectedPointArea : selectedOtherArea;
    const checked = selectedList.some(item => item.id === category.id);
    return (
      <Category 
        key={category.id} 
        checked={checked}
        value={category.id} 
        title={category.title}
        type={type}
        onPress={this.onChange}
      />
    )
  }

  renderMainArea = () => {
    return (
      <View>
        <View style={styles.typeView}>
          <Text style={styles.headerText}>核心服务区域</Text>
        </View>
        <View style={styles.changeCategoryView}>
          
          <Category
            checked={true} 
            value={0} 
            title="汉阳区"
          />
          <View style={styles.changeCategoryBox}>
            <Text style={styles.cleanText}>
              如需修改，请先修改所在地址
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderPointArea = () => {
    const { areaList } = this.props;
    return (
      <View>
        <View style={styles.typeView}>
          <Text style={styles.headerText}>
            重点服务区域
          <Text style={styles.cleanText}>
            (可选三个)
          </Text>
          </Text>
        </View>
        <View style={styles.categoryList}>
          {
            areaList.map(item => this.renderArea(item, 'point'))
          }
        </View>
      </View>
    )
  }

  renderOtherArea = () => {
    const { selectedPointArea } = this.state;
    const { otherAreaList } = this.props;
    let list = otherAreaList;
    if(selectedPointArea && selectedPointArea.length > 0) {
      list = otherAreaList.filter(item => {
        const exist = selectedPointArea.some(item2 => item2.id === item.id);
        return !exist;
      })
    }
    return (
      <View>
        <View style={styles.typeView}>
          <Text style={styles.headerText}>
            其他服务区域
          <Text style={styles.cleanText}>
            (不限数量)
          </Text>
          </Text>
        </View>
        <View style={styles.categoryList}>
          {
            list.map(item => this.renderArea(item, 'other'))
          }
        </View>
      </View>
    );
  }

  render() {
    const { scrollViewRefFun, handleOnScroll } = this.props;
    return (
      <View style={styles.categoryModal}>
        <View style={styles.modalHeader}>
            <View style={styles.modalHeaderView}>
              <Text style={styles.modalHeaderText}>订单推送时，将会按照核心区域-重点区域-其他区域优先级推送</Text>
            </View>
            <TouchableOpacity onPress={this.closeModal}>
              <Icon name="close" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        <ScrollView
          ref={scrollViewRefFun}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          
          <View style={styles.categoryModalContent}>
            {this.renderMainArea()}
            {this.renderPointArea()}
            {this.renderOtherArea()}
          </View>
        </ScrollView>
        <Footer 
          previousText="取消"
          onPressPrevious={this.closeModal}
          nextText="完成"
          onPressNext={this.finishedAndClose}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tips: {
    color: '#ccc',
    marginTop: 5,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  categoryModal: {
    height: 500,
    backgroundColor: '#fff',
    
  },
  modalHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#b7ba6b',
  },
  modalHeaderView: {
    flex: 1,
    padding: 10,
    
  },
  modalHeaderText: {
    color: '#fff',
  },
  categoryModalContent: {
    
  },
  typeView: {
    padding: 10,
  },
  clean: {
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  cleanText: {
    color: '#999',
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 5,
  },
  changeCategoryView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  changeCategoryBox: {
    margin: 5,
  }
});
const mapStateToProps = ({ service }) => ({
  areaList: service.areaList,
  otherAreaList: service.otherAreaList,
  selectedPointArea: service.selectedPointArea,
  selectedOtherArea: service.selectedOtherArea,
})

export default connect(mapStateToProps)(AreaModalContent);