import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import SelectInput from '../../components/SelectInput';
import CategoryModalContent from './subpages/CategoryModalContent';
import AreaModalContent from './subpages/AreaModalContent';
import ServiceModalContent from './subpages/ServiceModalContent';

class SelectCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: '',
    }
  }

  // 显示品类modal
  showCategory = (currentIndex) => {
    const { dispatch, selectedCategorys } = this.props;
    // 有被选中的品类时，showChange为true
    let newShowChange = false;
    if(selectedCategorys && selectedCategorys[currentIndex + 1]) {
      newShowChange = true;
    }
    this.setState({
      visibleModal: 'category',
    })
    dispatch({
      type: 'service/onChangeShow',
      payload: {
        showChange: newShowChange,
        currentIndex,
      }
    })
  }

  scrollViewRefFun = (ref) => {
    this.scrollViewRef = ref
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  showArea = () => {
    this.setState({
      visibleModal: 'area',
    })
  }

  showService = () => {
    this.setState({
      visibleModal: 'service',
    })
  }

  closeModal = () => {
    this.setState({
      visibleModal: ''
    })
  }

  render() {
    const { selectedCategorys, selectedTypes, categoryLength, selectedPointArea, chargeValueText } = this.props;
    const { visibleModal } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text>选择最擅长的品类 <Text style={styles.tips}>(最多3项)</Text></Text>
          <Text style={styles.tips}>保证金师傅最多可选5个，非保证金师傅最多可选3个</Text>
        </View>
        <View>
          {
            categoryLength.map((i, index) => {
              let value = '';
              if(selectedCategorys && selectedCategorys[index] && selectedTypes && selectedTypes[index]) {
                value = `${selectedCategorys[index].title} - ${selectedTypes[index].map(item => item.title)}` 
              }
              
              return (
                <SelectInput
                  key={i}
                  value={value}
                  onChange={this.showCategory}
                  currentIndex={index}
                  placeholder="品类"
                />
              )
            })
          }
        </View>
        <View style={styles.title}>
          <Text>选择服务区域</Text>
        </View>
        <View>
          <SelectInput
            value={selectedPointArea.map(item => item.title).join()}
            onChange={this.showArea}
            placeholder="服务区域"
          />
        </View>
        <View style={styles.title}>
          <Text>选择服务承诺</Text>
        </View>
        <View>
          <SelectInput
            value={chargeValueText}
            onChange={this.showService}
            placeholder="服务承诺"
          />
        </View>
        <Modal
          isVisible={visibleModal === 'category'}
          onSwipeComplete={this.closeModal}
          onBackdropPress={this.closeModal}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          style={styles.bottomModal}
        >
          <CategoryModalContent
            scrollViewRefFun={this.scrollViewRefFun}
            handleOnScroll={this.handleOnScroll}
            closeModal={this.closeModal}
          />
        </Modal>
        <Modal
          isVisible={visibleModal === 'area'}
          onSwipeComplete={this.closeModal}
          onBackdropPress={this.closeModal}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={100}
          style={styles.bottomModal}
        >
          <AreaModalContent
            scrollViewRefFun={this.scrollViewRefFun}
            handleOnScroll={this.handleOnScroll}
            closeModal={this.closeModal}
          />
        </Modal>
        <Modal
          isVisible={visibleModal === 'service'}
          onSwipeComplete={this.closeModal}
          onBackdropPress={this.closeModal}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={40}
          style={styles.bottomModal}
        >
          <ServiceModalContent
            scrollViewRefFun={this.scrollViewRefFun}
            handleOnScroll={this.handleOnScroll}
            closeModal={this.closeModal}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  tips: {
    color: '#ccc',
    marginTop: 5,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  title: {
    marginTop: 10,
  }
});

const mapStateToProps = ({ service }) => ({
  serviceCategoryList: service.serviceCategoryList,
  typeList: service.typeList,
  selectedCategorys: service.selectedCategorys,
  selectedTypes: service.selectedTypes,
  categoryLength: service.categoryLength,
  showChange: service.showChange,
  currentIndex: service.currentIndex,
  selectedPointArea: service.selectedPointArea,
  chargeValueText: service.chargeValueText,
})

export default connect(mapStateToProps)(SelectCategory);