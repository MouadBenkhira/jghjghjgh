import React, { useState } from 'react';

const Help = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const FAQ = [
    {
      question: 'Question 1?',
      answer: 'Answer to question 1.',
    },
    {
      question: 'Question 2?',
      answer: 'Answer to question 2.',
    },
    {
      question: 'Question 3?',
      answer: 'Answer to question 3.',
    },
    {
      question: 'Question 4?',
      answer: 'Answer to question 4.',
    },
    {
      question: 'Question 5?',
      answer: 'Answer to question 5.',
    },
  ];

  const handleCardPress = (index) => {
    if (selectedCard === index) {
      setSelectedCard(null);
    } else {
      setSelectedCard(index);
    }
  };

  return (
    <div style={styles.container}>
      
      <h1 style={styles.heading}>Frequently Asked Questions!</h1>
      {FAQ.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            ...(selectedCard === index && styles.selectedCard),
          }}
          onClick={() => handleCardPress(index)}>
          <h2 style={styles.question}>{item.question}</h2>
          {selectedCard === index && <p style={styles.answer}>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: 'black',
    padding: 25,
    marginBottom: 10,
    borderRadius: 10,
    width:1000,
    cursor: 'pointer',
  },
  selectedCard: {
    backgroundColor: 'gray',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  answer: {
    color: '#333333',
  },

};

export default Help;
