<template>
    <div id="app">
        <nav class="navbar fixed-bottom" v-if="pageBabyDetail" style="left: auto!important;">
            <a @click="editBaby" href="#">
                <FontAwesomeIcon icon="edit" size="3x" class="text-warning sticky-top plusIcon shadow bg-white"
                                 style="border: 4px solid #fff;border-radius: 30%;"/>
            </a>
        </nav>

        <nav class="navbar fixed-bottom" v-if="!pageBabyDetail" style="left: auto!important;">
            <a @click="modalNedirShow=!modalNedirShow" href="#">
                <FontAwesomeIcon icon="info-circle" size="3x" class="text-info sticky-top plusIcon shadow bg-white"
                                 style="border: 4px solid #fff;border-radius: 30%;"/>
            </a>
        </nav>

        <div class="row mb-1 shadow p-1 bg-white rounded text-muted font-weight-bold">
                <div class="navbar fixed-top mt-2 float-left col-4" v-if="pageBabyDetail">
                    <a v-if="pageBabyDetail"
                       @click="handleHomePage" href="#">
                        <span class="text-danger fa-pull-left" style="height:32px">
                            <FontAwesomeIcon icon="share" flip="horizontal" class="mr-1"/>Geri
                        </span>
                    </a>
                </div>

                <div class="h6 font-weight-bold text-center col-md-12">
                    <img src="./assets/favicon-96x96.png"
                         alt="Bebeğimi Büyüyüyorum"
                         width="32"/>
                    <i>Bebeğimi Büyütüyorum</i>
                </div>
        </div>

        <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="this.isAddNewVisible">
            <h6>Henüz bebek eklemediniz.</h6>
            <p class="btn btn-success h5" @click="addNewBaby">
                <font-awesome-icon icon="baby"/>
                Yeni Bebek Ekle
            </p>
        </div>
        <!--        Bebeklerin listelendiği sayfadır.-->
        <BabyList :babiesData="this.babies" @click="addNewEmzirme" @historyEvent="handleViewBabyDetail"
                  v-if="this.pageBabyList && this.babies!==null && this.babies.allBaby!==null && this.babies.allBaby.length>0"/>

        <!--        Detay Sayfasıdır-->
        <BabyDetail :babyItem="this.selectedBabyItem" :selectedBabyIndex="this.getSelectedBabyIndex()"
                    v-if="this.pageBabyDetail"/>

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
                                :color="{checked: '#2da9bd7a', unchecked:'#ffa6e0ba'}"
                                v-model="babyGender"
                                :width="120" :height="30" :fontSize="14"
                                :labels="{checked: 'Erkek', unchecked: 'Kız'}"/>
                    </div>

                    <div class="col-md-12 input-group mb-2">
                        <b-form-input type="text" step="10" class="form-control" placeholder="Bebeğinizi Adı"
                                      v-model="babyName"/>
                    </div>
                    <div class="col-md-12 input-group mb-2">
                        <b-form-input type="date"
                                      v-model="birthDate"
                                      placeholder="Doğum Tarihi Seç"
                                      id="datepicker-birthdate"
                                      :no-close-button="true">
                        </b-form-input>
                    </div>

                    <div class="col-md-12 input-group">
                        <b-form-file
                                class="form-control"
                                name="photo"
                                v-model="selectedBabyImageFile"
                                accept="image/*"
                                placeholder="Fotoğraf Seç"/>
                    </div>
                </form>
            </div>
        </b-modal>
        <b-modal v-model="modalAddNewBreastFeedShow" title="Beslenme Kaydı"
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
                            <b-form-radio-group
                                    id="radio-group-2"
                                    v-model="mealType"
                                    name="radio-sub-component"
                                    :options="this.mealTypeOptions"/>

                        </div>
                    </div>

                    <div class="col-md-12 input-group mb-2">
                        <b-form-input type="number"
                                      step="10"
                                      class="form-control"
                                      placeholder="Miktar giriniz"
                                      v-model="volume"
                                      @keypress.enter="handleEmzirmeKayit"
                        />
                        <div class="input-group-append">
                            <span class="input-group-text">CC</span>
                        </div>
                    </div>
                    <div class="col-md-12 input-group">
                        <b-form-input
                                type="time"
                                v-model="breastFeedingTime"
                                placeholder="Emzirme Saati Seç"
                                id="datepicker-invalid"
                                hour12="false"
                                @keypress.enter="handleEmzirmeKayit"
                        />
                    </div>
                </form>
            </div>
        </b-modal>
        <b-modal v-model="modalNedirShow" title="Nedir?"
                 :centered=true :scrollable=true headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="Emzirme Kaydı"
                 no-button>
            <div class="col-md-12 small">
                <p class="text-right small"><a href="https://twitter.com/bortecoder">@bortecoder</a></p>
                <p><b>Nedir?</b></p>
                <p>Bu uygulama emzirme takibi yapabileceğiniz bir uygulamadır.
                    Kişisel verileriniz tamamen sizin telefonunuzda saklanır.
                    Hiç bir şekilde internet bağlantısı gerektirmez.
                    Bebeğinizi buraya ekleyerek takibini yapabilirsiniz.
                    Hiç bir kişisel veriniz işlenmez.
                </p>
                <p><b>Nasıl kullanılır?</b></p>
                <p>Sayfaya girdikten sonra tarayıcının Add to HomePage/Anasayfa'ya Ekle özelliğini kullanarak uygulamayı
                    cihazınıza kurabilirsiniz.</p>
                <p>
                    Bebeğinizi ekledikten sonra üzerine basıp seçebilir, emzirme/mama ne zaman doyurduysanız
                    saatini girebilirsiniz. Daha sonra geriye dönük ne kadar süt/mama verdiğinizi takip
                    edebilirsiniz.
                </p>
                <p>
                    Bebeğinizin Adını, Doğum Tarihini ve Fotoğrafını ekleyebilirsiniz.
                    Bebeğinize ait bir kart görünümü oluşacaktır. Bu kart üzerine tıkladığınızda emzirme/mama kaydı
                    girebileceğiniz bir form açılacaktır. Bu form üzerinden kaç cc süt/mamayı ne zaman verdiğinizi seçip
                    kaydetmeniz durumunda bebeğinizin beslenme geçmişi oluşmaya başlayacak ve bu beslenme geçmişini yine
                    aynı kart üzerinde bulunan tarihçesine bak özelliğinden görebilirsiniz. Tarihsel olarak son beslenme
                    en üstte görünecek şekilde ayarlayabilirsiniz.
                    Dilerseniz verileri info kısmından sıfırlayabilir, ya da yeni bebek ekleyebilirsiniz.
                </p>

                <p class="badge badge-success" @click="addNewBaby">
                    <font-awesome-icon icon="baby"/>
                    Yeni Bebek Ekle
                </p>
                <p class="badge badge-danger fa-pull-right" @click="modalClearDataShow=!modalClearDataShow">
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
        <b-modal v-model="modalClearDataShow" title="Verileri Sil"
                 :centered="true" :scrollable="false" headerCloseLabel="Kapat"
                 aria-label="Bebek Ekle"
                 :no-close-on-backdrop="true"
                 cancel-variant="warning" cancel-title="Vazgeç"
                 ok-variant="info" ok-title="Evet, Sıfırla"
                 @ok="clearData">
            <div class="col-md-12 small p-0">
                <p>Tüm verileri sıfırlamak istediğinize emin misiniz?</p>
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
                modalAddNewBreastFeedShow: false,
                modalAddNewBabyShow: false,
                modalAddErrorShow: false,
                modalClearDataShow: false,
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
                selectedBabyImageFile: null,
                timeoutId: null,
                editBabyMode: false,
                selectedBabyImage: null,
                oldBreastfeeding:[],
                mealTypeOptions: [
                    {text: 'Anne Sütü', value: 0},
                    {text: 'Mama', value: 1}
                ]
            }
        },
        computed: {
            isAddNewVisible: function () {
                return this.babies === null || this.babies.allBaby === null || this.babies.allBaby.length === 0;
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
                    this.modalAddNewBreastFeedShow = !this.modalAddNewBreastFeedShow
                } else {
                    this.modalAddErrorShow = !this.modalAddErrorShow
                }
            },
            addNewBaby: function () {
                this.modalAddNewBabyShow = !this.modalAddNewBabyShow;
            },
            clearData: function () {
                localStorage.removeItem("babies");
                localStorage.removeItem("selectedBabyIndex");
                localStorage.removeItem("babyImage");
                this.babies = null;
                this.modalNedirShow = false;
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
            editBaby: function () {
                let selectedBabyIndex = localStorage.getItem("selectedBabyIndex");
                let selectedBaby = this.getBabyByIndex(selectedBabyIndex);
                this.babyName = selectedBaby.name;
                this.birthDate = selectedBaby.birthDate;
                this.babyGender = selectedBaby.gender;
                this.selectedBabyImage = selectedBaby.image;
                this.oldBreastfeeding = selectedBaby.breastfeeding;
                this.modalAddNewBabyShow = !this.modalAddNewBabyShow;
                this.editBabyMode = true;
            },
            handleAddNewBaby: function () {
                var appvue = this;
                let file = this.selectedBabyImageFile;
                let reader = new FileReader();

                if (!this.editBabyMode || (this.editBabyMode && file != null)) {
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        appvue.resizeImage(e.target.result);
                    };
                } else {
                    localStorage.setItem("babyImage", this.selectedBabyImage);
                }

                setTimeout(
                    function () {
                        let newBabyItem = {
                            name: appvue.babyName,
                            birthDate: appvue.birthDate,
                            gender: appvue.babyGender,
                            image: localStorage.getItem("babyImage"),
                            breastfeeding: appvue.oldBreastfeeding
                        };

                        let storedBabies;
                        if (localStorage.getItem("babies") === null) {
                            let allBabyArr = [];
                            allBabyArr.push(newBabyItem);
                            storedBabies = {allBaby: allBabyArr};
                        } else {
                            storedBabies = JSON.parse(localStorage.getItem("babies"));
                            if (appvue.editBabyMode) {
                                storedBabies.allBaby[localStorage.getItem("selectedBabyIndex")] = newBabyItem;
                                appvue.editBabyMode = false;
                                appvue.selectedBabyItem = newBabyItem;
                            } else {
                                storedBabies.allBaby.push(newBabyItem);
                            }
                        }

                        appvue.babies = storedBabies;
                        localStorage.setItem("babies", JSON.stringify(storedBabies));
                        localStorage.removeItem("babyImage");

                        appvue.modalNedirShow = false;
                    }
                    , 1000);
            },
            getBabyByIndex(index) {
                return JSON.parse(localStorage.getItem("babies")).allBaby[index];

            },
            resizeImage: function (base64Str) {
                var img = new Image();
                img.src = base64Str;

                var canvas = document.createElement('canvas');
                var width;
                var height;

                img.onload = function () {

                    width = img.width;
                    height = img.height;

                    var MAX_WIDTH = 300;
                    var MAX_HEIGHT = 250;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / parseFloat(width + "");
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / parseFloat(height + "");
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    localStorage.setItem("babyImage", canvas.toDataURL());
                };
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
