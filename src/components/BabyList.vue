<template>
    <div id="babylistid" class="row mb-5">
        <Baby class="col-md-12 col-sm-12 col-12"
              v-for="(baby, index) in babiesData.allBaby"
              :key="baby.id"
              :babyItem="baby"
              :babyIndex="'b'+(index+1)"
              @click="handleBabyClickComponent(index)"/>
    </div>
</template>

<script>
    import Baby from "./Baby";
    import $ from "jquery";

    export default {
        name: "BabyList",
        components: {Baby},
        props: {
            babiesData:Object
        },
        data: function () {
            return {
                babiesObject:null,
                bgColorClassName:"bg-boy"
            }
        },
        methods:{
            handleBabyClickComponent: function (index) {
                localStorage.setItem("selectedBabyIndex", index);
                $(".Baby .card").removeClass("bg-boy");
                $(".Baby .card").removeClass("bg-girl");

                if (this.babiesData.allBaby[index].gender===0){
                    this.bgColorClassName = "bg-girl";
                }else{
                    this.bgColorClassName = "bg-boy";
                }
                    $(".Baby.b"+(parseInt(index)+1)+" .parentCard").addClass(this.bgColorClassName);

                $(".Baby.b"+(parseInt(index)+1)+" .parentCard").removeClass("bg-white");
            }
        }
    }
</script>

<style scoped>

</style>
