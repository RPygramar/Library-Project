export function fetchAllBooks() {
  fetch("http://localhost:3030/books")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro: ", error);
    });
}

export function fetchBookByID(id) {
  fetch("http://localhost:3030/books/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro: ", error);
    });
}
