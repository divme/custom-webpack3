<template>
 <div class="components-container">
   <h3>组件测试</h3>
   <!-- 多选按钮测试 -->
   <template>
     <o-checkbox v-model="checkbox1" :disabled="false">{{checkbox1}}</o-checkbox>
     <o-checkbox v-model="checkbox2" :true-value="1" :false-value="0">{{checkbox2}}</o-checkbox>
   </template>
   <!--多选按钮组测试-->
   <template>
     <o-checkbox-group v-model="checkboxGroup">
       <o-checkbox v-for="item in checkboxGroupData" :key="item.id" :value="item.value">我是{{item.id}}</o-checkbox>
     </o-checkbox-group>
   </template>

   <!--单选按钮测试-->
	 <template>
		 <input type="radio" v-model="radio2" :value="true"/>
	 </template>
   <!--单选按钮非组测试-->
   <template>
     <o-radio v-model="radio1" :label="1">
	     <span slot="zong">同意/不同意</span>
	     <div slot="yu">我是yu1</div>
<!--	     <div slot="zong">我是zong2</div>-->
<!--	     <div slot="yu">我是yu2</div>-->
     </o-radio>
     <o-radio v-model="radio1" :label="0">同意/不同意</o-radio>
   </template>
   <!--&lt;!&ndash;单选按钮组测试&ndash;&gt;-->
   <template>
     <o-radio-group v-model="radioGroup">
       <o-radio :label="1">1</o-radio>
       <o-radio :label="2">2</o-radio>
       <o-radio :label="3">3</o-radio>
     </o-radio-group>
   </template>

   <div @click="changeGroup">点击改变 checkboxGroup</div>

   <!-- table 组件测试 -->
	 <div class="table-test-box">
     <!--	纯 render -->
		 <o-table id="render-table" :title="title" :columns="renderColumns" :data="renderData">
			 <template slot-scope="{ row, index }" slot="age">
				 <input type="text" v-model="editAge" v-if="editIndex === index" />
				 <span v-else>{{ row.age }}</span>
			 </template>
		 </o-table>
		 <!-- 测试 slot 方式-->
		 <!-- 1. render + slot: 组件内增加 slot 方式-->
		 <o-table id="slot-table" :columns="slotColumns" :data="slotData">
			 <template slot-scope="{ row, index }" slot="name">
				 <input type="text" v-model="editName" v-if="editIndex === index" />
				 <span v-else>{{ row.name }}</span>
			 </template>

			 <template slot-scope="{ row, index }" slot="age">
				 <input type="text" v-model="editAge" v-if="editIndex === index" />
				 <span v-else>{{ row.age }}</span>
			 </template>

			 <template slot-scope="{ row, index }" slot="birthday">
				 <input type="text" v-model="editBirthday" v-if="editIndex === index" />
				 <span v-else>{{row.birthday }}</span>
			 </template>

			 <template slot-scope="{ row, index }" slot="address">
				 <input type="text" v-model="editAddress" v-if="editIndex === index" />
				 <span v-else>{{ row.address }}</span>
			 </template>

			 <template slot-scope="{ row, index }" slot="action">
				 <div v-if="editIndex === index">
					 <button>保存</button>
					 <button @click="editIndex = -1">取消</button>
				 </div>
				 <div v-else>
					 <button>操作</button>
				 </div>
			 </template>
		 </o-table>
     <!-- 2. render: 使用者用 render 方式手动嵌入 slot, hack 方式-->
		 <o-table ref="table" :columns="renderColumns" :data="slotData">
			 <template slot-scope="{ row, index }" slot="age">
				 <input type="text" v-model="editAge" v-if="editIndex === index" />
				 <span v-else>{{ row.age }}</span>
			 </template>
		 </o-table>
     <!-- 3. 定义 slot 组件，嵌入 -->
	 </div>

	 <!-- tree-->
	 <o-tree :showCheckbox="true" :data="treeData"></o-tree>

   <!--	display 组件测试 -->
	 <div class="display-box">
		 <div class="display-item">
			 <textarea
						 class="display-input"
						 v-model="displayVal"
						 placeholder="输入vue代码">不支持  d</textarea>
		 </div>
		 <div class="display-item">
			 <display :code="displayVal"></display>
		 </div>
	 </div>


   <!-- <z-message/> -->
   <!-- <iam-vue/> -->
 </div>
</template>

<script>
const displayVal = `<template>
  <div>
    我叫{{name}}
   \\(^o^)/~
   <h4>你叫什么呢？</h4>
</div>
</template>
		<\u0073cript>
		  export default {
		     data() {
		     return {
		        name: '宗小宇'
		       }
		   }
		 }
		</\u0073cript>
		<style>
			h4 {
				color: yellowgreen;
			}
		</style>`;

export default {
  name: "index",
  data() {
    const checkboxGroupData = [];
    for (let i = 0; i < 5; i++) {
      checkboxGroupData.push({
        id: i,
        value: `val${i}`
      })
    }
    const str = `<span>dsd</span>`
	  debugger;
    console.log(this)

    return {
      checkbox1: 2,
      checkbox2: true,
      checkboxGroup: ['val1', 'val2', 'val3'],
      checkboxGroupData,
      radio1: 1,
      radio2: false,
      radioGroup: 1,
      displayVal,
	    title: '123',
      editName: '',  // 第一列输入框
      editAge: '',  // 第二列输入框
      editBirthday: '',  // 第三列输入框
      editAddress: '',
	    editIndex: -1,
      renderColumns: [
        {
          title: 'render姓名',
          key: 'name',
          render: this.omoRender
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '出生日期',
          render: (h, { row }) => {
            // console.log('dd');
            const date = new Date(parseInt(row.birthday));
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const birthday = `${year}-${month}-${day}`;

            return h('span', birthday);
          }
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          render: (h, { row, index }) => {
            // 如果当前行是编辑状态，则渲染两个按钮
	          debugger;
	          // console.log('this', this);
            if (this.editIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      this.data[index].name = this.editName;
                      this.data[index].age = this.editAge;
                      this.data[index].birthday = this.editBirthday;
                      this.data[index].address = this.editAddress;
                      this.editIndex = -1;
                    }
                  }
                }, '保存'),
                h('button', {
                  style: {
                    marginLeft: '6px'
                  },
                  on: {
                    click: () => {
                      this.editIndex = -1;
                    }
                  }
                }, '取消')
              ];
            } else {  // 当前行是默认状态，渲染为一个按钮
              return h('button', {
                on: {
                  click: () => {
                    this.editName = row.name;
                    this.editAge = row.age;
                    this.editAddress = row.address;
                    this.editBirthday = row.birthday;
                    this.editIndex = index;
                  }
                }
              }, '修改');
            }
          }
        }
      ],
      renderData: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400010',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
	    slotColumns: [
        {
          title: 'slot姓名',
          slot: 'name'
        },
        {
          title: '年龄',
          slot: 'age'
        },
        {
          title: '出生日期',
          slot: 'birthday'
        },
        {
          title: '地址',
          slot: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
	    ],
	    slotData: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400010',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
	    ],
      treeData: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      placeholder: 1
    }
  },
	watch: {
    radio1(val) {
      if (val) {
        // this.data[0].name = '宗麒麟';
        this.title = '宗麒麟';
        this.$alert('success');
        this.$alert({
	        content: 'i am a alert',
	        duration: 1000
        })
      } else {
        this.title = 'omo'
      }
    }
	},
	mounted() {
    // console.log('this.$children', this.$children.length);
    // debugger;
    // console.log('this.$refs', Object.keys(this.$refs).length);
	},
  methods: {
    omoRender(h, { row, index }) {
      let edit;
      console.log(this);
      // 当前行为聚焦行时
      if (this.editIndex === index) {
        edit = [h('input', {
          domProps: {
            value: row.name
          },
          on: {
            input: (event) => {
              this.editName = event.target.value;
            }
          }
        })];
      } else {
        edit = row.name;
      }

      return h('div', [
        edit
      ]);
    },
    changeGroup() {
      this.checkboxGroup = ['val0', 'val2'];
    }
  }
}
</script>

<style lang="scss" scoped>
  .components-container{
    margin: 10px auto;
    padding: 20px;
	  .display-box{
		  display: flex;
		  width: 1000px;
		  height: 500px;
		  margin: 20px auto;
		  border: 1px solid #ccc;
		  .display-item {
			  flex: 0 0 50%;
			  .display-input{
				  width: 100%;
				  height: calc(100% - 40px);
				  padding: 20px;
				  border: none;
				  border-right: 1px solid #ddd;
				  word-wrap: break-word;
				  word-break: break-word;
				  white-space: pre-wrap;
				  box-sizing: border-box;
			  }
		  }
	  }
  }
</style>
