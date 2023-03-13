<template>
  <div class="container">
    <div class="information-container">
      <span class="title">{{formatted_name(order.firstname, order.lastname)}}</span>
      <div class="sub-container">
        <div class="data-container">
          <span class="subtitle">Datum:</span>
          <span class="subtitle-data">{{formatted_date(order.pickup_date)}} - {{order.pickup_time}}</span>
        </div>
      </div>
      <div class="sub-container">
        <div class="data-container">
          <span class="subtitle">Telefoon:</span>
          <span class="subtitle-data">{{order.phonenumber}}</span>
        </div>
      </div>
      <div class="sub-container">
        <div class="data-container">
          <span class="subtitle">Levering:</span>
          <span class="subtitle-data">{{formatted_date(order.delivery_date)}}</span>
        </div>
      </div>
      <div class="sub-container">
        <div class="data-container">
          <span class="subtitle">Opmerking:</span>
          <span class="subtitle-data">{{order.other_info}}</span>
        </div>
        <div class="data-container right">
          <span class="subtitle">Status:</span>
          <span class="subtitle-data">{{order.state}}</span>
        </div>
      </div>
    </div>
    <div class="product-container">
      <ProductLine v-for="product in order.product_list" v-bind:key="product.sku" :product="product"/>
    </div>
    <div class="actions-container" v-if="order.state !== 'completed'">
      <router-link class="action-btn" :to="'/order/' + order._id + '/assembly'"><i class="fa-solid fa-pencil edit"/>AANPASSEN</router-link>
      <button class="action-btn" @click="shareOrder"><i class="fa-solid fa-check share"/>DELEN</button>
      <button class="action-btn" @click="orderImage"><i class="fa-solid fa-check share"/>AFBEELDING</button>
      <button class="action-btn" @click="completeOrder"><i class="fa-solid fa-check accept"/>VOLTOOIEN</button>
    </div>

    <div class="image-container" />

    <span class="title divider">Activiteiten</span>

    <div class="information-container" v-for="activity in order.activity_log" v-bind:key="activity.date">
      <ActivityUsername :id="activity.user" />
      <div class="sub-container column">
        <div class="data-container wide">
          <span class="subtitle">Datum:</span>
          <span class="subtitle-data">{{formatted_datetime(activity.date)}}</span>
        </div>
        <div class="data-container wide" v-for="action in activity.actions" v-bind:key="action">
          <span class="subtitle">{{action}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductLine from "@/components/ProductLine.vue";
import axios from "axios";
import ActivityUsername from "@/components/async/ActivityUsername.vue";

export default {
  name: "OrderOverview",
  components: {ActivityUsername, ProductLine},
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  methods: {
    formatted_name(firstname, lastname) {
      let name = 'Onbekende Klant'
      if (firstname !== undefined && lastname !== undefined)
        name = firstname + ' ' + lastname;
      return name;
    },
    // Refactor the string to a dd/mm/yyyy format
    formatted_date(string) {
      let date = new Date(string);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    // Refactor the string to a dd/mm/yyyy - hh:mm format
    formatted_datetime(string) {
      let date = new Date(string);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      return `${day}/${month}/${year} - ${('0'  + hours).slice(-2)}:${('0'  + minutes).slice(-2)}`;
    },
    async completeOrder() {
      await axios.post("/api/orders/state", {
        order_id: this.$route.params.id,
        edited_by: localStorage.getItem("loggedInUserId"), // UserId
        state: "completed",
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      });

      this.$router.push('/');
    },
    shareOrder() {
      let message = "Bestelling\n" +
          "Naam: " + this.formatted_name(this.order.firstname, this.order.lastname) + "\n" +
          "Telefoon: " + this.order.phonenumber + "\n" +
          "Datum: " + this.formatted_date(this.order.pickup_date) + " - " + this.order.pickup_time + "\n" +
          "Levering: " + this.formatted_date(this.order.delivery_date) + "\n" +
          "Opmerking: " + this.order.other_info + "\n\n" +
          "Producten:\n";
      this.order.product_list.forEach(product => {
        message += product.name + " - " + product.quantity + "x " + product.quantity_type + "\n";
      });
      const url_encoded = encodeURIComponent(message);
      // const message = "Bestelling%20-%20Bob%20Blokhout%0ADatum%3A%2010%2F10%2F2000%0ATelefoon%3A%2006-12345678%0ALevering%3A%2005%2F10%2F2000%0AOpmerking%3A%20Alles%20bewaren!"
      window.open(`whatsapp://send?text=${url_encoded}`)
    },
    async orderImage() {
      const barcode = async (ean) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "image/png");
        myHeaders.append("Apikey", "28e63794-ef8a-4616-80bb-26fdd3709a19");

        const raw = JSON.stringify(ean);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        return await fetch("https://api.cloudmersive.com/barcode/generate/ean-13", requestOptions)
            .then(response => response.blob())
            .then(result => {
              return result;
            })
            .catch(error => console.log('error', error));
      }
      if (document.querySelector('canvas')) {
        document.querySelector('canvas').remove();
      }
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imgs = document.querySelectorAll('img');

      // Variable
      const LINE_WIDTH = 480
      const LINE_HEIGHT = 50
      const LINE_PADDING = 1
      const FONT_SIZE = 15
      const IMG_SIZE = LINE_HEIGHT - (LINE_PADDING * 2)

      // Define the size
      canvas.width = LINE_WIDTH;
      canvas.height = LINE_HEIGHT * imgs.length;

      // white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the images
      imgs.forEach((img, i) => {
        ctx.drawImage(img, LINE_PADDING, (i * LINE_HEIGHT) + LINE_PADDING, IMG_SIZE, IMG_SIZE);
      });

      // Write the text
      ctx.font = `${FONT_SIZE}px Arial`;
      ctx.fillStyle = "black";
      imgs.forEach((img, i) => {
        const product = this.order.product_list.find(product => product.sku === img.alt);
        ctx.fillText(product.name, IMG_SIZE + (LINE_PADDING * 2), (i * LINE_HEIGHT) + LINE_PADDING + FONT_SIZE);
        ctx.fillText(product.quantity, IMG_SIZE + (LINE_PADDING * 2), (i * LINE_HEIGHT) + (LINE_PADDING * 2) + (FONT_SIZE * 2));
        ctx.fillText(product.quantity_type, IMG_SIZE + (LINE_PADDING * 5) + ctx.measureText(product.quantity).width, (i * LINE_HEIGHT) + (LINE_PADDING * 2) + (FONT_SIZE * 2));
        ctx.fillText(product.sku, IMG_SIZE + (LINE_PADDING * 2), (i * LINE_HEIGHT) + (LINE_PADDING * 3) + (FONT_SIZE * 3));
      });

      // Generate all the barcodes
      for (let i=0; i < imgs.length; i++) {
        const barcode_blob = await barcode(imgs[i].alt);
        const barcode_element = new Image();
        barcode_element.onload = () => {
          ctx.drawImage(barcode_element, LINE_WIDTH - barcode_element.width - LINE_PADDING, (i * LINE_HEIGHT) + LINE_PADDING, barcode_element.width, IMG_SIZE);
        }
        barcode_element.src = URL.createObjectURL(barcode_blob);
      }

      document.querySelector('.image-container').appendChild(canvas);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin: 1em 2em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
}
.information-container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.title {
  font-size: 1em;
  font-weight: bold;
}
.sub-container {
  display: flex;
  margin-top: .3em;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background-color: #fff;
}
.data-container {
  display: flex;
  flex-direction: row;
  gap: .3em;
  justify-content: flex-start;
  width: 50%;
  font-size: .9em;
  background-color: #fff;
}
.right {
  justify-content: flex-end;
}
.subtitle {
  color: #696969;
}
.subtitle-data {
  color: #000
}
.product-container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.actions-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 1em;
}
.action-btn {
  display: flex;
  padding: 1em 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: var(--color-background);
  text-decoration: none;
  color: #000;
  font-size: 1em;
}
.action-btn:hover {
  background-color: #ddd;
  cursor: pointer;
}
.action-btn i {
  margin-right: .5em;
}
.edit {
  color: var(--color-primary);
}
.accept {
  color: #44d200;
}
.column {
  flex-direction: column;
}
.divider {
  margin-top: 1em;
  margin-bottom: .5em;
}
.wide {
  width: 100%;
}

.image-container {
  margin-top: 1em;
  border: 2px solid #000;
}
</style>