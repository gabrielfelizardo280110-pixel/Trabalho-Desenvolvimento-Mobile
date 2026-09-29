
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import cores from '../constants/cores';

export default function Confirmacao({
  pedido,
  fazerNovoPedido,
}) {
  function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  const pagamentos = {
    cartao: 'Cartão',
    pix: 'Pix',
    dinheiro: 'Dinheiro',
  };

  const enderecoCompleto = [
    pedido.endereco,
    pedido.numero,
    pedido.complemento,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.areaSucesso}>
          <View style={styles.circulo}>
            <Text style={styles.check}>
              ✓
            </Text>
          </View>

          <Text style={styles.titulo}>
            Pedido confirmado!
          </Text>

          <Text style={styles.numeroPedido}>
            Pedido #{pedido.numero}
          </Text>
        </View>

        <View style={styles.resumo}>
          {pedido.itens.map((item) => (
            <View
              style={styles.linhaProduto}
              key={item.id}
            >
              <Text style={styles.produto}>
                {item.quantidade} x {item.nome}
              </Text>

              <Text style={styles.precoProduto}>
                {formatarPreco(
                  item.preco * item.quantidade
                )}
              </Text>
            </View>
          ))}

          <View style={styles.divisor} />

          {pedido.desconto > 0 && (
            <View style={styles.linha}>
              <Text style={styles.textoDetalhe}>
                Desconto
              </Text>

              <Text style={styles.valorDesconto}>
                - {formatarPreco(pedido.desconto)}
              </Text>
            </View>
          )}

          <View style={styles.linha}>
            <Text style={styles.totalTexto}>
              Total pago
            </Text>

            <Text style={styles.totalValor}>
              {formatarPreco(pedido.total)}
            </Text>
          </View>

          <Text style={styles.detalhe}>
            Entrega: {enderecoCompleto}
          </Text>

          <Text style={styles.detalhe}>
            CEP: {pedido.cep}
          </Text>

          {pedido.referencia ? (
            <Text style={styles.detalhe}>
              Referência: {pedido.referencia}
            </Text>
          ) : null}

          <Text style={styles.detalhe}>
            Pagamento: {pagamentos[pedido.pagamento]}
          </Text>

          {pedido.pagamento === 'dinheiro' &&
            pedido.precisaTroco &&
            pedido.trocoPara ? (
              <Text style={styles.detalhe}>
                Troco para: {formatarPreco(
                  Number(pedido.trocoPara)
                )}
              </Text>
            ) : null}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.botaoNovoPedido}
        onPress={fazerNovoPedido}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>
          Fazer novo pedido
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
  },

  conteudo: {
    flexGrow: 1,
  },

  areaSucesso: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 30,
  },

  circulo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: cores.sucesso,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  check: {
    fontSize: 52,
    lineHeight: 68,
    fontWeight: 'bold',
    color: cores.branco,
    textAlign: 'center',
  },

  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: cores.textoEscuro,
    textAlign: 'center',
  },

  numeroPedido: {
    fontSize: 16,
    color: cores.primaria,
    marginTop: 8,
  },

  resumo: {
    width: '100%',
  },

  linhaProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },

  produto: {
    flex: 1,
    marginRight: 8,
    fontSize: 14,
    color: cores.textoEscuro,
  },

  precoProduto: {
    fontSize: 14,
    color: cores.secundaria,
  },

  divisor: {
    height: 1,
    backgroundColor: cores.borda,
    marginVertical: 12,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  textoDetalhe: {
    fontSize: 14,
    color: cores.secundaria,
  },

  valorDesconto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.sucesso,
  },

  totalTexto: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },

  totalValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.sucesso,
  },

  detalhe: {
    fontSize: 14,
    lineHeight: 21,
    color: cores.secundaria,
    marginTop: 4,
  },

  botaoNovoPedido: {
    minHeight: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: cores.sucesso,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.branco,
  },
});
