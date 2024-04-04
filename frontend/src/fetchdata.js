export async function fetchAllBooks() {
  try {
    const response = await fetch("http://localhost:3030/books");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ocorreu um erro: ", error);
    throw error; // Re-throwing the error so that it can be caught in the component
  }
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
