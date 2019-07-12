import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Category from '../../../components/Category';
import Footer from '../../../components/Footer';

/**
 * 服务承诺选择组件
 */
class ServiceModalContent extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      yuanchengFeiYong: props.yuanchengFeiYong,
      tailouFeiYong: props.tailouFeiYong,
      accept: props.accept,
    }
  }

  onChangeYuanchengFeiYong = (value) => {
    this.setState({
      yuanchengFeiYong: value,
    })
  }

  onChangeTailouFeiYong = (value) => {
    this.setState({
      tailouFeiYong: value,
    })
  }

  onChangeAccept = (value) => {
    this.setState({
      accept: value,
    })
  }

  finishedAndClose = () => {
    const finished = this.finished();
    if(finished) {
      this.closeModal();
    }
  }

  // 完成
  finished = () => {
    const { yuanchengFeiYong, tailouFeiYong, accept } = this.state;
    const { dispatch } = this.props;
    if(!(yuanchengFeiYong && tailouFeiYong && accept)) {
      Alert.alert('提示', '请选择收费方式')
      return;
    }
    
    dispatch({
      type: `service/saveCharge`,
      payload: {
        yuanchengFeiYong,
        tailouFeiYong,
        accept,
      }
    });
    
    return true;
  }

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  // 远程费用
  renderYuanCheng = () => {
    const { yuanchengFeiYong } = this.state;
    const { yuanchengFeiyongs } = this.props;
    return (
      <View>
        <View style={styles.titleView}>
          <Text style={styles.headerText}>远程费用</Text><Text style={styles.headerTextRight}>超远距离可收取适当费用，每公里：</Text>
        </View>
        <View style={styles.changeCategoryView}>
          {
            yuanchengFeiyongs.map(item => {
              const checked = yuanchengFeiYong === item.value;
              return (
                <Category
                  key={item.value}
                  checked={checked} 
                  onPress={this.onChangeYuanchengFeiYong}
                  value={item.value} 
                  title={item.title} 
                />
              )
            })
          }
        </View>
      </View>
    )
  }

  // 抬楼费用
  renderTaiLou = () => {
    const { tailouFeiYong } = this.state;
    const { tailouFeiyongs } = this.props;
    return (
      <View>
        <View style={styles.titleView}>
          <Text style={styles.headerText}>远程费用</Text><Text style={styles.headerTextRight}>3楼以下25公斤以内免收，超出部分每层收取：</Text>
        </View>
        <View style={styles.changeCategoryView}>
          {
            tailouFeiyongs.map(item => {
              const checked = tailouFeiYong === item.value;
              return (
                <Category
                  key={item.value}
                  checked={checked} 
                  onPress={this.onChangeTailouFeiYong}
                  value={item.value} 
                  title={item.title} 
                />
              )
            })
          }
        </View>
      </View>
    )
  }

  // 低竞争订单
  renderDiJingZheng = () => {
    const { accept } = this.state;
    const { diJingZhengs } = this.props;
    return (
      <View>
        <View style={styles.titleView}>
          <Text style={styles.headerText}>低竞争订单派单</Text><Text style={styles.headerTextRight}>超出服务范围或不熟悉的服务类目订单：</Text>
        </View>
        <View style={styles.changeCategoryView}>
          {
            diJingZhengs.map(item => {
              const checked = accept === item.value;
              return (
                <Category
                  key={item.value}
                  checked={checked} 
                  onPress={this.onChangeAccept}
                  value={item.value} 
                  title={item.title} 
                />
              )
            })
          }
        </View>
      </View>
    )
  }

  renderBasicService = () => {
    return (
      <View style={styles.basic}>
        <Text style={styles.title}>基本服务承诺</Text>
        <View style={styles.grid}>
          <View style={[styles.row, styles.oddCol]}>
            <View style={styles.colLeft}>
              <Text>空跑费</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={styles.colRightText}>配送50元/次，安装或维修30元/次</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Text>安装/维修</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={styles.colRightText}>1个月内免费检修</Text>
            </View>
          </View>
          <View style={[styles.row, styles.oddCol]}>
            <View style={styles.colLeft}>
              <Text>二次上门</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={styles.colRightText}>提货+安装80元/次，安装或者维修40元/次</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Text>免费核销</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={styles.colRightText}>支持喵师傅/汪师傅核销</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { scrollViewRefFun, handleOnScroll } = this.props;
    return (
      <View style={styles.categoryModal}>
        <TouchableOpacity style={styles.closeView} onPress={this.closeModal}>
          <Icon name="close" size={18} color="#999" />
        </TouchableOpacity>
        <ScrollView
          ref={scrollViewRefFun}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.categoryModalContent}>
            {this.renderBasicService()}
            <View>
              <Text style={styles.title}>附加服务承诺</Text>
              {this.renderYuanCheng()}
              {this.renderTaiLou()}
              {this.renderDiJingZheng()}
            </View>
          </View>
        </ScrollView>
        <Footer
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
  closeView: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
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
  basic: {
    padding: 10,
  },
  title: {
    color: '#817936',
    marginBottom: 10,
  },
  titleView: {
    padding: 10,
    flexDirection: 'row',
  },
  headerText: {
    width: 80,
  },
  headerTextRight: {
    color: '#666',
    flex: 1,
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
  grid: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#817936',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#817936',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#817936',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#817936',
  },
  oddCol: {
    backgroundColor: '#81793680',
  },
  evenCol: {

  },
  colLeft: {
    width: 80,
    padding: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#817936',
  },
  colRight: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  colRightText: {
    color: '#ccc',
  },
});
const mapStateToProps = ({ service }) => ({
  yuanchengFeiyongs: service.yuanchengFeiyongs,
  tailouFeiyongs: service.tailouFeiyongs,
  diJingZhengs: service.diJingZhengs,
  yuanchengFeiYong: service.yuanchengFeiYong,
  tailouFeiYong: service.tailouFeiYong,
  accept: service.accept,
})

export default connect(mapStateToProps)(ServiceModalContent);