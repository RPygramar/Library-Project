import { fetchAllBooks, fetchBookByID } from "../../fetchdata";
import { useState, useEffect } from "react";
import StarRate from "../../components/starRate/starRate";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Book_Page() {
  return (
    <>
      <h2>O meu carrinho</h2>
      <Footer />
    </>
  );
}
