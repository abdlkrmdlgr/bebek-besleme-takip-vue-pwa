<template>
    <div class="BabyDetail">
        <div class="card parentCard mb-4 shadow p-3 bg-white rounded">
            <div class="card-body p-1">
                <BabyCardHeader :babyItem="this.babyItem"></BabyCardHeader>
                <div class="card mb-4 shadow p-3 bg-white rounded  breastFeedingTable">
                    <h6 class="mb-0 text-danger">
                        <FontAwesomeIcon icon="history"/>
                        Emzirme Geçmişi
                    </h6>
                    <hr/>
                    <div class="row small font-weight-bold">
                        <div class="col">Zaman</div>
                        <div class="col-2">Tip</div>
                        <div class="col-3">Miktar</div>
                    </div>
                    <div :class="isOdd(index)" class="row small p-2"
                         v-for="(breastfeeding,index) in this.babyItemData.breastfeeding" :key="index">
                        <div class="col">{{formatDate(breastfeeding.time)}}</div>
                        <div class="col-2">
                            <span class="badge badge-success" v-if="breastfeeding.mealType===0">Süt</span>
                            <span class="badge badge-secondary" v-if="breastfeeding.mealType===1">Mama</span>
                        </div>
                        <div class="col-3">
                            <span class="badge badge-warning">{{breastfeeding.volume}}cc</span>
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
            babyItem: Object
        },
        data: function () {
            return {
                babyItemData: null
            }
        },
        mounted() {
            this.babyItemData = this.babyItem;
            this.babyItemData.breastfeeding = this.babyItemData.breastfeeding.reverse();
        },
        methods: {
            isOdd: function (index) {
                return index % 2 === 0 ? this.genderColor() + " text-dark" : "bg-white text-dark";
            },
            genderColor: function () {
                return (this.babyItem.gender ? "bg-boy" : "bg-girl");
            },
            formatDate: function (dateTime) {
                return new Date(dateTime).toLocaleString("tr-TR")
            }
        }
    };
</script>
