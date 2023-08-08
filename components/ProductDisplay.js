app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <img :src="image">
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <a :href="learnMore">Learn More</a>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <!-- <p v-show="inStock">In Stock</p> -->
      <p v-show="onSale">On Sale</p>
      List:
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      Variants:
      <div
      class="color-circle"
      :style="{'background-color': variant.color}"
      v-for="(variant, index) in variants"
      @mouseover="updateVariant(index)">
    </div>
      Sizes:
      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>
      <button class="button" :class="{disabledButton: !inStock}" :disabled="!inStock" @click="addToCart">Add to cart</button>
      <button class="button" @click="removeFromCart">Remove from cart</button>
    </div>
    <div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>
  </div>
  </div>`,
  data() {
    return {
      product: "Socks",
      // image: './assets/images/socks_blue.jpg',
      brand: "Vue Mastery",
      selectedVariant: 0,
      outOfStockImg: "./assets/images/out_of_stock.jpg",
      learnMore: "/learn/more.html",
      // inStock: false,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 10,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 10,
        },
      ],
      sizes: ["SM", "M", "L", "XL", "XXL"],
      reviews: []
    };
  },
  methods: {
    updateVariant(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    addReview(reviewItem) {
      this.reviews.push(reviewItem);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      return this.premium ? "free" : "paid";
    }
  }
});
