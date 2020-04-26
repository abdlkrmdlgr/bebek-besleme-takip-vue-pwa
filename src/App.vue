<template>
    <div id="app">
        <!--        <router-view></router-view>-->
        <nav class="navbar fixed-bottom navbar-light bg-light">
            <a @click="modalNedirShow = !modalNedirShow" class="navbar-brand text-info" href="#">
                <FontAwesomeIcon icon="info-circle"/>
                Nedir?
            </a>

            <a @click="addNewEmzirme" class="navbar-brand" href="#">
                <FontAwesomeIcon icon="plus-circle" size="3x" class="text-success sticky-top plusIcon shadow"
                                 style="border: 4px solid #fff;border-radius: 90%;"/>
            </a>

            <a v-if="!pageBabyDetail" href="#" class="navbar-brand text-info" @click="handleViewBabyDetail">
                <FontAwesomeIcon icon="chart-line"/>
                Stats
            </a>
            <a v-if="pageBabyDetail" href="#" class="navbar-brand text-info" @click="handleHomePage">
                <FontAwesomeIcon icon="share" flip="horizontal"/>
                Home
            </a>
        </nav>

        <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="this.isAddNewVisible">
            <h6>Henüz bebek eklemediniz.</h6>
            <p class="btn btn-success h5" @click="addNewBaby">
                <font-awesome-icon icon="baby"/>
                Yeni Bebek Ekle
            </p>
        </div>

        <BabyList :babiesData="this.babies"
                  v-if="this.pageBabyList && this.babies!==null && this.babies.allBaby!==null && this.babies.allBaby.length>0"/>
        <BabyDetail :babyItem="this.selectedBabyItem" v-if="this.pageBabyDetail"/>

        <!-- #####MODALS##### -->
        <b-modal v-model="modalAddNewBabyShow" title="Bebek Ekle"
                 :centered="true" :scrollable="false" headerCloseLabel="Kapat"
                 aria-label="Bebek Ekle"
                 :no-close-on-backdrop="true"
                 cancel-variant="warning" cancel-title="Vazgeç"
                 ok-variant="info" ok-title="Kaydet"
                 @ok="handleAddNewBaby">
            <div class="col-md-12 small p-0">
                <form class="form-inline">
                    <div class="col-md-12 input-group mb-2">
                        <toggle-button
                                v-model="babyGender"
                                :width="120" :height="30" :fontSize="14"
                                :labels="{checked: 'Erkek', unchecked: 'Kız'}"/>
                    </div>

                    <div class="col-md-12 input-group mb-2">
                        <input type="text" step="10" class="form-control" placeholder="Bebeğinizi Adı"
                               v-model="babyName">
                    </div>
                    <div class="col-md-12 input-group mb-2">
                        <b-form-datepicker
                                v-model="birthDate"
                                placeholder="Doğum Tarihi Seç"
                                id="datepicker-birthdate"
                                :no-close-button="true">
                        </b-form-datepicker>
                    </div>

                    <div class="col-md-12 input-group">
                        <input
                                class="form-control"
                                @change="uploadImage()"
                                type="file"
                                name="photo"
                                accept="image/*"
                                placeholder="Fotoğraf Seç">
                    </div>
                </form>
            </div>
        </b-modal>

        <b-modal v-model="modalAddShow" title="Beslenme Kaydı"
                 :centered="true" :scrollable="false" headerCloseLabel="Kapat"
                 aria-label="Emzirme Kaydı"
                 :no-close-on-backdrop="true"
                 cancel-variant="warning" cancel-title="Vazgeç"
                 ok-variant="info" ok-title="Kaydet"
                 @ok="handleEmzirmeKayit">
            <div class="col-md-12 small p-0">
                <form class="form-inlin">
                    <div class="col-md-12 input-group mb-2 p-2 ml-2 h6">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                   id="inlineRadio1"
                                   :value="0" v-model="mealType">
                            <label class="form-check-label active mr-4" for="inlineRadio1">Anne Sütü</label>

                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                   :value="1" v-model="mealType">
                            <label class="form-check-label" for="inlineRadio2">Mama</label>
                        </div>
                    </div>

                    <div class="col-md-12 input-group mb-2">
                        <input type="number" step="10" class="form-control" placeholder="Miktar giriniz"
                               v-model="volume">
                        <div class="input-group-append">
                            <span class="input-group-text">CC</span>
                        </div>
                    </div>
                    <div class="col-md-12 input-group">
                        <b-form-timepicker
                                v-model="breastFeedingTime"
                                placeholder="Emzirme Saati Seç"
                                id="datepicker-invalid"
                                :hour12="false"
                                :hide-header="true"
                                :minutes-step="5"
                                :no-close-button="true">
                        </b-form-timepicker>
                    </div>
                </form>
            </div>
        </b-modal>
        <b-modal v-model="modalNedirShow" title="Nedir?"
                 :centered=true :scrollable=false headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="Emzirme Kaydı"
                 no-button>
            <div class="col-md-12 small">
                <p>Bu uygulama emzirme takibi yapabileceğiniz bir uygulamadır.
                    Kişisel verileriniz tamamen sizin telefonunuzda saklanır.
                    Hiç bir şekilde internet bağlantısı gerektirmez.
                    Bebeğinizi buraya ekleyerek takibini yapabilirsiniz.
                    Hiç bir kişisel veriniz işlenmez.
                </p>
                <p>
                    Bebeğinizi ekledikten sonra üzerine basıp seçebilir, emzirme/mama/ek gıda ile ne zaman doyurduysanız saatini girebilirsiniz. Daha sonra geriye dönük ne kadar süt/mama/gida verdiğinizi takip edebilirsiniz.
                </p>
                <p class="text-right small">@bortecoder</p>
                <p class="badge badge-success" @click="addNewBaby">
                    <font-awesome-icon icon="baby"/>
                    Yeni Bebek Ekle
                </p>
                <p class="badge badge-danger" @click="clearData">
                    <font-awesome-icon icon="brush"/>
                    Sıfırla
                </p>
            </div>
        </b-modal>
        <b-modal v-model="requiredVolumeError" title="Zorunlu Alan?"
                 :centered=true :scrollable=false headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="Zorunlu Alan"
                 no-button class="text-danger">
            <div class="col-md-12 small">
                <p class="text-center">
                    <font-awesome-icon icon="exclamation-triangle" class="text-warning" size="2x"/>
                </p>
                <p class="text-center">
                    Ekleme yapabilmek için miktar girmelisiniz.
                </p>
            </div>
        </b-modal>
        <b-modal v-model="modalAddErrorShow" title="Bebek Seçilmedi?"
                 :centered=true :scrollable=false headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="Bebek Seçimi"
                 no-button>
            <div class="col-md-12 small">
                <p>Emzirme kaydı girebilmeniz için öncelikle bir bebek seçmeniz gerekmektedir.</p>
            </div>
        </b-modal>
        <b-modal v-model="modalViewDetailError" title="Bebek Seçilmedi?"
                 :centered=true :scrollable=false headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="Bebek Seçimi"
                 no-button>
            <div class="col-md-12 small">
                <p>Detayları görebilmeniz için bebek seçmeniz gerekmektedir.</p>
            </div>

        </b-modal>
    </div>
</template>

<script>
    import BabyList from "./components/BabyList";
    import BabyDetail from "./components/BabyDetail";

    export default {
        name: 'App',
        components: {BabyDetail, BabyList},
        data: function () {
            return {
                pageBabyDetail: null,
                pageBabyList: null,
                modalNedirShow: false,
                modalAddShow: false,
                modalAddNewBabyShow: false,
                modalAddErrorShow: false,
                modalViewDetailError: false,
                requiredVolumeError: false,
                mealType: 0,
                volume: null,
                selectedBabyIndex: null,
                selectedBabyItem: null,
                babies: null,
                babiesUpdated: false,
                breastFeedingTime: (new Date().getHours() + ":" + new Date().getMinutes()),
                babyName: "",
                birthDate: null,
                babyGender: true,
                babyImages: null
            }
        },
        computed:{
            isDisabled:function () {
                return this.babies.length===0?"disabled":"";
            },
            isAddNewVisible:function () {
                return this.babies===null || this.babies.allBaby===null || this.babies.allBaby.length===0;
            }
        },
        created() {
            this.pageBabyList = true;
            this.pageBabyDetail = false;
            localStorage.removeItem("selectedBabyIndex");
            this.babies = JSON.parse(localStorage.getItem("babies"));
        },
        methods: {
            addNewEmzirme: function () {
                if (localStorage.getItem("selectedBabyIndex") != null &&
                    localStorage.getItem("selectedBabyIndex") > -1) {
                    this.modalAddShow = !this.modalAddShow
                } else {
                    this.modalAddErrorShow = !this.modalAddErrorShow
                }
            },
            addNewBaby: function () {
                this.modalAddNewBabyShow = !this.modalAddNewBabyShow;
            },
            clearData: function () {
                localStorage.removeItem("babies");
                this.babies=null;
            },
            handleEmzirmeKayit: function () {
                this.requiredVolumeError = false;
                if (this.volume > 0) {
                    const saatDakika = this.breastFeedingTime.split(":");
                    var emzirmeKaydi = {
                        time: new Date(new Date().setHours(parseInt(saatDakika[0]), parseInt(saatDakika[1]), 0)),
                        mealType: this.mealType,
                        volume: this.volume
                    };

                    const selectedBabyIndex = localStorage.getItem("selectedBabyIndex");
                    this.babies.allBaby[selectedBabyIndex].breastfeeding.push(emzirmeKaydi);
                    let jsonBabies = JSON.stringify(this.babies);
                    localStorage.setItem("babies", jsonBabies);
                    this.babies = JSON.parse(jsonBabies);
                    this.babiesUpdated = true;


                    this.mealType = 0;
                    this.volume = null;
                    this.breastFeedingTime = (new Date().getHours() + ":" + new Date().getMinutes());
                } else {
                    this.requiredVolumeError = true;
                }
            },
            handleViewBabyDetail: function () {
                if (localStorage.getItem("selectedBabyIndex") != null && localStorage.getItem("selectedBabyIndex") > -1) {
                    this.pageBabyList = false;
                    this.pageBabyDetail = true;
                    this.selectedBabyItem = this.getSelectedBabyItem();
                } else {
                    this.modalViewDetailError = !this.modalViewDetailError
                }
            },
            handleHomePage: function () {
                this.pageBabyList = true;
                this.pageBabyDetail = false;
                localStorage.setItem("selectedBabyIndex", null);
            },
            getSelectedBabyItem: function () {
                return this.babies.allBaby[this.getSelectedBabyIndex()];
            },
            getSelectedBabyIndex: function () {
                return localStorage.getItem("selectedBabyIndex");
            },
            uploadImage: function () {
                var file = document
                    .querySelector('input[type=file]')
                    .files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem("babyImage",e.target.result)
                };

                reader.readAsDataURL(file);
            },
            handleAddNewBaby: function () {
                let newBabyItem = {
                    name: this.babyName,
                    birthDate: this.birthDate,
                    gender: this.babyGender,
                    image: localStorage.getItem("babyImage"),
                    breastfeeding: []
                };

                var storedBabies = {};
                if (localStorage.getItem("babies")===null){
                    var allBabyArr = [];
                    allBabyArr.push(newBabyItem);
                    storedBabies = {allBaby: allBabyArr};
                }else{
                    storedBabies = JSON.parse(localStorage.getItem("babies"));
                    storedBabies.allBaby.push(newBabyItem);
                }

                this.babies = storedBabies;
                localStorage.setItem("babies", JSON.stringify(storedBabies));
                localStorage.removeItem("babyImage");
            }
        },
        watch: {
            selectedBabyItem: function () {
                this.selectedBabyItem = this.getSelectedBabyItem();
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 10px;
    }

    .plusIcon:hover {
        box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.15) !important
    }

    .text-pink {
        color: hotpink;
    }

    .bg-boy {
        background-color: #2da9bd7a !important
    }

    .bg-girl {
        background-color: #ffa6e0ba !important;
    }
</style>
