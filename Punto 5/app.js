// Lista de productos
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

// Mostrar productos en la página
const showProducts = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'product-item';
        listItem.textContent = `Name: ${product.name}, Category: ${product.category}, Price: $${product.price}, Stock: ${product.stock}`;
        productList.appendChild(listItem);
    });
};

// Calcular el precio total de todos los productos
const calculateTotalPrice = () => {
    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    displayResult(`Total Price: $${totalPrice}`);
};

// Filtrar productos por categoría
const filterByCategory = (category) => {
    const filteredProducts = products.filter(product => product.category === category);
    displayResult(`Filtered Products (${category}):`);
    showProductsInResult(filteredProducts);
};

// Buscar un producto por nombre
const findProductByName = (name) => {
    const product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
    if (product) {
        displayResult(`Product Found: ${product.name}, Price: $${product.price}`);
    } else {
        displayResult('Product not found');
    }
};

// Verificar si todos los productos están disponibles (stock > 0)
const checkAvailability = () => {
    const allAvailable = products.every(product => product.stock > 0);
    displayResult(`All Products Available: ${allAvailable ? 'Yes' : 'No'}`);
};

// Obtener nombres de todos los productos
const getProductNames = () => {
    const names = products.map(product => product.name);
    displayResult(`Product Names: ${names.join(', ')}`);
};

// Mostrar los productos en el área de resultados
const showProductsInResult = (productsList) => {
    const productList = document.getElementById('result');
    productList.innerHTML = '';
    
    productsList.forEach(product => {
        const listItem = document.createElement('div');
        listItem.textContent = `Name: ${product.name}, Category: ${product.category}, Price: $${product.price}, Stock: ${product.stock}`;
        productList.appendChild(listItem);
    });
};

// Mostrar un mensaje en el área de resultados
const displayResult = (message) => {
    const result = document.getElementById('result');
    result.textContent = message;
};

// Manejar eventos de los botones
document.getElementById('show-products').addEventListener('click', showProducts);
document.getElementById('calculate-total').addEventListener('click', calculateTotalPrice);
document.getElementById('filter-electronics').addEventListener('click', () => filterByCategory('Electronics'));
document.getElementById('check-availability').addEventListener('click', checkAvailability);
document.getElementById('get-names').addEventListener('click', getProductNames);

// Manejar búsqueda de productos por nombre
document.getElementById('search').addEventListener('input', (event) => {
    findProductByName(event.target.value);
});

// Mostrar errores
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
