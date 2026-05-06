import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  const tecnologias = [
    { nome: 'React Native', cor: '#61dafb' },
    { nome: 'JavaScript', cor: '#f7df1e' },
    { nome: 'TypeScript', cor: '#3178c6' },
  ];

  const TelaHome = () => (
    <ScrollView style={styles.container}>
      <View style={styles.homeContent}>
        <Text style={styles.title}>Bem-vindo!</Text>

        {/* Foto Simulada */}
        <View style={styles.fotoSimulada}>
          <Text style={styles.fotoLetra}>J</Text>
        </View>

        {/* Nome */}
        <Text style={styles.nome}>João Silva</Text>

        {/* Descrição */}
        <Text style={styles.descricao}>
          Desenvolvedor Mobile apaixonado por criar aplicações incríveis
        </Text>

        {/* Botão para Perfil */}
        <TouchableOpacity
          style={styles.botaoPerfil}
          onPress={() => setTelaAtual('perfil')}
        >
          <Text style={styles.botaoTexto}>Ver Perfil Completo →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const TelaPerfil = () => (
    <ScrollView style={styles.container}>
      <View style={styles.perfilContent}>
        <Text style={styles.title}>Meu Perfil</Text>

        {/* Informações */}
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Curso</Text>
          <Text style={styles.infoValor}>Engenharia de Software</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Turma</Text>
          <Text style={styles.infoValor}>3º Ano - Turma A</Text>
        </View>

        {/* Tecnologias */}
        <Text style={styles.tecnologiasTitle}>Tecnologias Favoritas</Text>
        <View style={styles.tecnologiasContainer}>
          {tecnologias.map((tech, index) => (
            <View
              key={index}
              style={[styles.techCard, { borderTopColor: tech.cor }]}
            >
              <Text style={styles.techNome}>{tech.nome}</Text>
            </View>
          ))}
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setTelaAtual('home')}
        >
          <Text style={styles.botaoTexto}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return telaAtual === 'home' ? <TelaHome /> : <TelaPerfil />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  homeContent: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  perfilContent: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 30,
    textAlign: 'center',
  },
  fotoSimulada: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#60a5fa',
  },
  fotoLetra: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  descricao: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  botaoPerfil: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  botaoVoltar: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValor: {
    fontSize: 16,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  tecnologiasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
    marginTop: 20,
  },
  tecnologiasContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  techCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 4,
  },
  techNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
  },
});
