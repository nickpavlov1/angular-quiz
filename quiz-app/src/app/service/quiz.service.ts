import { Injectable } from '@angular/core';
import { Question } from '../interface/question';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  questions: Question[] = [
    {
      text: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      answer: 'Canberra',
      selectedOption: ''
    },
    {
      text: 'Who wrote the novel "1984"?',
      options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Fyodor Dostoevsky'],
      answer: 'George Orwell',
      selectedOption: ''
    },
    {
      text: 'Which scientist developed the theory of relativity?',
      options: ['Albert Einstein', 'Isaac Newton', 'Niels Bohr', 'Stephen Hawking'],
      answer: 'Albert Einstein',
      selectedOption: ''
    },
    {
      text: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Cu'],
      answer: 'Au',
      selectedOption: ''
    },
    {
      text: 'The signing of the Treaty of Versailles marked the end of which major conflict?',
      options: ['World War I', 'The Cold War', 'World War II', 'The Napoleonic Wars'],
      answer: 'World War I',
      selectedOption: ''
    }
  ];

  isQuizSubmitted: boolean = false;
  private quizStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isQuizSubmitted);

  constructor() { }

  getQuizStatus(): boolean {
    return this.isQuizSubmitted;
  }

  setQuizAsSubmitted(): void {
    this.isQuizSubmitted = true;
    this.quizStatusSubject.next(this.isQuizSubmitted);
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  saveQuizResults(quizResults: Record<string, string>): void {
    this.questions.forEach((question, index) => {
      const key = `question${index}`;
      if (key in quizResults) {
        question.selectedOption = quizResults[key];
      }
    });
  }

  resetQuestions(): void {
    this.questions.forEach(question => {
      question.selectedOption = '';
    });
    this.isQuizSubmitted = false;
    this.quizStatusSubject.next(this.isQuizSubmitted);
  }

  getQuizStatusChangedObservable(): Observable<boolean> {
    return this.quizStatusSubject.asObservable();
  }

  correctAnswersCount: number = 0;

  setCorrectAnswersCount(count: number): void {
    this.correctAnswersCount = count;
  }

  getCorrectAnswersCount(): number {
    return this.correctAnswersCount;
  }
}
