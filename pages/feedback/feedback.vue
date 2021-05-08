<template>
	<view>
		<view class="mainWindow">
			<view style="display: flex;">
				<van-icon name="contact" /><input :class="inputClass" style="margin-left: 0.2rem;" type="email" v-model="email" placeholder="请输入您的邮箱" @blur="checkEmail" @focus="nowInput" />
			</view>
			<textarea v-model="context" placeholder="请输入反馈内容"></textarea>
			<van-uploader image-fit="aspectFit" :file-list="image" multiple=true @after-read="afterRead" @delete="onDelete" preview-size="100px" max-count="9" upload-text="添加图片" />
			<button id="submit" plain="true" @click="onClickSubmit">提交反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				context:'',
				image:[],
				inputClass:'normal'
			}
		},
		onLoad() {
		},
		methods: {
			//读取到了临时地址并上传到数据库
			afterRead(event){
				const that=this;
				for(const filetmp of event.detail.file){
					filetmp.status='uploading';
					filetmp.url=filetmp.path;
					filetmp.fileID=null;
					that['image'].push(filetmp);
				}
				for(const index in that['image']){
					if(that['image'][index].status!='uploading')
						continue;
					wx.cloud.uploadFile({
						cloudPath: that.$options.methods.getRandomFileName(that['image'][index].url),
						filePath: that['image'][index].url,
						success: function(res){
							that['image'][index].fileID=res.fileID;
							that['image'][index].status='done';
							wx.cloud.callFunction({
							    name:'update_record',
							    data:{
							        cloud_link:res.fileID
							    }
							 });
						},
						fail: function(err){
							that['image'][index].status='failed';
						}
					});
				}
			},
			//点击删除
			onDelete(event){
				const index=event.detail.index;
				this[`image`].splice(index, 1);
			},
			//得到随机名
			getRandomFileName(fileName){
				const index= fileName.lastIndexOf(".");
				const type = fileName.substr(index+1);
				const date = new Date();
				const name=date.getTime()+Math.random().toString(36).substr(2);
				return name+'.'+type;
			},
			//提交反馈
			onClickSubmit(){
				const that=this;
				console.log(that['email']);
				console.log(that['context']);
				if(that['inputClass']=='errEmail'){
					uni.showToast({
						title:'邮箱格式不符合要求哦',
						icon:'none',
						duration:1200
					});
					return ;
				}else if(that['context']==''){
					uni.showToast({
						title:'还没有输入反馈内容哦',
						icon:'none',
						duration:1200
					});
					return ;
				}
				uni.navigateBack();
				uni.showToast({
					title:'感谢您的反馈，我们会尽快回复',
					icon:'none',
					duration:1200
				});
			},
			//检查邮箱
			checkEmail(){
				const that=this;
				var isEmail = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
				if(!isEmail.test(that['email']))
					that['inputClass']='errEmail';
				else
					that['inputClass']='okEmail';
			},
			//input得到焦点
			nowInput(){
				const that=this;
				that['inputClass']='normal';
			}
		}
	}
</script>
<style>

</style>
<style scoped>
	.mainWindow{
		padding: 1rem;
	}
	textarea{
		width: 90%;
		margin: 0 auto;
		padding: 1rem;
		background-color: #F1F1F1;
		border-radius: 0.25rem;
		text-align: left;
		overflow: auto;
		margin-bottom: 1rem;
	}
	.normal{
		
	}
	.errEmail{
		color: red;
	}
	.okEmail{
		color: #4CD964;
	}
</style>
