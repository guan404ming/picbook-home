import React from 'react';

interface Book {
  id: number;
  title: string;
  image: string;
}

interface CardProps {
  book: Book;
}

function Card({ book }: CardProps) {
  return (
    <div style={{ flex: '1', maxWidth: '250px', margin: '20px 0', borderRadius: '10px', padding: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
      <h3 style={{ textAlign: 'left', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        繪本名稱
        <span style={{ fontSize: '30px', marginRight: '12px' }}>📖</span>
      </h3>
      <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
      <input type="range" style={{ width: '100%', height: '8px', appearance: 'none', background: 'black', outline: 'none', borderRadius: '8px' }} />
    </div>
  );
}

export default function SavesPage() {
  const books: Book[] = [
    { id: 1, title: 'Book 1', image: 'book1.jpg' },
    { id: 2, title: 'Book 2', image: 'book1.jpg' },
    { id: 3, title: 'Book 3', image: 'book1.jpg' },
    { id: 4, title: 'Book 4', image: 'book1.jpg' },
    { id: 5, title: 'Book 5', image: 'book1.jpg' },
    { id: 6, title: 'Book 6', image: 'book1.jpg' },
    // ... 其他書籍資料
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'left', marginBottom: '20px' }}>Saves</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ flex: '0 0 calc(33.33% - 40px)' }}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
