const { createApp } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify({
  display: {
    mobileBreakpoint: "sm",
    thresholds: {
      xs: 0,
      sm: 769,
      md: 769,
      lg: 769,
      xl: 769,
    },
  },
});

const app = createApp({
  data() {
    return {
      data: [
        {
          category: "żywność",
          date: "2022-07-16",
          name: "Kawa",
          price: { value: 40, currency: "zł" },
        },
        {
          category: "żywność",
          date: "2022-08-03",
          name: "Chleb",
          price: { value: 8, currency: "zł" },
        },
        {
          category: "żywność",
          date: "2022-08-03",
          name: "Ser",
          price: { value: 21, currency: "zł" },
        },
        {
          category: "samochód",
          date: "2022-08-14",
          name: "paliwo",
          price: { value: 320, currency: "zł" },
        },
        {
          category: "żywność",
          date: "2022-09-01",
          name: "Chleb",
          price: { value: 8, currency: "zł" },
        },
        {
          category: "żywność",
          date: "2022-09-01",
          name: "Szynka",
          price: { value: 14, currency: "zł" },
        },
        {
          category: "żywność",
          date: "2022-09-10",
          name: "masło",
          price: { value: 6, currency: "zł" },
        },
        {
          category: "samochód",
          date: "2022-09-10",
          name: "paliwo",
          price: { value: 320, currency: "zł" },
        },
        {
          category: "samochód",
          date: "2022-09-10",
          name: "myjnia samochodowa",
          price: { value: 60, currency: "zł" },
        },
      ],
      categories: ["żywność", "samochód","wszystkie"],
      filters: {
        dateFrom: "",
        dateTo: "",
        category: "wszystkie",
        name: "",
        pageSize: 5, 
        currentPage: 1,
      },
      drawer: false,
      group: null,
      search: "",
      headers: ["Kategoria", "Data", "Nazwa", "Cena"],
      headers2: ["Data", "Suma"],
      headers3: ["Kategoria", "Suma"],
      monoColors: ["#005E53","#44E3D1","#00DDC2","#1C5E57","#00AB97"],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],

    };
  },
  computed: {
    filteredData() {
      let filteredItems = this.data;
      if (this.filters.dateFrom !== "") {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) >= new Date(this.filters.dateFrom)
        );
      }
      if (this.filters.dateTo !== "") {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) <= new Date(this.filters.dateTo)
        );
      }
      if (this.filters.category !== "wszystkie") {
        filteredItems = filteredItems.filter(
          (item) => item.category === this.filters.category
        );
      } 
      if (this.filters.name !== "") {
        filteredItems = filteredItems.filter((item) =>
          item.name.toLowerCase().startsWith(this.filters.name.toLowerCase())
        );
      }
      let startIndex = this.filters.currentPage===1 ? 0 :((this.filters.currentPage - 1) * this.filters.pageSize);
      let endIndex = startIndex + this.filters.pageSize;
      return filteredItems.slice(startIndex, endIndex);
    },

    filteredData2() {
      let filteredItems = this.data;
      if (this.filters.dateFrom !== "") {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) >= new Date(this.filters.dateFrom)
        );
      }
      if (this.filters.dateTo !== "") {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) <= new Date(this.filters.dateTo)
        );
      }
      if (this.filters.category !== "wszystkie") {
        filteredItems = filteredItems.filter(
          (item) => item.category === this.filters.category
        );
      } 
      if (this.filters.name !== "") {
        filteredItems = filteredItems.filter((item) =>
          item.name.toLowerCase().startsWith(this.filters.name.toLowerCase())
        );
      }
      return filteredItems;
    },


    pages() {
      const numberToRound = this.data.length / this.filters.pageSize;
      return Math.ceil(numberToRound);
    },
    
  },
 
  watch: {
    group () {
      this.drawer = false
    },
  },
  async mounted(){
    this.createChart()
    this.createChart2()
  },
  methods: {
    totalAmount() {
      return this.filteredData2.reduce((sum, item) => sum + item.price.value, 0);
    },
    dataByMonth() {
      const dataByMonth = [];

      // Obliczanie sum dla poszczególnych miesięcy
      this.filteredData2.forEach((item) => {
        const { date, price } = item;
        const [year, month] = date.split("-");
        const key = `${year}-${month}`;

        if (dataByMonth.hasOwnProperty(key)) {
          dataByMonth[key] += price.value;
        } else {
          dataByMonth[key] = price.value;
        }
      });
      return Object.entries(dataByMonth).map(([key, value]) => ({
        date: key,
        value,
      }));
    },
    dataByCategory() {
      const dataByCategory = {};

      // Obliczanie sum dla poszczególnych kategorii
      this.filteredData2.forEach((item) => {
        const { category, price } = item;

        if (dataByCategory.hasOwnProperty(category)) {
          dataByCategory[category] += price.value;
        } else {
          dataByCategory[category] = price.value;
        }
      });

      return Object.entries(dataByCategory).map(([key, value]) => ({
        category: key,
        value,
      }));
    },
    updatePage(pageIndex) {
      this.filters.currentPage = pageIndex
    },
    prepareChartData(){
      return this.dataByCategory().map(item => item.value);
    },

    prepareChartCategories(){
      return this.dataByCategory().map(item => item.category);
    },

    summaryChartData(){
      return this.dataByMonth().map(item => item.value);
      
    },

    summaryChartCategories(){
      return this.dataByMonth().map(item => item.date);
      
    },


    createChart(){
      const ctx = document.getElementById('myChart');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.prepareChartCategories(),
          datasets: [{
            data: this.prepareChartData(),
            borderWidth: 1,
            backgroundColor: this.monoColors,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },

      createChart2(){
        const ctx = document.getElementById('summaryChart');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.summaryChartCategories(),
            datasets: [{
              data: this.summaryChartData(),
              borderWidth: 1,
              backgroundColor: this.monoColors,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        
        });
    },
  },

  

  template: "#app-template",
});

app.use(vuetify).mount("#app");

//https://vuetifyjs.com/en/components/