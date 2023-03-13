<template>
  <img class="product-image" :src="this.image" :alt="this.alt" @click="handleClick">
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProductImage",
  props: {
    image: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: "product-image"
    }
  },
  data() {
    return {
      barcode: null
    };
  },
  methods: {
    async handleClick() {
      Swal.fire({
        color: "#000",
        title: "Barcode laden...",
        background: "#fff",
        toast: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.generateImage().then(() => {
        Swal.fire({
          color: "#000",
          html:
              `<div style="display: flex; flex-direction: column; align-items: center">
                 <img src="${this.image}" alt="product" style="max-width: 120px" />
                 <img src="${URL.createObjectURL(this.barcode)}" alt="barcode" style="width: 150px" />
               </div>`,
          background: "#fff",
          toast: false,
          showCancelButton: true,
          cancelButtonText: "Sluiten",
          showConfirmButton: false,
        });
      });
    },
    async generateImage() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "image/png");
      myHeaders.append("Apikey", "28e63794-ef8a-4616-80bb-26fdd3709a19");

      var raw = JSON.stringify(this.alt);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      await fetch("https://api.cloudmersive.com/barcode/generate/ean-13", requestOptions)
          .then(response => response.blob())
          .then(result => {
            this.barcode = result;
            console.log(this.barcode)
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>
.product-image {
  cursor: pointer;
}
</style>