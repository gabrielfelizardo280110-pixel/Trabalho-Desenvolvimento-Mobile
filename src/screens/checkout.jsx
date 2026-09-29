
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import cores from '../constants/cores';

export default function Checkout({
  carrinho,
  voltarCarrinho,
  onFinalizar,
}) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');

  const [pagamento, setPagamento] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');

  const [erros, setErros] = useState({});

  function somenteNumeros(texto) {
    return texto.replace(/\D/g, '');
  }

  function validarPedido() {
    const novosErros = {};

    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );

    if (totalItens === 0) {
      novosErros.carrinho =
        'Seu carrinho está vazio.';
    }

    if (nome.trim() === '') {
      novosErros.nome =
        'Informe seu nome.';
    }

    if (telefone.length < 10) {
      novosErros.telefone =
        'Telefone inválido.';
    }

    if (cep.length !== 8) {
      novosErros.cep =
        'CEP deve ter 8 dígitos.';
    }

    if (endereco.trim() === '') {
      novosErros.endereco =
        'Informe o endereço.';
    }

    if (!/^[0-9]+$/.test(numero)) {
      novosErros.numero =
        'Número inválido.';
    }

    if (pagamento === '') {
      novosErros.pagamento =
        'Escolha a forma de pagamento.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      onFinalizar({
        nome: nome.trim(),
        telefone,
        cep,
        endereco: endereco.trim(),
        numero,
        complemento: complemento.trim(),
        referencia: referencia.trim(),
        pagamento,
        precisaTroco:
          pagamento === 'dinheiro' && precisaTroco,
        trocoPara:
          pagamento === 'dinheiro' && precisaTroco
            ? trocoPara
            : '',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={voltarCarrinho}
          >
            <Text style={styles.seta}>←</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Dados de Entrega
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formulario}
          keyboardShouldPersistTaps="handled"
        >
          {erros.carrinho && (
            <Text style={styles.erro}>
              {erros.carrinho}
            </Text>
          )}

          <Text style={styles.label}>
            Nome
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.nome && styles.inputErro,
            ]}
            placeholder="Maria Silva"
            placeholderTextColor="#8F96A3"
            value={nome}
            onChangeText={setNome}
          />

          {erros.nome && (
            <Text style={styles.erro}>
              {erros.nome}
            </Text>
          )}

          <Text style={styles.label}>
            Telefone
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.telefone && styles.inputErro,
            ]}
            placeholder="(19) 9____-____"
            placeholderTextColor="#8F96A3"
            value={telefone}
            onChangeText={(texto) =>
              setTelefone(somenteNumeros(texto))
            }
            keyboardType="phone-pad"
            maxLength={11}
          />

          {erros.telefone && (
            <Text style={styles.erro}>
              {erros.telefone}
            </Text>
          )}

          <Text style={styles.label}>
            CEP
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.cep && styles.inputErro,
            ]}
            placeholder="13010000"
            placeholderTextColor="#8F96A3"
            value={cep}
            onChangeText={(texto) =>
              setCep(somenteNumeros(texto))
            }
            keyboardType="numeric"
            maxLength={8}
          />

          {erros.cep && (
            <Text style={styles.erro}>
              {erros.cep}
            </Text>
          )}

          <Text style={styles.label}>
            Endereço
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.endereco && styles.inputErro,
            ]}
            placeholder="Rua ou avenida"
            placeholderTextColor="#8F96A3"
            value={endereco}
            onChangeText={setEndereco}
          />

          {erros.endereco && (
            <Text style={styles.erro}>
              {erros.endereco}
            </Text>
          )}

          <Text style={styles.label}>
            Número
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.numero && styles.inputErro,
            ]}
            placeholder="123"
            placeholderTextColor="#8F96A3"
            value={numero}
            onChangeText={(texto) =>
              setNumero(somenteNumeros(texto))
            }
            keyboardType="numeric"
          />

          {erros.numero && (
            <Text style={styles.erro}>
              {erros.numero}
            </Text>
          )}

          <Text style={styles.label}>
            Complemento
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Opcional"
            placeholderTextColor="#8F96A3"
            value={complemento}
            onChangeText={setComplemento}
          />

          <Text style={styles.label}>
            Referência
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ponto de referência"
            placeholderTextColor="#8F96A3"
            value={referencia}
            onChangeText={setReferencia}
          />

          <Text style={styles.label}>
            Pagamento
          </Text>

          <View
            style={[
              styles.pickerContainer,
              erros.pagamento && styles.inputErro,
            ]}
          >
            <Picker
              selectedValue={pagamento}
              onValueChange={(valor) => {
                setPagamento(valor);

                if (valor !== 'dinheiro') {
                  setPrecisaTroco(false);
                  setTrocoPara('');
                }
              }}
              mode="dropdown"
              dropdownIconColor={cores.primaria}
              style={styles.picker}
            >
              <Picker.Item
                label="Selecione"
                value=""
              />
              <Picker.Item
                label="Cartão"
                value="cartao"
              />
              <Picker.Item
                label="Pix"
                value="pix"
              />
              <Picker.Item
                label="Dinheiro"
                value="dinheiro"
              />
            </Picker>
          </View>

          {erros.pagamento && (
            <Text style={styles.erro}>
              {erros.pagamento}
            </Text>
          )}

          {pagamento === 'dinheiro' && (
            <View>
              <View style={styles.linhaTroco}>
                <Text style={styles.textoTroco}>
                  Preciso de troco
                </Text>

                <Switch
                  value={precisaTroco}
                  onValueChange={setPrecisaTroco}
                  trackColor={{
                    false: '#D9DDE5',
                    true: cores.sucesso,
                  }}
                  thumbColor={cores.branco}
                />
              </View>

              {precisaTroco && (
                <>
                  <Text style={styles.label}>
                    Troco para
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="100"
                    placeholderTextColor="#8F96A3"
                    value={trocoPara}
                    onChangeText={(texto) =>
                      setTrocoPara(somenteNumeros(texto))
                    }
                    keyboardType="numeric"
                  />
                </>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.botaoFinalizar}
            onPress={validarPedido}
            activeOpacity={0.7}
          >
            <Text style={styles.textoFinalizar}>
              Finalizar pedido
            </Text>
          </TouchableOpacity>
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
    paddingTop: 14,
  },

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    borderRadius: 8,
    paddingHorizontal: 4,
    marginBottom: 10,
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seta: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.branco,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
  },

  formulario: {
    paddingBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.textoEscuro,
    marginTop: 8,
    marginBottom: 4,
  },

  input: {
    minHeight: 44,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: '#C7CDD8',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: cores.textoEscuro,
  },

  inputErro: {
    borderColor: cores.erro,
  },

  erro: {
    fontSize: 14,
    color: cores.erro,
    marginTop: 4,
  },

  pickerContainer: {
    height: 48,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: '#C7CDD8',
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  picker: {
    width: '100%',
    height: 48,
    color: cores.textoEscuro,
  },

  linhaTroco: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  textoTroco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.textoEscuro,
  },

  botaoFinalizar: {
    minHeight: 50,
    backgroundColor: cores.primaria,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 12,
  },

  textoFinalizar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.branco,
  },
});
