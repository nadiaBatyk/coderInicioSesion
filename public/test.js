



  function renderTabla(data) {
    const html = data
      .map((item) => {
        return ` <tr >
        <td class="table-text">${item.nombre}</td>
        <td class="table-text">${item.precio}</td>
        <td>
          <img
            src="${item.link} "
            class="table-img"
            alt="${item.nombre}"
          /></td></tr>
      `;
      })
      .join(" ");
    document.getElementById("bodyTabla").innerHTML = html;
  }