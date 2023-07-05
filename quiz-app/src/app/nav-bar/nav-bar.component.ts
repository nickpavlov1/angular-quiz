import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  dialogMsg: string = 'Are you sure you want to reset the quiz?'
  isSubmitted: Observable<boolean> = this.quizService.getQuizStatusChangedObservable();
  dialogSubscription!: Subscription;

  constructor(
    private router: Router,
    private readonly quizService: QuizService,
    public dialog: MatDialog) {
    }

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }

  goToResults() {
    this.router.navigate(['/results']);
  }

  resetQuiz(): void {
    this.quizService.resetQuestions();
    this.router.navigate(['/quiz']);
  }

}
