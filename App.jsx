import React, { useState } from 'react';

import Cardapio from './src/screens/cardapio';
import Carrinho from './src/screens/carrinho';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [tela, setTela] = useState('cardapio');

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

  function aumentarQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  if (tela === 'carrinho') {
    return (
      <Carrinho
        carrinho={carrinho}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
        voltarCardapio={() => setTela('cardapio')}
      />
    );
  }

  return (
    <Cardapio
      totalItens={totalItens}
      adicionarAoCarrinho={adicionarAoCarrinho}
      abrirCarrinho={() => setTela('carrinho')}
    />
  );
}