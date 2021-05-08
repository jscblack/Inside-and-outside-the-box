<template name="single">
	<view>
		<view class="mainWindow">
			<view class="author">
				<view class="authorInfo">
					<image class="favicon" :src="info.cre_user_favicon" mode="aspectFill" /><label class="nickName">{{info.cre_user}}</label>
				</view>
				<van-icon :name="collectionName" size="30" @click="onClickCollection"/>
			</view>
			<p>{{info.cre_time}}</p>
			<p class="context">{{info.note_words}}</p>
			<span style="text-align: center;">
				<image :class="imageClass" :wx:for="info.note_pic" wx:key="key" wx:for-item="item" :src="item" mode="aspectFill" @click="onClickIamge(item+'')" />
			</span>
		</view>
	</view>
</template>

<script>
  export default {
    name:"single",
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
			            wx.cloud.callFunction({
			            	name:'alter_fav',
			            	data:{
			            		note_id:that['info']._id,
			            		oper:2
			            	},
			            	success:function(res){
			            		console.log('alter_fav success',res);
			            	},
			            	fail:function(err){
			            		console.log('alter_fav fail',err);
			            	}
			            });
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
		background-color: #DCDEE0;
		border-radius: 20upx;
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