import { useEffect, useState } from 'react';

interface ItemType {
    id: number;
    name: string;
}

export default function QuestionSeven() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch('https://api.example.com/items');
            if (!response.ok) {
              throw new Error('Erro ao buscar itens');
            }
            const data = await response.json();
            setItems(data);
          } catch (err: Error) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchItems();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }
    
    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div>
            <h1>Lista de Itens</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}