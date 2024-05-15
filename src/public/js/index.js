const socketClient = io();
socketClient.on("listado", (arrayProducts) => {
  const productsRender = arrayProducts
    .map((product) => {
      return `<div class="eachProduct"><p>${product.category}</p>
        <p>${product.title}</p>
        <p>${product.description}</p>
        <p class="price">Precio: ${product.price}</p>
        <p class="stock">Stock disponible: ${product.stock}</p></div>`;
    })
    .join(" ");
  listaProductos.innerHTML = productsRender;
});
