
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ItemCarrinho from '../components/itemCarrinho';
import cores from '../constants/cores';

export default function Carrinho({
  carrinho,
  cupom,
  setCupom,
  aumentarQuantidade,
  diminuirQuantidade,
  voltarCardapio,
  irCheckout,
}) {
  const subtotal = carrinho.reduce(
    (total, item) =>
      total + item.preco * item.quantidade,
    0
  );

  const cupomValido =
    cupom.trim().toUpperCase() === 'ALUNO10';

  const desconto = cupomValido
    ? subtotal * 0.1
    : 0;

  const entrega = carrinho.length > 0 ? 6 : 0;
  const total = subtotal - desconto + entrega;

  function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.voltar}
            onPress={voltarCardapio}
          >
            <Text style={styles.seta}>←</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Meu Carrinho
          </Text>

          <View style={styles.espaco} />
        </View>

        <View style={styles.areaLista}>
          {carrinho.length === 0 ? (
            <View style={styles.areaVazia}>
              <Text style={styles.textoVazio}>
                Seu carrinho está vazio.
              </Text>

              <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={voltarCardapio}
              >
                <Text style={styles.textoBotao}>
                  Voltar ao cardápio
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {carrinho.map((item) => (
                <ItemCarrinho
                  key={item.id}
                  item={item}
                  aumentarQuantidade={
                    aumentarQuantidade
                  }
                  diminuirQuantidade={
                    diminuirQuantidade
                  }
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.resumo}>
          <TextInput
            style={styles.inputCupom}
            placeholder="Cupom de desconto"
            placeholderTextColor={cores.secundaria}
            value={cupom}
            onChangeText={setCupom}
            autoCapitalize="characters"
          />

          <View style={styles.linha}>
            <Text style={styles.descricao}>
              Subtotal
            </Text>
            <Text style={styles.valor}>
              {formatarPreco(subtotal)}
            </Text>
          </View>

          {cupomValido && carrinho.length > 0 && (
            <View style={styles.linha}>
              <Text style={styles.desconto}>
                Desconto (10%)
              </Text>
              <Text style={styles.desconto}>
                - {formatarPreco(desconto)}
              </Text>
            </View>
          )}

          <View style={styles.linha}>
            <Text style={styles.descricao}>
              Entrega
            </Text>
            <Text style={styles.valor}>
              {formatarPreco(entrega)}
            </Text>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <Text style={styles.totalTexto}>
              TOTAL
            </Text>
            <Text style={styles.totalValor}>
              {formatarPreco(total)}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.botaoContinuar,
              carrinho.length === 0 &&
                styles.botaoDesabilitado,
            ]}
            disabled={carrinho.length === 0}
            onPress={irCheckout}
            activeOpacity={0.7}
          >
            <Text style={styles.textoContinuar}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 15,
  },

  header: {
    minHeight: 55,
    backgroundColor: cores.primaria,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  voltar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seta: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cores.branco,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },

  espaco: {
    width: 44,
  },

  areaLista: {
    flex: 1,
  },

  areaVazia: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoVazio: {
    fontSize: 16,
    color: cores.secundaria,
  },

  botaoVoltar: {
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: cores.primaria,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 14,
  },

  textoBotao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.branco,
  },

  resumo: {
    backgroundColor: cores.fundoClaro,
    borderRadius: 12,
    padding: 14,
    marginTop: 5,
  },

  inputCupom: {
    minHeight: 44,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: cores.textoEscuro,
    marginBottom: 12,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  descricao: {
    fontSize: 14,
    color: cores.secundaria,
  },

  valor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },

  desconto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.sucesso,
  },

  divisor: {
    height: 1,
    backgroundColor: cores.borda,
    marginVertical: 8,
  },

  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },

  totalValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.sucesso,
  },

  botaoContinuar: {
    minHeight: 48,
    backgroundColor: cores.primaria,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  textoContinuar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.branco,
  },
});
