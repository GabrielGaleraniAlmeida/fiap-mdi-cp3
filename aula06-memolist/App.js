import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const STORAGE_KEY = '@memolist_tarefas';

  // Carregar tarefas ao iniciar
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Salvar tarefas sempre que mudarem
  useEffect(() => {
    salvarTarefas();
  }, [tarefas]);

  const carregarTarefas = async () => {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) {
        setTarefas(JSON.parse(dados));
      }
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    }
  };

  const salvarTarefas = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (erro) {
      console.error('Erro ao salvar tarefas:', erro);
    }
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const novaTarefaObj = {
        id: Date.now().toString(),
        texto: novaTarefa,
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefaObj]);
      setNovaTarefa('');
    }
  };

  const alternarTarefa = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const limparTudo = () => {
    setTarefas([]);
  };

  const tarefasPendentes = tarefas.filter((t) => !t.concluida).length;

  const renderTarefa = ({ item }) => (
    <View style={styles.tarefaContainer}>
      <Switch
        value={item.concluida}
        onValueChange={() => alternarTarefa(item.id)}
        trackColor={{ false: '#334155', true: '#10b981' }}
        thumbColor={item.concluida ? '#059669' : '#94a3b8'}
      />
      <Text
        style={[
          styles.tarefaTexto,
          item.concluida && styles.tarefaConcluida,
        ]}
      >
        {item.texto}
      </Text>
      <TouchableOpacity onPress={() => removerTarefa(item.id)}>
        <Text style={styles.removerBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>📝 MemoList</Text>

        {/* Contador */}
        <View style={styles.contadorBox}>
          <Text style={styles.contadorTexto}>
            {tarefasPendentes} tarefa{tarefasPendentes !== 1 ? 's' : ''} pendente{tarefasPendentes !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar nova tarefa..."
            placeholderTextColor="#64748b"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            onSubmitEditing={adicionarTarefa}
          />
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={adicionarTarefa}
          >
            <Text style={styles.botaoTexto}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Tarefas */}
        {tarefas.length > 0 ? (
          <FlatList
            data={tarefas}
            renderItem={renderTarefa}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.listaContainer}
          />
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma tarefa adicionada</Text>
            <Text style={styles.vazioSubtexto}>
              Comece adicionando uma nova tarefa acima
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Botão Limpar Tudo */}
      {tarefas.length > 0 && (
        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparTudo}
        >
          <Text style={styles.botaoLimparTexto}>Limpar Tudo</Text>
        </TouchableOpacity>
      )}
    </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  contadorBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  contadorTexto: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#334155',
  },
  botaoAdicionar: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listaContainer: {
    marginBottom: 20,
  },
  tarefaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  tarefaTexto: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 14,
  },
  tarefaConcluida: {
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  removerBtn: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  vazio: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  vazioTexto: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  vazioSubtexto: {
    color: '#64748b',
    fontSize: 13,
  },
  botaoLimpar: {
    backgroundColor: '#ef4444',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoLimparTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
