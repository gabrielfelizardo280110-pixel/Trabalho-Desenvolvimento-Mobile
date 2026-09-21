import React, { useState } from 'react';

import Cardapio from './src/screens/cardapio';
import Carrinho from './src/screens/carrinho';
import Checkout from './src/screens/checkout';

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

  if (tela === 'checkout') {
    return (
      <Checkout
        carrinho={carrinho}
        voltarCarrinho={() => setTela('carrinho')}
      />
    );
  }

  if (tela === 'carrinho') {
    return (
      <Carrinho
        carrinho={carrinho}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
        voltarCardapio={() => setTela('cardapio')}
        irCheckout={() => setTela('checkout')}
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