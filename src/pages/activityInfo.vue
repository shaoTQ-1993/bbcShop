<template>
	<div class="activityInfo">
		<x-header style="background-color: #eb6100;">{{formName}}</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
			<div style="padding: 10px 15px 30px 15px;text-align: left;">
				<h1>{{formTemplate.title}}</h1>
				<h2>{{formTemplate.beginTime}}</h2>
				<h4>{{formTemplate.formName}}</h4>
				<div class="cont">
					<div class="task" v-for="item in formItemList">
						<label>
							<i>{{item.itemTitle}}</i>
						</label>
						<div v-if="item.itemType=='text'" >
							<input type="text" placeholder="请输入" :title="item.itemTitle" />
						</div>
						<div v-if="item.itemType=='textarea'" >
							<textarea name="address" id="fromAddrInfo" :title="item.itemTitle"></textarea>
						</div>
						<div v-if="item.itemType=='select'">
							<select v-model="selected" name="fruit" :title="item.itemTitle" >
								<option v-for="item in item.optionJson" value="item.value">{{item.value}}</option>
							</select>
						</div>
						<div v-if="item.itemType=='checkbox'">
							<div v-for="i in item.optionJson">
								<input type="checkbox" id="runoob" :value="i.value" :title="item.itemTitle">
								<label>{{i.value}}</label>
							</div>
						</div>
						<div v-if="item.itemType=='radio'">
							<div v-for="i in item.optionJson">
								<input :title="item.itemTitle" type="radio" id="radioOne" name="radioOne" :value="i.value" v-model="picked" style="margin-top: -7px;">
								<label>{{i.value}}</label>
							</div>
						</div>
					</div>
					<div class="task" v-for="item in formRecordList">
						<label>
							<i>{{item.itemTitle}}</i>
						</label>
						<div v-if="item.itemType=='text'" >
							<em>{{item.itemValue}}</em>
						</div>
						<div v-if="item.itemType=='textarea'" >
							<em>{{item.itemValue}}</em>
						</div>
						<div v-if="item.itemType=='select'">
							<em>{{item.itemValue}}</em>
						</div>
						<div v-if="item.itemType=='checkbox'">
							<div v-for="item in item.optionJson">
								<em>{{item.value}}</em>
							</div>
						</div>
						<div v-if="item.itemType=='radio'">
							<em>{{item.itemValue}}</em>
						</div>
					</div>
					
				</div>
				<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text=text :position="position"></toast>
				<div style="padding:15px;">
					<x-button v-if="btn" @click.native="save('')" type="primary" style="background-color: #eb6100">报名</x-button>
					<x-button v-else="btn" @click.native="saved('')" type="primary" style="background-color: #eb6100">已经报名</x-button>
				</div>
				<div id="activityIntro"></div>
			</div>
		</scroller>
	</div>
</template>
<script type="text/javascript">
	import { XHeader, Loading, Scroller, XButton, Toast } from 'vux'
	export default {
		props: [],
		data() {
			return {
				formTemplateList: [],
				showHeight: "",
				showPositionValue: 'OK！',
				text: "",
				parameters: '',
				position: 'default',
				showPositionValue: false,
				formName: '',
				formTemplate: '',
				formItemList: '',
				picked: '男',
				id: '',
				selected: '',
				formRecordList:'',
				btn:''
			}
		},
		components: {
			XHeader,
			Loading,
			Scroller,
			XButton,
			Toast
		},
		methods: {

			getActivity(id) {
				var url = '/rest/form/getForm/' + id;
				var that = this;
				that.axios.get(url)
					.then(response => {
						var item,record;
						console.log("form", response);
						that.formName = response.data.data.formName;
						that.formTemplate = response.data.data.formTemplate;
						that.formItemList = response.data.data.formItemList;
						that.formRecordList=response.data.data.formRecordList;
						var data = response.data.data.formTemplate.content;
						$('#activityIntro').html(data);

						that.$vux.loading.hide();
						that.$nextTick(() => {
							that.$refs.scrollerEvent.reset();
						});
						if(that.formItemList)
							that.btn=true;
						else
							that.btn=false;

						
					})

			},
			showPosition(position) {
				this.position = position
				this.showPositionValue = true
			},
			saved(position){
				this.text = "已经报名成功！";
				this.showPosition(position);
				console.log(this.parameters);
			},
			save(position) {	
				//创建的表单中包含文本框
		 		var in_text= $("input[type='text']");
		 		var len = in_text.length;
		  		var lJson = {};
		 		var json = [];
				if(len>=1){
					 in_text.each(function(){
						  lJson = new Object();
						  var title = $(this).attr("title");//选项名
						  var type = $(this).attr("type");//文本框类型
						  var defaultValue = $(this).val();//用户填写的文本框的值
						  
						  
						  lJson.title = title;
						  lJson.type = type;
						  lJson.defaultValue = defaultValue;
						  json.push(lJson);//将每一个json对象放入到json数组中
					  });
					 }
				  //创建的表单中包含单选按钮radio
				  var rJson = {};
				  var in_radio=$("input[type='radio']");
				  var rLen = in_radio.length;
				  console.log(rLen);
				  if(rLen>=1){
					 
						  rJson = new Object();
						  var title = in_radio.attr("title");
						  var type = 'radio';
						  
						  
						  var aJson = {};//json对象
						  var aoJson = [];
						  var defaultValue = "";
						  in_radio.each(function(){
						 	
							 if( $(this).is(":checked")){

								defaultValue =  $(this).val();
							 }
						 });
						  rJson.title = title;
						  rJson.defaultValue = defaultValue;
						  rJson.type = type;
						  json.push(rJson); 
				  }
				  //创建的表单中包含复选框
				  var cJson = {};//定义一个json对象
				  var in_check=$("input[type='checkbox']");
				  var cLen = in_check.length;
				  //alert(cLen);
				  if(cLen >=1){
				 	var title =in_check.attr("title");

   					var type = 'checkbox';
   					
					var bJson = {};//json对象
					var boJson = [];
					  in_check.each(function(){
						if( $(this).is(":checked")){
						   	bJson = new Object();
							var defaultValue =  $(this).val();
							bJson.value = defaultValue;
							boJson.push(bJson);

						 }						
					  });
					cJson.title = title;
					cJson.defaultValue=boJson;
					cJson.type = type;
					json.push(cJson);
				  }
				  
				  //创建的表单中包含textarray类型的
				  var tlen = $("textarea").length;
				  var tJson = {};
				  if(tlen>=1){
					  $("textarea").each(function(){
						  var taJson = [];
						  tJson = new Object();
						  var title = $(this).attr("title");//选项名
						  var type = 'textarea';            //文本框类型
						  var defaultValue = $(this).val();//选项值
						  
						  tJson.title = title;
						  tJson.type = type;
						  tJson.defaultValue = defaultValue;
						  json.push(tJson);//将每一个json对象放入到json数组中
					  });
				  }
				  
				    //创建的表单中包含下拉框
				  var sJson = {};//定义一个json对象
				  var sLen = $("select").length;
				  if(sLen>=1){
					  $("select").each(function(){
						  var soJson = [];
						  sJson = new Object();
						  var title = $(this).attr("title");
						  var type = 'select';
						  sJson.title = title;
						  sJson.type = type;
						  sJson.defaultValue = $(this).find('option:selected').text();
						  
						  json.push(sJson);
						 
					  });
				  }
				  console.log(json);
				  var result_string = JSON.stringify(json);
				  var aaa=$(".task").val();

				  
//					if(result_string.length==0) {
//					this.text = "请正确填写信息";
//					this.showPosition(position);
//					console.log(this.parameters);
//					} 
//					else {
//						this.text = "报名成功！";
//						this.showPosition(position);
//						console.log(this.parameters);
//					}
//				  
				  	var that=this;
					var url = "/rest/form/submitForm";		
					var data = {
						strs: result_string,
						formId:that.id,
					}
					
					that.axios.post(url, data).then(response => {
						console.log(response);
						})
					that.getActivity(that.id);

				},
		},
		mounted() {
			this.id = this.$route.params.id;
			this.showHeight = document.documentElement.clientHeight - 46 + 'px';
			this.$vux.loading.show({
				text: 'Loading'
			});
			//	this.getFormList();
			this.getActivity(this.id);

		}
	}
</script>
<style type="text/css">

	
	.activityInfo h1 {
		width: 100%;
		font-weight: 500;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.activityInfo h2 {
		width: 100%;
		font-weight: 100;
		color: #ADADAD;
		font-size: 15px;
		margin-bottom: 10px;
	}
	
	.activityInfo h4 {
		width: 100%;
		font-weight: 100;
		color: red;
		font-size: 17px;
		margin-bottom: 10px;
	}
	.activityInfo .cont {
		background-color: #ffffff;
	}
	
	.activityInfo .task {
		margin: .17rem 0;
		overflow: hidden;
		border-bottom: .04rem #EEEEEE solid;
		border-bottom-right-radius: .21rem;
		border-bottom-left-radius: .21rem;
	}
	
	.activityInfo label {
		margin-right: .4rem;
		width: 60px;
		font-size: .6rem;
		color: #666;
		float: left;
		text-align: left;
	}
	
	.activityInfo label i {
		font-style: normal;
		font-size: .6rem;
		line-height: 26px;
	}
	
	.activityInfo .cont input {
		outline: none;
		color: #333;
		height: 35px;
		border: none;
		float: left;
		font-size: .6rem;
		margin-top: -8px;
	}
	.activityInfo em{
		margin-right: 10px;
		font-style: normal;
    	font-size: .6rem;
    	line-height: 10px;
	}
</style>