<template>
	<view id="window">
		<form @submit="onSubmit">
			<textarea id="context" name="context" v-model="context" maxlength="2000"></textarea>
			<van-uploader image-fit="aspectFit" :file-list="image" multiple=true @after-read="afterRead" @delete="onDelete" preview-size="100px" max-count="9" upload-text="添加图片" />
			<radio-group @change="radioChange">
				<radio value="public" checked=true color="#000000" /><label style="margin-right: 20upx;">扔进纸箱</label>
				<radio value="private" color="#000000" /><label>藏在心里</label>
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
				mininote_type:0,
				submitText:'Submit'
			}
		},
		onLoad() {
		},
		methods: {
			//点击Submit
			onSubmit(){
				const that=this;
				if(that['context'].length==0){
					uni.showToast({
						title:'怎么能没有文字呢',
						icon:'none',
						duration:2000
					});
					return ;
				}
				for(const index in that['image']){
					if(that['image'][index].fileID==null){
						if(that['image'][index].status=='failed'){
							uni.showToast({
								title:'糟糕，有图片上传失败了，先把它给删掉趴',
								icon:'none',
								duration:2000
							});
						}else{
							uni.showToast({
								title:'别急嘛，图片还没上传完呐',
								icon:'none',
								duration:2000
							});
						}
						return ;
					}
				}
				that['submitText']='努力上传中呐...';
				const picNum=that['image'].length;
				let picID=[];
				for(const index in that['image']){
					picID.push(that['image'][index].fileID);
				}
				wx.cloud.callFunction({
					name:'upload_content',
					data:{
						pic_num:picNum,
						pic_content:picID,
						word_content:that['context'],
						mininote_type:that['mininote_type']
					},
					success:function(res){
						that['submitText']='Submit';
						const errCode=res.result.errCode;
						if(errCode==87014){
							uni.showToast({
								title:'文字或图片有违规哦！',
								icon:'none',
								duration:2000
							});
							return ;
						}else if(errCode!=23000){
							uni.showToast({
								title:'系统错误，错误代码'+errCode,
								icon:'none',
								duration:2000
							});
							return ;
						}
						uni.navigateBack();
						uni.showToast({
							title:'Okay',
							icon:'none',
							duration:1200
						});
					},
					fail:function(err){
						that['submitText']='Submit';
						uni.showToast({
							title:'系统错误，错误代码23003',
							icon:'none',
							duration:2000
						});
					}
				});
			},
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
						
					wx.compressImage({
					    src: that['image'][index].url,
					    quality: 50,
					    success: function(res) {
							console.log(res)
							console.log('tmp/'+that.$options.methods.getRandomFileName(that['image'][index].url))
					    	wx.cloud.uploadFile({
					    		cloudPath: 'tmp/'+that.$options.methods.getRandomFileName(that['image'][index].url),
					    		filePath: res.tempFilePath,
					    		success: function(ret){
									console.log("checking img")
									wx.cloud.callFunction({
										name:'chk_imgsec',
										data:{
											url:ret.fileID
										},
										success:function(rer){
											//做一下处理，这边出错了可以直接提醒
										}
									});
									
					    		},
					    	});
					    }
					 })
					
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
			// 随机图片名
			getRandomFileName(fileName){
				const index= fileName.lastIndexOf(".");
				const type = fileName.substr(index+1);
				const date = new Date();
				const name=date.getTime()+Math.random().toString(36).substr(2);
				return name+'.'+type;
			},
			// 公开 匿名 私有
			radioChange(evt){
				const that=this;
				if(evt.target.value==='public')
					that.$data.mininote_type=0;
				else
					that.$data.mininote_type=1;
			}
		}
	}
</script>
<style>

</style>
<style scoped>
	#window{
		text-align: left;
		margin: 20upx;
	}
	#context{
		text-align: left;
		width: 100%;
		overflow:auto;
		margin-bottom: 30upx;
	}
	#submit{
		margin: 30upx auto;
		color: #000000;
		border: 2upx solid #000000;
	}
</style>
