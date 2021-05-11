<template name="singleSelf">
	<view>
		<view class="mainWindow">
			<view class="author">
				<view class="authorInfo">
					<image style="height: 1.5rem; width: 1.5rem;" :src="lockType.url" @click="onClickLock" />
					<image class="favicon" :src="info.cre_user_favicon" mode="aspectFill" />
					<label class="nickName">{{info.cre_user}}</label>
				</view>
				<van-icon name="delete" size="30" @click="onClickCollection"/>
			</view>
			<p style="text-align: left;">{{info.cre_time}}</p>
			<p class="context">{{info.note_words}}</p>
			<view style="text-align: left;">
				<image :class="imageClass" :wx:for="info.note_pic" wx:key="key" wx:for-item="item" :src="item" mode="aspectFill" @click="onClickIamge(item+'')" />
			</view>
			<p style="margin-top: 1rem; text-align: left;">被收藏{{info.mininote_favored}}次</p>
		</view>
	</view>
</template>

<script>
  export default {
    name:"singleSelf",
	props: {
		info:{
			type: Object,
			default: {}
		}
	},
	mounted() {
		const that=this;
		if(that['info'].has_pic){
			if(that['info'].note_pic.length==1){
				that['imageClass']='oneImage';
			}else if(that['info'].note_pic.length==2||that['info'].note_pic.length==4){
				that['imageClass']='twoImage';
			}else
				that['imageClass']='mulImage';
		}else
			that['info'].note_pic=[];
		if(that['info'].mininote_type==1){
			that['lockType'].url='https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/locked.png'
			that['lockType'].type=1;
		}
	},
    data() {
		return {
			imageClass:'oneImage',
			lockType:{
				url:'https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/lock.png',
				type:0
			}
		};
    },
	methods:{
		//浏览图片
		onClickIamge(now){
			const that=this;
			wx.previewImage({
			  current: now,
			  urls: that['info'].note_pic
			})
		},
		//点击收藏
		onClickCollection(){
			const that=this;
			uni.showModal({
			    title: '提示',
			    content: '真的就要这样删掉了嘛',
			    success: function (res) {
			        if (res.confirm) {
			            that.$emit('delete');
			        }
			    }
			});
		},
		//点击锁
		onClickLock(){
			const that=this;
			//调用后端
			console.log(that['info'])
			wx.cloud.callFunction({
				name:'alter_note',
				data:{
					note_id:that['info']._id,
				},
				success:function(res){
					console.log('alter_note success',res);
				},
				fail:function(err){
					console.log('alter_note fail',err);
				}
			});
			//...
			if(that['lockType'].type==0){
				that['lockType'].url='https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/locked.png'
				that['lockType'].type=1;
			}else{
				that['lockType'].url='https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/lock.png'
				that['lockType'].type=0;
			}
		}
	}
  }
</script>

<style scoped> 
	.mainWindow{
		margin: 20upx;
		padding: 30upx;
		background-color: #DCDEE0;
		border-radius: 20upx;
		text-align: center;
	}
	.author{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.authorInfo{
		display: flex;
		align-items: center;
	}
	.favicon{
		margin-left: 0.3rem;
		height: 2rem;
		width: 2rem;
		border-radius: 1rem;
	}
	.nickName{
		margin-left: 0.3rem;
		font-size: 1rem;
	}
	.context{
		margin-top: 25upx;
		width: 100%;
		text-align: left;
		word-wrap: break-word;
		word-break: break-all;
	}
	.oneImage{
		width: 630upx;
		height: 630upx;
		margin: 5upx;
	}
	.twoImage{
		width: 310upx;
		height: 310upx;
		margin: 5upx;
	}
	.mulImage{
		width: 208upx;
		height: 208upx;
		margin: 5upx;
	}
</style>