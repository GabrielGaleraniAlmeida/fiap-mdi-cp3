import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function App() {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Erro ao abrir link:', err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Foto do Perfil */}
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/1?v=4' }}
          style={styles.profileImage}
        />

        {/* Nome em Destaque */}
        <Text style={styles.name}>João Silva</Text>

        {/* Curso e Ano */}
        <Text style={styles.subtitle}>Engenharia de Software - 3º Ano</Text>

        {/* Frase Pessoal */}
        <Text style={styles.bio}>
          Desenvolvedor Mobile apaixonado por criar experiências incríveis
        </Text>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Links Visuais */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={[styles.linkButton, styles.githubButton]}
            onPress={() => openLink('https://github.com')}
          >
            <Text style={styles.linkButtonText}>GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, styles.linkedinButton]}
            onPress={() => openLink('https://linkedin.com')}
          >
            <Text style={styles.linkButtonText}>LinkedIn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, styles.portfolioButton]}
            onPress={() => openLink('https://portfolio.com')}
          >
            <Text style={styles.linkButtonText}>Portfólio</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => Linking.openURL('mailto:joao@email.com')}
        >
          <Text style={styles.emailText}>📧 joao@email.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
    textAlign: 'center',
  },
  bio: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    width: '100%',
    marginVertical: 16,
  },
  linksContainer: {
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  githubButton: {
    backgroundColor: '#1f2937',
  },
  linkedinButton: {
    backgroundColor: '#0a66c2',
  },
  portfolioButton: {
    backgroundColor: '#8b5cf6',
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emailButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  emailText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
