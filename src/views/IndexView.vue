<script>
export default {
    data() {
        return {
            
        };
    },
    mounted() {
        document.getElementById('frontButton').addEventListener('click', function() {
            window.location.href = 'https://tibamef2e.com/chd104/g6/front/Home';
        });
        document.getElementById('backButton').addEventListener('click', function() {
            window.location.href = 'https://tibamef2e.com/chd104/g6/admin/';
        });
    },
}
</script>

<template>
    <div class="choosePage">
        <div class="g6Title">Cara Car</div>
        <div class="btnLeft">
            <RouterLink to="/Home">
                <button id="frontButton">前台</button>
            </RouterLink>
        </div>
        <div class="bImg">
            <img src="../../public/imgs/chooseBG.jpg" alt="bg">
        </div>
        <div class="btnRight">
            <!-- <RouterLink to="/BackLogin"> -->
                <button id="backButton">後台</button>
            <!-- </RouterLink> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.g6Title{
            position: absolute;
            top: 0;left: 0;
            width: 100%;
            text-align: center;
            padding: 10px;
            font-size: 40px;
            font-family:'Kosugi Maru', sans-serif;
        }
        .choosePage{
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .btnLeft, .btnRight{
            position: relative;
            width: 250px;
            height: 250px;
            &:hover button{
                transform: scaleX(-1);
            }
        }
        .btnLeft{
            margin-left: 10px;
        }
        button{
            width: 250px;
            height: 250px;
            border-radius: 125px;
            font-size: 36px;
            border:none;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            transition: transform 0.3s ease-in-out;
            background-color: rgb(142, 163, 194);;
        }
        #frontButton:hover{
            background-image: url('../../public/imgs/choose-lion.svg');
            background-size: contain;
            background-repeat: no-repeat;
            color: transparent
        }
        #backButton:hover{
            background-image: url('../../public/imgs/choose-lion\(left\).svg');
            background-size: contain;
            background-repeat: no-repeat;
            color: transparent;
        }
        .bImg{
            width: 40%;
            img{
                width: 100%;
                vertical-align: top;
            }
        }
</style>