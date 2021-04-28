<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let envId='meet-the-world-2g7kshiy287c49fe';
			wx.cloud.init({
			  env: envId,
			  traceUser: true
			});
			Vue.prototype.db=wx.cloud.database({env:envId});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
		font-family:'myFont';
		src: url('https://public.kadia.link/font/myFont.ttf');
	}
	page{
		font-family: myFont;
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;
	}
</style>
