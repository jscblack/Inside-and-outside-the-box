<template name="myRead">
	<view :class="mainClass">
		<view class="cover" @click="closeRead"></view>
		<view v-show="boxClass=='box'" class="read">
			<view v-show="context!=''" class="author">
				<van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" height="2rem" width="2rem" fit="cover" /><label class="nickName">nickName</label>
				<p style="text-align: center; font-weight: 500;">2019-11-11 12:00:00</p>
			</view>
			<p>{{context}}</p>
			<span :wx:for="image" wx:key="key" wx:for-item="item">
				<image :class="imageClass" :src="item" mode="aspectFill" @click="onClickIamge(item+'')" />
			</span>
		</view>
		<image :class="boxClass" src="/static/image/box.png" mode="aspectFill" @click="onClickBox"></image>
	</view>
</template>

<script>
  export default {
    name:"myRead",
	props: {
		content:{
			type:Object,
			default:null
		}
	},
	mounted(){
		this.$options.methods.updateContent(this);
	},
    data() {
		return {
			boxClass:'box',
			mainClass:'main',
			imageClass:'mulImage',
			context:'',
			image:[]
		};
    },
	methods:{
		//关闭
		closeRead(){
			const that=this;
			if(that['boxClass']!='box')
				return ;
			that['mainClass']='closeMain';
			that['boxClass']='exit';
			setTimeout(function(){
				that.$emit('close');
			},500);
		},
		//摇箱子
		onClickBox(){
			const that=this;
			if(that['boxClass']!='box')
				return ;
			that.$emit('onClickBox');
			that['boxClass']='boxShaking';
			const srcurl="/static/music/shakeBox.mp3";
			const innerAudioContext = wx.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = srcurl;	
			setTimeout(function(){
				that.$options.methods.updateContent(that);
				that['boxClass']='box';
			},1200);
		},
		//更新content
		updateContent(that){
			if(typeof(that['content'])=='undefined'){
				uni.showToast({
					title:'好像是一张空纸条',
					icon:'none',
					duration:1200
				});
				that['context']='';
				that['image']=[];
				return ;
			}
			that['context']=that['content'].data.note_words;
			if(that['content'].data.has_pic){
				if(that['content'].data.note_pic.length==1){
					that['imageClass']='oneImage';
				}else if(that['content'].data.note_pic.length==2||that['content'].data.note_pic.length==4){
					that['imageClass']='twoImage';
				}else
					that['imageClass']='mulImage';
				that['image']=that['content'].data.note_pic;
			}else
				that['image']=[];
		},
		//预览图片
		onClickIamge(now){
			const that=this;
			wx.previewImage({
			  current: now,
			  urls: that['image']
			})
		}
	}
  }
</script>

<style scoped> 
	@keyframes shaking{
	    0% { transform: rotate(0deg); }
	   10% { transform: rotate(-10deg); }
	   20% { transform: rotate(0deg); }
	   30% { transform: rotate(10deg); }
	   40% { transform: rotate(0deg); }
	   50% { transform: rotate(-10deg); }
	   60% { transform: rotate(0deg); }
	   70% { transform: rotate(10deg); }
	   80% { transform: rotate(0deg); }
	   90% { transform: rotate(-10deg); }
	   100% { transform: rotate(0deg); }
	}
	@keyframes load{
		0% { opacity: 0.0 ;}
		100% {opacity: 1.0 ; }
	}
	@keyframes distory{
		0% { opacity: 1.0 ;}
		100% {opacity: 0 ; }
	}
	.main{
		animation: load 0.5s linear;
	}
	.closeMain{
		opacity: 0.0 ;
		animation: distory 0.5s linear;
	}
	.cover{
		width: 100%;
		height: 100%;
		background-color: #888888;
		opacity:0.8;
		position: fixed;
		z-index: 2;
	}
	.read{
		animation: load 0.5s linear;
		width: 550upx;
		min-height: 100upx;
		position: absolute;
		top: 10%;
		left: 50%;
		margin-left: -305upx;
		margin-bottom: 275upx;
		background-color: #C8C7CC;
		z-index: 2;
		text-align: center;
		padding: 30upx;
		border-radius: 50upx;
	}
	.read p{
		width: 100%;
		text-align: left;
		word-wrap: break-word;
		word-break: break-all;
	}
	.author{
		text-align: center;
		margin-bottom: 30upx;
	}
	.nickName{
		font-size: 45upx;
		font-weight: 500;
	}
	.oneImage{
		width: 510upx;
		height: 510upx;
		margin: 5upx;
	}
	.twoImage{
		width: 255upx;
		height: 255upx;
		margin: 5upx;
	}
	.mulImage{
		width: 170upx;
		height: 170upx;
		margin: 5upx;
	}
	.box{
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 3;
	}
	.exit{
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 3;
	}
	.boxShaking{
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 3;
		animation: shaking 0.3s linear infinite;
	}
</style>