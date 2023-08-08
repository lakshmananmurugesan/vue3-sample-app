const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      if (this.cart.length > 0) {
				var index = this.cart.indexOf(id);
				if (index >= 0) {
  				this.cart.splice( index, 1 );
				}
      }
    },
  },
});
