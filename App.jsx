
import React, { useState } from 'react';
import { Alert } from 'react-native';

import Cardapio from './src/screens/cardapio';
import Carrinho from './src/screens/carrinho';
import Checkout from './src/screens/checkout';
import Confirmacao from './src/screens/confirmacao';

export default function App() {
  const [tela, setTela] = useState('cardapio');
  const [carrinho, setCarrinho] = useState([]);
  const [cupom, setCupom] = useState('');
  const [pedido, setPedido] = useState(null);

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => {
      const existente = atual.find(
        (item) => item.id === produto.id
      );

      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...atual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  function aumentarQuantidade(id) {
    setCarrinho((atual) =>
      atual.map((item) =>
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
    setCarrinho((atual) =>
      atual
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

  function finalizarPedido(dadosEntrega) {
    const quantidade = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );

    if (quantidade === 0) {
      return;
    }

    const subtotal = carrinho.reduce(
      (total, item) =>
        total + item.preco * item.quantidade,
      0
    );

    const desconto =
      cupom.trim().toUpperCase() === 'ALUNO10'
        ? subtotal * 0.1
        : 0;

    const entrega = 6;

    const total =
      subtotal - desconto + entrega;

    const numeroPedido = Math.floor(
      1000 + Math.random() * 9000
    );

    setPedido({
      numero: numeroPedido,
      itens: carrinho.map((item) => ({
        ...item,
      })),
      subtotal,
      desconto,
      entrega,
      total,
      ...dadosEntrega,
    });

    setTela('confirmacao');

    Alert.alert(
      'Pedido confirmado!',
      `Seu pedido #${numeroPedido} foi realizado com sucesso.`
    );
  }

  function novoPedido() {
    setCarrinho([]);
    setCupom('');
    setPedido(null);
    setTela('cardapio');
  }

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  if (tela === 'confirmacao' && pedido) {
    return (
      <Confirmacao
        pedido={pedido}
        fazerNovoPedido={novoPedido}
      />
    );
  }

  if (tela === 'checkout') {
    return (
      <Checkout
        carrinho={carrinho}
        voltarCarrinho={() =>
          setTela('carrinho')
        }
        onFinalizar={finalizarPedido}
      />
    );
  }

  if (tela === 'carrinho') {
    return (
      <Carrinho
        carrinho={carrinho}
        cupom={cupom}
        setCupom={setCupom}
        aumentarQuantidade={
          aumentarQuantidade
        }
        diminuirQuantidade={
          diminuirQuantidade
        }
        voltarCardapio={() =>
          setTela('cardapio')
        }
        irCheckout={() =>
          setTela('checkout')
        }
      />
    );
  }

  return (
    <Cardapio
      totalItens={totalItens}
      adicionarAoCarrinho={
        adicionarAoCarrinho
      }
      abrirCarrinho={() =>
        setTela('carrinho')
      }
    />
  );
}
