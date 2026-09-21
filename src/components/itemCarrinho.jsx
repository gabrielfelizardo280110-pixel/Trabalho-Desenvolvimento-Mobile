import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import cores from '../constants/cores';

export default function ItemCarrinho({
  item,
  aumentarQuantidade,
  diminuirQuantidade,
}) {
  function formatarPreco(valor) {
    return `R$ ${valor
      .toFixed(2)
      .replace('.', ',')}`;
  }

  return (
    <View style={styles.card}>
      <View style={styles.dadosProduto}>
        <Text style={styles.nome}>
          {item.nome}
        </Text>

        <Text style={styles.preco}>
          {formatarPreco(item.preco)}
        </Text>
      </View>

      <View style={styles.quantidade}>
        <TouchableOpacity
          style={styles.botaoQuantidade}
          activeOpacity={0.7}
          onPress={() =>
            diminuirQuantidade(item.id)
          }
        >
          <Text style={styles.textoQuantidade}>
            −
          </Text>
        </TouchableOpacity>

        <Text style={styles.numeroQuantidade}>
          {item.quantidade}
        </Text>

        <TouchableOpacity
          style={styles.botaoQuantidade}
          activeOpacity={0.7}
          onPress={() =>
            aumentarQuantidade(item.id)
          }
        >
          <Text style={styles.textoQuantidade}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: cores.fundoClaro,

    borderRadius: 12,

    padding: 14,
    marginBottom: 10,
  },

  dadosProduto: {
    flex: 1,
    marginRight: 10,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },

  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.erro,
    marginTop: 4,
  },

  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  botaoQuantidade: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: cores.primaria,

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoQuantidade: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.branco,
  },

  numeroQuantidade: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.textoEscuro,
    marginHorizontal: 12,
  },
});