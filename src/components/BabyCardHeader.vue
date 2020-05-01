<template>
    <div class="BabyCardHeader">
        <div class="card mb-3 shadow p-2 bg-white rounded">
            <div class="row no-gutters">
                <div class="col-md-2 col-4 p-2">
                    <img :src="this.babyItem.image" class="card-img-top" :alt="this.babyItem.name" width="64">
                </div>
                <div class="col-md-8 col-8">
                    <div class="card-body">
                        <h5 class="card-title m-0 font-weight-bold" :class="this.genderColor">
                            <FontAwesomeIcon :icon="this.genderIcon"/>
                            {{this.babyItem.name}}
                        </h5>
                        <p class="card-text small m-0">Doğ. Tarihi : {{this.babyItem.birthDate}}</p>
                        <p class="card-text m-0"><small class="text-muted">{{this.omurStr}}günlük</small></p>
                    </div>
                    <div class="card-footer p-0 bg-white border-0 fa-pull-right pr-1" @click.stop="handleHistoryClick">
                        <font-awesome-icon icon="search" class="text-danger"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "BabyCardHeader",
        props: {
            babyItem:Object
        },
        data:function(){
            return {
                omurStr:""
            }
        },
        created() {
            this.calculateOmur();
        },
        computed:{
            genderIcon:function () {
                return (this.babyItem.gender? "mars" : "venus");
            },
            genderColor:function () {
                return (this.babyItem.gender? "text-info" : "text-pink");
            }
        },
        methods:{
            calculateOmur: function () {
                const time = new Date().setHours(0,0,0,0) - Date.parse(this.babyItem.birthDate);
                const gun = time / (24 * 60 * 60*1000);

                let yilArtigi = gun % 365;

                if (gun > 365) {
                    const yil = (gun - yilArtigi) / 365;
                    this.omurStr = yil +"yıl ";
                }

                if (yilArtigi > 30) {
                    const ayArtigi = yilArtigi % 30;
                    const ay = (yilArtigi - ayArtigi) / 30;
                    this.omurStr = ay +"ay ";
                    yilArtigi = ayArtigi;
                }

                this.omurStr += Math.round(yilArtigi);

            },
            handleHistoryClick:function () {
                this.$emit("historyEvent");
            }
        }
    };
</script>
