import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfil, setPerfil] = useState('estudante');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const telefoneRef = useRef(null);

  const aplicarMascaraCPF = (texto) => {
    const apenasNumeros = texto.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      let cpfFormatado = apenasNumeros;
      if (apenasNumeros.length > 3) {
        cpfFormatado =
          apenasNumeros.slice(0, 3) +
          '.' +
          apenasNumeros.slice(3, 6) +
          (apenasNumeros.length > 6 ? '.' + apenasNumeros.slice(6, 9) : '') +
          (apenasNumeros.length > 9 ? '-' + apenasNumeros.slice(9, 11) : '');
      }
      return cpfFormatado;
    }
    return cpf;
  };

  const aplicarMascaraTelefone = (texto) => {
    const apenasNumeros = texto.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      let telefoneFormatado = apenasNumeros;
      if (apenasNumeros.length > 2) {
        telefoneFormatado =
          '(' +
          apenasNumeros.slice(0, 2) +
          ') ' +
          apenasNumeros.slice(2, 7) +
          (apenasNumeros.length > 7 ? '-' + apenasNumeros.slice(7, 11) : '');
      }
      return telefoneFormatado;
    }
    return telefone;
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCPF = (cpf) => {
    const apenasNumeros = cpf.replace(/\D/g, '');
    return apenasNumeros.length === 11;
  };

  const validarTelefone = (telefone) => {
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length === 11;
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!email.trim()) {
      novosErros.email = 'Email é obrigatório';
    } else if (!validarEmail(email)) {
      novosErros.email = 'Email inválido';
    }

    if (!cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório';
    } else if (!validarCPF(cpf)) {
      novosErros.cpf = 'CPF deve ter 11 dígitos';
    }

    if (!telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
    } else if (!validarTelefone(telefone)) {
      novosErros.telefone = 'Telefone deve ter 11 dígitos';
    }

    if (!aceitaTermos) {
      novosErros.termos = 'Você deve aceitar os termos';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const enviarFormulario = async () => {
    if (validarFormulario()) {
      setEnviando(true);
      // Simular envio
      setTimeout(() => {
        setEnviando(false);
        setSucesso(true);
        // Limpar após 2 segundos
        setTimeout(() => {
          setSucesso(false);
          setNome('');
          setEmail('');
          setCpf('');
          setTelefone('');
          setPerfil('estudante');
          setAceitaTermos(false);
        }, 2000);
      }, 1500);
    }
  };

  const perfilOptions = [
    { label: 'Estudante', value: 'estudante' },
    { label: 'Profissional', value: 'profissional' },
    { label: 'Freelancer', value: 'freelancer' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>📋 Cadastro Completo</Text>

        {/* Mensagem de Sucesso */}
        {sucesso && (
          <View style={styles.sucessoBox}>
            <Text style={styles.sucessoTexto}>✓ Cadastro realizado com sucesso!</Text>
          </View>
        )}

        {/* Campo Nome */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[styles.input, erros.nome && styles.inputErro]}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#64748b"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          {erros.nome && <Text style={styles.erroTexto}>{erros.nome}</Text>}
        </View>

        {/* Campo Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={[styles.input, erros.email && styles.inputErro]}
            placeholder="seu.email@exemplo.com"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current?.focus()}
          />
          {erros.email && <Text style={styles.erroTexto}>{erros.email}</Text>}
        </View>

        {/* Campo CPF */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            ref={cpfRef}
            style={[styles.input, erros.cpf && styles.inputErro]}
            placeholder="000.000.000-00"
            placeholderTextColor="#64748b"
            value={cpf}
            onChangeText={(texto) => setCpf(aplicarMascaraCPF(texto))}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => telefoneRef.current?.focus()}
          />
          {erros.cpf && <Text style={styles.erroTexto}>{erros.cpf}</Text>}
        </View>

        {/* Campo Telefone */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            ref={telefoneRef}
            style={[styles.input, erros.telefone && styles.inputErro]}
            placeholder="(00) 00000-0000"
            placeholderTextColor="#64748b"
            value={telefone}
            onChangeText={(texto) => setTelefone(aplicarMascaraTelefone(texto))}
            keyboardType="numeric"
          />
          {erros.telefone && <Text style={styles.erroTexto}>{erros.telefone}</Text>}
        </View>

        {/* Seleção de Perfil */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Tipo de Perfil</Text>
          <View style={styles.chipsContainer}>
            {perfilOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.chip,
                  perfil === option.value && styles.chipAtivo,
                ]}
                onPress={() => setPerfil(option.value)}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    perfil === option.value && styles.chipTextoAtivo,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Switch de Termos */}
        <View style={styles.fieldContainer}>
          <View style={styles.switchContainer}>
            <Switch
              value={aceitaTermos}
              onValueChange={setAceitaTermos}
              trackColor={{ false: '#334155', true: '#3b82f6' }}
              thumbColor={aceitaTermos ? '#60a5fa' : '#94a3b8'}
            />
            <Text style={styles.switchLabel}>
              Aceito os termos e condições
            </Text>
          </View>
          {erros.termos && <Text style={styles.erroTexto}>{erros.termos}</Text>}
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity
          style={[
            styles.botaoEnviar,
            enviando && styles.botaoEnviando,
          ]}
          onPress={enviarFormulario}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando ? 'Enviando...' : 'Enviar Cadastro'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 24,
    textAlign: 'center',
  },
  sucessoBox: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  sucessoTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 14,
  },
  inputErro: {
    borderColor: '#ef4444',
  },
  erroTexto: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
  },
  chipAtivo: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipTexto: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextoAtivo: {
    color: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  switchLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    flex: 1,
  },
  botaoEnviar: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  botaoEnviando: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
