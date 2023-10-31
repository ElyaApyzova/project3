let menu_list = document.getElementById("menu-list");
let orders_list = document.getElementById("orders-list");
let sum = document.getElementById("sum");
let items_count = document.getElementById("items-count");

const renderMenuItem = (product) => {
  return `
    <div class="food-card" data-product='${JSON.stringify(
      product
    )}' onclick="onClickCard(event)">
    <img class="food-img" src="${product.img}" alt="">
    <div>
    <div>${product.title}</div>
    <div>${product.price} som</div>
    </div>
    </div>
    `;
};

const renderOrderItem = (orderItem) => {
  return `
  <li class="order-item">
  <div>${orderItem.title}</div>
  <div>count: ${orderItem.count}</div>
  <div>price: ${orderItem.price}</div>
  <span class="delete" data-order = '${JSON.stringify(
    orderItem
  )}'onclick="onDelete(event)">X</span>
  </li>
  `;
};
const renderOrder = () => {
  let items = [];
  orders_basket.map((item, id) => {
    items.push(renderOrderItem(item));
  });
  orders_list.innerHTML = items.join("");
};

const renderMenuList = (List) => {
  let items = [];
  List.map((elem, id) => {
    items.push(renderMenuItem(elem));
  });
  menu_list.innerHTML = items.join("");
};

const onClickCard = (event) => {
  let card = JSON.parse(event.target.dataset.product);

  let currentIndex = orders_basket.findIndex((el) => el.id == card.id);
  if (currentIndex == -1) {
    orders_basket.push({
      ...card,
      count: 1,
    });
  } else {
    orders_basket[currentIndex].count++;
    orders_basket[currentIndex].price += card.price;
  }
  renderOrder(orders_basket);
  solveSum();
  getCount();
};

const onDelete = (event) => {
  let current_order = JSON.parse(event.target.dataset.order);

  let currentIndex = orders_basket.findIndex((el) => el.id == current_order.id);
  let item_price = menu_items.find((el) => el.id == current_order.id).price;

  if (current_order.count > 1) {
    orders_basket[currentIndex].count--;
    orders_basket[currentIndex].price -= item_price;
    renderOrder(orders_basket);
  } else {
    orders_basket.splice(currentIndex, 1);
    renderOrder(orders_basket);
  }
  solveSum();
  getCount();
};

const solveSum = () => {
  sum.innerHTML = orders_basket.reduce((el, { price }) => el + price, 0);
};

const getCount = () => {
  items_count.innerHTML = orders_basket.reduce(
    (el, { count }) => el + count,
    0
  );
};
renderMenuList(menu_items);
