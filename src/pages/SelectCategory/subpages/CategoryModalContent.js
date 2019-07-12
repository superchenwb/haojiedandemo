import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Category from '../../../components/Category';
import Footer from '../../../components/Footer';

const { width } = Dimensions.get('window');
/**
 * 品类选择组件
 */
class CategoryModalContent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: '',
      serviceCategoryList: JSON.parse(JSON.stringify(props.serviceCategoryList)),
      currentItem: null,
      selectedTypes: JSON.parse(JSON.stringify(props.selectedTypes)),
    }
  }

  // 切换服务类目
  onChangeCategory = (value, checked) => {
    const { serviceCategoryList, selectedTypes } = this.state;
    const { dispatch, currentIndex } = this.props;
    let currentItem = null;
    const newServiceCategorys = serviceCategoryList.map(item => {
      if(value === item.id) {
        currentItem = {
          ...item,
          checked: true,  // 只要点击，则设置为true，不可取消
          indexValue: currentIndex,
        }
        return currentItem;
      }
      const disabled = currentIndex !== undefined && currentIndex !== item.indexValue && item.checked;
      if(!disabled) {
        return {
          ...item,
          checked: false,
        };
      }
      return item;
    });
    
    if(selectedTypes && selectedTypes[currentIndex] && selectedTypes[currentIndex].length > 0) {
      
      Alert.alert(
        '服务类型', 
        '是否清空已选的服务品类？', 
        [
          {text: '取消', onPress: () => {}, style: 'cancel'},
          {text: '确定', onPress: () => {
            const newSelectedTypes = { ...selectedTypes };
            newSelectedTypes[currentIndex] = [];
            this.setState({
              serviceCategoryList: newServiceCategorys,
              currentItem,
              selectedTypes: newSelectedTypes,
            })
            // dispatch({
            //   type: 'service/onChangeShow',
            //   payload: {
            //     showChange: true,
            //     selectedTypes: newSelectedTypes,
            //   }
            // })
          }},
        ],
        );
      return;
    }
    this.setState({
      serviceCategoryList: newServiceCategorys,
      currentItem,
    })
    dispatch({
      type: 'service/onChangeShow',
      payload: {
        showChange: true,
      }
    })
  }

  // 清空
  clean = () => {
    const { dispatch } = this.props;
    // 清空modal层数据
    dispatch({
      type: `service/clean`,
      playload: {},
      callback: (serviceCategoryList) => {
        // 同时清空当前组件的数据
        this.setState({
          serviceCategoryList,
          currentItem: null,
          selectedTypes: {},
        });
      }
    });
  }

  finishedAndColse = () => {
    const finished = this.finished();
    if(finished) {
      this.closeModal();
    }
  }

  // 完成
  finished = () => {
    const { serviceCategoryList, selectedTypes, currentItem } = this.state;
    const { dispatch, selectedCategorys, currentIndex } = this.props;
    if(!(currentItem || selectedCategorys && selectedCategorys[currentIndex])) {
      Alert.alert('提示', '请选择品类')
      return;
    }
    
    if(!(selectedTypes && selectedTypes[currentIndex] && selectedTypes[currentIndex].length > 0)) {
      Alert.alert('提示', '请选择服务类型')
      return;
    }
    dispatch({
      type: `service/finished`,
      payload: {
        serviceCategoryList,
        selectedTypes,
        currentItem,
        currentIndex,
      }
    });
    
    return true;
  }

  next = () => {
    const { dispatch, currentIndex, selectedCategorys } = this.props;
    const finished = this.finished();
    let newShowChange = false;
    if(selectedCategorys && selectedCategorys[currentIndex + 1]) {
      newShowChange = true;
    }
    if(finished) {
      dispatch({
        type: 'service/onChangeShow',
        payload: {
          currentIndex: currentIndex + 1,
          showChange: newShowChange,
        }
      })
    }
    
  }

  // 选择服务类型
  onChangeType = (value, checked, title) => {
    const { selectedTypes } = this.state;
    const { currentIndex } = this.props;
    const newSelectedTypes = { ...selectedTypes };
    if(!selectedTypes[currentIndex]) {
      newSelectedTypes[currentIndex] = [];
    }
    
    const selectedList = newSelectedTypes[currentIndex];
    if(!checked) {
      selectedList.push({ id: value, title })
    } else {
      let spliceIndex;
      const exsit = selectedList.some((item, index) => {
        if(item.id === value) {
          spliceIndex = index;
        }
        return item.id === value;
      });
      if(exsit) {
        selectedList.splice(spliceIndex, 1)
      }
    }
    this.setState({
      selectedTypes: newSelectedTypes,
    })
  }

  onChangeShowCategory = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'service/onChangeShow',
      payload: {
        showChange: false,
      }
    })
  }

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  // 切换
  renderChangeCategory = () => {
    const { selectedCategorys, currentIndex } = this.props;
    const { currentItem: currentItemState } = this.state;
    let currentItem = {};
    if(selectedCategorys[currentIndex]) {
      currentItem = selectedCategorys[currentIndex]
    }
    if(currentItemState) {
      currentItem = currentItemState;
    }
    return (
      <View style={styles.changeCategoryView}>
        <Category 
          key={currentItem.id} 
          checked={currentItem.checked} 
          value={currentItem.id} 
          title={currentItem.title}
        />
        <TouchableOpacity style={styles.changeCategoryBox} onPress={this.onChangeShowCategory}>
          <Text style={styles.cleanText}>
            点击切换
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 显示品类
  renderCategory= (category) => {
    const { currentIndex } = this.props;
    const disabled = currentIndex !== undefined && currentIndex !== category.indexValue && category.checked;
    return (
      <Category 
        key={category.id} 
        checked={category.checked}
        disabled={disabled}
        currentIndex={currentIndex}
        value={category.id} 
        title={category.title}
        onPress={this.onChangeCategory}
      />
    )
  }

  // 显示服务类型列表子项
  renderType = (type) => {
    const { selectedTypes } = this.state;
    const { currentIndex } = this.props;
    const selecteds = selectedTypes[currentIndex] || [];
    return (
      <Category 
        key={`type-${type.id}`} 
        checked={selecteds.some(item => item.id === type.id)}
        value={type.id} 
        title={type.title}
        onPress={this.onChangeType}
      />
    )
  }

  // 显示服务类型列表
  renderTypeList = () => {
    const { serviceCategoryList } = this.state;
    const { typeList, currentIndex } = this.props;
    if(serviceCategoryList.some(item => currentIndex !== undefined && currentIndex === item.indexValue && item.checked)) {
      return (
        <View>
          <View style={styles.typeView}>
            <Text style={styles.headerText}>选择服务类型</Text>
          </View>
          <View style={styles.categoryList}>
            {typeList.map(this.renderType)}
          </View>
        </View>
      )
    }
    return null;
  }

  // 显示证书
  renderCredentials = () => {
    const { selectedTypes } = this.state;
    const { currentIndex } = this.props;
    if(JSON.stringify(selectedTypes) === "{}") {
      return null;
    }
    const types = selectedTypes[currentIndex];
    // 只有16、18需要证书
    if(!types || !types.some(item => item.id === 16 || item.id === 18)) {
      return null;
    }
    let component = (
      <View key="jianhangzheng" style={styles.credentialView}>
        <Text>健康证</Text>
      </View>
    )
    // 如果是家政需要两种证
    if(types.some(item => item.id === 18)) {
      component = (
        <>
          <View key="jianhangzheng" style={styles.credentialView}>
            <Text>健康证</Text>
          </View>
          <View key="yueshaozheng" style={styles.credentialView}>
            <Text>月嫂证</Text>
          </View>
        </>
      )
    }
    
    return (
      <View>
        <View style={styles.typeView}>
          <Text style={styles.headerText}>请上传相关行业证书</Text>
        </View>
        <View style={styles.credentials}>
          {component}
        </View>
        
      </View>
    )
  }

  render() {
    const { serviceCategoryList } = this.state;
    const { showChange, categoryLength, currentIndex, scrollViewRefFun, handleOnScroll } = this.props;
    return (
      <View style={styles.categoryModal}>
        <ScrollView
          ref={scrollViewRefFun}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderView}>
              <Text style={styles.headerText}>选择服务类目</Text>
            </View>
            <TouchableOpacity onPress={this.closeModal}>
              <Icon name="close" size={18} color="#999" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.clean} onPress={this.clean}>
            <Text style={styles.cleanText}>
              <Icon name="trash" size={18} color="#999" /> 清空
            </Text>
          </TouchableOpacity>
          <View style={styles.categoryModalContent}>
            <View style={styles.categoryList}>
              {
                showChange ? this.renderChangeCategory() : serviceCategoryList.map(this.renderCategory)
              }
            </View>
            <View>
              {
                this.renderTypeList()
              }
            </View>
            {this.renderCredentials()}
          </View>
        </ScrollView>
        <Footer 
          previousText="完成"
          onPressPrevious={this.finishedAndColse}
          nextText="保存，填写下一个"
          onPressNext={categoryLength.length !== currentIndex + 1 ? this.next : null}
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
    padding: 10,
  },
  modalHeaderView: {
    flex: 1
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
  },
  credentials: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  credentialView: {
    margin: 5,
    width: width / 2 -20,
    height: width / 2 -20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ service }) => ({
  serviceCategoryList: service.serviceCategoryList,
  typeList: service.typeList,
  selectedCategorys: service.selectedCategorys,
  selectedTypes: service.selectedTypes,
  categoryLength: service.categoryLength,
  showChange: service.showChange,
  currentIndex: service.currentIndex,
})

export default connect(mapStateToProps)(CategoryModalContent);
