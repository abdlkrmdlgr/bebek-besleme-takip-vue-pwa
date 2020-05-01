<template>
    <div class="BabyDetail">
        <div class="card parentCard mb-4 shadow p-3 bg-white rounded">
            <div class="card-body p-1">
                <BabyCardHeader :babyItem="babyItem"></BabyCardHeader>
                <div class="card mb-4 shadow p-3 bg-white rounded  breastFeedingTable">
                    <h6 class="mb-0 text-danger">
                        <FontAwesomeIcon icon="history"/>
                        Beslenme Geçmişi
                    </h6>
                    <hr/>
                    <div class="row small font-weight-bold">
                        <div class="col">Zaman</div>
                        <div class="col-2">Tip</div>
                        <div class="col-3">Miktar</div>
                        <div class="col-1"></div>
                    </div>
                    <div class="d-flex flex-column-reverse">
                        <div
                                :v-if="babyItem.breastfeeding!==undefined && babyItem.breastfeeding.length>0"
                                :class="isOdd(index)" class="row small p-2 "
                                v-for="(breastfeeding,index) in babyItem.breastfeeding" :key="index">
                            <div class="col">{{breastfeeding.time |trTime}}</div>
                            <div class="col-2">
                                <span class="badge badge-success" v-if="breastfeeding.mealType===0">Süt</span>
                                <span class="badge badge-secondary" v-if="breastfeeding.mealType===1">Mama</span>
                            </div>
                            <div class="col-3">
                                <span class="badge badge-warning">{{breastfeeding.volume}}cc</span>
                            </div>
                            <div class="col-1">
                                <font-awesome-icon icon="trash" class="text-danger"
                                                   @click="deleteHistoryItem(index,breastfeeding)"/>
                            </div>
                        </div>

                    </div>
                    <div v-if="babyItem.breastfeeding===undefined">
                        <span class="badge badge-danger">Henüz Bebeğinizi Beslemediniz.</span>
                    </div>
                </div>
            </div>
        </div>

        <b-modal v-if="this.selectedBreastFeedingForDelete!==null"
                 v-model="modalDeleteHistoryShow" title="Kaydı Sil"
                 :centered="true" :scrollable="false" headerCloseLabel="Kapat"
                 aria-label="Beslenme Kaydı Sil"
                 :no-close-on-backdrop="true"
                 cancel-variant="warning" cancel-title="Vazgeç"
                 ok-variant="info" ok-title="Evet, Sil"
                 @ok="confirmBreastFeedingDeleting">
            <div class="col-md-12 small p-0">
                <p>{{this.selectedBreastFeedingForDelete.time| trTime}} tarihindeki
                    {{this.selectedBreastFeedingForDelete.volume}}cc
                    <span v-if="this.selectedBreastFeedingForDelete.mealType===0">Süt</span>
                    <span v-if="this.selectedBreastFeedingForDelete.mealType===1">Mama</span> kaydını siliyorsunuz.
                </p>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import BabyCardHeader from "./BabyCardHeader";

    export default {
        components: {BabyCardHeader},
        props: {
            babyItem: Object,
            selectedBabyIndex: String
        },
        data: function () {
            return {
                babyItemData: null,
                reversedData: null,
                modalDeleteHistoryShow: false,
                selectedBreastFeedingIndexForDelete: null,
                selectedBreastFeedingForDelete: null
            }
        },
        methods: {
            isOdd: function (index) {
                return index % 2 === 0 ? this.genderColor() + " text-dark" : "bg-white text-dark";
            },
            genderColor: function () {
                return (this.babyItem.gender ? "bg-boy" : "bg-girl");
            },
            deleteHistoryItem: function (index, breastfeeding) {
                this.modalDeleteHistoryShow = true;
                this.selectedBreastFeedingIndexForDelete = index;
                this.selectedBreastFeedingForDelete = breastfeeding;
            },
            confirmBreastFeedingDeleting: function () {
                this.babyItem.breastfeeding.splice(this.selectedBreastFeedingIndexForDelete, 1);
                let allBaby = JSON.parse(localStorage.getItem("babies")).allBaby;
                allBaby[this.selectedBabyIndex].breastfeeding = this.babyItem.breastfeeding;
                let allBabyJsonString = JSON.stringify({allBaby: allBaby});
                localStorage.setItem("babies", allBabyJsonString);
            }
        },
        filters: {
            trTime: function (time) {
                return new Date(time).toLocaleString("tr-TR");
            }
        }
    };
</script>
