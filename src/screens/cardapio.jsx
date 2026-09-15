import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Card from '../components/card';
import produtos from '../data/produtos';
import cores from '../constants/cores';

export default function Cardapio({
  totalItens,
  adicionarAoCarrinho,
  abrirCarrinho,
}) {
  const [pesquisa, setPesquisa] = useState('');

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>

        <View style={styles.header}>
          <Text style={styles.logo}>
            DelivExpress
          </Text>

          <TouchableOpacity
            style={styles.contador}
            onPress={abrirCarrinho}
            activeOpacity={0.7}
          >
            <Text style={styles.contadorTexto}>
              {totalItens}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.pesquisa}
          placeholder="▯ Buscar lanche..."
          placeholderTextColor={cores.secundaria}
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
        >
          {produtosFiltrados.map((produto) => (
            <Card
              key={produto.id}
              produto={produto}
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
            />
          ))}

          {produtosFiltrados.length === 0 && (
            <Text style={styles.naoEncontrado}>
              Nenhum produto encontrado.
            </Text>
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: cores.branco,
  },

  conteudo: {
    flex: 1,

    paddingHorizontal: 18,
    paddingTop: 15,
  },

  header: {
    minHeight: 55,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: cores.primaria,

    borderRadius: 10,

    paddingHorizontal: 14,
  },

  logo: {
    fontSize: 20,

    fontWeight: 'bold',

    color: cores.branco,
  },

  contador: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: cores.sucesso,

    justifyContent: 'center',
    alignItems: 'center',
  },

  contadorTexto: {
    fontSize: 14,

    fontWeight: 'bold',

    color: cores.branco,
  },

  pesquisa: {
    minHeight: 44,

    backgroundColor: cores.fundoClaro,

    borderWidth: 1,
    borderColor: cores.borda,

    borderRadius: 9,

    paddingHorizontal: 12,

    marginTop: 8,
    marginBottom: 10,

    fontSize: 14,

    color: cores.textoEscuro,
  },

  lista: {
    paddingBottom: 30,
  },

  naoEncontrado: {
    textAlign: 'center',

    fontSize: 14,

    color: cores.secundaria,

    marginTop: 25,
  },
});