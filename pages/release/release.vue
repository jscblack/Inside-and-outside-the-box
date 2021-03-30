<template>
	<view id="window">
		<form @submit="onSubmit">
			<textarea id="context" name="context" v-model="context"></textarea>
			<image id="camera" src="/static/image/camera.png" @click="onClickImage"></image>
			<view id="preview">
				<image v-for="item in imageSuccess" :src="item"></image>
			</view>
			<radio-group @change="radioChange">
				<radio value="public" checked=true color="#3F536E" /><label style="margin-right: 20upx;">公开</label>
				<radio value="anonymous" color="#3F536E" /><label style="margin-right: 20upx;">匿名</label>
				<radio value="private" color="#3F536E" /><label>私有</label>
			</radio-group>
			<button id="submit" type="primary" plain="true" form-type="submit" v-text="submitText" :disabled="submitText!=='Submit'"></button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context:'',
				image:[],
				imageSuccess:[],
				imageId:[],
				mininote_type:0,
				submitText:'Submit'
			}
		},
		onLoad() {
			
		},
		methods: {
			//Submit
			onSubmit(){			
				var that=this;
				if(that.$data.context.length===0)
				{
					uni.showToast({
					    title: '先在纸条上写点东西趴',
						duration: 2000,
						icon:"none"
					});
					return ;
				}
				that.$data.submitText='努力上传中...';
				var pic_num=that.$data.imageId.length;
				var pic_fileID=(that.$data.imageId.length>0)?that.$data.imageId:null;
				console.log(pic_num);
				console.log(pic_fileID);
				wx.cloud.callFunction({
					name:'upload_content',
					data:{
						pic_num:pic_num,
						pic_content:pic_fileID,
						word_content:that.$data.context,
						has_location:false,
						location:null,
						mininote_type:that.$data.mininote_type
					},
					success:function(res){
						console.log(res);
						var code=res.result.errCode;
						if(code==23001){
							uni.showToast({
								title:'系统错误，错误代码23001',
								icon:'none',
								duration:1500
							});
						}else if(code==87014){
							uni.showToast({
								title:'图片或文字不能有敏感内容哦',
								icon:'none',
								duration:1500
							});
						}else if(code!=23000){
							uni.showToast({
								title:'系统错误，错误代码23002',
								icon:'none',
								duration:1500
							});
						}else
							uni.navigateBack();
						that.$data.submitText='Submit';
					},
					fail:function(err){
						uni.showToast({
							title:'系统错误，错误代码23003',
							icon:'none',
							duration:1500
						});
						that.$data.submitText='Submit';
					}
				});
			},
			// 随机图片名
			getRandomFileName(fileName){
				var index= fileName.lastIndexOf(".");
				var type = fileName.substr(index+1);
				var date = new Date();
				var name=date.getTime()+Math.random().toString(36).substr(2);
				return name+'.'+type;
			},
			//上传
			uploadAllFile(now,that){
				if(now==that.$data.image.length){
					var title;
					if(that.$data.imageId.length==0)
						title='上传失败'
					else
						title='上传成功'+that.$data.imageId.length+'张图片!';
					uni.showToast({
						title:title,
						icon:'none',
						duration:1500
					})
					that.$data.submitText='Submit';
					return ;
				}
				var randomName=that.$options.methods.getRandomFileName(that.$data.image[now]);
				wx.cloud.uploadFile({
					cloudPath: randomName,
					filePath: that.$data.image[now],
					success: function(res){
						that.$data.imageId.push(res.fileID);
						that.$data.imageSuccess.push(that.$data.image[now]);
						console.log('success');
					},
					fail: function(err){
						console.log(err);
						console:error;
					},
					complete:function(com){
						that.$options.methods.uploadAllFile(now+1,that);
					}
				});
			},
			// 选择图片
			onClickImage(){
				var that=this;
				that.$data.imageId=[];
				that.$data.imageSuccess=[];
				that.$data.image=[];
				uni.chooseImage({
					count: 9,
					success: function (res) {
						that.$data.image=res.tempFilePaths;
						console.log(that.$data.image);
						that.$data.submitText='图片上传中...';
						that.$options.methods.uploadAllFile(0,that);
					}
				});
			},
			// 公开 匿名 私有
			radioChange(evt){
				var that=this;
				if(evt.target.value==='public')
					that.$data.mininote_type=0;
				else if(evt.target.value==='anonymous')
					that.$data.mininote_type=1;
				else
					that.$data.mininote_type=2;
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped>
	#window{
		text-align: left;
		margin: 20upx;
	}
	#context{
		text-align: left;
		width: 100%;
		overflow: auto;
		margin-bottom: 10upx;
	}
	#camera{
		width: 60upx;
		height: 60upx;
	}
	#preview image{
		width: 210upx;
		height: 210upx;
		margin: 10upx 10upx;
	}
	#submit{
		margin: 30upx auto;
		
	}
</style>
