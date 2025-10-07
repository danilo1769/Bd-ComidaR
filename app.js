// 🧾 Productos de ejemplo (luego los traeremos desde Firebase)
const productos = [
  { id: 1, nombre: "Hamburguesa clásica", precio: 18000, imagen: "https://i.imgur.com/Yf7sFjG.png" },
  { id: 2, nombre: "Perro caliente", precio: 12000, imagen: "https://i.imgur.com/YmX0QnV.png" },
  { id: 3, nombre: "Papas con queso", precio: 10000, imagen: "https://i.imgur.com/YkVkRCr.png" },
  { id: 4, nombre: "Jugo natural", precio: 6000, imagen: "https://i.imgur.com/Hb6cYhF.png" }
];

let carrito = [];

// 🧩 Cargar productos en la sección del menú
const contenedorProductos = document.querySelector('.productos');
productos.forEach(prod => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p>$${prod.precio.toLocaleString()}</p>
    <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
  `;
  contenedorProductos.appendChild(div);
});

// 🛒 Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

// 🧮 Actualizar lista del carrito
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const total = document.getElementById('total');
  
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    
    // Botón para eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "❌";
    btnEliminar.onclick = () => eliminarDelCarrito(index);
    
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = `Total: $${suma.toLocaleString()}`;
}

// 🗑️ Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ✅ Confirmar pedido
document.getElementById('btn-pedir').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🍽️");
    return;
  }
  
  alert("✅ Pedido confirmado. ¡Gracias por usar ComiFa!");
  carrito = [];
  actualizarCarrito();
});
