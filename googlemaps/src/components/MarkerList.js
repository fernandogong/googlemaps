import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function MarkerListComponent({ markers }) {
  return (
    <View>
      <Text>Lista de Marcadores:</Text>
      <FlatList
        data={markers}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
