<template>
    <div id="babylistid" class="row mb-5">
        <Baby class="col-md-12 col-sm-12 col-12"
              v-for="(baby, index) in babiesData.allBaby"
              :key="baby.id"
              :babyItem="baby"
              :babyIndex="'b'+(index+1)"
              @babyClick="handleBabyClickComponent(index)"
              @historyEvent="handleBabyHistoryClickComponent(index)"
        />
    </div>
</template>

<script>
    import Baby from "./Baby";
    import $ from "jquery";

    export default {
        name: "BabyList",
        components: {Baby},
        props: {
            babiesData: Object
        },
        data: function () {
            return {
                babiesObject: null,
                bgColorClassName: "bg-boy"
            }
        },
        methods: {
            handleBabyClickComponent: function (index) {
               this.selectBaby(index);
                this.$emit("click");
            },
            handleBabyHistoryClickComponent: function (index) {
                this.selectBaby(index);
                this.$emit("historyEvent");
            },
            selectBaby(index) {
                window.localStorage.setItem("selectedBabyIndex", index);
                $(".Baby .card").removeClass("bg-boy");
                $(".Baby .card").removeClass("bg-girl");

                if (this.babiesData.allBaby[index].gender) {
                    this.bgColorClassName = "bg-boy";
                } else {
                    this.bgColorClassName = "bg-girl";
                }
                $(".Baby.b" + (parseInt(index) + 1) + " .parentCard").addClass(this.bgColorClassName);
                $(".Baby.b" + (parseInt(index) + 1) + " .parentCard").removeClass("bg-white");
            }
        }
    }
</script>

<style scoped>

</style>
