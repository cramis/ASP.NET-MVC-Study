<template>
  <b-container fluid class="page">
    <b-row>
      <b-col cols="3">
        <filters v-if="filters.brands.length" :filters="filters" />
      </b-col>
      <b-col cols="9">
        <div class="products">
        <h1>Products</h1>
        <hr>
        <div class="clearfix">
          <search-bar class="search" />
          <product-sort />
        </div>
        <product-list v-if="products.length" :products="sortedProducts" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

import ProductList from "../components/catalogue/ProductList.vue";
import Filters from "../components/catalogue/Filters.vue";
import ProductSort from "../components/catalogue/ProductSort.vue";
import SearchBar from "../components/catalogue/SearchBar.vue";

export default {
  name: "catalogue",
  components: {
    Filters,
    ProductList,
    ProductSort,
    SearchBar
  },
  data() {
    return {
      products: [],
      filters: {
        brands: [],
        capacity: [],
        colours: [],
        os: [],
        features: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    axios
      .all([
        axios.get("/api/products", { params: to.query }),
        axios.get("/api/filters")
      ])
      .then(
        axios.spread((products, filters) => {
          next(vm => vm.setData(products.data, filters.data));
        })
      );
  },
  beforeRouteUpdate(to, from, next) {
    axios.get("/api/products", { params: to.query }).then(response => {
      this.products = response.data;
      next();
    });
  },
  computed: {
    sort() {
      return this.$route.query.sort || 0;
    },
    sortedProducts() {
      switch (this.sort) {
        case 1:
          return this.products.sort((a, b) => {
            return b.price > a.price;
          });
          break;
        case 2:
          return this.products.sort((a, b) => {
            return a.name > b.name;
          });
          break;
        case 3:
          return this.products.sort((a, b) => {
            return b.name > a.name;
          });
          break;
        default:
          return this.products.sort((a, b) => {
            return a.price > b.price;
          });
      }
    }
  },
  methods: {
  setData(products, filters) {
    this.products = products;
    this.filters = filters;
    }
  }
};
</script>

<style lang="scss" scoped>
.products {
    margin: 10px 0;
    padding: 10px;
}
.flex {
  display: flex;
  flex-direction: row;

  
}

.search {
    flex: 1;
    padding: 10px;
    margin: 10px 0;
  }
</style>
