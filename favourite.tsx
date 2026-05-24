import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';

interface Quote {
  id: string;
  text: string;
  author: string;
  savedAt: string;
}

const MOCK_FAVOURITES: Quote[] = [
  {
    id: '1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    savedAt: '2026-05-20',
  },
  {
    id: '2',
    text: 'In the middle of every difficulty lies opportunity.',
    author: 'Albert Einstein',
    savedAt: '2026-05-19',
  },
  {
    id: '3',
    text: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
    savedAt: '2026-05-18',
  },
  {
    id: '4',
    text: 'Life is what happens when you are busy making other plans.',
    author: 'John Lennon',
    savedAt: '2026-05-17',
  },
  {
    id: '5',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    savedAt: '2026-05-16',
  },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#C9B1FF'];

export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState<Quote[]>(MOCK_FAVOURITES);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Remove Quote',
      'Are you sure you want to remove this from favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () =>
            setFavourites((prev) => prev.filter((q) => q.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: Quote; index: number }) => {
    const accentColor = COLORS[index % COLORS.length];
    return (
      <View style={[styles.card, { borderLeftColor: accentColor }]}>
        <View style={styles.cardTop}>
          <Text style={styles.quoteText}>"{item.text}"</Text>
        </View>
        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.authorText}>— {item.author}</Text>
            <Text style={styles.dateText}>Saved on {item.savedAt}</Text>
          </View>
          <TouchableOpacity
            style={[styles.deleteBtn, { backgroundColor: accentColor + '22' }]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={[styles.deleteBtnText, { color: accentColor }]}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        <Text style={styles.headerSubtitle}>
          {favourites.length} quote{favourites.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      {/* List */}
      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🌟</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySubtitle}>
            Start saving quotes you love and they'll appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 20,
    marginBottom: 12,
  },
  cardTop: {
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    color: '#E8E8E8',
    lineHeight: 26,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  authorText: {
    fontSize: 14,
    color: '#AAAAAA',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 11,
    color: '#555555',
    marginTop: 2,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
  },
});