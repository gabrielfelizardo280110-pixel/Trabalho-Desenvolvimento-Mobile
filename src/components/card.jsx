import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import cores from '../constants/cores';

export default function Card({
  produto,
  adicionarAoCarrinho,
}) {
  function formatarPreco(valor) {
    return `R$ ${valor
      .toFixed(2)
      .replace('.', ',')}`;
  }

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: produto.imagem }}
        style={styles.imagem}
      />

      <View style={styles.informacoes}>
        <Text style={styles.nome}>
          {produto.nome}
        </Text>

        <Text style={styles.descricao}>
          {produto.descricao}
        </Text>

        <View style={styles.rodape}>
          <Text style={styles.preco}>
            {formatarPreco(produto.preco)}
          </Text>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            activeOpacity={0.7}
            onPress={() =>
              adicionarAoCarrinho(produto)
            }
          >
            <Text style={styles.textoBotao}>
              + Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    backgroundColor: cores.fundoClaro,

    borderRadius: 12,

    padding: 8,
    marginBottom: 10,

    minHeight: 95,
  },

  imagem: {
    width: 82,
    height: 72,

    borderRadius: 9,

    marginRight: 10,

    alignSelf: 'center',
  },

  informacoes: {
    flex: 1,

    justifyContent: 'center',
  },

  nome: {
    fontSize: 16,

    fontWeight: 'bold',

    color: cores.textoEscuro,
  },

  descricao: {
    fontSize: 14,

    color: cores.secundaria,

    marginTop: 2,
  },

  rodape: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: 3,
  },

  preco: {
    fontSize: 14,

    fontWeight: 'bold',

    color: cores.erro,
  },

  botaoAdicionar: {
    minHeight: 44,

    paddingHorizontal: 12,

    borderRadius: 22,

    backgroundColor: cores.sucesso,

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    fontSize: 14,

    fontWeight: 'bold',

    color: cores.branco,
  },
});