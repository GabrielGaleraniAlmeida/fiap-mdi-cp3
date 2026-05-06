import React, { createContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';

// Context para o carrinho
const CarrinhoContext = createContext();

const produtos = [
  { id: '1', nome: 'Fone Bluetooth', preco: 89.90, emoji: '🎧' },
  { id: '2', nome: 'Carregador Rápido', preco: 45.00, emoji: '⚡' },
  { id: '3', nome: 'Cabo USB-C', preco: 25.00, emoji: '🔌' },
  { id: '4', nome: 'Protetor de Tela', preco: 15.00, emoji: '🛡️' },
  { id: '5', nome: 'Capa de Telefone', preco: 35.00, emoji: '📱' },
  { id: '6', nome: 'Tripé para Câmera', preco: 55.00, emoji: '📷' },
  { id: '7', nome: 'Powerbank 20000mAh', preco: 120.00, emoji: '🔋' },
];

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('produtos');

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);
    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item.id !== produtoId));
  };

  const alterarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
    } else {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produtoId
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      );
    }
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const quantidadeItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const TelaProdutos = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛍️ Mini Loja</Text>

      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <View style={styles.produtoCard}>
            <Text style={styles.produtoEmoji}>{item.emoji}</Text>
            <View style={styles.produtoInfo}>
              <Text style={styles.produtoNome}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>
                R$ {item.preco.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => adicionarAoCarrinho(item)}
            >
              <Text style={styles.botaoTexto}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listaProdutos}
      />
    </ScrollView>
  );

  const TelaCarrinho = () => (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho</Text>

      {carrinho.length > 0 ? (
        <>
          <FlatList
            data={carrinho}
            renderItem={({ item }) => (
              <View style={styles.itemCarrinho}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemPreco}>
                    R$ {item.preco.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantidadeContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      alterarQuantidade(item.id, item.quantidade - 1)
                    }
                  >
                    <Text style={styles.botaoQuantidade}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantidade}>{item.quantidade}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      alterarQuantidade(item.id, item.quantidade + 1)
                    }
                  >
                    <Text style={styles.botaoQuantidade}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => removerDoCarrinho(item.id)}
                >
                  <Text style={styles.botaoRemover}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listaCarrinho}
          />

          {/* Total */}
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValor}>
              R$ {totalCarrinho.toFixed(2)}
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.carrinhoVazio}>
          <Text style={styles.carrinhoVazioTexto}>Carrinho vazio</Text>
          <Text style={styles.carrinhoVazioSubtexto}>
            Adicione produtos para começar
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.app}>
      {telaAtual === 'produtos' ? <TelaProdutos /> : <TelaCarrinho />}

      {/* Barra de Navegação */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[
            styles.navButton,
            telaAtual === 'produtos' && styles.navButtonAtivo,
          ]}
          onPress={() => setTelaAtual('produtos')}
        >
          <Text style={styles.navTexto}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            telaAtual === 'carrinho' && styles.navButtonAtivo,
          ]}
          onPress={() => setTelaAtual('carrinho')}
        >
          <Text style={styles.navTexto}>
            Carrinho {quantidadeItens > 0 && `(${quantidadeItens})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 20,
    textAlign: 'center',
  },
  listaProdutos: {
    paddingBottom: 100,
  },
  produtoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  produtoEmoji: {
    fontSize: 32,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  produtoPreco: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#3b82f6',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listaCarrinho: {
    paddingBottom: 100,
  },
  itemCarrinho: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPreco: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
  },
  botaoQuantidade: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  quantidade: {
    color: '#f1f5f9',
    fontSize: 12,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  botaoRemover: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  totalBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#3b82f6',
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  totalLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  totalValor: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carrinhoVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinhoVazioTexto: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  carrinhoVazioSubtexto: {
    color: '#64748b',
    fontSize: 13,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  navButtonAtivo: {
    borderBottomColor: '#3b82f6',
  },
  navTexto: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
});
