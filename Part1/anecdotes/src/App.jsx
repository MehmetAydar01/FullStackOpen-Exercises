import { useState } from "react"


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotedIndex, setMostVotedIndex] = useState(0);


  // Rastgele Anecdotlari gostermek icin
  const handleNextAnecdote = () => {
    // Rastgele yeni bir anekdot göstermek için
    const newIndex = Math.floor(Math.random() * anecdotes.length)

    // console.log('newIndex', newIndex)
    setCurrentAnecdoteIndex(newIndex)
  }

  // Oy verme islemi
  const handleVote = () => {
    /* Nesneler ve diziler gibi karmaşık veri yapılarında depolanan state'i güncellemenin doğru yolunun, state'in bir kopyasını oluşturmak olduğunu unutmayın */

    const newVotes = [...votes]
    newVotes[currentAnecdoteIndex] += 1

    // console.log(newVotes)
    setVotes(newVotes)

    // en cok oyu alan anecdote'u gosterelim
    let maxVotesIndex = 0
    for (let i = 1; i < newVotes.length; i++) {
      if (newVotes[i] > newVotes[maxVotesIndex]) {
        maxVotesIndex = i
      }
    }
    // console.log('en cok oy alan anekdotun index sayisi', maxVotesIndex)
    // console.log('en cok oy alan anekdotun oy sayisi', newVotes[maxVotesIndex])
    setMostVotedIndex(maxVotesIndex)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[currentAnecdoteIndex]}</p>
      <p>has {votes[currentAnecdoteIndex]} votes</p>

      <br />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next Anectode</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App
