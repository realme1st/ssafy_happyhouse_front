<template>
	<div class="box">
		<b-row class="mt-4 mb-4 text-center">
			<b-col class="sm-1">
				<b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
			</b-col>
			<b-col class="sm-1">
				<b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
			</b-col>
			<b-col class="sm-1">
				<b-form-select v-model="dongCode" :options="dongs" @change="searchApt"></b-form-select>
			</b-col>
		</b-row>
		<b-row>
			<b-col class="sm-1">
				<div id="map">
					<ul id="category">
						<li id="BK9" data-order="0">
							<span class="category_bg bank"></span>
							은행
						</li>
						<li id="MT1" data-order="1">
							<span class="category_bg mart"></span>
							마트
						</li>
						<li id="PM9" data-order="2">
							<span class="category_bg pharmacy"></span>
							약국
						</li>
						<li id="AG2" data-order="3">
							<span class="category_bg estate"></span>
							부동산
						</li>
						<li id="CE7" data-order="4">
							<span class="category_bg cafe"></span>
							카페
						</li>
						<li id="CS2" data-order="5">
							<span class="category_bg store"></span>
							편의점
						</li>
						<li id="SW8" data-order="6">
							<span class="category_bg subway"></span>
							지하철
						</li>
					</ul>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const houseStore = "houseStore";
export default {
	name: "HouseSearchBar",
	data() {
		return {
			sidoCode: null,
			gugunCode: null,
			dongCode: null,
			map: null,
			place: null,
			geocoder: null,
			infoWindow: null,
			markers: [],
			customOverlays: [], //마커 클릭하면 그 위에 정보창? 뜨는거
			overlayIdx: 0,
			categorymarkers: [],
			currCategory: "",
			placeOverlay: "",
			contentNode: "",
		};
	},
	mounted() {
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
	computed: {
		...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
	},
	created() {
		this.CLEAR_SIDO_LIST();
		this.Sido();
	},
	methods: {
		...mapActions(houseStore, ["Sido", "Gugun", "Dong", "HouseList"]),
		...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST"]),
		gugunList() {
			this.CLEAR_GUGUN_LIST();
			this.gugunCode = null;
			if (this.sidoCode) this.Gugun(this.sidoCode);
		},
		dongList() {
			this.CLEAR_DONG_LIST();
			this.dongCode = null;
			if (this.gugunCode) this.Dong(this.gugunCode);
		},
		async searchApt() {
			if (this.dongCode) {
				await this.HouseList(this.dongCode);
				this.displayMarkers(this.houses);
			}
		},
		initMap() {
			let mapContainer = document.getElementById("map"),
				mapOption = {
					center: new kakao.maps.LatLng(37.564343, 126.947613), // 처음 지도 좌표
					level: 3, // 지도의 확대 레벨
				};
			mapContainer.style.height = "500px";
			this.map = new kakao.maps.Map(mapContainer, mapOption);
			this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
			this.contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
			this.place = new kakao.maps.services.Places(this.map);
			this.infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
			this.geocoder = new kakao.maps.services.Geocoder();
			kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
			this.contentNode.className = "placeinfo_wrap";
			this.addEventHandle(this.contentNode, "mousedown", kakao.maps.event.preventMap);
			this.addEventHandle(this.contentNode, "touchstart", kakao.maps.event.preventMap);
			this.placeOverlay.setContent(this.contentNode);
			this.addCategoryClickEvent();
		},
		addEventHandle(target, type, callback) {
			if (target.addEventListener) {
				target.addEventListener(type, callback);
			} else {
				target.attachEvent("on" + type, callback);
			}
		},
		addCategoryClickEvent() {
			let category = document.getElementById("category"),
				children = category.children;

			for (let i = 0; i < children.length; i++) {
				children[i].onclick = this.onClickCategory;
			}
		},
		onClickCategory({ target }) {
			if (target.localName == "span") {
				target = target.parentElement;
			}
			let id = target.id,
				className = target.className;

			this.placeOverlay.setMap(null);

			if (className === "on") {
				this.currCategory = "";
				this.changeCategoryClass();
				this.removeMarker(this.categorymarkers);
			} else {
				this.currCategory = id;
				this.changeCategoryClass(target);
				this.searchPlaces();
			}
		},
		searchPlaces() {
			if (!this.currCategory) {
				return;
			}

			// 커스텀 오버레이를 숨깁니다
			this.placeOverlay.setMap(null);

			// 지도에 표시되고 있는 마커를 제거합니다
			this.removeMarker(this.categorymarkers);

			this.place.categorySearch(this.currCategory, this.placesSearchCB, {
				useMapBounds: true,
			});
		},
		placesSearchCB(data, status) {
			if (status === kakao.maps.services.Status.OK) {
				// 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
				this.displayPlaces(data);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				alert("결과없음");
			} else if (status === kakao.maps.services.Status.ERROR) {
				alert("오류");
			}
		},
		displayPlaces(places) {
			// 몇번째 카테고리가 선택되어 있는지 얻어옵니다
			// 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
			let order = document.getElementById(this.currCategory).getAttribute("data-order");

			for (let i = 0; i < places.length; i++) {
				// 마커를 생성하고 지도에 표시합니다
				let marker = this.addMarkerforcategory(
					new kakao.maps.LatLng(places[i].y, places[i].x),
					order
				);

				// 마커와 검색결과 항목을 클릭 했을 때
				// 장소정보를 표출하도록 클릭 이벤트를 등록합니다
				(function (marker, place, contentNode, placeOverlay, map) {
					kakao.maps.event.addListener(marker, "click", function () {
						var content =
							'<div class="placeinfo">' +
							'   <a class="title" href="' +
							place.place_url +
							'" target="_blank" title="' +
							place.place_name +
							'">' +
							place.place_name +
							"</a>";

						if (place.road_address_name) {
							content +=
								'    <span title="' +
								place.road_address_name +
								'">' +
								place.road_address_name +
								"</span>" +
								'  <span class="jibun" title="' +
								place.address_name +
								'">(지번 : ' +
								place.address_name +
								")</span>";
						} else {
							content +=
								'    <span title="' + place.address_name + '">' + place.address_name + "</span>";
						}

						content +=
							'    <span class="tel">' +
							place.phone +
							"</span>" +
							"</div>" +
							'<div class="after"></div>';

						contentNode.innerHTML = content;
						placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
						placeOverlay.setMap(map);
					});
				})(marker, places[i], this.contentNode, this.placeOverlay, this.map);
			}
		},
		changeCategoryClass(el) {
			let category = document.getElementById("category"),
				children = category.children,
				i;

			for (i = 0; i < children.length; i++) {
				children[i].className = "";
			}

			if (el) {
				if (el.localName == "span") {
					el = el.parentElement;
				}
				el.className = "on";
			}
		},

		addScript() {
			const script = document.createElement("script");
			script.onload = () => kakao.maps.load(this.initMap);
			script.src =
				"http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=&libraries=services,clusterer,drawing";
			document.head.appendChild(script);
		},
		addMarkerforcategory(position, order) {
			let imageSrc = require("@/assets/placesCategory.png"), // 마커 이미지 url, 스프라이트 이미지를 씁니다
				imageSize = new kakao.maps.Size(32, 32), // 마커 이미지의 크기
				imgOptions = {
					spriteSize: new kakao.maps.Size(38, 242), // 스프라이트 이미지의 크기
					spriteOrigin: new kakao.maps.Point(5, 3 + order * 34), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
					offset: new kakao.maps.Point(11, 32), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
				},
				markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
				marker = new kakao.maps.Marker({
					position: position, // 마커의 위치
					image: markerImage,
				});

			marker.setMap(this.map); // 지도 위에 마커를 표출합니다
			this.categorymarkers.push(marker); // 배열에 생성된 마커를 추가합니다

			return marker;
		},
		displayMarkers(places) {
			let fragment = document.createDocumentFragment();
			let bounds = new kakao.maps.LatLngBounds(); // 지도 재설정 범위정보 갖는 객체
			this.removeMarker(this.markers); //마커 제거

			for (var i = 0; i < places.length; i++) {
				let placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
				let marker = this.addMarker(placePosition, i);
				let searched = this.getListItem(i, places[i]); // 검색 결과 아파트들 넣기
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				bounds.extend(placePosition); //LanLangBounds 객체에 좌표 추가
				// mouseover 시 인포윈도우 out 시에 닫기
				(function (
					map,
					marker,
					title,
					code,
					place,
					displayInfowindow,
					removeInfowindow,
					showDetail
				) {
					displayInfowindow(marker, title, place);
					console.log(title + " " + code);
					kakao.maps.event.addListener(marker, "click", function () {
						// displayInfowindow(marker, title, place);
						// console.log(title + " " + code);

						showDetail();
					});
					// kakao.maps.event.addListener(map, "click", function () {
					//   removeInfowindow();
					// });
					searched.onmouseover = function () {
						displayInfowindow(marker, title);
					};
					searched.onmouseout = function () {
						removeInfowindow();
					};
				})(
					this.map,
					marker,
					places[i].aptName,
					places[i].aptCode,
					places[i],
					this.displayInfowindow,
					this.removeInfowindow,
					this.showDetail
				);
				fragment.appendChild(searched); //덩어리 한번에 추가하기 위해(Dom 조작 횟수 최소화하기 좋다고함)
			}
			// 마커 지도 표시
			// 검색 동으로 지도 이동
			this.map.setBounds(bounds);
		},
		addMarker(position) {
			//마커 지도 위에 표시
			let imageSrc = require("@/assets/houseMarker.png"),
				//"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", 기존꺼 우선keep

				imageSize = new kakao.maps.Size(30, 40), // 마커 이미지의 크기
				markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
				marker = new kakao.maps.Marker({
					position: position, // 마커의 위치
					image: markerImage,
				});
			marker.setMap(this.map); // 지도 위에 마커를 표출합니다
			this.markers.push(marker); // 배열에 생성된 마커를 추가합니다
			return marker;
		},
		removeMarker(markers) {
			//지도 위에 표시되고 있는 모든 마커 제거

			for (let i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		},
		displayPlaceInfo(place) {
			var content =
				'<div class="placeinfo">' +
				'   <a class="title" href="' +
				place.place_url +
				'" target="_blank" title="' +
				place.place_name +
				'">' +
				place.place_name +
				"</a>";

			if (place.road_address_name) {
				content +=
					'    <span title="' +
					place.road_address_name +
					'">' +
					place.road_address_name +
					"</span>" +
					'  <span class="jibun" title="' +
					place.address_name +
					'">(지번 : ' +
					place.address_name +
					")</span>";
			} else {
				content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
			}

			content +=
				'    <span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

			this.contentNode.innerHTML = content;
			this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
			this.placeOverlay.setMap(this.map);
		},
		getListItem(index, place) {
			//검색결과 항목을 Element로 반환(map api 키워드 장소검색부분 참고)
			let el = document.createElement("li");
			let itemStr = `
          <span class="markerbg marker_${index + 1}></span>
          <div class="info"><h5>${place.aptName}</h5>
          <span>${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
          `;
			el.innerHTML = itemStr;
			el.className = "item";
			return el;
		},
		displayInfowindow(marker, title, place) {
			var content = `<div class="customoverlay" onclick="showDetail()">
                                <span class="aptInfo">
                                  <div class = "aptName">${title}</div>
                                  <div class = "aptCost">${place.recentPrice}만원</div>
                                </span>
                            </div>`;
			let position = new kakao.maps.LatLng(
				marker.getPosition().getLat(),
				marker.getPosition().getLng()
			);
			let customOverlay = new kakao.maps.CustomOverlay({
				position: position,
				content: content,
				// xAnchor: 0.3,
				// yAnchor: 1.5,
				zIndex: 5,
			});
			this.customOverlays[this.overlayIdx] = customOverlay;
			this.customOverlays[this.overlayIdx++].setMap(this.map);
		},
		removeInfowindow() {
			if (this.overlayIdx > 0) {
				this.customOverlays[--this.overlayIdx].setMap(null);
			}
		},
		showDetail() {
			console.log("click");
			this.$bvModal.show("detailModal");
		},
	},
};
</script>

<style>
.customoverlay {
	position: relative;
	bottom: 75px;
	border-radius: 5px;
	border: 1px solid #ccc;
	border-bottom: 2px solid #ddd;
	float: left;
}
.customoverlay:nth-of-type(1) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}
.customoverlay .aptInfo {
	display: block;
	color: #000;
	border-radius: 5px;
	overflow: hidden;
	text-align: center;
	background: #fff;
	padding: 5px 8px;
	font-size: 10px;

	z-index: 4;
}
.customoverlay .aptCost {
	color: blue;
	padding: 5px 8px;
}
.customoverlay:after {
	content: "";
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: -12px;
	width: 22px;
	height: 12px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.map_wrap,
.map_wrap * {
	margin: 0;
	padding: 0;
	font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
	font-size: 12px;
}
.map_wrap {
	position: relative;
	width: 100%;
	height: 350px;
}
#category {
	position: absolute;
	top: 10px;
	left: 10px;
	border-radius: 5px;
	border: 1px solid #909090;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
	background: #fff;
	overflow: hidden;
	z-index: 2;
}
#category li {
	float: left;
	list-style: none;
	width: 50px;
	border-right: 1px solid #acacac;
	padding: 6px 0;
	text-align: center;
	cursor: pointer;
}
#category li.on {
	background: #eee;
}
#category li:hover {
	background: #ffe6e6;
	border-left: 1px solid #acacac;
	margin-left: -1px;
}
#category li:last-child {
	margin-right: 0;
	border-right: 0;
}
#category li span {
	display: block;
	margin: 0 auto 3px;
	width: 32px;
	height: 28px;
}
#category li .category_bg {
	background: url("@/assets/placesCategory.png") no-repeat;
}
#category li .bank {
	background-position: -4px -2px;
}
#category li .mart {
	background-position: -5px -40px;
}
#category li .pharmacy {
	background-position: -5px -78px;
}
#category li .estate {
	background-position: -5px -116px;
}
#category li .cafe {
	background-position: -5px -154px;
}
#category li .store {
	background-position: -5px -191px;
}
#category li .subway {
	background-position: -5px -229px;
}

.placeinfo_wrap {
	position: absolute;
	bottom: 28px;
	left: -150px;
	width: 300px;
}
.placeinfo {
	position: relative;
	width: 100%;
	border-radius: 6px;
	border: 1px solid #ccc;
	border-bottom: 2px solid #ddd;
	padding-bottom: 10px;
	background: #fff;
}
.placeinfo:nth-of-type(n) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
	content: "";
	position: relative;
	margin-left: -12px;
	left: 50%;
	width: 22px;
	height: 12px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
	color: #fff;
	text-decoration: none;
}
.placeinfo a,
.placeinfo span {
	display: block;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.placeinfo span {
	margin: 5px 5px 0 5px;
	cursor: default;
	font-size: 13px;
}
.placeinfo .title {
	font-weight: bold;
	font-size: 14px;
	border-radius: 6px 6px 0 0;
	margin: -1px -1px 0 -1px;
	padding: 10px;
	color: #fff;
	background: #d95050;
	background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
		no-repeat right 14px center;
}
.placeinfo .tel {
	color: #0f7833;
}
.placeinfo .jibun {
	color: #999;
	font-size: 11px;
	margin-top: 0;
}
.overlaybox {
	position: relative;
	width: 360px;
	height: 350px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png")
		no-repeat;
	padding: 15px 10px;
}
.overlaybox div,
ul {
	overflow: hidden;
	margin: 0;
	padding: 0;
}
.overlaybox li {
	list-style: none;
}
.overlaybox .boxtitle {
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png")
		no-repeat right 120px center;
	margin-bottom: 8px;
}
.overlaybox .first {
	position: relative;
	width: 247px;
	height: 136px;
	margin-bottom: 8px;
}
.overlaybox ul {
	width: 247px;
}
.overlaybox li {
	position: relative;
	margin-bottom: 2px;
	background: #2b2d36;
	padding: 5px 10px;
	color: #aaabaf;
	line-height: 1;
}
.overlaybox li span {
	display: inline-block;
}
.overlaybox li .number {
	font-size: 16px;
	font-weight: bold;
}
.overlaybox li .title {
	font-size: 13px;
}
.overlaybox li .last {
	font-size: 12px;
	margin-right: 15px;
}
.overlaybox ul .arrow {
	position: absolute;
	margin-top: 8px;
	right: 25px;
	width: 5px;
	height: 3px;
	background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png") no-repeat;
}
.overlaybox li .up {
	background-position: 0 -40px;
}
.overlaybox li .down {
	background-position: 0 -60px;
}
.overlaybox li .count {
	position: absolute;
	margin-top: 5px;
	right: 15px;
	font-size: 10px;
}
.overlaybox li:hover {
	color: #fff;
	background: #d24545;
}
.overlaybox li:hover .up {
	background-position: 0 0px;
}
.overlaybox li:hover .down {
	background-position: 0 -20px;
}
.box {
	margin-bottom: 50px;
}
</style>
