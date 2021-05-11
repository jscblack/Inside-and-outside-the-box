<!--
 * @Author       : Gehrychiang
 * @LastEditTime : 2021-05-11 17:22:51
 * @Website      : www.yilantingfeng.site
 * @E-mail       : gehrychiang@aliyun.com
 * @ProbTitle    : (记得补充题目标题)
-->
<template>
	<view>
		<view v-if="loading==true"><me-loading></me-loading></view>
		<view v-else>
			<single :wx:for="data" wx:for-item="item"  wx:for-index="index" wx:key="note" :info="item.det" @delete="onDelete(index+'')"></single>
			<view class="safeView"></view>
		</view>
		<my-tabbar now=1></my-tabbar>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import single from '../../components/single.vue'
	import meLoading from '../../components/meLoading.vue'
	export default {
		components: {
			myTabbar,
			single,
			meLoading
		},
		data(){
			return{
				loading:true,
				data:[]
			}
		},
		onShow(){
			const that=this;
			//时间转化
			function tansf(utc_datetime) {
				const time=new Date(utc_datetime);
				return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			}
			wx.cloud.callFunction({
				name:'pull_fav',
				data:{},
				success:function(res){
					that['data']=res.result.data;
					for(const index in that['data'])
						that['data'][index].det.cre_time=tansf(that['data'][index].det.cre_time);
					that['loading']=false;
					console.log('pull_fav ok',res);
				}
			});
		},
		onHide(){
			this.loading=true;
		},
		methods:{
			//删除收藏
			onDelete(indexS){
				const that=this;
				const index=parseInt(indexS);
				wx.cloud.callFunction({
					name:'alter_fav',
					data:{
						note_id:that['data'][index].det._id,
						oper:2
					},
					success:function(res){
						console.log('alter_fav success',res);
					},
					fail:function(err){
						console.log('alter_fav fail',err);
					}
				});
				that[`data`].splice(index, 1);
			}
		}
	}
</script>

<style scoped>
	.load{
		left: 50%;
		top: 40%;
		margin-left: -1rem;
		position: absolute;
	}
</style>
