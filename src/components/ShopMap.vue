

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
    mounted() {
        const map = L.map('shopMap').setView([24.957672860339283, 121.22503247550222], 16)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
	        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }).addTo(map);

        var marker = L.marker([24.957672860339283, 121.22503247550222]).addTo(map);

        marker.bindPopup("<b>Cara - Car</b><br>桃園市中壢區復興路46號8樓").openPopup();
    },
}

</script>

<style lang="scss" scope>
@import '@/assets/scss/components/shopMap.scss';
</style>
















