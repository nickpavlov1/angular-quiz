import { Component } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Question } from '../interface/question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  questions: Question[] = [];
  isSubmitted: Observable<boolean> = this.quizService.getQuizStatusChangedObservable();
  correctAnswersCount: number = 0;
  totalQuestions: number = 0;

  constructor(private quizService: QuizService) {
    this.correctAnswersCount = this.quizService.getCorrectAnswersCount();
    this.totalQuestions = this.quizService.getQuestions().length;
  }

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  getScorePercentage(): number {
    return (this.correctAnswersCount / this.totalQuestions) * 100;
  }
}
