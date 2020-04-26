<template>
    <div class="Baby" :class="this.babyIndex" @click="handleBabyClick">
        <div class="card parentCard mb-4 shadow p-3 bg-white rounded">
            <div class="card-body p-1">
                <BabyCardHeader :babyItem="this.babyItem"></BabyCardHeader>
                <div class="card mb-1 shadow p-3 bg-white rounded  babyDetailTable"
                     v-if="this.babyItem.breastfeeding.length>0">
                    <h6 class="mb-0" :class="this.genderColor">
                        <FontAwesomeIcon icon="baby"/>
                        Bebeğin Son Durumu
                    </h6>
                    <hr/>
                    <div class="row small">
                        <div class="col text-right">Son Yediği :</div>
                        <div class="col text-left">{{sonYedigiTur}}</div>
                    </div>
                    <div class="row small">
                        <div class="col text-right">Miktar :</div>
                        <div class="col text-left">
                            <FontAwesomeIcon icon="balance-scale-right" :class="this.genderColor"/>
                            {{sonYedigiMiktar}}cc
                        </div>
                    </div>
                    <div class="row small">
                        <div class="col text-right">Son Emzirme :</div>
                        <div class="col text-left">
                            <FontAwesomeIcon icon="clock" :class="this.genderColor"/>
                            {{this.getEmzirmeSaatiFormatted}}
                        </div>
                    </div>
                    <div class="row small">
                        <div class="col text-right">Geçen Süre :</div>
                        <div class="col text-left">
                            <FontAwesomeIcon icon="hourglass-end" :class="this.genderColor"/>
                            {{this.getSonEmzirmedenBuYanaGecenSure}}
                        </div>
                    </div>
                    <div class="row small">
                        <div class="col text-right">Açlık Durumu :</div>
                        <div class="col  text-left">
                            <FontAwesomeIcon :icon="this.babyHungeryLevel.icon" :class="this.babyHungeryLevel.class"
                                             size="2x"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BabyCardHeader from "./BabyCardHeader";

    export default {
        components: {BabyCardHeader},
        props: {
            babyItem: Object,
            babyIndex: String
        },
        data: function () {
            return {
                sonEmzirmeSaati: 0,
                sonEmzirmedenBuYanaGecenSure: 0,
                sonYedigiTur: "",
                sonYedigiMiktar: 0,
                babyHungeryLevel: {}
            }
        },
        computed: {
            babyImage: function () {
                return require("../assets/" + this.babyItem.image);
            },
            getSonEmzirmedenBuYanaGecenSure: function () {
                return Math.floor(this.sonEmzirmedenBuYanaGecenSure / 60) + "." +
                    (this.sonEmzirmedenBuYanaGecenSure % 60 < 10 ? "0" + this.sonEmzirmedenBuYanaGecenSure % 60 : this.sonEmzirmedenBuYanaGecenSure % 60)
            },
            getEmzirmeSaatiFormatted: function () {
                return new Date(this.sonEmzirmeSaati).toLocaleString("tr-TR");
            },
            genderColor: function () {
                return (this.babyItem.gender ? "text-info" : "text-pink");
            }
        },
        mounted() {
            this.sonEmzirmeSaatiFunc();
            this.sonYedigiFunc();
            this.sonYedigiMiktarFunc();
            this.calculateGecenSure();
            this.babyHungeryLevelFunc();

        },
        methods: {
            calculateGecenSure: function () {
                const gecenzaman = Date.now() - Date.parse(this.sonEmzirmeSaati);
                var dakika = Math.floor(Math.floor(gecenzaman / 1000) / 60);
                this.sonEmzirmedenBuYanaGecenSure = dakika;
            },
            getSonEmzirme: function () {
                return this.babyItem.breastfeeding[this.babyItem.breastfeeding.length - 1];
            },
            sonYedigiFunc: function () {
                if (this.getSonEmzirme() != null) {
                    if (this.getSonEmzirme().mealType === 0) {
                        this.sonYedigiTur = "Anne Sütü";
                    } else if (this.getSonEmzirme().mealType === 1) {
                        this.sonYedigiTur = "Mama";
                    } else if (this.getSonEmzirme().mealType === 2) {
                        this.sonYedigiTur = "Ek Gıda";
                    }
                }
            },
            sonYedigiMiktarFunc: function () {
                this.sonYedigiMiktar = this.getSonEmzirme() != null ? this.getSonEmzirme().volume : "";
            },
            sonEmzirmeSaatiFunc: function () {
                this.sonEmzirmeSaati = this.getSonEmzirme() != null ? this.getSonEmzirme().time : "";
            },
            babyHungeryLevelFunc: function () {
                if (this.sonEmzirmedenBuYanaGecenSure < 31) {
                    this.babyHungeryLevel = {icon: "battery-full", class: "text-success"};
                } else if (this.sonEmzirmedenBuYanaGecenSure < 61) {
                    this.babyHungeryLevel = {icon: "battery-three-quarters", class: "text-info"};
                } else if (this.sonEmzirmedenBuYanaGecenSure < 91) {
                    this.babyHungeryLevel = {icon: "battery-half", class: "text-warning"};
                } else if (this.sonEmzirmedenBuYanaGecenSure < 121) {
                    this.babyHungeryLevel = {icon: "battery-quarter", class: "text-danger"};
                } else {
                    this.babyHungeryLevel = {icon: "battery-empty", class: ""};
                }
            },
            handleBabyClick: function () {
                this.$emit("click");
            }
        },
        watch: {
            babyItem: {
                immediate: true,
                deep: true,
                handler(oldValue, newValue) {
                    if (newValue != null && oldValue != null && newValue !== oldValue) {
                        this.sonYedigiFunc();
                        this.sonYedigiMiktarFunc();
                        this.sonEmzirmeSaatiFunc();
                        this.calculateGecenSure();
                        this.babyHungeryLevelFunc();
                    }
                }
            }
        }
    };
</script>
