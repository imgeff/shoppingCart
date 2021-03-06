function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
const total = document.querySelector('#price');
const olItems = document.querySelector('.cart__items');
let sum = 0;
let indicator = 0;

function ClearAllItemsOfCart() {
  const btnClear = document.querySelector('.empty-cart');
  btnClear.addEventListener('click', () => {
    olItems.innerHTML = '';
    sum = 0;
    total.innerHTML = `Subtotal : <b>  R$ ${sum.toFixed(2)} </b>`;
    saveCartItems(olItems.innerHTML, total.innerText);
  });
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function calculatePriceOfCart(addPrice, removePrice) {
  if (addPrice === 0) {
    sum -= removePrice; 
  } else {
    sum += addPrice;
  }

  if (sum <= 0) sum = 0;
  total.innerHTML = `Subtotal: <b> R$ ${sum.toFixed(2)} </b>`;
}

function extractPriceCart(item) {
  const separatePrice = item.innerText.split(' ');
  const lastPositionOfArray = separatePrice.length - 1;
  const priceString = separatePrice[lastPositionOfArray].slice(0);
  const price = Number(priceString);
  return price;
}

function cartItemClickListener(event) {
 const element = event.target;
 const productCart = element.parentNode;
 const li = element.previousElementSibling;
 calculatePriceOfCart(0, extractPriceCart(li));
 productCart.remove();
 saveCartItems(olItems.innerHTML, total.innerHTML);
}

function createCartItemElement({ name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<br><br><br>${name} 
  <br>
  <br><b>R$ ${salePrice}</b>`;
  return li;
}

function loadingCart() {
  const listCart = document.querySelector('.cart__items');
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'Carregando...';
  listCart.appendChild(loading);
}

function loadingItems() {
  const sectionItems = document.querySelector('.items');
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'Carregando...';
  sectionItems.appendChild(loading);
}

function loaded() {
  const loading = document.querySelectorAll('.loading');
  loading.forEach((element) => element.remove());
}

async function createItemsCart(id) {
  loadingCart();
  const divItem = document.createElement('div');
  const iconRemove = document.createElement('img');
  iconRemove.src = './remove-from-cart.png';
  iconRemove.className = 'icon-remove';
  iconRemove.addEventListener('click', cartItemClickListener);
  const requestData = await fetchItem(id);
  loaded();
  const { id: sku, title: name, price: salePrice, thumbnail: image } = requestData;
  const liItems = createCartItemElement({ sku, name, salePrice });
  const imgItems = createProductImageElement(image);
  calculatePriceOfCart(salePrice, 0);
  divItem.className = 'product-cart';
  divItem.append(imgItems, liItems, iconRemove);
  olItems.appendChild(divItem);
  saveCartItems(olItems.innerHTML, total.innerHTML);
}

function listenerAdd() {
  const getButtonAddToCart = document.querySelectorAll('.item__add');
  getButtonAddToCart.forEach((elementBTN, index) => {
    elementBTN.addEventListener('click', () => {
      const itemSKU = getButtonAddToCart[index].parentNode.firstElementChild.innerText;
      console.log(itemSKU);
      createItemsCart(itemSKU);
  });
  });
  indicator += 1;
}

async function currentProducts(product) {
  loadingItems();
  const sectionItems = document.querySelector('.items');
  const listProducts = await fetchProducts(product);
  loaded();
  listProducts.results.forEach((objectProduct) => {
    const itemProduct = {
      sku: objectProduct.id,
      name: objectProduct.title,
      image: objectProduct.thumbnail,
      salePrice: objectProduct.price,
    };
    const sectionProductsItems = createProductItemElement(itemProduct);
    sectionItems.appendChild(sectionProductsItems);
  });
  listenerAdd();
}

function removeItems() {
  const itemsOld = document.querySelectorAll('.item');
  itemsOld.forEach((item) => item.remove());
}

function removeh2s() {
  const categorias = document.querySelectorAll('.categorias');
  categorias.forEach((categoria) => categoria.remove());
}
function searchProduct() {
  const inputSearch = document.querySelector('#search-products');
  const buttonSearch = document.querySelector('.search-items img');
  buttonSearch.addEventListener('click', () => {
    removeItems();
    removeh2s();
    const product = inputSearch.value;
    currentProducts(product);
  });
}

async function startPage(product, categoria, callback) {
  loadingItems();
  const listProducts = await fetchProducts(product);
  loaded();
  const listProductsSlice = listProducts.results.slice(0, 5);
  const sectionItems = document.querySelector('.items');
  const h2 = document.createElement('h2');
  h2.className = 'categorias';
  h2.innerText = categoria;
  sectionItems.appendChild(h2);
  listProductsSlice.forEach(({ id: sku, title: name, thumbnail: image, price: salePrice }) => {
    const sectionProductsItems = createProductItemElement({ sku, name, image, salePrice });
    sectionItems.appendChild(sectionProductsItems);
  });
    callback();
}

function callStartPage() {
  if (indicator === 1) {
    startPage('cozinha', 'Cozinha', listenerAdd);
  }
  startPage('cozinha', 'Cozinha');
  if (indicator === 2) {
    startPage('sala', 'Sala', listenerAdd);
  }
  startPage('sala', 'Sala');
  if (indicator === 0) {
    startPage('quarto', 'Quarto', listenerAdd);
  }
}
window.onload = () => { 
  getSavedCartItems(cartItemClickListener, calculatePriceOfCart);
  ClearAllItemsOfCart();
  searchProduct();
  callStartPage();
};
