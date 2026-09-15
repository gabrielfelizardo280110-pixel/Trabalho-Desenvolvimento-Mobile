import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ItemCarrinho from "../components/itemCarrinho";
import cores from "../constants/cores";

export default function Carrinho({
  carrinho,
  aumentarQuantidade,
  diminuirQuantidade,
  voltarCardapio,
}) {
  const [cupom, setCupom] = useState("");

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const cupomValido = cupom.trim().toUpperCase() === "ALUNO10";

  const desconto = cupomValido ? subtotal * 0.1 : 0;

  const taxaEntrega = carrinho.length > 0 ? 6 : 0;

  const total = subtotal - desconto + taxaEntrega;

  function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={voltarCardapio}
            activeOpacity={0.7}
          >
            <Text style={styles.textoVoltar}>←</Text>
          </TouchableOpacity>

          <Text style={styles.tituloHeader}>Carrinho</Text>

          <View style={styles.espacoHeader} />
        </View>

        <View style={styles.areaLista}>
          {carrinho.length === 0 ? (
            <View style={styles.carrinhoVazio}>
              <Text style={styles.textoCarrinhoVazio}>
                Seu carrinho está vazio.
              </Text>

              <TouchableOpacity
                style={styles.botaoVoltarCardapio}
                activeOpacity={0.7}
                onPress={voltarCardapio}
              >
                <Text style={styles.textoVoltarCardapio}>
                  Voltar ao cardápio
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            >
              {carrinho.map((item) => (
                <ItemCarrinho
                  key={item.id}
                  item={item}
                  aumentarQuantidade={aumentarQuantidade}
                  diminuirQuantidade={diminuirQuantidade}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.resumo}>
          <Text style={styles.tituloResumo}>Resumo</Text>

          <TextInput
            style={styles.cupom}
            placeholder="Cupom de desconto"
            placeholderTextColor={cores.secundaria}
            value={cupom}
            onChangeText={setCupom}
            autoCapitalize="characters"
          />

          <View style={styles.linha}>
            <Text style={styles.textoResumo}>Subtotal</Text>

            <Text style={styles.valorResumo}>{formatarPreco(subtotal)}</Text>
          </View>

          {cupomValido && carrinho.length > 0 && (
            <View style={styles.linha}>
              <Text style={styles.textoDesconto}>Desconto ALUNO10</Text>

              <Text style={styles.textoDesconto}>
                - {formatarPreco(desconto)}
              </Text>
            </View>
          )}

          <View style={styles.linha}>
            <Text style={styles.textoResumo}>Entrega</Text>

            <Text style={styles.valorResumo}>{formatarPreco(taxaEntrega)}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.totalTexto}>Total</Text>

            <Text style={styles.totalValor}>{formatarPreco(total)}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.botaoContinuar,

              carrinho.length === 0 && styles.botaoDesabilitado,
            ]}
            disabled={carrinho.length === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.textoContinuar}>Continuar</Text>
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

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: cores.primaria,

    borderRadius: 10,

    paddingHorizontal: 6,

    marginBottom: 12,
  },

  botaoVoltar: {
    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",
  },

  textoVoltar: {
    fontSize: 34,

    lineHeight: 36,

    color: cores.branco,
  },

  tituloHeader: {
    fontSize: 20,

    fontWeight: "bold",

    color: cores.branco,
  },

  espacoHeader: {
    width: 44,
  },

  areaLista: {
    flex: 1,
  },

  lista: {
    paddingBottom: 10,
  },

  carrinhoVazio: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  textoCarrinhoVazio: {
    fontSize: 16,

    color: cores.secundaria,

    marginBottom: 15,
  },

  botaoVoltar: {
    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",
  },

  textoVoltar: {
    fontSize: 26,
    fontWeight: "bold",
    color: cores.branco,
  },

  resumo: {
    backgroundColor: cores.fundoClaro,

    borderRadius: 12,

    padding: 14,

    marginTop: 5,
  },

  tituloResumo: {
    fontSize: 20,

    fontWeight: "bold",

    color: cores.textoEscuro,

    marginBottom: 10,
  },

  cupom: {
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
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginVertical: 4,
  },

  textoResumo: {
    fontSize: 14,

    color: cores.secundaria,
  },

  valorResumo: {
    fontSize: 14,

    fontWeight: "bold",

    color: cores.textoEscuro,
  },

  textoDesconto: {
    fontSize: 14,

    fontWeight: "bold",

    color: cores.sucesso,
  },

  separador: {
    height: 1,

    backgroundColor: cores.borda,

    marginVertical: 8,
  },

  totalTexto: {
    fontSize: 18,

    fontWeight: "bold",

    color: cores.textoEscuro,
  },

  totalValor: {
    fontSize: 18,

    fontWeight: "bold",

    color: cores.primaria,
  },

  botaoContinuar: {
    minHeight: 48,

    backgroundColor: cores.primaria,

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 14,
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  textoContinuar: {
    fontSize: 16,

    fontWeight: "bold",

    color: cores.branco,
  },
});
