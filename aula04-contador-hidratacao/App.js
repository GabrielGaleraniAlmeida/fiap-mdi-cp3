import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [copos, setCopos] = useState(0);
  const [metaAtingida, setMetaAtingida] = useState(false);
  const META_DIARIA = 8;

  useEffect(() => {
    if (copos >= META_DIARIA && !metaAtingida) {
      setMetaAtingida(true);
    } else if (copos < META_DIARIA && metaAtingida) {
      setMetaAtingida(false);
    }
  }, [copos, metaAtingida]);

  const adicionarCopo = () => {
    setCopos(copos + 1);
  };

  const resetarDia = () => {
    setCopos(0);
    setMetaAtingida(false);
  };

  const percentualMeta = Math.min((copos / META_DIARIA) * 100, 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>💧 Contador de Hidratação</Text>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentualMeta}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {copos} / {META_DIARIA} copos
          </Text>
        </View>

        {/* Contador Grande */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>{copos}</Text>
          <Text style={styles.counterLabel}>Copos Bebidos</Text>
        </View>

        {/* Mensagem de Meta Atingida */}
        {metaAtingida && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>🏆 Meta do dia atingida!</Text>
            <Text style={styles.successSubtext}>
              Parabéns! Você atingiu a meta diária de hidratação.
            </Text>
          </View>
        )}

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={adicionarCopo}
          >
            <Text style={styles.buttonText}>+ Adicionar Copo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetarDia}
          >
            <Text style={styles.buttonText}>Resetar Dia</Text>
          </TouchableOpacity>
        </View>

        {/* Dicas */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dicas de Hidratação</Text>
          <Text style={styles.tipsText}>
            • Beba um copo de água ao acordar{'\n'}
            • Beba durante as refeições{'\n'}
            • Beba antes e depois de exercícios{'\n'}
            • Mantenha uma garrafa de água sempre à mão
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#334155',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  progressText: {
    color: '#cbd5e1',
    fontSize: 12,
    textAlign: 'center',
  },
  counterContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  counterNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10,
  },
  counterLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
  successMessage: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  successSubtext: {
    fontSize: 14,
    color: '#ecfdf5',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3b82f6',
  },
  resetButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
  },
});
