(() => {
const data = [
    {
      type: "żywność",
      date: "2022-07-16",
      name: "Kawa",
      price: { value: 40, currency: "zł" },
    },
    {
      type: "żywność",
      date: "2022-08-03",
      name: "Chleb",
      price: { value: 8, currency: "zł" },
    },
    {
      type: "żywność",
      date: "2022-08-03",
      name: "Ser",
      price: { value: 21, currency: "zł" },
    },
    {
      type: "samochód",
      date: "2022-08-14",
      name: "paliwo",
      price: { value: 320, currency: "zł" },
    },
    {
      type: "żywność",
      date: "2022-09-01",
      name: "Chleb",
      price: { value: 8, currency: "zł" },
    },
    {
      type: "żywność",
      date: "2022-09-01",
      name: "Szynka",
      price: { value: 14, currency: "zł" },
    },
    {
      type: "żywność",
      date: "2022-09-10",
      name: "masło",
      price: { value: 6, currency: "zł" },
    },
    {
      type: "samochód",
      date: "2022-09-10",
      name: "paliwo",
      price: { value: 320, currency: "zł" },
    },
    {
      type: "samochód",
      date: "2022-09-10",
      name: "myjnia samochodowa",
      price: { value: 60, currency: "zł" },
    },
  ];

  const templateRowTable = (
    type,
    date,
    name,
    price,
    currency
  ) => `<tr class="expense__item">
  <td class="category">
    <font style="vertical-align: inherit">
      <font style="vertical-align: inherit">${type}</font>
    </font>
  </td>
  <td class="date">
    <font style="vertical-align: inherit">
      <font style="vertical-align: inherit">${date}</font>
    </font>
  </td>
  <td class="name">
    <font style="vertical-align: inherit">
      <font style="vertical-align: inherit">${name}</font>
    </font>
  </td>
  <td class="price">
    <span class="price__amount">
      <font style="vertical-align: inherit">
        <font style="vertical-align: inherit">${price}</font>
      </font>
    </span><span class="price__currency">
      <font style="vertical-align: inherit">
        <font style="vertical-align: inherit">${currency}</font>
      </font>
    </span>
  </td>
</tr>`;

  const expenses = data.map((item) => {
    return templateRowTable(
      item.type,
      item.date,
      item.name,
      item.price.value,
      item.price.currency
    );
  });

  const combinedExpenses = expenses.join("");

  const expensesTable = document.getElementById("expences-table-body");

  expensesTable.innerHTML = combinedExpenses;

  console.log(expensesTable);

  const totalAmount = data.reduce((sum, item) => sum + item.price.value, 0);
  const totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.textContent = `Razem: ${totalAmount} zł`;






  const sumByMonth = {};

  // Obliczanie sum dla poszczególnych miesięcy
  data.forEach(item => {
    const { date, price } = item;
    const [year, month] = date.split('-');
    const key = `${year}-${month}`;
  
    if (sumByMonth.hasOwnProperty(key)) {
      sumByMonth[key] += price.value;
    } else {
      sumByMonth[key] = price.value;
    }
  });
  
  // Generowanie kodu HTML dla sumy miesięcy
  let htmlByMonth = '';
  Object.entries(sumByMonth).forEach(([key, sum]) => {
    const [year, month] = key.split('-');
    const currency = data[0].price.currency;
  
    htmlByMonth += `
      <div class="sum_period__item">
        <div class="date">
          <font style="vertical-align: inherit">
            <font style="vertical-align: inherit">${year}-${month}</font>
          </font>
        </div>
        <div class="amount">
          <font style="vertical-align: inherit">
            <font class="sumByMonth" style="vertical-align: inherit">${sum}</font>
          </font>
        </div>
        <div class="currency">
          <font style="vertical-align: inherit">
            <font style="vertical-align: inherit">${currency}</font>
          </font>
        </div>
      </div>
    `;
  });
  
  // Wstawianie kodu HTML dla sumy miesięcy do kontenera
  const containerByMonth = document.getElementById('results-container');
  containerByMonth.innerHTML = htmlByMonth;
  
  const sumByCategory = {};
  
  // Obliczanie sum dla poszczególnych kategorii
  data.forEach(item => {
    const { type, price } = item;
  
    if (sumByCategory.hasOwnProperty(type)) {
      sumByCategory[type] += price.value;
    } else {
      sumByCategory[type] = price.value;
    }
  });
  
  // Generowanie kodu HTML dla sumy kategorii
  let htmlByCategory = '';
  Object.entries(sumByCategory).forEach(([category, sum]) => {
    const currency = data[0].price.currency;
  
    htmlByCategory += `
      <div class="sum_category__item">
        <div class="date">
          <font style="vertical-align: inherit">
            <font style="vertical-align: inherit">${category}</font>
          </font>
        </div>
        <div class="amount">
          <font style="vertical-align: inherit">
            <font style="vertical-align: inherit">${sum}</font>
          </font>
        </div>
        <div class="currency">
          <font style="vertical-align: inherit">
            <font style="vertical-align: inherit">${currency}</font>
          </font>
        </div>
      </div>
    `;
  });
  
  // Wstawianie kodu HTML dla sumy kategorii do kontenera
  const containerByCategory = document.getElementById('category-container');
  containerByCategory.innerHTML = htmlByCategory;
  


  
})();

