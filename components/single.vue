<template name="single">
	<view>
		<view class="mainWindow">
			<view class="author">
				<view class="authorInfo">
					<image class="favicon" :src="info.cre_user_favicon" mode="aspectFill" /><label class="nickName" v-text="info.cre_user"></label>
				</view>
				<van-icon :name="collectionName" size="30" @click="onClickCollection"/>
			</view>
			<p style="text-align: left;">{{info.cre_time}}</p>
			<p class="context" v-text="info.note_words" style="white-space: pre-wrap;"></p>
			<view style="text-align: left;margin-top: 20upx;">
				<image :class="imageClass" :wx:for="info.note_pic" wx:key="key" wx:for-item="item" :src="item" mode="aspectFill" @click="onClickIamge(item+'')" />
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
  export default {
    name:"single",
	props: {
		info:{
			type: Object,
			default: {}
		}
	},
	created() {
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
	},
    data() {
		return {
			imageClass:'oneImage',
			collectionName:'star'
		};
    },
	methods:{
		//浏览图片
		onClickIamge(now){
			const that=this;
			Vue.prototype.$imgHide.status=true;
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
			    content: '不再收藏这一条了吗',
			    success: function (res) {
			        if (res.confirm) {
			            that.$emit('delete');
			        }
			    }
			});
		}
	}
  }
</script>

<style scoped> 
	.mainWindow{
		margin: 20upx;
		padding: 30upx;
		//background-color: #DCDEE0;
		background-image: url(https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/myReadBk.png);
		border-radius: 20upx;
		text-align: center;
		border: 2rpx solid #d8d8d838;
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
		font-size: 36upx;
		width: 100%;
		text-align: left;
		word-wrap: break-word;
		word-break: break-all;
	}
	.oneImage{
		width: 630upx;
		height: 630upx;
		margin: 8upx;
	}
	.twoImage{
		width: 307upx;
		height: 307upx;
		margin: 8upx;
	}
	.mulImage{
		width: 203upx;
		height: 203upx;
		margin: 6upx;
	}
</style>