import React, { useState } from 'react';

import Cardapio from './src/screens/cardapio';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <Cardapio
      totalItens={totalItens}
      adicionarAoCarrinho={adicionarAoCarrinho}
    />
  );
}