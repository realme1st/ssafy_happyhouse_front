<template>
	<div class="wrap">
		<section id="services" class="services section-bg">
			<div class="container" data-aos="fade-up">
				<header class="section-header">
					<br />
					<h3>오늘의 뉴스</h3>
					<br />
				</header>

				<div class="row g-5">
					<div class="col-md-6 col-lg-4 wow bounceInUp" data-aos="zoom-in" data-aos-delay="100">
						<div class="box">
							<div class="icon" style="background: #fceef3">
								<b-icon icon="newspaper" style="color: #ff689b"></b-icon>
							</div>
							<h4 class="title">
								<a href="https://www.mk.co.kr/news/realestate/view/2022/05/451516/"
									>"분당·일산·평촌·산본·중동 등 수도권 1기 신도시가 부동산 시장의 '뜨거운 감자'로
									부상했다. "</a
								>
							</h4>
							<p class="description">
								분당·일산·평촌·산본·중동 등 수도권 1기 신도시가 부동산 시장의 '뜨거운 감자'로
								부상했다. 윤석열정부가 1기 신도시 재정비를 위해 재건축·리모델링 규제 완화를 핵심으로
								한 특별법을 추진하기로 하면서 투자 수요도 몰리고 있다.
							</p>
						</div>
					</div>
					<div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
						<div class="box">
							<div class="icon" style="background: #fff0da">
								<b-icon icon="newspaper" style="color: #e98e06"></b-icon>
							</div>
							<h4 class="title">
								<a href="https://www.mk.co.kr/news/realestate/view/2022/03/233088/"
									>"올해 공동주택 공시가 상승률 20% 밑돌 듯"…작년 가격 급등에 인천 경기 30% 육박</a
								>
							</h4>
							<p class="description">
								정부가 이달 하순 공개하는 올해 공동주택 공시가격이 작년 수준을 밑돌 것으로 보인다.
								그동안 업계에서는 올해 전국과 서울 평균 공동주택 공시가격 상승률이 20% 이상 오를
								것이라는 전망이 많았다...
							</p>
						</div>
					</div>

					<div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300">
						<div class="box">
							<div class="icon" style="background: #e6fdfc">
								<b-icon icon="newspaper" style="color: #3fcdc7"></b-icon>
							</div>
							<h4 class="title">
								<a href="https://www.mk.co.kr/news/realestate/view/2022/05/451567/"
									>부동산 세무 전문가 박민수 더스마트컴퍼니 대표(제네시스박)가 올해 '똘똘한 여러
									채'의 시대가 열릴 것으로 예상했습니다."</a
								>
							</h4>
							<p class="description">
								김원철 골드앤모어 대표(부동산김사부)는 올해 이사를 계획 중이라면 철저히 '선매도
								후매수' 전략을 펴야 한다고 강조했습니다. ....
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
	background-color: #fff;
	min-height: 500px;
}
h3 {
	font-size: 36px;
	color: #413e66;
	text-align: center;
	font-weight: 700;
	position: relative;
	font-family: "Montserrat", sans-serif;
}
#services {
	padding: 60px 0 40px 0;
	position: relative;
	margin: auto;
	max-width: 1300px;
	width: calc(100% - 100px);
	height: 100%;
	min-height: 100%;
}
#services .box {
	padding: 30px;
	position: relative;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
	transition: all 0.3s ease-in-out;
	text-align: center;
	height: 100%;
}
#services .box:hover {
	transform: scale(1.1);
}
#services .icon {
	margin: 0 auto 15px auto;
	padding-top: 12px;
	display: inline-block;
	text-align: center;
	border-radius: 50%;
	width: 60px;
	height: 60px;
}
#services .icon {
	font-size: 36px;
	line-height: 0;
}
#services .title {
	font-weight: 700;
	margin-bottom: 15px;
	font-size: 18px;
}
#services .title a {
	color: #111;
}
#services .box:hover .title a {
	color: #1bb1dc;
}
#services .description {
	font-size: 14px;
	line-height: 28px;
	margin-bottom: 0;
	text-align: left;
}
#notice-add-btn {
	float: right;
	margin-top: 20px;
}
</style>
