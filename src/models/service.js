import iconKefu from '../assets/icon_kefu.png';
import iconManager from '../assets/icon_manager.png';
import iconReportfailure from '../assets/icon_reportfailure.png';

const roles = [
  {
    id: '0',
    title: '家居师傅',
    icon: iconKefu,
  },
  {
    id: '1',
    title: 'IT数码',
    icon: iconManager,
  },
  {
    id: '2',
    title: '家政清洁',
    icon: iconReportfailure,
  }
];


// 家居师傅品类
const serviceCategoryList1 = [
  {
    id: '0',
    title: '家具',
  },
  {
    id: '2',
    title: '灯具',
  },
  {
    id: '3',
    title: '卫浴洁具',
  },
  {
    id: '4',
    title: '墙纸',
  },
  {
    id: '5',
    title: '地板',
  },
  {
    id: '6',
    title: '门窗',
  },
  {
    id: '7',
    title: '家电',
  },
  {
    id: '8',
    title: '浴霸',
  },
  {
    id: '9',
    title: '净水器',
  },
  {
    id: '10',
    title: '晾衣架',
  },
  {
    id: '11',
    title: '窗帘纱窗',
  },
  {
    id: '12',
    title: '集成吊顶',
  },
  {
    id: '13',
    title: '定制类',
  },
  {
    id: '14',
    title: '锁具',
  },
  {
    id: '15',
    title: '地毯',
  },
  {
    id: '16',
    title: '健身器材',
    
  },
];

// 服务类型
const typeList1 = [
  {
    id: 10,
    title: '安装',
  },
  {
    id: 11,
    title: '维修',
  },
  {
    id: 12,
    title: '送货',
  },
];

// IT数码品类
const serviceCategoryList2 = [
  {
    id: '0',
    title: '网络',
  },
  {
    id: '2',
    title: '手机',
  },
  {
    id: '3',
    title: '电脑',
  },
  {
    id: '4',
    title: '办公设备',
  },
];

// 服务类型
const typeList2 = [
  {
    id: 14,
    title: '安装',
  },
  {
    id: 15,
    title: '维修',
  },
];

// 家政清洁品类
const serviceCategoryList3 = [
  {
    id: '0',
    title: '家政清洁',
  },
];

// 家政清洁服务类型
const typeList3 = [
  {
    id: 16,
    title: '保洁',
  },
  {
    id: 17,
    title: '甲醛',
  },
  {
    id: 18,
    title: '家政',
  },
];

const areaList = [
  {
    id: 0,
    title: '新洲区',
  },
  {
    id: 1,
    title: '黄陂区',
  },
  {
    id: 2,
    title: '江夏区',
  },
  {
    id: 3,
    title: '蔡甸区',
  },
  {
    id: 4,
    title: '汉南区',
  },
  {
    id: 5,
    title: '东西湖区',
  },
  {
    id: 6,
    title: '洪山区',
  },
  {
    id: 7,
    title: '青山区',
  },
  {
    id: 8,
    title: '武昌区',
  },
  {
    id: 9,
    title: '汉阳区',
  },
  {
    id: 10,
    title: '硚口区',
  },
  {
    id: 11,
    title: '江汉区',
  },
  {
    id: 12,
    title: '江岸区',
  },
  {
    id: 13,
    title: '市辖区',
  },
];

// 远程费用
const yuanchengFeiyongs = [
  {
    value: 5,
    title: '5元/公里'
  },
  {
    value: 10,
    title: '10元/公里'
  },
  {
    value: 15,
    title: '15元/公里'
  },
];

// 抬楼费用
const tailouFeiyongs = [
  {
    value: 3,
    title: '3元/层'
  },
  {
    value: 5,
    title: '5元/层'
  },
  {
    value: 10,
    title: '10元/层'
  },
];

// 低竞争方式
const diJingZhengs = [
  {
    value: "1",
    title: '接受'
  },
  {
    value: "0",
    title: '不接受'
  },
]

export default {
  namespace: 'service',
  state: {
    roles,
    currentRole: '',
    serviceCategoryList: serviceCategoryList1,
    selectedCategorys: {},
    selectedTypes: {},
    typeList: typeList1,
    categoryLength: [0, 1, 2],
    showChange: false,
    currentIndex: undefined,
    areaList,
    otherAreaList: areaList,
    selectedPointArea: [],
    selectedOtherArea: [],
    yuanchengFeiYong: '',
    tailouFeiYong: '',
    accept: '',
    yuanchengFeiyongs,
    tailouFeiyongs,
    diJingZhengs,
    chargeValueText: '',
  },

  reducers: {
    saveCurrentRole(state, { payload }) {
      const { currentRole } = payload;
      let serviceCategoryList = [];
      let typeList = []
      switch (currentRole) {
        case '0':
          serviceCategoryList = serviceCategoryList1;
          typeList = typeList1;
          break;
        case '1':
          serviceCategoryList = serviceCategoryList2;
          typeList = typeList2;
          break;
        case '2':
          serviceCategoryList = serviceCategoryList3;
          typeList = typeList3;
          break;
        default:
          serviceCategoryList = serviceCategoryList1;
          typeList = typeList1;
          break;
      }
      const data = {
        ...state,
        currentRole,
        serviceCategoryList,
        typeList,
      }
      if(currentRole !== state.currentRole) {
        data.currentIndex = null;
        data.showChange = false;
        data.selectedCategorys = {};
        data.selectedTypes =  {};
        data.selectedOtherArea = [];
        data.yuanchengFeiYong = '';
        data.tailouFeiYong = '';
        data.accept = '';
        data.chargeValueText = '';
        data.selectedPointArea = [];
        data.selectedOtherArea = [];
      }
      return data;
    },
    finished(state, { payload }) {
      const selectedCategorys = state.selectedCategorys;
      if(payload.currentItem) {
        selectedCategorys[payload.currentIndex] = payload.currentItem;
      }
      
      return { 
        ...state,
        serviceCategoryList: payload.serviceCategoryList,
        selectedTypes: payload.selectedTypes,
        selectedCategorys,
      };
    },
    clean(state, { payload, callback }) {
      let serviceCategoryList = [];
      let typeList = []
      switch (state.currentRole) {
        case '0':
          serviceCategoryList = serviceCategoryList1;
          typeList = typeList1;
          break;
        case '1':
          serviceCategoryList = serviceCategoryList2;
          typeList = typeList2;
          break;
        case '2':
          serviceCategoryList = serviceCategoryList3;
          typeList = typeList3;
          break;
        default:
          serviceCategoryList = serviceCategoryList1;
          typeList = typeList1;
          break;
      }
      if(callback) {
        callback(serviceCategoryList)
      }
      return {
        ...state,
        serviceCategoryList,
        typeList,
        selectedTypes: {},
        selectedCategorys: {},
        showChange: false,
      }
    },
    onChangeShow(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    saveSelectedArea(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    saveCharge(state, { payload }) {
      const { yuanchengFeiYong, tailouFeiYong, accept } = payload;
      const { yuanchengFeiyongs, tailouFeiyongs, diJingZhengs } = state;
      let valueTextArr = [];
      if(yuanchengFeiyongs) {
        const value = yuanchengFeiyongs.filter(item => item.value === yuanchengFeiYong)[0]
        valueTextArr.push(`远程费：${value.title}`)
      }

      if(tailouFeiyongs) {
        const value = tailouFeiyongs.filter(item => item.value === tailouFeiYong)[0]
        valueTextArr.push(`抬楼费：${value.title}`)
      }

      if(diJingZhengs) {
        const value = diJingZhengs.filter(item => item.value === accept)[0]
        valueTextArr.push(value.title)
      }
      
      return {
        ...state,
        ...payload,
        chargeValueText: valueTextArr.join(),
      };
    },
  },

  effects: {
    
  },
}