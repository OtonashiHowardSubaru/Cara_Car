

<template>
    
    <div id="shopMap"></div>

</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet'

export default {
    data(){
        return {
            zoom: 16,
        }
    },
    methods: {
        // 取得圖片的路徑函式
        getMarkerSrc(imgName){
            return new URL(`../assets/imgs/shopInfo/${imgName}`, import.meta.url).href
        },
    },
    mounted() {
        const map = L.map('shopMap').setView([24.957672860339283, 121.22503247550222], 16)
        const blackIcon = new L.Icon({
            iconUrl: this.getMarkerSrc('mapMarker.png'),
            iconSize: [40, 48],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
	        attribution: ''
        }).addTo(map);
        
        var marker = new L.marker([24.957672860339283, 121.22503247550222],{ icon: blackIcon }).addTo(map);
        
        marker.bindPopup("<b>Cara - Car</b><br>桃園市中壢區復興路46號8樓").openPopup();
        // 疑問 : marker在打包出去後,圖就遺失了, 不知道要怎麼確認路徑QUQ
    },
}

</script>

<style lang="scss" scope>
@import '@/assets/scss/components/shopMap.scss';
</style>
















