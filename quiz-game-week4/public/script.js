let questions = []
let currentQuestion = 0
let score = 0

async function fetchQuestions() {
  const response = await fetch("/questions")
  questions = await response.json()
  displayQuestion()
}

function displayQuestion() {
  const questionEl = document.getElementById("question")
  const optionsEl = document.getElementById("options")
  const submitBtn = document.getElementById("submit")

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion]
    questionEl.textContent = question.question

    optionsEl.innerHTML = ""
    question.options.forEach((option, index) => {
      const optionEl = document.createElement("div")
      optionEl.classList.add("option")
      optionEl.textContent = option
      optionEl.addEventListener("click", () => selectOption(index))
      optionsEl.appendChild(optionEl)
    })

    submitBtn.style.display = "block"
    submitBtn.disabled = true
  } else {
    showResults()
  }
}

function selectOption(index) {
  const options = document.querySelectorAll(".option")
  options.forEach((option, i) => {
    if (i === index) {
      option.classList.add("selected")
    } else {
      option.classList.remove("selected")
    }
  })
  document.getElementById("submit").disabled = false
}

function submitAnswer() {
  const selectedOption = document.querySelector(".option.selected")
  if (selectedOption) {
    const answer = selectedOption.textContent
    if (answer === questions[currentQuestion].answer) {
      score++
    }
    currentQuestion++
    displayQuestion()
  }
}

function showResults() {
  document.getElementById("quiz").style.display = "none"
  document.getElementById("results").style.display = "block"
  document.getElementById("score").textContent = `${score} out of ${questions.length}`
}

document.getElementById("submit").addEventListener("click", submitAnswer)

fetchQuestions()

